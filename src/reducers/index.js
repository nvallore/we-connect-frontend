import loader from './loader'
import user from './user'
import alert from './alert'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    loader,
    user,
    alert
})

export default rootReducer