import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Cell } from 'components/Cell';

import { CellType, plan } from 'data/plan';
import { CellPosition, Direction } from 'types/Types';
import { cellPositionEqual } from 'utils/cellPositionEqual';

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

const size = {
  columns: plan[0].length,
  rows: plan.length
};

const Home: NextPage<{}> = () => {
  const [values, setValues] = useState<string[][]>(
    Array(size.rows).fill(Array(size.columns).fill(''))
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
      currentPosition.x + 1 !== size.columns &&
      plan[currentPosition.y][currentPosition.x + 1].type === CellType.cell
    ) {
      inputRefs.current[
        `x${currentPosition.x + 1}y${currentPosition.y}`
      ].focus?.();
    } else if (
      activeDirection === Direction.vertical &&
      currentPosition.y + 1 !== size.rows &&
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
                    (activeDirection === Direction.vertical &&
                      activeCell?.x === x) ||
                    (activeDirection === Direction.horizontal &&
                      activeCell?.y === y)
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
