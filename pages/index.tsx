import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const CrosswordGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  border: 1px solid red;
`;

const Cell = styled.div`
  border: 1px solid red;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
`;

const Legend = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  font-weight: bold;
`;

interface Props {}

const Home: NextPage<Props> = () => {
  return (
    <Wrapper>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CrosswordGrid>
        <Cell></Cell>
        <Cell>
          <Legend>1.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Legend>2.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Legend>3.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Legend>4.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Legend>5.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>

        <Cell></Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>

        <Cell>
          <Legend>6.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell>
          <Legend>7.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Legend>8.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Legend>9.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>

        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell>
          <Legend>10.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>

        <Cell>
          <Legend>11.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>

        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell>
          <Legend>12.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>

        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Legend>13.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>

        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Legend>14.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>

        <Cell>
          <Legend>15.</Legend>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
        <Cell></Cell>
        <Cell>
          <Input type="text" maxLength={1} />
        </Cell>
      </CrosswordGrid>
    </Wrapper>
  );
};

export default Home;
