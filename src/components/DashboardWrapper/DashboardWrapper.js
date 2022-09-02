import React from 'react';
import PropTypes from 'prop-types';
import styles from './DashboardWrapper.module.css';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import CollapsibleNavbar from '../Navbar/Navbar';

function DashboardWrapper() {
  
  return(
  <div className={styles.DashboardWrapper} data-testid="DashboardWrapper">
          <CollapsibleNavbar />
          <div className='container mt-5'>
          {/* To display different components based on routes */}
          <Routes>
            <Route path='/' exact element={<Dashboard />} />
          </Routes>
        </div>
  </div>
);
  }

DashboardWrapper.propTypes = {};

DashboardWrapper.defaultProps = {};

export default DashboardWrapper;
