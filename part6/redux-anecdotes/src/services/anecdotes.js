import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content, votes = 0) => {
  let object = { content, votes }
  let response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }
