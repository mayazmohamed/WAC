import React from 'react';
import YouTube from 'react-youtube';


const YouTubeVideo = ({ videoUrl }) => {
  // Parse the video ID from the YouTube URL
  const videoId = videoUrl.split('v=')[1];

  // Options for the YouTube player (you can customize these)
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // YouTube player parameters (optional)
      autoplay: 0, // 1 for autoplay
    },
  };

  return (
    <div className="youtube-video">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubeVideo;