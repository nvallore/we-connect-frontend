import {userConstants} from '../constants/userConstants'
import * as authService from '../services/auth-service';
import { alertActions } from './alertActions';

const login = (userDetails) => {
    return dispatch => {

        authService.login(userDetails)
            .then(
                user => { 
                    dispatch(success(user));
                    localStorage.setItem('user', JSON.stringify(user));
                    // dispatch(alertActions.error('Wrong Credentials'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const logout = () => {
    return dispatch => {
    authService.logout().then(
        res => { 
            localStorage.removeItem("user");
            dispatch(success());
        },
        error => {
            dispatch(alertActions.error(error));
        }
    );
    };
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
}

const resetPassword = (userDetails) => {
    return dispatch => {

        authService.resetPassword(userDetails)
            .then(
                user => { 
                    dispatch(success(user));
                    // dispatch(alertActions.error('Wrong Credentials'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(user) { return { type: userConstants.RESET_PASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

    export default {
    login,
    logout,
    resetPassword
}
