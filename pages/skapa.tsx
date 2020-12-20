import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import debounce from 'lodash.debounce';

import { Cell } from 'components/Cell';
import {
  CellPosition,
  CellType,
  DecoratorType,
  EditMode,
  PixelSize,
  Plan,
  PlanCell,
  Size
} from 'types/Types';
import { Wrapper } from 'components/Wrapper';
import { CrosswordGridWrapper } from 'components/CrosswordGridWrapper';
import { CrosswordGrid } from 'components/CrosswordGrid';
import { Blank } from 'components/Blank';
import { calculateCrosswordSize } from 'utils/calculateCrosswordSize';
import styled from 'styled-components';
import { useCrosswordSize } from 'hooks/useCrosswordSize';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;
`;

interface Props {}

const Create: NextPage<Props> = () => {
  const [size, setSize] = useState<Size>({
    x: 10,
    y: 10
  });
  const defaultCell: PlanCell = {
    type: CellType.cell
  };
  const [plan, setPlan] = useState<Plan>(
    Array(size.y).fill(Array(size.x).fill({ ...defaultCell }))
  );
  const [editMode, setEditMode] = useState<EditMode>(EditMode.cell);

  const crosswordWrapperElement = useRef<HTMLDivElement>(null);
  const [crosswordSize, loaded] = useCrosswordSize(
    crosswordWrapperElement,
    size
  );

  useEffect(() => {
    const currentSize: Size = { x: plan[0].length, y: plan.length };
    if (currentSize.x !== size.x || currentSize.y !== size.y) {
      const newPlan = plan.map((row) => row.map((cell) => ({ ...cell })));

      if (size.x > currentSize.x) {
        newPlan.forEach((row) => row.push(defaultCell));
      }

      if (size.x < currentSize.x) {
        newPlan.forEach((row) => row.pop());
      }

      if (size.y > currentSize.y) {
        newPlan.push(Array(size.x).fill({ ...defaultCell }));
      }

      if (size.y < currentSize.y) {
        newPlan.pop();
      }

      setPlan(newPlan);
    }
  }, [size]);

  const changeCellType = (position: CellPosition) => {
    const newCell = { ...plan[position.y][position.x] };
    newCell.type =
      newCell.type === CellType.cell ? CellType.blank : CellType.cell;

    const newPlan = plan.map((row) => row.map((cell) => ({ ...cell })));
    newPlan[position.y][position.x] = newCell;

    setPlan(newPlan);
  };

  const changeWordStart = (position: CellPosition) => {
    const newCell = { ...plan[position.y][position.x] };
    newCell.legend = newCell?.legend || newCell.legend === 0 ? null : 0;

    const newPlan = plan.map((row) => row.map((cell) => ({ ...cell })));
    newPlan[position.y][position.x] = newCell;

    setPlan(newPlan);
  };

  const changeDecorator = (position: CellPosition) => {
    const newCell = { ...plan[position.y][position.x] };
    switch (newCell.decorator) {
      case DecoratorType.htv:
        newCell.decorator = DecoratorType.vth;
        break;
      case DecoratorType.vth:
        newCell.decorator = null;
        break;
      default:
        newCell.decorator = DecoratorType.htv;
        break;
    }

    const newPlan = plan.map((row) => row.map((cell) => ({ ...cell })));
    newPlan[position.y][position.x] = newCell;

    setPlan(newPlan);
  };

  const handleClick = (position: CellPosition) => {
    switch (editMode) {
      case EditMode.cell:
        changeCellType(position);
        break;
      case EditMode.wordStart:
        changeWordStart(position);
        break;
      case EditMode.decorator:
        changeDecorator(position);
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Kryssplanen</title>
      </Head>
      <Wrapper>
        <Flex>
          <div>
            <label htmlFor="width">Bredd</label>
            <input
              id="width"
              type="number"
              value={size.x}
              onChange={(event) =>
                setSize({ x: parseInt(event.target.value, 10), y: size.y })
              }
            />
            <br />
            <label htmlFor="height">Höjd</label>
            <input
              id="height"
              type="number"
              value={size.y}
              onChange={(event) =>
                setSize({ x: size.x, y: parseInt(event.target.value, 10) })
              }
            />
            <br />
            <button onClick={() => setEditMode(EditMode.cell)}>Rutor</button>
            <button onClick={() => setEditMode(EditMode.wordStart)}>
              Siffror
            </button>
            <button onClick={() => setEditMode(EditMode.decorator)}>
              Svängar
            </button>
          </div>
          <CrosswordGridWrapper ref={crosswordWrapperElement}>
            {loaded && (
              <CrosswordGrid
                rows={size.y}
                columns={size.x}
                size={crosswordSize}
              >
                {plan.map((row, y) =>
                  row.map((cell, x) =>
                    cell.type === 'blank' ? (
                      <Blank
                        key={`${x}-${y}`}
                        onClick={() => handleClick({ x, y })}
                      />
                    ) : (
                      <Cell
                        key={`x${x}y${y}`}
                        value=""
                        legend={cell.legend}
                        decorator={cell.decorator}
                        position={{ x, y }}
                        size={crosswordSize.width / size.x}
                        onClick={handleClick}
                      />
                    )
                  )
                )}
              </CrosswordGrid>
            )}
          </CrosswordGridWrapper>
        </Flex>
      </Wrapper>
    </>
  );
};

export default Create;
