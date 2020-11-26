import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { Cell } from 'components/Cell';

import { Plan, plan as rawPlan } from 'data/plan';
import { CellPosition, Direction, Size } from 'types/Types';
import { cellPositionEqual } from 'utils/cellPositionEqual';
import { calculateLines } from 'utils/calculateLines';
import { Wrapper } from 'components/Wrapper';
import { CrosswordGridWrapper } from 'components/CrosswordGridWrapper';
import { CrosswordGrid } from 'components/CrosswordGrid';
import { Blank } from 'components/Blank';
import { positionShorthandToLong } from 'utils/positionShorthandToLong';

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
    localStorage.setItem('values', JSON.stringify(newValues));
  };
  useEffect(() => {
    const storedValues = localStorage.getItem('values');
    const values = storedValues && JSON.parse(storedValues);
    if (values) {
      setValues(values);
    }
  }, []);

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
    const line =
      plan[currentPosition.y][currentPosition.x].line[activeDirection];

    const currentCellInLineIndex = line.indexOf(
      `x${currentPosition.x}y${currentPosition.y}`
    );
    const nextCellPositionShort =
      currentCellInLineIndex === line.length - 1
        ? null
        : line[currentCellInLineIndex + 1];

    if (nextCellPositionShort) {
      const nextCellPosition = positionShorthandToLong(nextCellPositionShort);

      const nextCellDecorator =
        plan[nextCellPosition.y][nextCellPosition.x].decorator;
      if (nextCellDecorator) {
        toggleActiveDirection();
      }
      setActiveCell(nextCellPosition);
      inputRefs.current[nextCellPositionShort].focus?.();
      inputRefs.current[nextCellPositionShort].select?.();
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
