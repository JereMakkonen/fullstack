import { logout } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'

const NavBar = ({ name }) => {
  const dispatch = useDispatch()
  const onLogout = () => dispatch(logout())

  return (
    <Navbar className="nav-bar" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/" className="nav-link">
        Blog App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-content" />
      <Navbar.Collapse>
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/users" className="text-white">
            User
          </Nav.Link>
          <Navbar.Text className="me-3">{name} logged in</Navbar.Text>
          <Button variant="outline-light" size="sm" onClick={onLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
