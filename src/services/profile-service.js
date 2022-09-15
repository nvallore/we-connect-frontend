import axios from "axios";

export function getProfileData(userRegistrationId) {

    return axios.get(`http://127.0.0.1:8001/api/completeprofiledetails/${userRegistrationId}`).then(response => {
                const profileData = {
                    ...response?.data
                };
                return profileData;
            });
}

export function editProfileData(userDetails) {
    return axios.put(`http://127.0.0.1:8001/api/completeprofiledetails/${userDetails?.regId}`, userDetails).then(response => {
                return response;
            });
}

export function onboardProfileData(userDetails) {

    return axios.post('http://127.0.0.1:8001/api/completeprofile', userDetails).then(response => {
                return response;
            });
}

export function searchProfile(searchQuery) {
    const mockResponse = [
        {
            name: 'Alumni 1 Fin',
            skills: 'React, HTML',
            regId: 'alumni1',
            stream: 'CSE',
            expertise: 'React, HTML'
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
    return axios.get(`http://127.0.0.1:8001/api/filterprofile?search=${searchQuery}`).then(response => {
                const searchData = response?.data;
                return searchData;
            });
}

export function submitThankYouNote(noteRequest) {

    return axios.post('http://127.0.0.1:8001/api/thankyounotes', noteRequest).then(response => {
                return response;
            });
}
