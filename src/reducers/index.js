import loader from './loader'
import user from './user'
import alert from './alert'
import profile from './profile'
import {combineReducers} from 'redux'
import { userConstants } from '../constants/userConstants'

const appReducer = combineReducers({
    loader,
    user,
    alert,
    profile
})

const initialState = appReducer({}, {})

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT_SUCCESS) {
    state = initialState
  }

  return appReducer(state, action)
}

export default rootReducer
