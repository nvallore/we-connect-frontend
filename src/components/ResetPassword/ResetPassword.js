import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ResetPassword.module.css';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import * as authService from '../../services/auth-service';
import logo_image from '../../images/logo512.png';
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../actions/userActions';
import we_connect_path from '../../images/we-connect-path.png';

function ResetPassword() {

  const { setError, handleSubmit, control, reset, formState: { errors }, getValues, watch
  } = useForm()

  //event dispatcher
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  //Object which helps in navigation
  const navigate = useNavigate();

  // navigate
  useEffect(() => {
    if(user.isResetPasswordSuccess && user.isFirstTimeLogin) {
      navigate('/dashboard/profile/edit', { state: { isOnboardingFlow: true } })
    } else if(user.isResetPasswordSuccess && !user.isFirstTimeLogin) {
      navigate('/dashboard')
    }
  }, [user]);

  let pwd = watch("password");
  // Submiting data to reset password
  const submitPasswordDetails = (data) => {
    const request = {
      username: user?.registrationId,
      password: user?.password,
      newpassword: data?.password
  };
    if (request) {
      dispatch(userActions.resetPassword(request));
      console.log(user);
    }
    // authService.resetPassword().then(res => {
    //   console.log(res);
    //   if (res?.success) {
    //     navigate("/dashboard");
    //   }
    // });
  };

  return (
    <div data-testid="ResetPassword" className={styles.mainContainer}>

      <Container fluid> <Row className="justify-content-md-center">
      <Col xs="0" lg="6" className="d-none d-lg-block">
      <Image fluid src={we_connect_path} alt='We Connect Path' className={styles.weConnectPathImage}></Image>
      </Col>
        <Col xs lg="6">
        <Image fluid src={logo_image} alt='logo_image' className={styles.logoImage}></Image>
        <Card><Card.Header>Reset Password</Card.Header><Card.Body>
          <Form onSubmit={handleSubmit(submitPasswordDetails)} onReset={reset} >
            <Form.Group className="mb-3">
              <Form.Label>Enter New Password</Form.Label>
              <Controller control={control} name="password"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    type="password"
                    isInvalid={errors.registrationId}
                    placeholder="Enter Password"
                  />)}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && <p> {errors.password.message}</p>}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Controller control={control} name="confirmPassword"
                defaultValue=""
                rules={{
                  required: 'Please enter the password',
                  validate: value => value === pwd || "The passwords do not match"
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.password}
                    placeholder="Confirm Password"
                  />)}
              />
              {errors.confirmPassword && <p className={styles.errorText}> {errors.confirmPassword.message}</p>}

              {/* <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback> */}
            </Form.Group>
            <Button type="submit"
              className="btn btn-primary">
              Login
            </Button>
          </Form></Card.Body></Card>
      </Col> </Row> </Container>
    </div>
  );
}

ResetPassword.propTypes = {};

ResetPassword.defaultProps = {};

export default ResetPassword;
