import React from 'react';
import styled from 'styled-components';
import { EditMode, Size } from 'types/Types';

const Wrapper = styled.div`
  color: white;
`;

interface Props {
  size: Size;
  onSizeChange: (dimension: 'x' | 'y', value: number) => void;
  setEditMode: (editMode: EditMode) => void;
}

export const EditOptions = function EditOptions({
  size,
  onSizeChange,
  setEditMode
}) {
  return (
    <Wrapper>
      <label htmlFor="width">Bredd</label>
      <input
        id="width"
        type="number"
        value={size.x}
        onChange={(event) =>
          onSizeChange('x', parseInt(event.target.value, 10))
        }
      />
      <br />
      <label htmlFor="height">Höjd</label>
      <input
        id="height"
        type="number"
        value={size.y}
        onChange={(event) =>
          onSizeChange('y', parseInt(event.target.value, 10))
        }
      />
      <br />
      <button onClick={() => setEditMode(EditMode.cell)}>Rutor</button>
      <button onClick={() => setEditMode(EditMode.wordStart)}>Siffror</button>
      <button onClick={() => setEditMode(EditMode.decorator)}>Svängar</button>
    </Wrapper>
  );
};
