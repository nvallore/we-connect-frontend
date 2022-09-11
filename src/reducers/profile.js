import { profileConstants } from "../constants/profileConstants"
import { userConstants } from "../constants/userConstants"

const initialState = {
  data: {},
  isProfileDetailsSubmitSuccess: false,
  isOnboardProfileSuccess: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case profileConstants.PROFILE_DATA_SUCCESS:
      return {
        data: { ...action.profile },
        isProfileDetailsSubmitSuccess: false,
        isOnboardProfileSuccess: false
      }
    case profileConstants.PROFILE_DATA_EDIT_SUCCESS:
      return {
        ...state,
        isProfileDetailsSubmitSuccess: true,
        isOnboardProfileSuccess: false
      }
    case profileConstants.PROFILE_DATA_EDIT_FAILURE:
      return {
        ...state,
        isProfileDetailsSubmitSuccess: false,
        isOnboardProfileSuccess: false
      }
    case profileConstants.ONBOARD_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        isOnboardProfileSuccess: true
      }
    case profileConstants.ONBOARD_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        isOnboardProfileSuccess: false
      }
    case userConstants.LOGOUT_SUCCESS:
      return {
        data: {},
        isProfileDetailsSubmitSuccess: false,
        isOnboardProfileSuccess: false
      }
    default:
      return state
  }
}

export default user
