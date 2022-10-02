import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap'
import styles from './Login.module.css'
import * as authService from '../../services/auth-service';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../actions/userActions';
import logo_image from '../../images/logo512.png';
import we_connect_path from '../../images/we-connect-path.png';
import Image from 'react-bootstrap/Image'
function Login() {

  const { setError, handleSubmit, control, reset, formState: { errors }, getValues
  } = useForm()
  //Object which helps in navigation
  const navigate = useNavigate();

  //event dispatcher
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)


  // reset login status
  // useEffect(() => {
  //   dispatch(userActions.logout());
  // }, []);

  // navigate
  useEffect(() => {
    // dispatch(userActions.logout());
    if (user.isLoginSuccess && user.isFirstTimeLogin) {
      navigate('/reset-password')
    } else if (user.isLoginSuccess && !user.isFirstTimeLogin) {
      navigate('/dashboard')
    }
  }, [user]);

  // Submiting data to login
  const submitLoginDetails = (data) => {
    if (data) {
      dispatch(userActions.login(data));
    }
  };

  return (
    <div className={styles.mainContainer} data-testid="Login">

      <Container fluid> <Row className="justify-content-md-center">
      <Col xs="0" lg="6" className="d-none d-lg-block">
      <Image fluid src={we_connect_path} alt='We Connect Path' className={styles.weConnectPathImage}></Image>
      </Col>
        <Col xs lg="6">
        <Image fluid src={logo_image} alt='logo_image' className={styles.logoImage}></Image>
        <Card bg="light" border="dark"><Card.Header>Sign In</Card.Header><Card.Body>
          <Form onSubmit={handleSubmit(submitLoginDetails)} onReset={reset} >
            <Form.Group className="mb-3">
              <Form.Label>Registration ID</Form.Label>
              <Controller control={control} name="registrationId"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.registrationId}
                    id="userLoginName"
                    placeholder="Enter Registration Id"
                  />)}
                rules={{ required: true }}
              />
              <Form.Text className="text-muted">Registration ID starts with your year of joining</Form.Text>
              <Form.Control.Feedback type="invalid">
                Registration ID is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Controller control={control} name="password"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    type="password"
                    isInvalid={errors.password}
                    id="userLoginPassword"
                    placeholder="Enter Password"
                  />)}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type="invalid">
                Password is Required
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit"
              id="userLoginSubmit"
              className="btn btn-primary">
              Login
            </Button>
          </Form></Card.Body></Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
