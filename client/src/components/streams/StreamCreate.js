import React from 'react';
import {createStream} from '../../actions';
import {connect} from 'react-redux';
import StreamForm from './StreamForm';

const StreamCreate = (props) =>{

  return (
    <div>
      <h3>Create A Stream</h3>
      <StreamForm onSubmit={(formValues)=>props.createStream(formValues)}/>
    </div>
    
  )
}



export default connect(null, {createStream})(StreamCreate)