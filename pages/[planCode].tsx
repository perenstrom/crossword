import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { CellPosition, Direction, Plan, Size } from 'types/Types';

import { cellPositionEqual } from 'utils/cellPositionEqual';
import { positionShorthandToLong } from 'utils/positionShorthandToLong';
import { parsePlanCode } from 'utils/parsePlanCode';

import { useCrosswordSize } from 'hooks/useCrosswordSize';
import { useValuesStorage } from 'hooks/useValuesStorage';

import { Cell } from 'components/Cell';
import { Wrapper } from 'components/Wrapper';
import { CrosswordGridWrapper } from 'components/CrosswordGridWrapper';
import { CrosswordGrid } from 'components/CrosswordGrid';
import { Blank } from 'components/Blank';

interface Props {
  plan: Plan;
  size: Size;
  planCode: string;
}

const Home: NextPage<Props> = ({ plan, size, planCode }) => {
  const [values, setValues] = useState<string[][]>(
    Array(size.y).fill(Array(size.x).fill(''))
  );
  const [storedValues, storeValues] = useValuesStorage(planCode, size);
  useEffect(() => {
    if (storedValues) {
      setValues(storedValues);
    }
  }, [storedValues]);

  const setValue = (position: CellPosition, value) => {
    const newValues = values.map((row) => [...row]);
    newValues[position.y][position.x] = value;
    setValues(newValues);
    storeValues(newValues);
  };

  const crosswordWrapperElement = useRef<HTMLDivElement>(null);
  const [crosswordSize, loaded] = useCrosswordSize(
    crosswordWrapperElement,
    size
  );

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

  const handleCellChange = (position: CellPosition, value: string) => {
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
      <CrosswordGridWrapper ref={crosswordWrapperElement}>
        {loaded && (
          <CrosswordGrid rows={size.y} columns={size.x} size={crosswordSize}>
            {plan.map((row, y) =>
              row.map((cell, x) =>
                cell.type === 'blank' ? (
                  <Blank
                    onClick={() => setActiveCell(null)}
                    key={`${x}-${y}`}
                  />
                ) : (
                  <Cell
                    key={`x${x}y${y}`}
                    ref={(element) =>
                      (inputRefs.current[`x${x}y${y}`] = element)
                    }
                    value={values[y][x]}
                    legend={cell.legend}
                    decorator={cell.decorator}
                    position={{ x, y }}
                    isActive={cellPositionEqual({ x, y }, activeCell)}
                    isInLine={
                      (activeDirection === Direction.horizontal &&
                        activeCell &&
                        plan[activeCell.y][
                          activeCell.x
                        ].line.horizontal.includes(`x${x}y${y}`)) ||
                      (activeDirection === Direction.vertical &&
                        activeCell &&
                        plan[activeCell.y][activeCell.x].line.vertical.includes(
                          `x${x}y${y}`
                        ))
                    }
                    size={crosswordSize.width / size.x}
                    onClick={handleCellClick}
                    onChange={handleCellChange}
                  />
                )
              )
            )}
          </CrosswordGrid>
        )}
      </CrosswordGridWrapper>
    </Wrapper>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const planCode = context.params.planCode as string;
  const [plan, size] = parsePlanCode(planCode);

  return {
    props: {
      planCode,
      plan,
      size
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          planCode:
            'w9h9xa5o2xnx2olo3x3nax2aoxa2onox2aoorxoxnao7xnox2axoxaonolaxoxoxoxnxox3oxaornao3xoloxo'
        }
      },
      {
        params: {
          planCode:
            'w10h10xax8naoaoxao2axnoxox2ox2oxnao6xoxnox4oxao2naoao3x2oxnoxox3axoxnx2ox2ao3ornx2a2x2ox2onao6x2o'
        }
      },
      {
        params: {
          planCode:
            'w10h10x3axao3ornax2oxox3onoxao4axonox2ox3ao2nao4x2oxonox2ox3ox2na2x3ao3anao3ax2oxonxox2ao4xnxolox4ox2'
        }
      }
    ],
    fallback: false
  };
};
