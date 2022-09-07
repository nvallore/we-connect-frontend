import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo_image from '../../images/logo192.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import userActions from '../../actions/userActions';


function CollapsibleNavbar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  const [logoutEventDispatched, setLogoutEventDispatched] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  //Object which helps in navigation
  const navigate = useNavigate();

  //event dispatcher
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user?.isLogoutSuccess && logoutEventDispatched) {
      navigate('/login')
    }
  }, [user]);

  const logout = () => {
    console.log('logout');
    dispatch(userActions.logout());
    setLogoutEventDispatched(true)
  }

  return (
    <div className={styles.Navbar} data-testid="Navbar">
      <div className='d-flex flex-direction-row bg-light justify-content-between align-items-center'>
        {/* Header navigation menu items */}
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light" className="w-100">
          <Container fluid>
            {/* <Col xs lg="6"> */}
            <Navbar.Brand as={Link} to="/dashboard"><img src={logo_image} alt='logo_image' className={styles.logoImage}></img> Welcome {user.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Row className="justify-content-md-center w-100">
            <Col xs lg="8">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                {/* <Button variant="outline-success">Search</Button> */}
              </Form>
              </Col>
                </Row>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/login" className={styles.maxWidth}>My Schedule</Nav.Link>
                <Nav.Link as={Link} to="/dashboard/profile" state={{ registrationId: user?.registrationId }} className={styles.maxWidth}>Profile</Nav.Link>
                {/* <Nav.Link as={Link} to="/login"></Nav.Link> */}
                <Button variant="dark" onClick={logout}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
            {/* </Col> */}
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

CollapsibleNavbar.propTypes = {};

CollapsibleNavbar.defaultProps = {};

export default CollapsibleNavbar;
