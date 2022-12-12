import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import { Fullscreen, PlayCircleOutline, PauseCircleOutline, PlayArrow, Pause, VolumeOff, VolumeUp } from '@mui/icons-material';

import { VolumeControlBar } from './VideoStyles';
import ProgressBar from './ProgressBar';
import PlaybackRate from './PlaybackRate';

const VideoPlayer = ({ id, src, preview, type, option }) => {
  const playerRef = useRef(); // 플레이어 ref
  const videoRef = useRef(); // 비디오태그 ref
  const handleButtonRef = useRef(); // 컨트롤바 플레이버튼 ref

  /* Control video track */
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1.0);

  /* Control volume track */
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);

  const currentStr = useMemo(() => {
    if (current) {
      const result = new Date(current * 1000).toISOString().substr(11, 8);
      return `${result.substr(3, 2)}:${result.substr(6, 2)}`;
    } else {
      return '00:00';
    }
  }, [current]);
  const durationStr = useMemo(() => {
    if (duration) {
      const result = new Date(duration * 1000).toISOString().substr(11, 8);
      return `${result.substr(3, 2)}:${result.substr(6, 2)}`;
    } else {
      return '00:00';
    }
  }, [duration]);

  useLayoutEffect(() => {
    if (!!videoRef.current) {
      videoRef.current.volume = 0;
      document.addEventListener('keyup', keyboardShortcuts);
      videoRef.current.addEventListener('durationchange', init);
      videoRef.current.addEventListener('timeupdate', onUpdateTime);
    }
    return () => {
      videoRef.current.pause();
      document.removeEventListener('keyup', keyboardShortcuts);
      videoRef.current.removeEventListener('durationchange', init);
      videoRef.current.removeEventListener('timeupdate', onUpdateTime);
    };
  }, [videoRef.current]);

  const init = e => setDuration(Math.round(e.target.duration));

  const onUpdateTime = e => {
    console.log(videoRef.current.PlaybackRate);
    setCurrent(Math.round(e.target.currentTime));
  };

  const handleSeek = e => {
    videoRef.current.currentTime = Math.round(e.target.valueAsNumber);
    setCurrent(e.target.valueAsNumber);
  };

  const keyboardShortcuts = event => {
    const { keyCode } = event;
    if (keyCode === 32) handlePlay();
  };

  const handlePlay = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolume = e => {
    videoRef.current.muted = e.target.valueAsNumber > 0 ? false : true;
    setIsMuted(e.target.valueAsNumber > 0 ? false : true);
    setVolume(e.target.valueAsNumber);
  };

  const handleSpeed = value => {
    setSpeed(value);
    videoRef.current.playbackRate = value;
  };

  const onToggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    } else if (playerRef.current.webkitRequestFullscreen) {
      playerRef.current.webkitRequestFullscreen();
    } else {
      playerRef.current.requestFullscreen();
    }
  };

  return (
    <div id={'player'} ref={playerRef}>
      <div id={'kap-player'} className={'kap-player'} onClick={handlePlay}>
        <video
          ref={videoRef}
          id={id}
          controls={false}
          tabIndex={-1}
          type={type}
          src={src}
          {...option}
          onCanPlay={e => {
            e.target.defaultPlaybackRate = speed;
          }}
          onMouseEnter={e => {
            handleButtonRef.current.style.display = 'block';
          }}
          onMouseLeave={e => {
            handleButtonRef.current.style.display = 'none';
          }}
        />
        <div ref={handleButtonRef} className={'kap-status-handle-button'}>
          <IconButton>
            {isPlaying ? (
              <PauseCircleOutline style={{ color: '#fff', fontSize: '80px' }} />
            ) : (
              <PlayCircleOutline style={{ color: '#fff', fontSize: '80px' }} />
            )}
          </IconButton>
        </div>
      </div>
      <div className={'kap-controls-container'}>
        <ProgressBar current={current} duration={duration} handleSeek={handleSeek} currentText={currentStr} preview={preview} />
        <div className={'kap-controls'}>
          <div className={'kap-controls-left'}>
            <IconButton id='play' onClick={handlePlay}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <div className='time'>
              <time id='time-elapsed'>{currentStr}</time>
              <span> / </span>
              <time id='duration'>{durationStr}</time>
            </div>
          </div>
          <div className={'kap-controls-right'}>
            <VolumeControlBar volume={volume} isMuted={isMuted}>
              <IconButton
                onClick={() => {
                  videoRef.current.muted = !isMuted;
                  videoRef.current.volume = isMuted ? 1 : 0;
                  setVolume(isMuted ? 1 : 0);
                  setIsMuted(prev => !prev);
                }}
              >
                {!isMuted && volume > 0 ? <VolumeUp /> : <VolumeOff />}
              </IconButton>
              <input type='range' id='volume-seek' value={volume} min={0} max={1} step={0.05} onChange={handleVolume} />
            </VolumeControlBar>
            <PlaybackRate speed={speed} handleSpeed={handleSpeed} />
            <IconButton onClick={onToggleFullscreen}>
              <Fullscreen />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
