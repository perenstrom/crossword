import styled from 'styled-components';
import { PixelSize } from 'types/Types';

interface InputProps {
  readonly columns: number;
  readonly rows: number;
  readonly size: PixelSize;
}

export const CrosswordGrid = styled.div<InputProps>`
  width: ${({ size }) => `${size.width}px`};
  height: ${({ size }) => `${size.height}px`};
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
`;
