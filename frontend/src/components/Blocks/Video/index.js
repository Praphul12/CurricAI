import ReactPlayer from 'react-player';
import './index.css';

const VideoBlock = ({ url }) => {


  return (
    <div className='video-container'>
      <ReactPlayer
        src = {url}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoBlock;
