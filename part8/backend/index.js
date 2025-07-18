const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const express = require('express')
const cors = require('cors')
const http = require('http')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set("strictQuery", false)

const User = require('./models/user')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const DataLoader = require('dataloader')
const Book = require('./models/book')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB:', error.message))

const bookCountLoader = new DataLoader(async (authors) => {
  const books = await Book.find({ author: { $in: authors } })
  return authors.map(
    id => books.filter(b => b.author.toString() === id.toString()).length
  )
})

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({ server: httpServer, path: '/' })  
  const schema = makeExecutableSchema({ typeDefs, resolvers })  
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), {        
        async serverWillStart() {          
          return { 
            async drainServer() { await serverCleanup.dispose() }
          }       
        }      
      }   
    ],
  })
  await server.start()
  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        let currentUser = null

        if (auth?.startsWith('Bearer ')) {
          try {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            currentUser = await User.findById(decodedToken.id)
          } catch (error) {}
        }
        return { currentUser, bookCountLoader }
      },
    }),
  )
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}
start()

