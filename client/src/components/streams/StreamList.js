import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom';

const renderStreams = ({streams, currentUserId}) =>{
  return streams.map(stream=>{
    return(
      <div className="item" key={stream.id}>
        {renderAdmin(stream, currentUserId)}
        <img className="ui avatar image middle aligned" src={stream.userImage} alt=""/>   
        <div className="middle aligned content">
          <Link to={`/streams/${stream.id}`} className="header">
            {stream.title}
          </Link> 
          <div className="description">
            {stream.description}
          </div> 
        </div>
      </div>
    )
  })
}
const renderAdmin = (stream, currentUserId) =>{
  if(stream.userId === currentUserId){
    return (
    <div className="right floated content ui buttons">
      <Link className="ui button black" to={`/streams/edit/${stream.id}`}>Edit</Link>
      <div className="or"></div>
      <Link className="ui button grey" to={`/streams/delete/${stream.id}`}>Delete</Link>
    </div>)
  }else{
    return null
  }

}
const renderCreate = (signedIn) =>{
  if(signedIn){
    return (
    <div style={{textAlign: 'right'}}>
      <Link to="/streams/new" className="ui button black">Create New Stream</Link>
    </div>)
  }
}
const StreamList = (props) =>{

  useEffect(()=>{
    props.fetchStreams();
  }, [])

  return (
  <div>
    <h2>Streams</h2>
    <div className="ui celled list huge">
      {renderStreams(props)}
    </div>
    {renderCreate(props.isSignedIn)}
  </div>)
}
const mapStateToProps = ({stream, auth}) =>{
  const {userId, isSignedIn} = auth;
  return {streams: Object.values(stream), currentUserId: userId, isSignedIn}
}
export default connect(mapStateToProps, {fetchStreams})(StreamList)