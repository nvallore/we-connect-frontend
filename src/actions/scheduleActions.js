import {scheduleConstants} from '../constants/scheduleConstants'
import { alertActions } from './alertActions';
import * as scheduleService from '../services/schedule-service';

const getSlotsData = (profileRegistrationId) => {
    return dispatch => {

        scheduleService.getSlotsData(profileRegistrationId)
            .then(
                slots => { 
                    dispatch(success(JSON.stringify(slots)));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(slots) { return { type: scheduleConstants.SLOTS_DATA_SUCCESS, slots } }
    function failure(error) { return { type: scheduleConstants.SLOTS_DATA_FAILURE, error } }
}

// const editProfileData = (userDetails) => {
//     return dispatch => {

//         profileService.editProfileData(userDetails)
//             .then(
//                 profile => { 
//                     dispatch(success(profile));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function success(profile) { return { type: profileConstants.PROFILE_DATA_EDIT_SUCCESS, profile } }
//     function failure(error) { return { type: profileConstants.PROFILE_DATA_EDIT_FAILURE, error } }
// }

// const onboardProfileData = (userDetails) => {
//     return dispatch => {

//         profileService.onboardProfileData(userDetails)
//             .then(
//                 profile => { 
//                     dispatch(success(profile));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function success(profile) { return { type: profileConstants.ONBOARD_PROFILE_DATA_SUCCESS, profile } }
//     function failure(error) { return { type: profileConstants.ONBOARD_PROFILE_DATA_FAILURE, error } }
// }

export default {
    getSlotsData
}
