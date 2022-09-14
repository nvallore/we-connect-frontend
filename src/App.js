import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Schedule from './components/Schedule/Schedule';
import DashboardWrapper from './components/DashboardWrapper/DashboardWrapper';
import { useSelector, useDispatch } from 'react-redux'
import { alertActions } from './actions/alertActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OnboardingUser from './components/OnboardingUser/OnboardingUser';
import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import EditProfileDetails from './components/EditProfileDetails/EditProfileDetails';
import Slots from './components/Slots/Slots';

// we get the LocalStorageService to access token
// const localStorageService = LocalStorageService.getService()



function App() {
  const alert = useSelector(state => state.alert);

  const dispatch = useDispatch();
  const location = useLocation()

  useEffect(() => {
    dispatch(alertActions.clear());
  }, [location]);

  useEffect(() => {
    if (alert?.message) {
      setOpen(true);
    }
  }, [alert]);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<GuardedRoute><ResetPassword /></GuardedRoute>} />
        <Route path="dashboard" element={<GuardedRoute><DashboardWrapper /></GuardedRoute>}>
            <Route path="" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<EditProfileDetails />} />
            <Route path="slots" element={<Slots />} />
            <Route path="schedule" element={<Schedule />} />
        </Route>
        <Route path="/onboarding-user" element={<GuardedRoute><OnboardingUser /></GuardedRoute>} />        
        
      </Routes>
      {alert?.message &&
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      }
    </div>
  );
}

export default App;
