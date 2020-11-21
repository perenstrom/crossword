import React from 'react';
import styled from 'styled-components';

const CellWrapper = styled.div`
  border: 1px solid black;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
`;

const Legend = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  font-weight: bold;
`;

interface Props {
  legend?: string;
}

export const Cell: React.FC<Props> = function Cell({ legend }) {
  return (
    <CellWrapper>
      {legend && <Legend>{legend}</Legend>}
      <Input type="text" maxLength={1} />
    </CellWrapper>
  );
};
