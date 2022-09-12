import { scheduleConstants } from "../constants/scheduleConstants"
import { userConstants } from "../constants/userConstants"

const initialState = {
  slotsData: [],
  isSlotsLoaded: false
}

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case scheduleConstants.SLOTS_DATA_SUCCESS:
      return {
        slotsData: JSON.parse(action.slots) || [],
        isSlotsLoaded: true
      }
    case scheduleConstants.SLOTS_DATA_FAILURE:
      return {
        slotsData: [],
        isSlotsLoaded: false
      }
    case userConstants.LOGOUT_SUCCESS:
      return {
        slotsData: [],
        isSlotsLoaded: false
      }
    default:
      return state
  }
}

export default schedule
