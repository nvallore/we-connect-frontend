import { profileConstants } from "../constants/profileConstants"

const initialState = {
    data: {}
  }

const user = (state = initialState, action) => {
    switch(action.type){
        case profileConstants.PROFILE_DATA_SUCCESS:
            return {
                data: {...action.profile}
              }
        default: 
            return state
    }
}

export default user
