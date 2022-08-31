import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'

// we get the LocalStorageService to access token
// const localStorageService = LocalStorageService.getService()
export let isLoading = false;
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // const token = localStorageService.getAccessToken()
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token
    // }
    // config.headers['Content-Type'] = 'application/json';
    console.log(isLoading);
    isLoading = true;
    console.log(isLoading);
    return config;
  },
  error => {
    isLoading = false;
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    console.log('In response interceptor');

    isLoading = false;
    return response
  },
  function (error) {
    const originalRequest = error.config
    isLoading = false;

    console.log('In response interceptor error');
    if (
      error.response.status === 401 &&
      originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
    ) {
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <LoadingOverlay
        active={true}
        spinner={<BounceLoader />}
        styles={{
          overlay: (base) => ({
            ...base,
            height: '100vh'
          })
        }}
        className='hide-loader'
      >
      </LoadingOverlay>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
