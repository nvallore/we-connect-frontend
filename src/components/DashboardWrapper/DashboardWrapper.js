import React from 'react';
import PropTypes from 'prop-types';
import styles from './DashboardWrapper.module.css';
import { BrowserRouter as Router, Routes , Route, Outlet } from 'react-router-dom';
import CollapsibleNavbar from '../Navbar/Navbar';

function DashboardWrapper() {
  
  return(
  <div className={styles.DashboardWrapper} data-testid="DashboardWrapper">
          <CollapsibleNavbar />
          <div className='container mt-5'>
          {/* To display different components based on routes */}
          <Outlet />
        </div>
  </div>
);
  }

DashboardWrapper.propTypes = {};

DashboardWrapper.defaultProps = {};

export default DashboardWrapper;
