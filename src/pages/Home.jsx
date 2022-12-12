import React from 'react';
import VideoPlayer from '../components/video/VideoPlayer';

const Home = () => {
  const option = {
    // autoplay: true,
    muted: true,
    // controls: true,
    // crossorigin: "anonymous",
    // loop: true,
    poster: import.meta.env.REACT_APP_POSTER,
    src: import.meta.env.REACT_APP_CLIP,
    playsinline: true,
    role: 'application',
  };

  return (
    <div>
      <div>
        <VideoPlayer src={import.meta.env.REACT_APP_CLIP} type={'video/mp4'} preview={import.meta.env.REACT_APP_PREVIEW} {...option} />
      </div>
    </div>
  );
};

export default Home;
