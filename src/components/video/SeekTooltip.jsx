import React from 'react';
import styled, { css } from 'styled-components';

const SeekTooltip = ({ current, preview }) => {
  return (
    <Container id='seek-tooltip'>
      <Tooltip current={current} preview={preview}>
        <span>{current}</span>
      </Tooltip>
    </Container>
  );
};

export default SeekTooltip;

const Tooltip = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${props =>
    props.preview &&
    css`
      background-image: url(${props => props.preview});
      backg;
    `}
  & > span {
    position: absolute;
    font-size: 11px;
    bottom: 0;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 160px;
  height: 90px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 8888;
`;
