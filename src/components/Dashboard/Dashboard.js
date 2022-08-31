import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';


function Dashboard() {
  return (
    <div className={styles.Dashboard} data-testid="Dashboard">
      Dashboard Component
    </div>
  );
}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
