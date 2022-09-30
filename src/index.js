import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'
import loader from './reducers/loader';
import user from './reducers/user';
import schedule from './reducers/schedule';
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
    document.getElementById('api-loader').classList.remove('hide-loader');
    document.getElementById('api-loader').classList.add('show-loader');
    return config;
  },
  error => {
    Promise.reject(error)
  }
)

// API Response interceptor
axios.interceptors.response.use(
  response => {

    document.getElementById('api-loader').classList.add('hide-loader');
    document.getElementById('api-loader').classList.remove('show-loader');
    return response
  },
  function (error) {
    document.getElementById('api-loader').classList.add('hide-loader');
    document.getElementById('api-loader').classList.remove('show-loader');
    return Promise.reject(error)
  }
)

//Redux Intilization
const store = configureStore({
  reducer: {
    loader,
    user,
    alert,
    profile,
    schedule
  }
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
      <BrowserRouter basename={'/we-connect-frontend'}>
      <Provider store={store}><App /></Provider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
