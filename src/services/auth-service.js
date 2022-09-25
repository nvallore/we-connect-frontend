import axios from 'axios';

// const authHost = 'http://127.0.0.1:8000/auth';
const authHost = 'http://localhost/auth';

export function login(loginDetails) {
    console.log(loginDetails);
    const request = {
        username: loginDetails?.registrationId,
        password: loginDetails?.password
    };
    // var response;
    return axios.post(`${authHost}/api/login`, request).then(response => {
                // response = {
                //     isFirstTimeLogin: true,
                //     status: 200,
                //     token: '123123',
                //     name:'User 1',
                //     role: 'student'
                // };
                const userData = {
                    ...response?.data,
                    password: loginDetails?.password
                };
                return userData;
            })
}

export function resetPassword(userDetails) {
    console.log(userDetails);
    return axios.post(`${authHost}/api/resetpassword`, userDetails).then(response => {
                // response = {
                //     success: true
                // };
                console.log(response);
                return response?.data;
            })
}

export function logout() {
    console.log('In logout');
    return axios.post(`${authHost}/api/logout`).then(response => {
                // response = {
                //     success: true
                // };
                console.log(response);
                return response?.data;
            })
}
