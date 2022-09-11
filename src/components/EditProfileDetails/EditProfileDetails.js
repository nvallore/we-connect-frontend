import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditProfileDetails.module.css';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import profileActions from '../../actions/profileActions';

function EditProfileDetails() {

  const { setError, setValue, handleSubmit, control, reset, formState: { errors }, getValues
  } = useForm()

  const profile = useSelector(state => state.profile)

  //event dispatcher
  const dispatch = useDispatch();

  let location = useLocation();
  const isOnboardingFlow = location?.state?.isOnboardingFlow || false;

  useEffect(() => {
    if (profile.data) {
      const profileData = profile?.data;
      setValue('name', profileData?.name);
      setValue('stream', profileData?.stream);
      setValue('mobile', profileData?.mobile);
      setValue('email', profileData?.email);
      setValue('skills', profileData?.skills);
      setValue('interests', profileData?.interests);
      setValue('linkedInProfile', profileData?.linkedInProfile);
      setValue('yearsOfExperince', profileData?.yearsOfExperince);
      setValue('expertise', profileData?.expertise);
    }
  }, []);

  //Object which helps in navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.isProfileDetailsSubmitSuccess) {
      console.log(profile?.data?.regId);
    navigate('/dashboard/profile', { state: { registrationId: profile?.data?.regId } })
    }
  }, [profile?.isProfileDetailsSubmitSuccess]);

  useEffect(() => {
    if (profile?.isOnboardProfileSuccess) {
    navigate('/dashboard')
    }
  }, [profile?.isOnboardProfileSuccess]);

  

  // Submiting data to login
  const submitUserDetails = (data) => {
    console.log(data);
  if(!isOnboardingFlow){
    dispatch(profileActions.editProfileData(data));
  } else {
    dispatch(profileActions.onboardProfileData(data));
  }
  };

  return (
    <div className={styles.EditProfileDetails} data-testid="EditProfileDetails">
      <Card>
        <Card.Title>Edit Profile Details</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit(submitUserDetails)} onReset={reset} >
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Controller control={control} name="name"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.name}
                    placeholder="Enter Your Name"
                  />)}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile No.</Form.Label>
              <Controller control={control} name="mobile"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.mobile}
                    placeholder="Enter Your Mobile No."
                  />)}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type="invalid">
                Mobile No. is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Id</Form.Label>
              <Controller control={control} name="email"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.email}
                    placeholder="Enter Your Email Id"
                  />)}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type="invalid">
                Email ID is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>LinkedIn Profile</Form.Label>
              <Controller control={control} name="linkedInProfile"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.linkedInProfile}
                    placeholder="Enter Your LinkedIn Profile"
                  />)}
              />
              <Form.Control.Feedback type="invalid">
                Enter valid LinkedIn Profile
              </Form.Control.Feedback>
            </Form.Group>

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
              <Form.Text className="text-muted">Enter comma seperated list. eg. React, HTML, CSS</Form.Text>

              <Form.Control.Feedback type="invalid">
                Skills are required
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
              <Form.Text className="text-muted">Enter comma seperated list. eg. React, HTML, CSS</Form.Text>

              <Form.Control.Feedback type="invalid">
              Interests are required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expertise</Form.Label>
              <Controller control={control} name="expertise"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.expertise}
                    placeholder="Enter Your Expertise"
                  />)}
              />
              <Form.Text className="text-muted">Enter comma seperated list. eg. React, HTML, CSS</Form.Text>

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Years Of Experince</Form.Label>
              <Controller control={control} name="yearsOfExperince"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    type="number" 
                    isInvalid={errors.yearsOfExperince}
                    placeholder="Enter Your Experince"
                  />)}
              />
            </Form.Group>

            <Button type="submit"
              className="btn btn-primary">
              Submit Details
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

EditProfileDetails.propTypes = {};

EditProfileDetails.defaultProps = {};

export default EditProfileDetails;
