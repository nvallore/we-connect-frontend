import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditProfileDetails.module.css';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Container, Row, Col, } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import profileActions from '../../actions/profileActions';
import DatePicker from "react-datepicker";

function EditProfileDetails() {

  const { setError, setValue, handleSubmit, control, reset, formState: { errors }, getValues
  } = useForm()

  const profile = useSelector(state => state.profile)

  const user = useSelector(state => state.user)

  // Field Array for workExperince and higher education

  const {
    fields: workexFields,
    append: workexAppend,
    remove: workexRemove
  } = useFieldArray({ control, name: "workex" });
  const {
    fields: highereduFields,
    append: highereduAppend,
    remove: highereduRemove
  } = useFieldArray({ control, name: "higheredu" });

  //event dispatcher
  const dispatch = useDispatch();

  let location = useLocation();
  const isOnboardingFlow = location?.state?.isOnboardingFlow || false;

  useEffect(() => {
    if(user?.name) {
      setValue('name', user?.name);
    }
    if (profile.data && !isOnboardingFlow) {
      const profileData = profile?.data;
      setValue('stream', profileData?.stream);
      setValue('mobile', profileData?.mobile);
      setValue('email', profileData?.email);
      setValue('skills', profileData?.skills);
      setValue('interests', profileData?.interests);
      setValue('linkedInProfile', profileData?.linkedInProfile);
      setValue('yearsOfExperince', profileData?.yearsOfExperince);
      setValue('expertise', profileData?.expertise);
      setValue('higheredu', profileData?.higheredu);
      setValue('workex', profileData?.workex);
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
    data = {
      ...data,
      higheredu: data?.higheredu?.map(({ regId, ...item }) => item),
      workex: data?.workex?.map(({ regId, ...item }) => item)
    };
    const request = {
      ...data,
      regId: user?.registrationId,
      roleName: user?.role
    };
    console.log(request);
    if (!isOnboardingFlow) {
      dispatch(profileActions.editProfileData(request));
    } else {
      dispatch(profileActions.onboardProfileData(request));
    }
  };

  return (
    <div className={styles.EditProfileDetails} data-testid="EditProfileDetails">
      <Card>
        <Card.Title>{isOnboardingFlow ? 'Enter your profile details' : 'Edit Profile Details'}</Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit(submitUserDetails)} onReset={reset} >
            <Form.Group className="mb-3">
              <Form.Label>Name<span className={styles.requiredField}> *</span></Form.Label>
              <Controller control={control} name="name"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.name}
                    disabled="true"
                    placeholder="Enter Your Name"
                  />)}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile No.<span className={styles.requiredField}> *</span></Form.Label>
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
              <Form.Label>Email Id<span className={styles.requiredField}> *</span></Form.Label>
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

            {isOnboardingFlow &&
              <Form.Group className="mb-3">
                <Form.Label>Year Of Joining<span className={styles.requiredField}> *</span></Form.Label>
                <Controller control={control} name="yearOfJoining"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      onChange={(date) => {
                        const d = new Date(date).getFullYear();
                        onChange(d);
                      }}
                      onBlur={onBlur}
                      selected={new Date(`1/1/${value}`)}
                      showYearPicker
                      dateFormat="yyyy"
                      maxDate={new Date()}
                    />
                  )}
                  rules={{ required: true }}
                />
                <Form.Control.Feedback type="invalid">
                  This field is required
                </Form.Control.Feedback>
              </Form.Group>
            }

            <Form.Group className="mb-3">
              <Form.Label>Stream<span className={styles.requiredField}> *</span></Form.Label>
              <Controller control={control} name="stream"
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Form.Control onChange={onChange} value={value} ref={ref}
                    isInvalid={errors.stream}
                    placeholder="Enter Your Stream"
                  />)}
                rules={{ required: true }}
              />
              <Form.Control.Feedback type="invalid">
                Stream is required
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
              <Form.Label>Skills<span className={styles.requiredField}> *</span></Form.Label>
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
              <Form.Label>Interests<span className={styles.requiredField}> *</span></Form.Label>
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

            {user?.role?.toLowerCase() === 'alumni' &&
              <>

                <Form.Group className="mb-3">
                  <Form.Label>Years Of Experince<span className={styles.requiredField}> *</span></Form.Label>
                  <Controller control={control} name="yearsOfExperince"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Form.Control onChange={onChange} value={value} ref={ref}
                        type="number"
                        isInvalid={errors.yearsOfExperince}
                        placeholder="Enter Your Experince" />)}
                    rules={{ required: true }} />
                  <Form.Control.Feedback type="invalid">
                    Years of Experince is required
                  </Form.Control.Feedback>
                </Form.Group>

                {isOnboardingFlow &&
                  <Form.Group className="mb-3">
                    <Form.Label>Year Of Passout<span className={styles.requiredField}> *</span></Form.Label>
                    <Controller control={control} name="yearOfPassout"
                      defaultValue=""
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <DatePicker
                          onChange={(date) => {
                            const d = new Date(date).getFullYear();
                            onChange(d);
                          }}
                          onBlur={onBlur}
                          selected={new Date()}
                          showYearPicker
                          dateFormat="yyyy"
                          maxDate={new Date()}
                        />
                      )}
                      rules={{ required: true }} />
                    <Form.Control.Feedback type="invalid">
                      Years of Passout is required
                    </Form.Control.Feedback>
                  </Form.Group>
                }

                <Card>
                  <Card.Title>Work Experince</Card.Title>
                  <Card.Body>
                    <Button variant="dark" outline className="mt-3 mb-3" onClick={() => { workexAppend({ company: "", designation: "", role: "", startYear: "", endYear: "" }); }}>
                      Add Work Experince
                    </Button>
                    {workexFields?.map((item, index) => {
                      const fieldName = `workex[${index}]`;
                      return (
                        <fieldset name={fieldName} key={fieldName}>

                          <Form.Group className="mb-3">
                            <Form.Label>Company Name<span className={styles.requiredField}> *</span></Form.Label>
                            <Controller control={control} name={`${fieldName}.company`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control onChange={onChange} value={value} ref={ref}
                                  type="text"
                                  placeholder="Enter Your Company Name" />)}
                              rules={{ required: true }} />
                            <Form.Control.Feedback type="invalid">
                              Company Name is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Designation<span className={styles.requiredField}> *</span></Form.Label>
                            <Controller control={control} name={`${fieldName}.designation`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control onChange={onChange} value={value} ref={ref}
                                  type="text"
                                  placeholder="Enter Your Designation" />)}
                              rules={{ required: true }} />
                            <Form.Control.Feedback type="invalid">
                              Designation is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Role<span className={styles.requiredField}> *</span></Form.Label>
                            <Controller control={control} name={`${fieldName}.role`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control onChange={onChange} value={value} ref={ref}
                                  type="text"
                                  placeholder="Enter Your Role" />)}
                              rules={{ required: true }} />
                            <Form.Control.Feedback type="invalid">
                              Role is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Year Of Start<span className={styles.requiredField}> *</span></Form.Label>
                            <Controller control={control} name={`${fieldName}.startYear`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker
                                  onChange={(date) => {
                                    const d = new Date(date).getFullYear();
                                    onChange(d);
                                  }}
                                  onBlur={onBlur}
                                  selected={new Date(`1/1/${value}`)}
                                  showYearPicker
                                  dateFormat="yyyy"
                                  maxDate={new Date()}
                                />
                              )}
                              rules={{ required: true }} />
                            <Form.Control.Feedback type="invalid">
                              Start Year is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>End Year</Form.Label>
                            <Controller control={control} name={`${fieldName}.endYear`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker
                                  onChange={(date) => {
                                    const d = new Date(date).getFullYear();
                                    onChange(d);
                                  }}
                                  onBlur={onBlur}
                                  selected={new Date(`1/1/${value}`)}
                                  showYearPicker
                                  dateFormat="yyyy"
                                  maxDate={new Date()}
                                />
                              )}
                            />
                          </Form.Group>


                          <Button variant="secondary" outline className="ms-1" onClick={() => { workexRemove(index) }} disabled={(workexFields.length - 1) !== index}>
                            Remove
                          </Button>
                          <hr />
                        </fieldset>
                      );
                    })}
                  </Card.Body>
                </Card>

                <Card className='mt-3'>
                  <Card.Title>Higher Education</Card.Title>
                  <Card.Body>
                    <Button variant="dark" outline className="mt-3 mb-3" onClick={() => {
                      highereduAppend({ instituteName: "", mastersSubject: "", yearOfCompletion: "" });
                    }}>
                      Add Higher Education
                    </Button>
                    {highereduFields?.map((item, index) => {
                      const fieldName = `higheredu[${index}]`;
                      return (
                        <fieldset name={fieldName} key={fieldName}>

                          <Form.Group className="mb-3">
                            <Form.Label>Institute Name<span className={styles.requiredField}> *</span></Form.Label>
                            <Controller control={control} name={`${fieldName}.instituteName`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control onChange={onChange} value={value} ref={ref}
                                  type="text"
                                  placeholder="Enter Your Institute Name" />)}
                              rules={{ required: true }} />
                            <Form.Control.Feedback type="invalid">
                              Institute Name is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Masters Subject<span className={styles.requiredField}> *</span></Form.Label>
                            <Controller control={control} name={`${fieldName}.mastersSubject`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <Form.Control onChange={onChange} value={value} ref={ref}
                                  type="text"
                                  placeholder="Enter Your Masters Subject" />)}
                              rules={{ required: true }} />
                            <Form.Control.Feedback type="invalid">
                              Masters Subject is required
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Year Of Completion</Form.Label>
                            <Controller control={control} name={`${fieldName}.yearOfCompletion`}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker
                                  onChange={(date) => {
                                    const d = new Date(date).getFullYear();
                                    onChange(d);
                                  }}
                                  onBlur={onBlur}
                                  selected={new Date(`1/1/${value}`)}
                                  showYearPicker
                                  dateFormat="yyyy"
                                  maxDate={new Date()}
                                />
                              )}
                            />
                          </Form.Group>

                          <Button variant="secondary" outline className="ms-1" onClick={() => { highereduRemove(index) }} disabled={(highereduFields.length - 1) !== index}>
                            Remove
                          </Button>
                          <hr />
                        </fieldset>
                      );
                    })}
                  </Card.Body>
                </Card>
              </>
            }

            <Button type="submit"
              className="btn btn-primary mt-3">
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
