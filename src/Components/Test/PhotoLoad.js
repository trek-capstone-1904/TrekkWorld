import React from 'react';

export const PhotoLoad = () => {
  return (
    <div>
      <h2>Add Image</h2>
      <progress value="0" max="100" id="uploader">
        0%
      </progress>
      <input type="file" value="Upload" id="fileButton" />
    </div>
  );
};

export default PhotoLoad;
