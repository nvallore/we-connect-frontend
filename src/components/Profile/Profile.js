import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import user_avtar from '../../images/user_avtar.png';
import { useDispatch, useSelector } from 'react-redux';
import profileActions from '../../actions/profileActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { submitThankYouNote } from '../../services/profile-service';
import moment from 'moment';


function Profile() {

  //event dispatcher
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({});

  const [thankyouNote, setThankyouNote] = useState('');

  //Object which helps in navigation
  const navigate = useNavigate();

  const location = useLocation();
  const profileRegistrationId = location?.state?.registrationId;
  const isFromSearch = location?.state?.fromSearch || false;


  const profileData = useSelector(state => state.profile)

  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userRegistrationId = userDetails?.username;

  useEffect(() => {
    console.log(profileRegistrationId, isFromSearch);
    dispatch(profileActions.getProfileData(profileRegistrationId, isFromSearch));
  }, [location]);

  useEffect(() => {
    if (isFromSearch) {
      if (profileData.searchData) {
        setProfile(profileData?.searchData);
      }
    } else {
      if (profileData.data) {
        setProfile(profileData?.data);
      }
    }
  }, [profileData]);

  const navigateToEditProfile = () => {
    navigate('/dashboard/profile/edit')
  }

  const scheduleSlots = () => {
    navigate('/dashboard/slots', { state: { id: profile?.regId, roleId: profile?.roleName, name: profile?.name, email: profile?.email } })
  }

  const navigateToScheduleCall = () => {
    navigate('/dashboard/slots', { state: { id: profile?.regId, roleId: profile?.roleName, name: profile?.name, email: profile?.email, scheduleCall: true } })
  }

  const createThankYouNote = () => {
    const request = {
      note: thankyouNote.trim(),
      regId: profile?.regId,
      fromName: userDetails?.name,
      date: moment(new Date()).format('YYYY-MM-DD')
    };
    submitThankYouNote(request).then(res => {
      dispatch(profileActions.getProfileData(profileRegistrationId, isFromSearch));
      setThankyouNote('');
    });
  }

  const handleThankYouNoteChange = (event) => {
    const note = event.target.value;
    setThankyouNote(note);
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
                  {userRegistrationId === profileRegistrationId ? profile?.roleName?.toLowerCase() === 'alumni' ?
                    <><Button variant="success" onClick={navigateToEditProfile} outline className="ms-1" id='profileEdit'>Edit Profile</Button>
                      <Button variant="success" onClick={scheduleSlots} outline className="ms-1" id='profileScheduleSlot'>Schedule Slots</Button></>
                    :
                    <Button variant="success" onClick={navigateToEditProfile} outline className="ms-1" id='profileEdit'>Edit Profile</Button>
                    : profile?.roleName?.toLowerCase() === 'alumni' ?
                      <Button variant="success" onClick={navigateToScheduleCall} outline className="ms-1" id='profileScheduleCall'>Schedule Call</Button> : <></>
                  }
                </div>
              </Card.Body>
            </Card>

            {((profile?.tyn?.length !== 0) || (userRegistrationId !== profileRegistrationId)) ?
            <Card className="mb-4 mb-lg-0" style={{height: "400px", overflow: "auto"}}>
              <Card.Title className="m-auto align-self-center">Thank You Notes</Card.Title>
              <hr />
              <Card.Body className="p-0 mx-2">
                {profile?.tyn?.map(note => (
                  <><Card.Title>{note?.fromName}</Card.Title>
                    <p style={{ "font-size": "10px"}}>{new Date(note?.date)?.toDateString()}</p>
                    <Card.Text>
                      {note?.note}
                    </Card.Text>
                    <hr /></>
                ))}
              </Card.Body>
              {userRegistrationId !== profileRegistrationId && <Card.Body>
                <Form.Control as="textarea" rows={3} placeholder="Express your gratitude here..." value={thankyouNote} name={thankyouNote} onChange={handleThankYouNoteChange} />
                <Button variant="primary" onClick={createThankYouNote} outline className="mt-2">Post</Button>
              </Card.Body>
              }
            </Card>
            : 
            <></>
            }
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
                    <Card.Text>LinkedIn Profile</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{profile?.linkedInProfile}</Card.Text>
                  </Col>
                </Row>
                <hr />
                {profile?.higheredu?.length > 0 ?
                  <><Row>
                    <Col sm="3">
                      <Card.Text>Higher Education</Card.Text>
                    </Col>
                    <Col sm="9" style={{ height: "200px",overflow: "auto"}}>
                      <ListGroup>
                        {profile?.higheredu?.map((value, key) => {
                          return (
                            <><ListGroup.Item>
                              <Row>
                                <Col>
                                  Institute Name: <Card.Text>{value?.instituteName}</Card.Text>
                                  Masters Subject: <Card.Text>{value?.mastersSubject}</Card.Text>
                                </Col>
                                <Col>
                                  Year Of Completion: <Card.Text>{value?.yearOfCompletion}</Card.Text>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                            </>
                          );
                        })}
                      </ListGroup>
                    </Col>
                  </Row><hr /></> : <></>
                }
                {profile?.workex?.length > 0 ?
                  <><Row>
                    <Col sm="3">
                      <Card.Text>Work Experince</Card.Text>
                    </Col>
                    <Col sm="9" style={{ height: "200px",overflow: "auto"}}>
                      <ListGroup>
                        {profile?.workex?.map((value, key) => {
                          return (
                            <><ListGroup.Item>
                              <Row>
                                <Col>
                                  Company: <Card.Text>{value?.company}</Card.Text>
                                  Role: <Card.Text>{value?.role}</Card.Text>
                                  Designation: <Card.Text>{value?.designation}</Card.Text>
                                </Col>
                                <Col>
                                  Start Year: <Card.Text>{value?.startYear}</Card.Text>
                                  End Year: <Card.Text>{value?.endYear?.length && value?.endYear}</Card.Text>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                            </>
                          );
                        })}
                      </ListGroup>
                    </Col>
                  </Row><hr /></> : <></>
                }
              </Card.Body>
            </Card>

            <Row>
              <Col md="4">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    <Card.Text className="mb-4">Skills</Card.Text>
                    <hr />
                    {profile?.skills?.split(',').map(skill => (
                      <><Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{skill.trim()}</Card.Text></>
                    ))}
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    <Card.Text className="mb-4">Interests</Card.Text>
                    <hr />
                    {profile?.interests?.split(',').map(interest => (
                      <><Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{interest.trim()}</Card.Text></>
                    ))}
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="mb-4 mb-md-0">
                  <Card.Body>
                    <Card.Text className="mb-4">Expertise</Card.Text>
                    <hr />
                    {profile?.expertise?.split(',').map(eachExpertise => (
                      <><Card.Text className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>{eachExpertise.trim()}</Card.Text></>
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
