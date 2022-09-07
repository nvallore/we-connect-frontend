import React from 'react';
import PropTypes from 'prop-types';
import styles from './GuardedRoute.module.css';
import { Navigate } from "react-router-dom";

function GuardedRoute ({ children }) { 
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user?.token) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
  }

GuardedRoute.propTypes = {};

GuardedRoute.defaultProps = {};

export default GuardedRoute;
