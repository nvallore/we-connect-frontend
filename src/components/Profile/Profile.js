import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import user_avtar from '../../images/user_avtar.png';
import { useDispatch, useSelector } from 'react-redux';
import profileActions from '../../actions/profileActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function Profile() {

  //event dispatcher
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({});
  
  //Object which helps in navigation
  const navigate = useNavigate();

  const location = useLocation();
  const profileRegistrationId = location?.state.registrationId;
  

  const profileData = useSelector(state => state.profile)

  let userRegistrationId = JSON.parse(localStorage.getItem('user'))?.username;

  useEffect(() => {
    dispatch(profileActions.getProfileData(profileRegistrationId));
  }, []);

  useEffect(() => {
    if (profileData.data) {
      setProfile(profileData?.data);
    }
  }, [profileData]);

  const navigateToEditProfile = () => {
    navigate('/dashboard/profile/edit')
  }

  const scheduleSlots = () => {
    console.log('In Schedule slots');
    navigate('/dashboard/slots')
  }

  const scheduleCall = () => {
    console.log('In Schedule calls');
  }

  return (
    <div className={styles.Profile} data-testid="Profile">
      <Container className="py-5">

        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Card.Img
                  src={user_avtar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                />
                <p className="text-muted mb-1">{profile?.name}</p>
                <div className="d-flex justify-content-center mb-2">
                  { userRegistrationId === profileRegistrationId?  profile?.roleName === 'Admin'?
                    <><Button variant="success" onClick={navigateToEditProfile} outline className="ms-1">Edit Profile</Button>
                    <Button variant="success" onClick={scheduleSlots} outline className="ms-1">Schedule Slots</Button></>
                    :
                    <Button variant="success" onClick={navigateToEditProfile} outline className="ms-1">Edit Profile</Button>
                    : profileData?.roleName === 'Admin'?
                    <Button variant="success" onClick={navigateToEditProfile} outline className="ms-1">Schedule Call</Button> : <></>
                  }
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                {profile?.thankyouNotes?.map(note => (
                  <><Card.Title>{note?.fromName}</Card.Title>
                    <Card.Text>
                      {note?.note}
                    </Card.Text><hr /></>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{profile?.name}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{profile?.email}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Mobile No.</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{profile?.mobile}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Stream</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{profile?.stream}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Class of</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{profile?.yearOfJoining}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>LinkedIn Profile</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{profile?.linkedInProfile}</Card.Text>
                  </Col>
                </Row>
                <hr />
              </Card.Body>
            </Card>

            <Row>
              <Col md="4">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    <Card.Text className="mb-4">Skills</Card.Text>
                    <hr />
                    {profile?.skills?.map(skill => (
                      <><Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{skill}</Card.Text></>
                    ))}
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    <Card.Text className="mb-4">Interests</Card.Text>
                    <hr />
                    {profile?.interests?.map(interest => (
                      <><Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{interest}</Card.Text></>
                    ))}
                    </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    <Card.Text className="mb-4">Expertise</Card.Text>
                    <hr />
                    {profile?.expertise?.map(eachExpertise => (
                      <><Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{eachExpertise}</Card.Text></>
                    ))}
                    </Card.Body>
                </Card>
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
