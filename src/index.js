import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { InfinitySpin } from 'react-loader-spinner';

// we get the LocalStorageService to access token
// const localStorageService = LocalStorageService.getService()
let isLoading = false;
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // const token = localStorageService.getAccessToken()
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token
    // }
    // config.headers['Content-Type'] = 'application/json';
    console.log('In request interceptors');
    isLoading = true;
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
    {isLoading &&
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <InfinitySpin
          width='200'
          color="#4fa94d"
        />
      </div>
    }
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
