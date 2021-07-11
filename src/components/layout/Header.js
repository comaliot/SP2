import { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function Header() {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <NavLink className="navbar-brand" to="/" exact>
        FrontWiki
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink className="nav-link" to="/articles">
            Articles
          </NavLink>
          {auth ? (
            <>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className="nav-link" to="/dashboard/articles/add">
                Add New
              </NavLink>
              <Button onClick={logout}>Log out</Button>
            </>
          ) : (
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
