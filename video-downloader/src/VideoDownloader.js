import React, { useState } from 'react';
import axios from 'axios';

function VideoDownloader() {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
      // Make an HTTP request to the backend API to initiate the download
        // await axios.post('http://localhost:3001/download?URL=https://www.youtube.com/watch?v=gpLJKNPtKB8&ab_channel=PatiphanPhengpao');
        try {
          // Make an HTTP request to the backend API to initiate the download
          const response = await axios.post('http://localhost:3001/download', { videoUrl });
          
          // Assuming the backend responds with a download link
          setDownloadLink(response.data.downloadLink);
        } catch (error) {
          console.error('Error downloading video:', error);
        }
  };

  return (
    <div>
      <h2>Video Downloader</h2>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
      {downloadLink && (
        <div>
          <p>Click the link below to download the video:</p>
          <a href={downloadLink} download="downloaded_video.mp4">
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}

export default VideoDownloader;
