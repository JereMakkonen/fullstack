export const filterChange = filter => ({
  type: 'CHANGE',
  payload: filter
})

const initialState = ''

const filterReducer = (state = initialState, action) => {
  console.log('action', action)

  switch (action.type) {
    case 'CHANGE':
      return action.payload
    default:
      return state
  }
}

export default filterReducer
