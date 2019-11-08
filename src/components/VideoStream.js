import React from 'react';
import './VideoStream.css';

export default function VideoStream({videoUrl}) {
  return (
    <div className="video-stream">
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video stream"
      />
    </div>
  );
}
