import React from 'react';
import styled from 'styled-components';
import { Decorator, DecoratorType } from './Decorator';

const CellWrapper = styled.div`
  border: 1px solid black;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2em;
  text-transform: uppercase;

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
  legend?: string;
  decorator?: DecoratorType;
}

export const Cell: React.FC<Props> = function Cell({ legend, decorator }) {
  return (
    <CellWrapper>
      {legend && <Legend>{legend}</Legend>}
      {decorator && <Decorator decorator={decorator} />}
      <Input type="text" maxLength={1} />
    </CellWrapper>
  );
};
