import React, {useEffect} from 'react';
import Modal from '../Modal';
import {fetchStream, deleteStream} from '../../actions';
import {connect} from 'react-redux';
import history from '../../history';

const onDismiss = () =>{
  history.push('/')
}
const StreamDelete = props =>{

  const actions = ()=>{
    return (
    <div className="actions">
      <div className="ui approve black button" onClick={()=>props.deleteStream(props.match.params.id)}>Delete</div>
      <div className="ui cancel grey button" onClick={onDismiss}>Cancel</div>
    </div>)
  }
  useEffect(()=>{
    props.fetchStream(props.match.params.id)
  }, [])
  console.log(props.stream)
  const content = 'Are you sure you want to delete this stream?';
  const header= !props.stream  ? 'Delete Stream?': `Delete Stream: ${props.stream.title}?`
  return (
  <div>
    Stream Delete
    <Modal
      content={content}
      header={header} 
      actions={actions} 
      onDismiss={()=>onDismiss()}
    />
  </div>)
}

const mapStateToProps = (state, ownProps)=>{
  return {stream: state.stream[ownProps.match.params.id]}
}
export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)