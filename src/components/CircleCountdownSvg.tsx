import React, { FC, ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import useCountdown from "../hooks/useCountdown";

const getSvg = ({
  diameter,
  unit,
  fill = "#000000",
  strokeWidth = 4,
}: {
  diameter: number;
  unit: "px" | "rem" | "em";
  fill?: string;
  strokeWidth?: number;
}) => {
  const svg = `<svg id="right_arrow" class="direction__right direction__item" version="1.1"
   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px" y="0px" width="${diameter + strokeWidth}${unit}" height="${
    diameter + strokeWidth
  }${unit}"
     viewBox="0 0 ${diameter + strokeWidth} ${
    diameter + strokeWidth
  }" xml:space="preserve">
  
  <circle class="circle" cx="${diameter / 2 + strokeWidth / 2}" cy="${
    diameter / 2
  }" r="${
    diameter / 2 - strokeWidth / 2
  }" fill="transparent" stroke="${fill}" stroke-width="${strokeWidth}" />
</svg>`;
  const parser = new DOMParser();
  return parser.parseFromString(svg, "image/svg+xml")?.childNodes[0];
};

type StyleProps = {
  dashArray: number;
};
const StyledCircleCountdownSvg = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  
  svg {
    position: absolute;
    stroke-dasharray: ${({ dashArray }) => dashArray};
    stroke-dashoffset: ${({ dashArray }) => dashArray};
    stroke-linecap: round;
    animation: dash ${({ seconds }) => seconds}s linear forwards;
    transform: rotate(-90deg);
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const Counter = ({
  seconds,
  onFinish,
  visible,
}: {
  seconds: number
  onFinish?: (n: number) => void
  visible?: boolean
}) => {
  const { countLeft } = useCountdown({ seconds, onFinish })

  return visible ? <span className="counter">{countLeft}</span> : null
}

type Props = {
  seconds?: number;
  diameter?: number;
  strokeWidth?: number;
  onFinish?: (n: number) => void;
  counter?: boolean;
  children?: ReactNode;
};

const CircleCountdownSvg: FC<Props> = ({
  seconds = 5,
  diameter = 200,
  strokeWidth = 8,
  onFinish,
  counter,
  children,
}) => {
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const svg = getSvg({ diameter, unit: "px", strokeWidth });
  const circumference = 2 * Math.PI * (diameter / 2);

  useEffect(() => {
    if (!svgWrapperRef?.current) return;
    svgWrapperRef.current.appendChild(svg);
  }, [svg, svgWrapperRef]);

  if (!svgWrapperRef) return null;

  return (
    <StyledCircleCountdownSvg
      className="countdown-svg"
      dashArray={circumference - strokeWidth * 3}
      seconds={seconds}
      ref={svgWrapperRef}
    >
      <Counter seconds={seconds} onFinish={onFinish} visible={counter} />
      {children}
    </StyledCircleCountdownSvg>
  );
};

export default CircleCountdownSvg;
