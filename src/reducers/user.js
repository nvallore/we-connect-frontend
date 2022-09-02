import { userConstants } from "../constants/userConstants"

const initialState = {
    token: '',
    name: '',
    role: '',
    isFirstTimeLogin: true,
    isLoginSuccess: false,
    isResetPasswordSuccess: false,
    registrationId: ''
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
        case userConstants.LOGOUT:
            return {
                ...state,
                token: '',
                name: '',
                role: '',
                isFirstTimeLogin: true,
                isLoginSuccess: false,
                isResetPasswordSuccess: false
            }
        case userConstants.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetPasswordSuccess: true
            }
        case userConstants.RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isResetPasswordSuccess: false
            }
        default: 
            return state
    }
}

export default user
