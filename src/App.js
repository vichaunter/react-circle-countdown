import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Circle = styled.div`
  width: ${({ fullSize }) => fullSize}px;
  height: ${({ fullSize }) => fullSize}px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  .half {
    position: absolute;
    width: ${({ halfSize }) => halfSize}px;
    height: ${({ fullSize }) => fullSize}px;
    overflow: hidden;
    transition: transform ${({ countdown }) => countdown / 2}s linear;
    transform-style: preserve-3D;

    &::before {
      width: ${({ size }) => size}px;
      height: ${({ size }) => size}px;
      content: "";
      border-radius: 50%;
      border: ${({ border }) => border}px solid
        ${({ borderColor }) => borderColor};
      position: absolute;
    }
  }

  .right {
    position: absolute;
    width: ${({ halfSize }) => halfSize}px;
    height: ${({ fullSize }) => fullSize}px;
    left: ${({ halfSize }) => halfSize}px;
    overflow: hidden;
    .half {
      left: -${({ halfSize }) => halfSize}px;
      transform: rotate(180deg);
      transform-origin: center right;
    }
  }

  .left {
    position: absolute;
    width: ${({ halfSize }) => halfSize}px;
    height: ${({ fullSize }) => fullSize}px;
    left: 0px;
    overflow: hidden;

    .init {
      transform: rotate(0deg);
    }

    .half {
      left: ${({ halfSize }) => halfSize}px;
      transform: rotate(180deg);
      transform-origin: center left;
      &::before {
        left: ${({ halfSize }) => halfSize}px;
        transform: rotate(180deg);
        transform-origin: center left;
      }
    }
  }

  .number {
    font-size: 3rem;
    font-weight: bold;
    color: ${({ color }) => color};
    font-family: sans-serif;
    z-index: 10;
  }
`;

const App = ({
  countdown = 5,
  size = 100,
  border = 10,
  borderColor = "#000",
  color = "#000",
  onFinish
}) => {
  const [timeleft, setTimeleft] = useState(countdown);
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);

  const handleOnFinish = () => {
    console.log("finished");
    onFinish && onFinish();
  };

  const handleStart = () => {
    setRight(true);
    setTimeout(() => {
      setLeft(true);
    }, (countdown / 2) * 1000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextTimeleft = timeleft - 1;
      nextTimeleft === 0 && handleOnFinish();
      if (nextTimeleft < 0) {
        clearInterval(intervalId);
        return;
      }
      setTimeleft(nextTimeleft);
    }, 1000);
    handleStart();

    return () => clearInterval(intervalId);
  }, [timeleft]);

  const fullSize = size + border * 2;
  const halfSize = fullSize / 2;

  return (
    <>
      <Circle
        countdown={countdown}
        size={size}
        border={border}
        color={color}
        borderColor={borderColor}
        fullSize={fullSize}
        halfSize={halfSize}
      >
        <div className="number">{timeleft}</div>
        <div className="right">
          <div className={`${right ? "half" : ""}`} />
        </div>
        <div className="left">
          <div className={`init ${left ? "half" : ""}`} />
        </div>
      </Circle>
    </>
  );
};

export default App;
