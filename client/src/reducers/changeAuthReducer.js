import {
  CHANGE_LOGIN_STATUS 
} from '../actions/types';
const authReducer = (state = {}, action) => {
  
  switch(action.type){
    case CHANGE_LOGIN_STATUS:
      return {...state, isSignedIn: action.payload.signInStatus, userId: action.payload.userId}
    default:
      return state
  }
}
export default authReducer;