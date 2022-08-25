import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {Form, Button, Card, Container, Row, Col, } from 'react-bootstrap'  
import './Login.module.css'
function Login() {

  const {setError, handleSubmit, control, reset, formState: {errors}, getValues                      
  } = useForm() 

  // Submiting data to login
  const submitLoginDetails = (data) => {
    console.log(data);
  };

  return (

<Container> <Row> <Col>                                                                          
<Card><Card.Header>Sign In</Card.Header><Card.Body>                                    
<Form onSubmit={handleSubmit(submitLoginDetails)} onReset={reset} >                                        
    <Form.Group className="mb-3">                                       
      <Form.Label>Registration ID</Form.Label>                                                         
        <Controller control={control} name="registrationId"                                            
          defaultValue=""                                                                        
          render={({ field: { onChange, onBlur, value, ref } }) => (                             
            <Form.Control onChange={onChange} value={value} ref={ref}                            
            isInvalid={errors.registrationId}                                                          
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
            isInvalid={errors.password}                                                          
            placeholder="Enter Password"
            />)}
            rules={{ required: true }}
            />                                                
      <Form.Control.Feedback type="invalid">                                                     
        Password is Required                                                               
      </Form.Control.Feedback>                                                                   
    </Form.Group>                                                                                   
            <Button type="submit"
               className="btn btn-primary">
               Login                                                                                  
            </Button>                                                                                                                                                                                               
</Form></Card.Body></Card>                                                                       
</Col> </Row> </Container>
  );
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
