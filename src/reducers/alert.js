import { alertConstants } from '../constants/alertConstants';

const alert = (state = { message: null}, action) => {
    switch(action.type){
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}

export default alert