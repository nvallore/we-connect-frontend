import axios from 'axios';

export function login(loginDetails) {
    console.log(loginDetails);
    const request = {
        username: loginDetails?.registrationId,
        password: loginDetails?.password
    };
    return axios.post('http://127.0.0.1:8000/api/login', request).then(response => {
                // response = {
                //     isFirstTimeLogin: true,
                //     status: 200,
                //     token: '123123',
                //     name:'User 1',
                //     role: 'student'
                // };
                console.log(response);
                return response;
            })
}

export function resetPassword(userDetails) {
    console.log(userDetails);
    const request = {
        username: userDetails?.registrationId,
        password: userDetails?.password,
        newpassword: userDetails?.newpassword
    };
    return axios.post('http://127.0.0.1:8000/api/resetpassword', request).then(response => {
                // response = {
                //     success: true
                // };
                console.log(response);
                return response;
            })
}

export function logout() {
    console.log('In logout');
    return axios.post('http://127.0.0.1:8000/api/logout').then(response => {
                // response = {
                //     success: true
                // };
                console.log(response);
                return response;
            })
}
