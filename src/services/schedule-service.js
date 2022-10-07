import axios from "axios";

// const scheduleHost = 'http://127.0.0.1:3001/scheduler';
const scheduleHost = 'http://localhost/scheduler';


export function getSlotsData(reqUser) {
    const request = {
        mentorId: reqUser
    };
    return axios.get(`${scheduleHost}/getSlots`, {params: request}).then(response => {
        // response = {
        //     isFirstTimeLogin: true,
        //     status: 200,
        //     token: '123123',
        //     name:'User 1',
        //     role: 'student'
        // };
        return response?.data;
    });
}

export function createSlots(slotDetails) {

    return axios.post(`${scheduleHost}/createSlot`, slotDetails).then(response => {
        return response;
    });
}

export function deleteUserSlot(slotId) {

    return axios.post(`${scheduleHost}/deleteSlot`, slotId).then(response => {
        return response;
    });
}

// export function bookMentorSlot(payload) {

//     console.log(payload);
//     const getAuthURLPayload = {
//         code: payload.code,
//         redirectUri: payload.redirectUri
//     };

//     return axios.post('http://127.0.0.1:3001/getToken', getAuthURLPayload).then(response => {
//                 console.log(response);
//                 return response;
//             });
// }

export function bookMentorSlot(payload) {
    return axios.post(`${scheduleHost}/bookSlot`, payload).then(response => {
        return response;
    });
}

export function getScheduleData(reqUser) {
    return axios.post(`${scheduleHost}/getSchedule`, reqUser).then(response => {
        return response?.data;
    });
}

export function submitNotes(notes) {
    return axios.post(`${scheduleHost}/updateNotes`, notes)
    .then(response => {
        return response?.data;
    });
}
