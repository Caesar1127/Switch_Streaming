import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import { changeAuthAction} from '../actions';

const renderAuthButtons = (state, props) =>{
  if(state === null){
    return <button className="ui orange loading inverted button">Loading</button>
  }else{ 
    return state ? (
    <button className="ui orange google inverted button" onClick={()=>onSignOutClick(props)}>
      <i className="google icon"/>
      Sign Out
    </button>): (
    <button className="ui orange google inverted button" onClick={()=>onSignInClick(props)}>
      <i className="google icon"/>
      Sign In
    </button>)
  }
}

const onSignOutClick = (props) =>{
  window.gapi.auth2.getAuthInstance().signOut();
}

const onSignInClick = (props) =>{
  window.gapi.auth2.getAuthInstance().signIn();
}

const GoogleAuth = (props) =>{
  const auth_ = useRef(()=>{})
  useEffect(()=>{
    window.gapi.load('client:auth2', ()=>{
      window.gapi.client.init({
        clientId: '689339472082-atcqpttsgddh5ugelfstcqtam8s5n314.apps.googleusercontent.com',
        scope:'email'
      }).then(()=>{  
        auth_.current = window.gapi.auth2.getAuthInstance()
        props.changeAuthAction(auth_.current.isSignedIn.get(), auth_.current.currentUser.get().getId());
        auth_.current.isSignedIn.listen(()=>props.changeAuthAction(auth_.current.isSignedIn.get(), auth_.current.currentUser.get().getId()))
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (renderAuthButtons(props.authStatus, props))
}

const mapStateToProps = ({auth}) =>{
  const currentStatus = auth.isSignedIn === undefined ? null: auth.isSignedIn;
  return {authStatus: currentStatus}
}

export default connect(mapStateToProps, { changeAuthAction})(GoogleAuth);