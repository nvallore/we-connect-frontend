import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResetPassword.module.css';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import * as authService from '../../services/auth-service';


function ResetPassword() {

  const { setError, handleSubmit, control, reset, formState: { errors }, getValues, watch
  } = useForm()
  //Object which helps in navigation
  const navigate = useNavigate();
  let pwd = watch("password");
   // Submiting data to reset password
   const submitPasswordDetails = (data) => {
    authService.resetPassword().then(res => {
      console.log(res);
      if(res?.success){
        navigate("/dashboard");
      }
    });
  };

  return (
    <div data-testid="ResetPassword">
      <Container> <Row> <Col>
      <Card><Card.Header>Reset Password</Card.Header><Card.Body>
        <Form onSubmit={handleSubmit(submitPasswordDetails)} onReset={reset} >
          <Form.Group className="mb-3">
            <Form.Label>Enter Password</Form.Label>
            <Controller control={control} name="password"
              defaultValue=""
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Form.Control onChange={onChange} value={value} ref={ref}
                  type="password"
                  isInvalid={errors.registrationId}
                  placeholder="Enter Registration Id"
                />)}
              rules={{ required: true }}
            />
            <Form.Control.Feedback type="invalid">
            {errors.password && <p> {errors.password.message}</p>}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
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
