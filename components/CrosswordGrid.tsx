import styled from 'styled-components';

interface InputProps {
  readonly columns: number;
  readonly rows: number;
  readonly width: number;
}

export const CrosswordGrid = styled.div<InputProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ width }) => `${width}px`};
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
`;
