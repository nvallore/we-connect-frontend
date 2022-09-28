import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo_image from '../../images/logo192.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import userActions from '../../actions/userActions';
import { searchProfile } from '../../services/profile-service';
import { alertActions } from '../../actions/alertActions';


function CollapsibleNavbar() {
  const location = useLocation();
  const [url, setUrl] = useState(null);

  const [searchResult, setSearchResult] = useState([]);


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

  const handleSearch = (event) => {
    const searchText = event.target.value;
    if(searchText.length) {
      searchProfile(searchText).then(
        (searchResult) => {
          setSearchResult(searchResult);
        }
      ).catch(
        error => {
          dispatch(alertActions.error(error));
        }
      )
    } else {
      setSearchResult([])
    }
  }

  const navigateToProfile = (regId) => {
    console.log(regId);
    setSearchResult([])
    navigate('/dashboard/profile', { state: { registrationId: regId, fromSearch: true } })
  }

  return (
    <div className="Navbar" data-testid="Navbar">
      <div className='d-flex flex-direction-row bg-light justify-content-between align-items-center'>
        {/* Header navigation menu items */}
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light" className="w-100">
          <Container fluid>
            {/* <Col xs lg="6"> */}
            <Navbar.Brand as={Link} to="/dashboard"><img src={logo_image} alt='logo_image' className="logoImage"></img> Welcome {user.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Row className="justify-content-md-center w-100">
            <Col xs lg="8" className='positionRelative'>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  id='searchText'
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </Form>
        {
        searchResult.length !== 0 &&
        (
          <ListGroup className="searchResult me-2 text-align-left" id='searchResult'>
            {
              searchResult.map((value, key) => {
                return (
                  <><ListGroup.Item onClick={() => navigateToProfile(value.regId)}>
                  <Card.Body>
                    <Card.Title>{value.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{value.regId}</Card.Subtitle>
                    <Card.Text>
                      Stream: {value.stream}<br />
                      Skills: {value.skills}<br />
                      Expertise: {value.expertise}<br />
                    </Card.Text>
                  </Card.Body>
                </ListGroup.Item></>
                )
              })
            }
          </ListGroup>
        )
      }
              </Col>
                </Row>
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/dashboard/schedule" className="maxWidth">My Schedule</Nav.Link>
                <Nav.Link as={Link} id="dashboardProfile" to="/dashboard/profile" state={{ registrationId: user?.registrationId }} className="maxWidth">Profile</Nav.Link>
                {/* <Nav.Link as={Link} to="/login"></Nav.Link> */}
                <Button variant="dark" id='userLogout' onClick={logout}>Logout</Button>
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
