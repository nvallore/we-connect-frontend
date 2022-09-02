import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo_image from '../../images/logo192.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import userActions from '../../actions/userActions';


function CollapsibleNavbar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  //Object which helps in navigation
  const navigate = useNavigate();

  //event dispatcher
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  const logout = () => {
    console.log('logout');
    dispatch(userActions.logout());
    navigate('/login')
  }

  return (
    <div className={styles.Navbar} data-testid="Navbar">
      <div className='d-flex flex-direction-row bg-light justify-content-between align-items-center'>
        {/* Header navigation menu items */}
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light" className="w-100">
          <Container fluid>
            <Navbar.Brand as={Link} to="/dashboard"><img src={logo_image} alt='logo_image' className={styles.logoImage}></img> Welcome {user.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Form className="d-flex w-100">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                {/* <Button variant="outline-success">Search</Button> */}
              </Form>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/login">My Schedule</Nav.Link>
                {/* <Nav.Link as={Link} to="/login"></Nav.Link> */}
                <Button variant="dark" onClick={logout}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

CollapsibleNavbar.propTypes = {};

CollapsibleNavbar.defaultProps = {};

export default CollapsibleNavbar;
