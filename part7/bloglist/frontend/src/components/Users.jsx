import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <Table hover>
      <thead>
        <tr>
          <th className="text-center">Name</th>
          <th className="text-center">Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td align="center">
              <Link to={`/users/${user.id}`}> {user.name || user.username}</Link>
            </td>
            <td align="center">{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Users
