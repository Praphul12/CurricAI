import React from 'react';
import ReactPlayer from 'react-player'
import './index.css'
const VideoBlock = ({url}) => {
   
  return (
    <div className='video-container'>
        <ReactPlayer 
        src= {url}
        controls = {true}
        width= "100%"
        height="100%"
        playing = {false}
        // pip = {true}
        />
    </div>
  )
}

export default VideoBlock