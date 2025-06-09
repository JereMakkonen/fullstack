import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'

const Notification = () => {
  const notif = useSelector(state => state.notification)
  if (!notif) return null

  return (
    <Card className="mb-4">
      <Card.Body>{notif}</Card.Body>
    </Card>
  )
}

export default Notification
