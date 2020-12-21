import React from 'react';
import styled from 'styled-components';
import { EditMode, Size } from 'types/Types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const FlexRow = styled.div`
  display: flex;
  padding: 1rem;
`;

interface Props {
  size: Size;
  onSizeChange: (dimension: 'x' | 'y', type: 'increase' | 'decrease') => void;
  setEditMode: (editMode: EditMode) => void;
}

export const EditOptions = function EditOptions({
  size,
  onSizeChange,
  setEditMode
}) {
  return (
    <Wrapper>
      <FlexRow>
        <FlexRow>
          <p>Bredd:</p>
          <button onClick={(event) => onSizeChange('x', 'decrease')}>-</button>
          <p>{size.x}</p>
          <button onClick={(event) => onSizeChange('x', 'increase')}>+</button>
        </FlexRow>
        <FlexRow>
          <p>Höjd:</p>
          <button onClick={(event) => onSizeChange('y', 'decrease')}>-</button>
          <p>{size.y}</p>
          <button onClick={(event) => onSizeChange('y', 'increase')}>+</button>
        </FlexRow>
      </FlexRow>
      <FlexRow>
        <button onClick={() => setEditMode(EditMode.cell)}>Rutor</button>
        <button onClick={() => setEditMode(EditMode.wordStart)}>Siffror</button>
        <button onClick={() => setEditMode(EditMode.decorator)}>Svängar</button>
      </FlexRow>
    </Wrapper>
  );
};
