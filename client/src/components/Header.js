import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth  from './GoogleAuth';

const Header = () =>{
  return (
  <div className="ui inverted menu">
    <Link to="/" className="header large ui ribbon black label">SWITCH</Link>
    <div className="right menu">
      <div></div>
      <Link className="ui item" to="/">STREAMS</Link>
      <div className="item">
        <GoogleAuth/>
      </div>
    </div>
  </div>)
}

export default Header