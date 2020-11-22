import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';
import { Cell } from 'components/Cell';

import { CellType, Plan, plan as rawPlan } from 'data/plan';
import { CellPosition, Direction } from 'types/Types';
import { cellPositionEqual } from 'utils/cellPositionEqual';
import { positionShorthandToLong } from 'utils/positionShorthandToLong';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2rem;
`;

const CrosswordGrid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;

const CrosswordGridWrapper = styled.div`
  position: relative;
  width: 100%;
  ::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const Blank = styled.div``;

interface Size {
  x: number;
  y: number;
}

interface Props {
  plan: Plan;
  size: Size;
}

const Home: NextPage<Props> = ({ plan, size }) => {
  const [values, setValues] = useState<string[][]>(
    Array(size.y).fill(Array(size.x).fill(''))
  );
  const setValue = (position: CellPosition, value) => {
    const newValues = values.map((row) => [...row]);
    newValues[position.y][position.x] = value;
    setValues(newValues);
  };

  const inputRefs = useRef({});

  const [activeCell, setActiveCell] = useState<CellPosition>(null);
  const [activeDirection, setActiveDirection] = useState<Direction>(
    Direction.horizontal
  );
  const toggleActiveDirection = () => {
    if (activeDirection === Direction.horizontal) {
      setActiveDirection(Direction.vertical);
    } else {
      setActiveDirection(Direction.horizontal);
    }
  };

  const giveNextCellFocus = (currentPosition: CellPosition) => {
    if (
      activeDirection === Direction.horizontal &&
      currentPosition.x + 1 !== size.x &&
      plan[currentPosition.y][currentPosition.x + 1].type === CellType.cell
    ) {
      inputRefs.current[
        `x${currentPosition.x + 1}y${currentPosition.y}`
      ].focus?.();
    } else if (
      activeDirection === Direction.vertical &&
      currentPosition.y + 1 !== size.y &&
      plan[currentPosition.y + 1][currentPosition.x].type === CellType.cell
    ) {
      inputRefs.current[
        `x${currentPosition.x}y${currentPosition.y + 1}`
      ].focus?.();
    } else {
      inputRefs.current[
        `x${currentPosition.x}y${currentPosition.y}`
      ].select?.();
    }
  };

  const handleCellChange = (position: CellPosition, value) => {
    setValue(position, value);

    if (value.length === 1) {
      giveNextCellFocus(position);
    }
  };

  const handleCellClick = (position: CellPosition): void => {
    inputRefs.current[`x${position.x}y${position.y}`].select?.();
    if (cellPositionEqual(activeCell, position)) {
      toggleActiveDirection();
    }
    setActiveCell(position);
  };

  return (
    <Wrapper>
      <Head>
        <title>Kryssplanen</title>
      </Head>
      <CrosswordGridWrapper>
        <CrosswordGrid>
          {plan.map((row, y) =>
            row.map((cell, x) =>
              cell.type === 'blank' ? (
                <Blank onClick={() => setActiveCell(null)} key={`${x}-${y}`} />
              ) : (
                <Cell
                  key={`x${x}y${y}`}
                  ref={(element) => (inputRefs.current[`x${x}y${y}`] = element)}
                  value={values[y][x]}
                  legend={cell.legend}
                  decorator={cell.decorator}
                  position={{ x, y }}
                  isActive={cellPositionEqual({ x, y }, activeCell)}
                  isInLine={
                    (activeDirection === Direction.horizontal &&
                      activeCell &&
                      plan[activeCell.y][activeCell.x].line.horizontal.includes(
                        `x${x}y${y}`
                      )) ||
                    (activeDirection === Direction.vertical &&
                      activeCell &&
                      plan[activeCell.y][activeCell.x].line.vertical.includes(
                        `x${x}y${y}`
                      ))
                  }
                  onClick={handleCellClick}
                  onChange={handleCellChange}
                />
              )
            )
          )}
        </CrosswordGrid>
      </CrosswordGridWrapper>
      {<pre>{JSON.stringify(activeCell, null, 2)}</pre>}
    </Wrapper>
  );
};

export default Home;

const calculateLine = (
  plan: Plan,
  direction: Direction,
  start: CellPosition,
  size: Size
): string[] => {
  let result: string[] = [`x${start.x}y${start.y}`];

  const directionAxis = direction === Direction.horizontal ? 'x' : 'y';
  const nextCellPosition: CellPosition = {
    x: direction === Direction.horizontal ? start.x + 1 : start.x,
    y: direction === Direction.horizontal ? start.y : start.y + 1
  };

  if (
    nextCellPosition[directionAxis] < size[directionAxis] &&
    plan[nextCellPosition.y][nextCellPosition.x].type === CellType.cell
  ) {
    const innerResult = calculateLine(plan, direction, nextCellPosition, size);
    result = [...result, ...innerResult];
  }

  return result;
};

const calculateLines = (plan: Plan, size: Size): Plan => {
  plan.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell.type === CellType.cell) {
        ['horizontal', 'vertical'].forEach((direction) => {
          if (!cell.line?.[direction] || cell.line?.[direction]?.length === 0) {
            const line = calculateLine(
              plan,
              Direction[direction],
              { x, y },
              size
            );

            line.forEach((cellInLine) => {
              const fullPosition = positionShorthandToLong(cellInLine);
              if (!plan[fullPosition.y][fullPosition.x].line) {
                plan[fullPosition.y][fullPosition.x].line = {
                  [Direction.horizontal]: [],
                  [Direction.vertical]: []
                };
              }
              plan[fullPosition.y][fullPosition.x].line[direction] = line;
            });
          }
        });
      }
    });
  });

  return plan;
};

export const getStaticProps: GetStaticProps = async () => {
  const size: Size = {
    y: rawPlan.length,
    x: rawPlan[0].length
  };

  const extendedPlan = calculateLines(rawPlan, size);
  return {
    props: {
      plan: extendedPlan,
      size: size
    }
  };
};
