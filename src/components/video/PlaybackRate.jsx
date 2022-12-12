import React, { useState } from 'react';
import styled from 'styled-components';

const SPEED_RATES = [0.5, 1.0, 1.25, 1.5, 2.0];

const PlaybackRate = ({ speed, handleSpeed }) => {
  const [isClicked, setIsClicked] = useState(false);

  const onSelect = value => {
    handleSpeed(value);
    setIsClicked(false);
  };

  return (
    <Container onMouseOver={e => setIsClicked(true)} onMouseOut={e => setIsClicked(false)}>
      <Dropdown visible={isClicked}>
        {SPEED_RATES.map(x => (
          <p selected={x === speed} onClick={() => onSelect(x)} key={x}>
            {parseFloat(x)}x
          </p>
        ))}
      </Dropdown>
      <ValueText>{parseFloat(speed)}x</ValueText>
    </Container>
  );
};

export default PlaybackRate;

const Container = styled.div`
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0;
  /* overflow: hidden; */
  display: inline-block;
  cursor: pointer;
`;

const ValueText = styled.p``;

const Dropdown = styled.div`
  transition: 0.3s ease-in;
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  bottom: 85%;
  right: 50%;
  transform: translateX(50%);
  background-color: #292929;
  z-index: 9999;
  & > p {
    color: #fff;
    padding: 4px 8px;
    margin: 0;
    text-decoration: none;
    display: block;
    text-align: center;
    ${props => (props.selected ? '#1e7dff' : '#fff')};
  }
`;
