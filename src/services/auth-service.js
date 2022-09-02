import axios from 'axios';

export function login(loginDetails) {
    console.log(loginDetails);
    return axios.get('https://dog.ceo/api/breeds/image/random').then(response => {
                response = {
                    isFirstTimeLogin: true,
                    status: 200,
                    token: '123123',
                    name:'User 1',
                    role: 'student'
                };
                return response;
            })
}

export function resetPassword(userDetails) {
    console.log(userDetails);
    return axios.get('https://dog.ceo/api/breeds/image/random').then(response => {
                response = {
                    success: true
                };
                return response;
            })
}

export function logout() {
    console.log('In logout');
    return axios.get('https://dog.ceo/api/breeds/image/random').then(response => {
                response = {
                    success: true
                };
                return response;
            })
}
