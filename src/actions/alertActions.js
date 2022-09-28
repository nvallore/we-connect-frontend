import { alertConstants } from '../constants/alertConstants'

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(error) {
    let message = error?.response?.data?.error || 'Server Error, Please contant admin.';

    if(error?.response?.status === 401) {
        message = 'Unauthorized user, Please login again!!';
    }
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
