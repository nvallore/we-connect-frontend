import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Slots.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, ListGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { setHours, setMinutes } from 'date-fns';
import scheduleActions from '../../actions/scheduleActions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bookMentorSlot, createSlots, deleteUserSlot } from '../../services/schedule-service';
import moment from "moment";


function Slots() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userSlotsData, setUserSlotsData] = useState([]);
  const [excludeSlotsData, setExcludeSlotsData] = useState([]);

  const user = useSelector(state => state.user)

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();
  const requestProfile = location?.state;

  const isScheduleCall = requestProfile?.scheduleCall || false;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = date => {
    setSelectedDate(date);
  };

  const slotsData = useSelector(state => state.schedule)

  const submitSlot = () => {
    const isoDate = selectedDate.toISOString();
    const reqPayload = {
      mentorId: requestProfile.id,
      date: isoDate,
      mentorName: requestProfile.name
    };

    createSlots(reqPayload).then(res => {
      if (res?.status === 200) {
        handleClose();
        dispatch(scheduleActions.getSlotsData(requestProfile?.id));
      }
    });
  };

  const deleteSlot = (slotId) => {
    const reqPayload = {
      slotId: slotId
    };

    deleteUserSlot(reqPayload).then(res => {
      if (res?.status === 200) {
        dispatch(scheduleActions.getSlotsData(requestProfile?.id));
      }
    });
  };

  const getExcludedTimes = (date) => {
    let arrSpecificDates = [];
    for (let i = 0; i < userSlotsData.length; i++) {
      if (
        moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
        moment(userSlotsData[i].date, moment.ISO_8601).format("YYYY/MM/DD")
      ) {
        arrSpecificDates.push(moment(userSlotsData[i].date, moment.ISO_8601).toObject());
      }
    }

    let arrExcludedTimes = [];
    for (let i = 0; i < arrSpecificDates.length; i++) {
      arrExcludedTimes.push(
        setHours(
          setMinutes(new Date(date), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        )
      );
    }
    setExcludeSlotsData(arrExcludedTimes);
  };

  const bookSlot = (slotId) => {
    const reqPayload = {
      slotId: slotId,
      menteeId: user?.registrationId,
      mentorId: requestProfile?.id,
      attendees: [requestProfile?.email, user?.email],
      redirectUri: 'http://localhost:3001/echo'
    };
    console.log(reqPayload);
    bookMentorSlot(reqPayload).then(res => {
      if (res?.status === 200) {
        dispatch(scheduleActions.getSlotsData(requestProfile?.id));
      }
    });
  };


  useEffect(() => {
    dispatch(scheduleActions.getSlotsData(requestProfile?.id));
  }, []);

  useEffect(() => {
    if (slotsData?.isSlotsLoaded) {
      setUserSlotsData(slotsData?.slotsData);
    }
  }, [slotsData]);


  const minDate = new Date();

  return (
    <div className={styles.Slots} data-testid="Slots">

      <>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Slots here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <DatePicker
                  className={styles.datePickerTime}
                  selected={selectedDate}
                  onSelect={getExcludedTimes}
                  onChange={handleChange}
                  showTimeSelect
                  dateFormat="MM/dd/yyyy  EE hh:mm a"
                  minDate={minDate}
                  excludeTimes={excludeSlotsData}
                />
                <Card.Text>
                  Selected Date:  {selectedDate?.toLocaleDateString()} - {selectedDate?.toLocaleTimeString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={submitSlot}>
              Submit Slot
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Card mt-10>
        <Card.Title>{
          !isScheduleCall ? <>Your Slots <Button variant='dark' className='pull-right' onClick={handleShow}>Add Slot</Button></>
            :
            <>Book Your Slots for mentorship with {requestProfile?.name}</>
        }</Card.Title>
        <Card.Body>
          <ListGroup>
            {
              userSlotsData.map((value, key) => {
                return (
                  <><ListGroup.Item>
                    <Card.Body>
                      <Card.Title>Date: {new Date(value.date).toLocaleDateString()} Time: {new Date(value.date).toLocaleTimeString()} </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Slot {value.isAvailable ? 'Free' : 'Booked'}</Card.Subtitle>
                      {
                        !isScheduleCall ? <Button variant='secondary' disabled={!value.isAvailable} onClick={() => deleteSlot(value.slotId)}>Delete Slot</Button>
                          :
                          <Button variant='secondary' disabled={!value.isAvailable} onClick={() => bookSlot(value.slotId)}>Book Slot</Button>
                      }
                    </Card.Body>
                  </ListGroup.Item></>
                )
              })
            }
          </ListGroup>
        </Card.Body>
      </Card>

    </div>
  );
}

Slots.propTypes = {};

Slots.defaultProps = {};

export default Slots;