import React from 'react';
import PropTypes from 'prop-types';
import styles from './OnboardingUser.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap'


function OnboardingUser () { 

  const { setError, handleSubmit, control, reset, formState: { errors }, getValues
  } = useForm()

  //Object which helps in navigation
  const navigate = useNavigate();

  const user = useSelector(state => state.user)
  console.log(user)
  // Submiting data to login
  const submitUserDetails = (data) => {
    navigate('/dashboard')
  };


  return (
  <div className={styles.OnboardingUser} data-testid="OnboardingUser">
    { user?.role === 'student'?
    <Card>
      <Card.Body>
    <Form onSubmit={handleSubmit(submitUserDetails)} onReset={reset} >
      <Form.Group className="mb-3">
        <Form.Label>Skills</Form.Label>
        <Controller control={control} name="skills"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control onChange={onChange} value={value} ref={ref}
              isInvalid={errors.skills}
              placeholder="Enter Your Skills"
            />)}
          rules={{ required: true }}
        />
        <Form.Text className="text-muted">It is good to enter Technical skills.</Form.Text>
        <Form.Control.Feedback type="invalid">
          Skills is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Interests</Form.Label>
        <Controller control={control} name="interests"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control onChange={onChange} value={value} ref={ref}
              isInvalid={errors.interests}
              placeholder="Enter Your Interests"
            />)}
          rules={{ required: true }}
        />
        <Form.Text className="text-muted">It helps others to look at your interests to help you.</Form.Text>
        <Form.Control.Feedback type="invalid">
          Interests is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>LinkedIn Profile</Form.Label>
        <Controller control={control} name="linkedinProfile"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control onChange={onChange} value={value} ref={ref}
              isInvalid={errors.linkedinProfile}
              placeholder="Enter Your LinkedIn Profile"
            />)}
        />
        <Form.Control.Feedback type="invalid">
          Enter valid LinkedIn Profile
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit"
        className="btn btn-primary">
        Submit Details
      </Button>
    </Form>
    </Card.Body>
    </Card>
    :
    <Card>
      <Card.Body>
    <Form onSubmit={handleSubmit(submitUserDetails)} onReset={reset} >
      <Form.Group className="mb-3">
        <Form.Label>Skills</Form.Label>
        <Controller control={control} name="skills"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control onChange={onChange} value={value} ref={ref}
              isInvalid={errors.skills}
              placeholder="Enter Your Skills"
            />)}
          rules={{ required: true }}
        />
        <Form.Text className="text-muted">It is good to enter Technical skills.</Form.Text>
        <Form.Control.Feedback type="invalid">
          Skills is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Interests</Form.Label>
        <Controller control={control} name="interests"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control onChange={onChange} value={value} ref={ref}
              isInvalid={errors.interests}
              placeholder="Enter Your Interests"
            />)}
          rules={{ required: true }}
        />
        <Form.Text className="text-muted">It helps others to look at your interests to help you.</Form.Text>
        <Form.Control.Feedback type="invalid">
          Interests is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>LinkedIn Profile</Form.Label>
        <Controller control={control} name="linkedinProfile"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control onChange={onChange} value={value} ref={ref}
              isInvalid={errors.linkedinProfile}
              placeholder="Enter Your LinkedIn Profile"
            />)}
        />
        <Form.Control.Feedback type="invalid">
          Enter valid LinkedIn Profile
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Years of Experince</Form.Label>
        <Controller control={control} name="yearsOfExperince"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control onChange={onChange} value={value} ref={ref}
            type="number"  
            isInvalid={errors.yearsOfExperince}
              placeholder="Enter Years of Experince"
            />)}
        />
        <Form.Control.Feedback type="invalid">
          Enter valid data
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit"
        className="btn btn-primary">
        Submit Details
      </Button>
    </Form>
    </Card.Body>
    </Card>
}
  </div>
);
}

OnboardingUser.propTypes = {};

OnboardingUser.defaultProps = {};

export default OnboardingUser;
