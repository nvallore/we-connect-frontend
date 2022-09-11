import React from 'react';
import PropTypes from 'prop-types';
import styles from './ScheduleWrapper.module.css';
import { BrowserRouter as Router, Routes , Route, Outlet } from 'react-router-dom';
import CollapsibleNavbar from '../Navbar/Navbar';

function ScheduleWrapper() {
  
  return(
  <div className={styles.ScheduleWrapper} data-testid="ScheduleWrapper">
          <CollapsibleNavbar />
          <div className='container mt-5'>
          {/* To display different components based on routes */}
          <Outlet />
        </div>
  </div>
);
  }

ScheduleWrapper.propTypes = {};

ScheduleWrapper.defaultProps = {};

export default ScheduleWrapper;
