import {combineReducers} from "redux"

const initstate = {
    login: false
}

const rootReducer = (state = initstate, action) => {
    switch (action.type)
    {
        case 'USER_LOGEDIN':
            return {...state, login: true}
        default:
            return state;
    }
}

export default combineReducers({
    rootReducer
});
