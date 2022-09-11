import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Slots.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  Button, Card, ListGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { setHours, setMinutes } from 'date-fns';

function Slots() {

  const [selectedDate, setSelectedDate] = useState(new Date());


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = date => {
    console.log(date);
    setSelectedDate(date);
  };

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
        onChange={handleChange}
        showTimeSelect
        dateFormat="MM/dd/yyyy  EE hh:mm a"
        minDate={minDate}
        excludeTimes={[
          setHours(setMinutes(new Date(), 0), 17),
          setHours(setMinutes(new Date(), 30), 18),
          setHours(setMinutes(new Date(), 0), 18),
          setHours(setMinutes(new Date(), 30), 19),
          setHours(setMinutes(new Date(), 30), 17),
        ]}
      />
      </Card.Body>
      </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

      <Card mt-10>
      <Card.Title>Your Slots <Button variant='dark' className='pull-right' onClick={handleShow}>Add Slot</Button></Card.Title>
      <Card.Body> 
        <ListGroup>
          <ListGroup.Item>03:00pm <Button variant='secondary'>Delete Slot</Button></ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>03:00pm <Button variant='secondary'>Delete Slot</Button></ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>03:00pm <Button variant='secondary'>Delete Slot</Button></ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>03:00pm <Button variant='secondary'>Delete Slot</Button></ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>03:00pm <Button variant='secondary'>Delete Slot</Button></ListGroup.Item>
        </ListGroup>
      </Card.Body>
      </Card>

    </div>
  );
}

Slots.propTypes = {};

Slots.defaultProps = {};

export default Slots;
