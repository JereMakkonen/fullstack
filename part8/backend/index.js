const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connection to MongoDB:', error.message))


const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book!
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        filter.author = author._id
      }
      if (args.genre) 
        filter.genres = { $in: [args.genre] }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => Book.find({ author: root.id }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new GraphQLError('Authentication required', {
          extensions: { code: 'UNAUTHENTICATED' }
        })
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) author = new Author({ name: args.author })
        await author.save()
        const book = new Book({ ...args, author })
        return book.save()

      } catch (error) {
        throw new GraphQLError('Failed to save book', {          
          extensions: { code: 'BAD_USER_INPUT', error }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser
      if (!user) {
        throw new GraphQLError('Authentication required', {
          extensions: { code: 'UNAUTHENTICATED' }
        })
      }
      try {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      } catch (error) {
        throw new GraphQLError('Failed to edit author', {
          extensions: { code: 'BAD_USER_INPUT', error }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: { code: 'BAD_USER_INPUT', error }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT', error }
        })        
      }
      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
