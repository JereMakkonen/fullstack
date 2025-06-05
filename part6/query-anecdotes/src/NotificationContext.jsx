/* eslint-disable react-refresh/only-export-components, react/prop-types */
import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [nofitication, notificationDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={[nofitication, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
