import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector(state => state.notification)
  return notif ? <div className="notification">{notif}</div> : null
}

export default Notification
