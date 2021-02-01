import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import{fetchStream} from '../../actions';
import flv from 'flv.js';



const StreamShow = props =>{
  const videoPlayer = useRef();
  const flvPlayer = useRef();
  const buildPlayer = useRef();

  useEffect(()=>{
    props.fetchStream(props.match.params);
  },[]);

  useEffect(()=>{
    buildPlayer.current()
    return () =>{
      flvPlayer.current.destroy();
    }
  },[props.stream])

  buildPlayer.current = () =>{
    if(flvPlayer.current || !props.stream){
      return;
    }
    flvPlayer.current = flv.createPlayer({
      type:'flv',
      url: `http://localhost:8000/live/${props.match.params.id}.flv`
    });
    flvPlayer.current.attachMediaElement(videoPlayer.current);
    flvPlayer.current.load();
  }

  return (
  <div>
    <video ref={videoPlayer} style={{width:'100%'}} controls/>
    <h1>{props.stream?.title}</h1>
    <h5>{props.stream?.description}</h5>
  </div>
  )
}
const mapStateToProps = (state, ownProps) =>{
  return {stream: state.stream[ownProps.match.params?.id]}
}
export default connect(mapStateToProps, {fetchStream})(StreamShow)