import styled from 'styled-components';

export const CrosswordGridWrapper = styled.div`
  position: relative;
  width: 100%;
  ::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
