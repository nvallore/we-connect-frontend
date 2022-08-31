import axios from 'axios';

export function login(loginDetails) {
    return axios.get('https://dog.ceo/api/breeds/image/random').then(response => {
                response = {
                    isFirstTimeLogin: true
                };
                return response;
            })
}

export function resetPassword(loginDetails) {
    return axios.get('https://dog.ceo/api/breeds/image/random').then(response => {
                response = {
                    success: true
                };
                return response;
            })
}
