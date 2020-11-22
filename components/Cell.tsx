import React from 'react';
import styled from 'styled-components';
import { CellPosition } from 'types/Types';
import { Decorator, DecoratorType } from './Decorator';

const CellWrapper = styled.div`
  border: 1px solid black;
  position: relative;
`;

interface InputProps {
  readonly isActive: boolean;
  readonly isInline: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2em;
  text-transform: uppercase;
  border: 0;
  background-color: ${({ isActive, isInline }) =>
    isActive ? '#D0D0FF' : isInline ? '#EFEFFF' : 'white'};

  :focus {
    outline: 0;
  }

  @media (min-width: 720px) {
    font-size: 3em;
  }
`;

const Legend = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.3rem;
  font-weight: bold;

  @media (min-width: 414px) {
    padding: 0.5rem;
  }
`;

interface Props {
  value: string;
  legend?: string;
  decorator?: DecoratorType;
  position: CellPosition;
  isActive: boolean;
  isInLine: boolean;
  onFocus: (position: CellPosition) => void;
  onClick: (position: CellPosition) => void;
  onChange: (position: CellPosition, value: string) => void;
}

export const Cell: React.FC<Props> = function Cell({
  value,
  legend,
  decorator,
  position,
  isActive,
  isInLine,
  onFocus,
  onClick,
  onChange
}) {
  return (
    <CellWrapper
      /* onFocus={() => onFocus(position)} */
      onClick={() => onClick(position)}
    >
      {legend && <Legend>{legend}</Legend>}
      {decorator && <Decorator decorator={decorator} />}
      <Input
        value={value}
        isActive={isActive}
        isInline={isInLine}
        type="text"
        maxLength={1}
        onChange={(event) => onChange(position, event.target.value)}
      />
    </CellWrapper>
  );
};
