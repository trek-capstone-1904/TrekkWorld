import React from 'react';

export const Video = () => {
  return (
    <div id="Video">
      {/* <iframe src="../images/TrainJourney2.mpg"></iframe> */}
      <video
        // className="videoTrain"
        autoPlay
        loop
        preload="true"
        width="100%"
        height="100%"
        playbackrate = "0.1"
        muted
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/trekk-fdf31.appspot.com/o/video%2FTrekkVideo.mp4?alt=media&token=27e2ba13-ea14-4916-853f-be168b7aac66"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Video;
