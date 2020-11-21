import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Cell } from 'components/Cell';

interface PlanCell {
  type: 'blank' | 'cell';
  legend?: string;
}

const plan: PlanCell[][] = [
  [
    { type: 'blank' },
    { type: 'cell', legend: '1.' },
    { type: 'cell', legend: '2.' },
    { type: 'cell', legend: '3.' },
    { type: 'cell', legend: '4.' },
    { type: 'cell', legend: '5.' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'blank' }
  ],
  [
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell', legend: '10.' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'cell', legend: '11.' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell', legend: '12.' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'cell' },
    { type: 'cell', legend: '13.' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' }
  ],
  [
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell', legend: '14.' },
    { type: 'cell' }
  ],
  [
    { type: 'cell', legend: '15.' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' },
    { type: 'cell' },
    { type: 'blank' },
    { type: 'cell' }
  ]
];

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2rem;
`;

const CrosswordGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
`;

const Blank = styled.div``;

const Home: NextPage<{}> = () => {
  return (
    <Wrapper>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CrosswordGrid>
        {plan.map((row) =>
          row.map((cell) =>
            cell.type === 'blank' ? <Blank /> : <Cell legend={cell.legend} />
          )
        )}
      </CrosswordGrid>
    </Wrapper>
  );
};

export default Home;
