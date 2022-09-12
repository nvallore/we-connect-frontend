import { profileConstants } from "../constants/profileConstants"
import { userConstants } from "../constants/userConstants"

const initialState = {
  data: {},
  searchData: {},
  isProfileDetailsSubmitSuccess: false,
  isOnboardProfileSuccess: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case profileConstants.PROFILE_DATA_SUCCESS:
      return {
        ...state,
        data: { ...action.profile },
        isProfileDetailsSubmitSuccess: false,
        isOnboardProfileSuccess: false
      }
      case profileConstants.PROFILE_SEARCH_DATA_SUCCESS:
        return {
          ...state,
          searchData: { ...action.profile }
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
        searchData: {},
        isProfileDetailsSubmitSuccess: false,
        isOnboardProfileSuccess: false
      }
    default:
      return state
  }
}

export default user
