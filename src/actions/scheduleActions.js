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

export default {
    getSlotsData
}
