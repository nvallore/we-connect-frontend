export function login(loginDetails) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(loginDetails)
    // };
    // return fetch('http://127.0.0.1:8000/auth/login', requestOptions)
    //     .then(response => {
    //         if (!response.ok && response.status===400) {
    //             return Promise.reject("Login error");
    //         }
    //         return response.json();
    //     })
    //     .then(data => data);
    return Promise.resolve({
        isFirstTimeLogin: true
    });
}
