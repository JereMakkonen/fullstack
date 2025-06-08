import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <table>
      <thead>
        <tr>
          <th align="center">Name</th>
          <th align="center">Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td align="center">
              <a href={`/users/${user.id}`}> {user.name || user.username}</a>
            </td>
            <td align="center">{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
