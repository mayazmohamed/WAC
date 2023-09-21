import React, { useState } from "react";
import axios from "axios";

interface props {
  videoUrls: string[];
}

const VideoList = ({ videoUrls }: props) => {
  const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const getVideoId = (url: string) => {
    // ... (your existing code)
  };

  const handleDownload = async (videoUrl: string) => {
    try {
      const response = await axios.post("http://localhost:3001/download", {
        videoUrl,
      });

      const { downloadLink } = response.data;
      console.log("downloadLink:", downloadLink);
      setDownloadLink(downloadLink);
    } catch (error) {
      console.error("Error downloading video:", error);
      setMessage("An error occurred while downloading the video");
    }
  };

  const getVideo = async (url: string) => {

    

    window.location.href = `http://localhost:3001/download?URL=${url}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videoUrls.map((url, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <iframe
            title={`Video ${index + 1}`}
            width="100%"
            height="auto"
            src={`https://www.youtube.com/embed/${getVideoId(url)}`}
            allowFullScreen
          />

          <button
            onClick={() => {
              getVideo(url);
            }}
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
