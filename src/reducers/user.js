import { userConstants } from "../constants/userConstants"

const initialState = {
    token: '',
    name: '',
    role: '',
    isFirstTimeLogin: true,
    isLoginSuccess: false,
    isResetPasswordSuccess: false,
    registrationId: '',
    password: '',
    isLogoutSuccess: false,
    email: ''
  }

const user = (state = initialState, action) => {
    switch(action.type){
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.user,
                registrationId: action.user.username,
                isLoginSuccess: true,
                isResetPasswordSuccess: false
              }
        case userConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                token: '',
                name: '',
                role: '',
                isFirstTimeLogin: true,
                isLoginSuccess: false,
                isResetPasswordSuccess: false,
                password: '',
                isLogoutSuccess: true
            }
        case userConstants.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetPasswordSuccess: true,
                password: ''
            }
        case userConstants.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isResetPasswordSuccess: false,
                password: ''
            }
        default: 
            return state
    }
}

export default user
