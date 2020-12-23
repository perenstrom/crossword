import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { CellPosition, DecoratorType } from 'types/Types';
import { Decorator } from './Decorator';

const CellWrapper = styled.div`
  border: 1px solid black;
  position: relative;
`;

interface InputProps {
  readonly isActive: boolean;
  readonly isInline: boolean;
  readonly size: number;
}

const Input = styled.input<InputProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: ${({ size }) => `${size * 0.5}px`};
  text-transform: uppercase;
  border: 0;
  background-color: ${({ isActive, isInline }) =>
    isActive ? '#95aef9' : isInline ? '#CCDCFB' : 'white'};

  :focus {
    outline: 0;
  }
`;

interface LegendProps {
  readonly size: number;
}

const Legend = styled.div<LegendProps>`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.2em 0.3em;
  font-weight: bold;
  font-size: ${({ size }) => `${size * 0.25}px`};
`;

interface Props {
  value: string;
  legend?: number;
  decorator?: DecoratorType;
  position: CellPosition;
  size: number;
  readonly?: boolean;
  isActive?: boolean;
  isInLine?: boolean;
  onClick?: (position: CellPosition) => void;
  onChange?: (position: CellPosition, value: string) => void;
}

export const Cell = forwardRef<HTMLInputElement, Props>(function Cell(
  {
    value,
    legend,
    decorator,
    position,
    size = 0,
    readonly = false,
    isActive = false,
    isInLine = false,
    onClick = () => null,
    onChange = () => null
  },
  ref
) {
  return (
    <CellWrapper onClick={() => onClick(position)}>
      {(!!legend || legend === 0) && <Legend size={size}>{legend}.</Legend>}
      {decorator && <Decorator decorator={decorator} />}
      <Input
        name={Math.random().toString()}
        autoComplete={Math.random().toString()}
        ref={ref}
        value={value}
        readOnly={readonly}
        isActive={isActive}
        isInline={isInLine}
        type="text"
        maxLength={1}
        size={size}
        onInput={(event) => onChange(position, event.currentTarget.value)}
      />
    </CellWrapper>
  );
});
