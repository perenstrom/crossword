import React from 'react';
import styled, { css } from 'styled-components';

export type DecoratorType = 'htv' | 'vth';

interface DecoratorWrapperProps {
  readonly decorator: DecoratorType;
}

const DecoratorWrapper = styled.div<DecoratorWrapperProps>`
  position: absolute;
  ${({ decorator }) =>
    decorator === 'htv'
      ? css`
          top: 0;
          right: 0;
          padding: 3% 4%;
        `
      : css`
          bottom: 0;
          left: 0;
          padding: 3% 3%;
        `}

  width: 30%;
  padding: 4% 3%;
  font-weight: bold;
`;

const Svg = styled.svg<DecoratorWrapperProps>`
  display: block;
  ${({ decorator }) =>
    decorator === 'htv'
      ? css`
          transform: rotate(90deg) scale(-1, 1);
        `
      : css`
          transform: rotate(180deg);
        `}
`;

interface Props {
  decorator?: DecoratorType;
}

export const Decorator: React.FC<Props> = function Cell({ decorator }) {
  return (
    <DecoratorWrapper decorator={decorator}>
      <Svg
        decorator={decorator}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 107 107"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M 0 41 l 47 42 v -30 h 32 v 50 h 24 V 29 h -56 V 0 L 0 41 z"
        />
      </Svg>
    </DecoratorWrapper>
  );
};
