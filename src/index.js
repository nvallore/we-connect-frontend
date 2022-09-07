import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import axios from 'axios'
import allActions from './actions'
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'
import loader from './reducers/loader';
import user from './reducers/user';
import { BrowserRouter } from 'react-router-dom';
import alert from './reducers/alert';
import profile from './reducers/profile';

// API Request interceptor
axios.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (token) {
      config.headers['Authorization'] = 'Token ' + token
    }
    console.log('In interceptor')
    // dispatch(allActions.loadingActions.showLoader)
    document.getElementById('api-loader').classList.remove('hide-loader');
    document.getElementById('api-loader').classList.add('show-loader');
    return config;
  },
  error => {
    // dispatch(allActions.loadingActions.hideLoader)
    Promise.reject(error)
  }
)

// API Response interceptor
axios.interceptors.response.use(
  response => {
    // dispatch(allActions.loadingActions.hideLoader)

    document.getElementById('api-loader').classList.add('hide-loader');
    document.getElementById('api-loader').classList.remove('show-loader');
    return response
  },
  function (error) {
    document.getElementById('api-loader').classList.add('hide-loader');
    document.getElementById('api-loader').classList.remove('show-loader');
    const originalRequest = error.config
    // dispatch(allActions.loadingActions.hideLoader)
    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
    // ) {
    //   return Promise.reject(error)
    // }

    return Promise.reject(error)
  }
)
//Redux Intilization
const store = configureStore({
  reducer: {
    loader: loader,
    user: user,
    alert: alert,
    profile: profile
  },
}
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id='api-loader' className='hide-loader' >
    <LoadingOverlay
        active={true}
        spinner={<BounceLoader />}
        styles={{
          overlay: (base) => ({
            ...base,
            height: '100vh'
          })
        }}
        
      >
      </LoadingOverlay>
      </div>
      <BrowserRouter>
      <Provider store={store}><App /></Provider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
