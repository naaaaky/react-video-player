import React from 'react';

import { ProgressContainer, VideoProgress } from './VideoStyles';
import SeekTooltip from './SeekTooltip';

const ProgressBar = ({ current, currentText, duration, handleSeek, preview }) => {
  return (
    <ProgressContainer className='kap-progress-bar'>
      <VideoProgress id='progress-seek' value={current} min={0} max={duration} type='range' step={1} onChange={handleSeek} />
      <SeekTooltip current={currentText} preview={preview} />
    </ProgressContainer>
  );
};

export default ProgressBar;
