import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import { Fullscreen, PlayCircleOutline, PauseCircleOutline, PlayArrow, Pause } from '@mui/icons-material';

import { CustomSlider } from './VideoStyles';

const VideoPlayer = ({ id, src, type, option }) => {
  const playerRef = useRef();
  const videoRef = useRef();
  const handleButtonRef = useRef();
  const playerElem = document.getElementById('kap-player');
  const statusButtonElem = document.getElementsByClassName('kap-status-handle-button')[0];
  const tooltipRef = useRef();
  const seekRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentStr = useMemo(() => {
    if (current) {
      const result = new Date(current * 1000).toISOString().substr(11, 8);
      return `${result.substr(3, 2)}:${result.substr(6, 2)}`;
    } else {
      return '00:00';
    }
  }, [current]);
  const durationStr = useMemo(() => {
    if (!!duration) {
      const result = new Date(duration * 1000).toISOString().substr(11, 8);
      return `${result.substr(3, 2)}:${result.substr(6, 2)}`;
    } else {
      return '00:00';
    }
  }, [duration]);

  useEffect(() => {
    console.log(current);
  }, [current]);

  useLayoutEffect(() => {
    if (!!videoRef.current.canPlayType) {
      init();
      document.addEventListener('keyup', keyboardShortcuts);
      videoRef.current.addEventListener('timeupdate', e => {
        setCurrent(Math.round(videoRef.current.currentTime));
      });
      seekRef.current.addEventListener('mousemove', handleSeek);
      seekRef.current.addEventListener('input', handleSkip);
      videoRef.current.addEventListener('click', () => {
        handleButtonRef.animate(
          [
            {
              opacity: 1,
              transform: 'scale(1)',
            },
            {
              opacity: 0,
              transform: 'scale(1.3)',
            },
          ],
          {
            duration: 500,
          },
        );
      });
    }
    return () => {
      videoRef.current.pause();
      document.removeEventListener('keyup', keyboardShortcuts);
      videoRef.current.removeEventListener('timeupdate', e => {
        setCurrent(Math.round(videoRef.current.currentTime));
      });
      seekRef.current.removeEventListener('mousemove', handleSeek);
      seekRef.current.removeEventListener('input', handleSkip);
      videoRef.current.removeEventListener('click', () => {
        handleButtonRef.animate(
          [
            {
              opacity: 1,
              transform: 'scale(1)',
            },
            {
              opacity: 0,
              transform: 'scale(1.3)',
            },
          ],
          {
            duration: 500,
          },
        );
      });
    };
  }, [videoRef.current]);

  const init = () => {
    const videoDuration = Math.round(videoRef.current.duration);
    setDuration(videoDuration);
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

  const handleSeek = e => {
    const skipTo = Math.round(parseInt(e.target.value, 10));
    setCurrent(skipTo);
    const rect = videoRef.current.getBoundingClientRect();
    tooltipRef.current.style.left = `${e.pageX - rect.left}px`;
  };

  const handleSkip = e => {
    const skipTo = Math.round(parseInt(e.target.value, 10));
    videoRef.current.currentTime = skipTo;
    setCurrent(skipTo);
  };

  const keyboardShortcuts = event => {
    const { keyCode } = event;
    if (keyCode === 32) handlePlay();
  };

  const onToggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      // Need this to support Safari
      document.webkitExitFullscreen();
    } else if (playerRef.current.webkitRequestFullscreen) {
      // Need this to support Safari
      playerRef.current.webkitRequestFullscreen();
    } else {
      playerRef.current.requestFullscreen();
    }
  };

  const formatTime = (timeInSeconds = 0) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  };

  return (
    <div id={'player'} ref={playerRef}>
      <div id={'kap-player'} className={'kap-player'} onClick={handlePlay}>
        <video
          ref={videoRef}
          id={id}
          controls={false}
          tabIndex={-1}
          src={src}
          {...option}
          onMouseEnter={e => {
            statusButtonElem.style.display = 'block';
          }}
          onMouseLeave={e => {
            statusButtonElem.style.display = 'none';
          }}
        />
        <div className={'kap-status-handle-button'}>
          <IconButton ref={handleButtonRef}>
            {isPlaying ? (
              <PauseCircleOutline style={{ color: '#fff', fontSize: '80px' }} />
            ) : (
              <PlayCircleOutline style={{ color: '#fff', fontSize: '80px' }} />
            )}
          </IconButton>
        </div>
      </div>
      <div className={'kap-controls-container'}>
        <div className={'kap-progress-bar'}>
          <input
            className='kap-progress-seek'
            id='progress-seek'
            value={current.toString()}
            min={'0'}
            max={duration.toString()}
            onChange={e => setCurrent(e.target.value)}
            type='range'
            step='1'
            ref={seekRef}
          />
          <div className='kap-seek-tooltip' id='seek-tooltip' ref={tooltipRef}>
            <p>{currentStr}</p>
          </div>
          {/* <div className={'kap-progress-seek-tooltip'}>{current}</div>
          <CustomSlider value={current} min={0} max={duration} step={1} onChange={(_, value) => setCurrent(value)} /> */}
        </div>
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
