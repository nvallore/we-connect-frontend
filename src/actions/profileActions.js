import {profileConstants} from '../constants/profileConstants'
import * as profileService from '../services/profile-service';
import { alertActions } from './alertActions';

const getProfileData = (userRegistrationId) => {
    return dispatch => {

        profileService.getProfileData(userRegistrationId)
            .then(
                profile => { 
                    dispatch(success(profile));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(profile) { return { type: profileConstants.PROFILE_DATA_SUCCESS, profile } }
    function failure(error) { return { type: profileConstants.PROFILE_DATA_FAILURE, error } }
}


export default {
    getProfileData
}
