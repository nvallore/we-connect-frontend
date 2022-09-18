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
    const message = error?.response?.data?.error || 'Server Error, Please contant admin.';
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
