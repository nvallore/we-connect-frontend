import axios from "axios";

export function getProfileData(userRegistrationId) {
    const request = {
        username: userRegistrationId
    };
    const mockresponse = {
        regId: 'alumni1',
        stream: 'CSE',
        name: 'Huckleberry',
        mobile: 123123123123,
        email: 'example@example.com',
        roleName: 'Admin',
        yearOfJoining: '2014',
        yearOfPassing: '2018',
        skills: ['React','HTML', 'CSS', 'Bootstrap'],
        interests: ['Blockchain','Web3'],
        linkedInProfile: 'https://linkedin.com',
        yearsOfExperince: 3,
        expertise: ['Frontend','Python'],
        higherEducation: [{instituteName: 'Bits', mastersSubject: 'CSE', yearOfCompletion: '2021'}],
        workExperience: [{company: 'We Connect', startYear: '2021', designation: 'MTS', role: 'Full Stack'}],
        thankyouNotes: [{fromName: 'Fin', note: 'Thank you note 1'}, {fromName: 'Fin', note: 'Thank you note 2'}]
    };
    return axios.get('http://127.0.0.1:8000/api/hello').then(response => {
                // response = {
                //     isFirstTimeLogin: true,
                //     status: 200,
                //     token: '123123',
                //     name:'User 1',
                //     role: 'student'
                // };
                const profileData = {
                    ...response?.data
                };
                return mockresponse;
            });
}

export function editProfileData(userDetails) {

    return axios.get('http://127.0.0.1:8000/api/hello').then(response => {
                // response = {
                //     isFirstTimeLogin: true,
                //     status: 200,
                //     token: '123123',
                //     name:'User 1',
                //     role: 'student'
                // };
                const profileData = {
                    ...response?.data
                };
                return {
                    status: 200,
                    success: true
                };
            });
}

export function onboardProfileData(userDetails) {

    return axios.get('http://127.0.0.1:8000/api/hello').then(response => {
                // response = {
                //     isFirstTimeLogin: true,
                //     status: 200,
                //     token: '123123',
                //     name:'User 1',
                //     role: 'student'
                // };
                const profileData = {
                    ...response?.data
                };
                return {
                    status: 200,
                    success: true
                };
            });
}

export function searchProfile(searchQuery) {

    return axios.get('http://127.0.0.1:8000/api/hello').then(response => {
                // response = {
                //     isFirstTimeLogin: true,
                //     status: 200,
                //     token: '123123',
                //     name:'User 1',
                //     role: 'student'
                // };
                const profileData = {
                    ...response?.data
                };
                return [
                    {
                        profileName: 'Alumni 1 Fin',
                        skills: 'React, HTML',
                        registrationId: 'alumni1',
                        roleName: 'Admin'
                    },
                    {
                        profileName: 'Alumni 2 Fin',
                        skills: 'React, HTML, JS',
                        registrationId: 'alumni1',
                        roleName: 'Admin'
                    },
                    {
                        profileName: 'Alumni 3 Fin',
                        skills: 'React, HTML, Java',
                        registrationId: 'alumni1',
                        roleName: 'Admin'
                    },
                    {
                        profileName: 'Alumni 4 Fin',
                        skills: 'React, HTML',
                        registrationId: 'alumni1',
                        roleName: 'Admin'
                    },
                    {
                        profileName: 'Alumni 5 Fin',
                        skills: 'React, HTML',
                        registrationId: 'alumni1',
                        roleName: 'Admin'
                    }
                ];
            });
}
