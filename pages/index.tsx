import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Cell } from 'components/Cell';

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

interface Props {}

const Home: NextPage<Props> = () => {
  return (
    <Wrapper>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CrosswordGrid>
        <Blank />
        <Cell legend="1." />
        <Cell legend="2." />
        <Cell legend="3." />
        <Cell legend="4." />
        <Cell legend="5." />
        <Cell />
        <Cell />
        <Blank />

        <Blank />
        <Blank />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Blank />
        <Blank />
        <Blank />

        <Cell legend="6." />
        <Blank />
        <Blank />
        <Cell legend="7." />
        <Cell />
        <Blank />
        <Cell legend="8." />
        <Cell legend="9." />
        <Cell />

        <Cell />
        <Blank />
        <Blank />
        <Cell legend="10." />
        <Cell />
        <Cell />
        <Blank />
        <Cell />
        <Blank />

        <Cell legend="11." />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Blank />

        <Cell />
        <Blank />
        <Blank />
        <Cell legend="12." />
        <Blank />
        <Cell />
        <Blank />
        <Cell />
        <Blank />

        <Cell />
        <Cell legend="13." />
        <Blank />
        <Cell />
        <Blank />
        <Cell />
        <Blank />
        <Cell />
        <Blank />

        <Blank />
        <Cell />
        <Blank />
        <Blank />
        <Blank />
        <Cell />
        <Blank />
        <Cell legend="14." />
        <Cell />

        <Cell legend="15." />
        <Cell />
        <Cell />
        <Cell />
        <Blank />
        <Cell />
        <Cell />
        <Blank />
        <Cell />
      </CrosswordGrid>
    </Wrapper>
  );
};

export default Home;
