import axios from "axios";

export function getSlotsData(reqUser) {
    const request = {
        mentorId: reqUser?.id
    };
    const mockresponse = [
        {
            "slotId": 1,
            "mentorId": "alumni1",
            "mentorName": "Huckleberry",
            "date": "2022-09-11T16:09:34.265Z",
            "isAvailable": true
        },
        {
            "slotId": 2,
            "mentorId": "alumni1",
            "mentorName": "Huckleberry",
            "date": "2022-09-28T16:30:00.000Z",
            "isAvailable": true
        }
    ];
    return axios.get('http://127.0.0.1:3001/getSlots', request).then(response => {
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

    return axios.post('http://127.0.0.1:3001/createSlot', slotDetails).then(response => {
        return response;
    });
}

export function deleteUserSlot(slotId) {

    return axios.post('http://127.0.0.1:3001/deleteSlot', slotId).then(response => {
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
    return axios.post('http://127.0.0.1:3001/bookSlot', payload).then(response => {
        return response;
    });
}

export function getScheduleData(reqUser) {
    console.log(reqUser);
    return axios.post('http://127.0.0.1:3001/getSchedule', reqUser).then(response => {
        return response?.data;
    });
}
