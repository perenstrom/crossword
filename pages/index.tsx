import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { NextPage } from 'next';

interface Props {
}

const Home: NextPage<Props> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
