import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
import { Card, CardGroup, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { getDashboardDetails } from '../../services/dashboard-service';
import { getScheduleData } from '../../services/schedule-service';


function Dashboard() {

  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userRole = userDetails?.role;
  const userName = userDetails?.username;

  const [dashboardItems, setDashboardItems] = useState([]);
  const [userSchedule, setUserSchedule] = useState([]);

  useEffect(() => {
    getDashboardDetails(userRole).then(
      (result) => {
        setDashboardItems(result);
      }
    )
  }, [])

  useEffect(() => {
    const request = {
      id: userName,
      roleId: userRole
    };

    getScheduleData(request)
      .then(
        (result) => {
          result?.schedule.map(s => {
            let slotData = result.slotData
            let noteData = result.notes
            s.date = slotData[s.slotId].date
            s.name = slotData[s.slotId].mentorName
            s.notes = s.noteId ? noteData[s.noteId].notes : ''
            return s
          });
          console.log(result?.schedule?.filter(val => new Date(val?.date) > new Date()));
          setUserSchedule(result?.schedule?.filter(val => new Date(val?.date) > new Date()));
        }
      )
  }, [])

  return (
    <div className={styles.Dashboard} data-testid="Dashboard">
      <Container className="py-5">
        <Row>
          <Card.Title className='mb-5'>Events and Info</Card.Title>
          <Col lg="8">
            {dashboardItems?.length > 0 ?
              <CardGroup className='text-align-left'>
                <Row>
                  {dashboardItems?.map((value) => {
                    return (
                      <Card className='mb-3' style={{ "width": "98%" }}>
                        <Row>
                          <Col lg="5">
                            <Card.Img fluid width="100" height="200" variant="top" className='rounded' src={value?.image} />
                          </Col>
                          <Col lg="7">
                            <Card.Body>
                              <Card.Title>{value?.title}</Card.Title>
                              <Card.Subtitle>{value?.subTitle}</Card.Subtitle>
                              <Card.Text>
                                {value?.description}
                              </Card.Text>
                              <Card.Text>
                                Venue: {value?.venue}
                              </Card.Text>
                            </Card.Body>
                          </Col>
                        </Row>
                        <Card.Footer>
                          <small className="text-muted">Post Date: {new Date(value?.postDate).toDateString()}</small>
                        </Card.Footer>
                      </Card>
                    )
                  })
                  }
                </Row>
              </CardGroup>
              :
              <Card.Title>No Events Scheduled Yet</Card.Title>
            }
          </Col>
          <Col className="border  border-dark" lg="4" style={{ "height": "68vh", "overflow": "auto" }}>
            <div className='mt-4'>
              <Card.Title>My Scheduled meetings</Card.Title>
              <hr />
              <ListGroup className='text-align-left'>
                {
                  userSchedule?.map((value) => {
                    return (
                      <><ListGroup.Item>
                        { userRole.toLowerCase() === 'alumni'?
                        <><b>Student Name:</b><Card.Text>{value?.menteeName}</Card.Text></>
                        :
                        <><b>Mentor Name:</b><Card.Text>{value?.name}</Card.Text></>
                        }
                        <b>Meet Link:</b><br /><Card.Link style={{ "cursor": "pointer"}} onClick={() => window.open(`${value?.meetLink}`,'_blank')}>{value?.meetLink}</Card.Link><br /><br />
                        <b>Date:</b> <Card.Text>{new Date(value?.date).toDateString()}</Card.Text>
                      </ListGroup.Item>
                      </>
                    );
                  })
                }
              </ListGroup>

            </div>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
