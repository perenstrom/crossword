import React, { useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Cell } from 'components/Cell';

import { plan } from 'data/plan';
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

const Home: NextPage<{}> = () => {
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

  const handleCellClick = (position: CellPosition): void => {
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
                <Blank />
              ) : (
                <Cell
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
                  onFocus={setActiveCell}
                  onClick={handleCellClick}
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
