import {profileConstants} from '../constants/profileConstants'
import * as profileService from '../services/profile-service';
import { alertActions } from './alertActions';

const getProfileData = (userRegistrationId, isFromSearch) => {
    return dispatch => {

        profileService.getProfileData(userRegistrationId)
            .then(
                profile => {
                    if(isFromSearch) {
                        dispatch(successSearchData(profile));
                    } else {
                        dispatch(success(profile));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(profile) { return { type: profileConstants.PROFILE_DATA_SUCCESS, profile } }
    function successSearchData(profile) { return { type: profileConstants.PROFILE_SEARCH_DATA_SUCCESS, profile } }
    function failure(error) { return { type: profileConstants.PROFILE_DATA_FAILURE, error } }
}

const editProfileData = (userDetails) => {
    return dispatch => {

        profileService.editProfileData(userDetails)
            .then(
                profile => { 
                    dispatch(success(profile));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(profile) { return { type: profileConstants.PROFILE_DATA_EDIT_SUCCESS, profile } }
    function failure(error) { return { type: profileConstants.PROFILE_DATA_EDIT_FAILURE, error } }
}

const onboardProfileData = (userDetails) => {
    return dispatch => {

        profileService.onboardProfileData(userDetails)
            .then(
                profile => { 
                    dispatch(success(profile));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(profile) { return { type: profileConstants.ONBOARD_PROFILE_DATA_SUCCESS, profile } }
    function failure(error) { return { type: profileConstants.ONBOARD_PROFILE_DATA_FAILURE, error } }
}

export default {
    getProfileData,
    editProfileData,
    onboardProfileData
}
