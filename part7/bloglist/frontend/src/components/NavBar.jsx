import { logout } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const NavBar = ({ name }) => {
  const dispatch = useDispatch()
  const onLogout = () => dispatch(logout())

  return (
    <div className="navBar">
      <div className="navItem">
        <a href="/users"> users</a>
        <a href="/"> blogs</a>
        <span>
          {name} logged in <button onClick={onLogout}>logout</button>
        </span>
      </div>
    </div>
  )
}

export default NavBar
