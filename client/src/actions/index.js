import {CHANGE_LOGIN_STATUS, CREATE_STREAM, DELETE_STREAMS, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS} from './types';
import streams from '../apis/streams';
import history from '../history';

export const changeAuthAction = (signInStatus, userId) =>{
  if(!signInStatus) {userId = null};
  return({type: CHANGE_LOGIN_STATUS, payload: {signInStatus, userId}})
}

export const createStream = formValues => async (dispatch, getState) =>{
  const {userId} = getState().auth;
  const userImage = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
  const res = await streams.post('/streams', {...formValues, userId, userImage});
  dispatch({type: CREATE_STREAM, payload: res.data})
  //navigate back to home
  history.push('/');
}

export const fetchStreams = () => async dispatch =>{
  const res = await streams.get('/streams');
  dispatch({type:FETCH_STREAMS, payload: res.data})
}

export const fetchStream = id => async dispatch =>{
  const res = await streams.get(`/streams/${id}`);
  dispatch({type: FETCH_STREAM, payload: res.data})
}

export const editStream = (formValues, id) => async dispatch =>{
  const res = await streams.patch(`/streams/${id}`, formValues);
  dispatch({type: EDIT_STREAM, payload: res.data})
  history.push('/');
}
 
export const deleteStream = id => async dispatch =>{
  await streams.delete(`/streams/${id}`);
  dispatch({type:DELETE_STREAMS, payload: id})
  history.push('/');
}