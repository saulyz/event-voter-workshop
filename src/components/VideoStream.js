import React from 'react';
import './VideoStream.css';

export default function VideoStream() {
  return (
    <div className="video-stream">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/x7cQ3mrcKaY?controls=0"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video stream"
      />
    </div>
  );
}
