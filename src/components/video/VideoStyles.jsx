import styled, { css } from 'styled-components';

export const ProgressContainer = styled.div`
  position: relative;
`;

export const VideoProgress = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  background: transparent;
  &:focus {
    outline: none;
  }
  /* Chrome, Safari */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: var(--thumb-height);
    height: var(--thumb-width);
    border-radius: var(--thumb-radius);
    background: var(--color-primary-blue);
    cursor: pointer;
    margin-top: calc((var(--track-height) / 2) - (var(--thumb-height) / 2));
  }
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: var(--track-height);
    border-radius: var(--track-radius);
    background: ${props =>
      props.max && props.value > 0
        ? `linear-gradient(to right, #1e7dff 0%, #1e7dff ${(props.value / props.max) * 100}%, #dadada ${
            (props.value / props.max) * 100
          }%, #dadada 100%)`
        : '#dadada'};
    opacity: 1;
    transition: all 0.5s;
    cursor: pointer;
  }
  /* Firefox */
  &::-moz-focus-outer {
    border: 0;
  }
  &&::-moz-range-progress {
    background-color: var(--color-primary-blue);
  }
  &&::-moz-range-track {
    background-color: var(--color-lightgray);
  }
  &::-moz-range-thumb {
    width: var(--thumb-height);
    height: var(--thumb-width);
    border: none;
    border-radius: var(--thumb-radius);
    background: var(--color-primary-blue);
    cursor: pointer;
  }
  /* IE */
  &::-ms-track {
    cursor: pointer;
    width: var(--track-width);
    height: var(--track-height);
    background: transparent;
    border-color: transparent;
    border-width: var(--track-radius);
    color: transparent;
  }
  &&::-ms-fill-lower {
    background-color: var(--color-primary-blue);
  }
  &&::-ms-fill-upper {
    background-color: var(--color-lightgray);
  }
  &::-ms-thumb {
    width: var(--thumb-height);
    height: var(--thumb-width);
    border: none;
    border-radius: var(--thumb-radius);
    background: var(--color-primary-blue);
    cursor: pointer;
    margin-top: calc((var(--track-height) / 2) - (var(--thumb-height) / 2));
  }
  &:disabled {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb,
    &::-ms-thumb,
    &::-webkit-slider-runnable-track,
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      cursor: not-allowed;
    }
  }
`;

export const VolumeControlBar = styled.div`
  display: flex;
  align-items: center;

  input[type='range'] {
    -webkit-appearance: none;
    width: 100px;
    height: 100%;
    background: transparent;
    &:focus {
      outline: none;
    }

    /* Chrome, Safari */
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: var(--thumb-height);
      height: var(--thumb-width);
      border-radius: var(--thumb-radius);
      background: var(--color-primary-blue);
      cursor: pointer;
      margin-top: calc((var(--track-height) / 2) - (var(--thumb-height) / 2));
    }
    &::-webkit-slider-runnable-track {
      -webkit-appearance: none;
      height: var(--track-height);
      border-radius: var(--track-radius);
      background: ${props =>
        props.volume > 0
          ? `linear-gradient(to right, #1e7dff 0%, #1e7dff ${props.volume * 100}%, #dadada ${props.volume * 100}%, #dadada 100%)`
          : '#dadada'};
      opacity: 1;
      transition: all 0.5s;
      cursor: pointer;
    }
    /* Firefox */
    &::-moz-focus-outer {
      border: 0;
    }
    &&::-moz-range-progress {
      background-color: var(--color-primary-blue);
    }
    &&::-moz-range-track {
      background-color: var(--color-lightgray);
    }
    &::-moz-range-thumb {
      width: var(--thumb-height);
      height: var(--thumb-width);
      border: none;
      border-radius: var(--thumb-radius);
      background: var(--color-primary-blue);
      cursor: pointer;
    }
    /* IE */
    &::-ms-track {
      cursor: pointer;
      width: var(--track-width);
      height: var(--track-height);
      background: transparent;
      border-color: transparent;
      border-width: var(--track-radius);
      color: transparent;
    }
    &&::-ms-fill-lower {
      background-color: var(--color-primary-blue);
    }
    &&::-ms-fill-upper {
      background-color: var(--color-lightgray);
    }
    &::-ms-thumb {
      width: var(--thumb-height);
      height: var(--thumb-width);
      border: none;
      border-radius: var(--thumb-radius);
      background: var(--color-primary-blue);
      cursor: pointer;
      margin-top: calc((var(--track-height) / 2) - (var(--thumb-height) / 2));
    }
    &:disabled {
      &::-webkit-slider-thumb,
      &::-moz-range-thumb,
      &::-ms-thumb,
      &::-webkit-slider-runnable-track,
      &::-ms-fill-lower,
      &::-ms-fill-upper {
        cursor: not-allowed;
      }
    }
  }

  ${props =>
    !props.isMuted &&
    props.volume > 0 &&
    css`
      & svg {
        fill: #fff;
      }
    `}
`;
