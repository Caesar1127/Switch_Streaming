import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

const StreamEdit = (props) =>{
  useEffect(()=>{
    props.fetchStream(props.match.params.id)
  },[])
  if(!props.stream) return null;
  return (
  <div>
    <StreamForm onSubmit={(formValues)=>props.editStream(formValues, props.match.params.id)} 
    initialValues={_.pick(props.stream, 'title', 'description')}
    />
  </div>
  )
}

const mapStateToProps = ({stream}, ownProps) =>{
  return{stream: stream[ownProps.match.params.id]}
}
export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit); 