import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';
import { Link,  useLocation } from 'react-router-dom';
import logo_image from '../../images/logo192.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleNavbar() {
  const location = useLocation(); 
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
  <div className={styles.Navbar} data-testid="Navbar">
    <div className='d-flex flex-direction-row bg-light justify-content-between align-items-center'>
        {/* Header navigation menu items */}
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light" className="w-100">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard"><img src={logo_image} alt='logo_image' className={styles.logoImage}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav pullRight>
            <Nav.Link>Logout</Nav.Link>
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
