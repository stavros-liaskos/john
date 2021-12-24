import Head from 'next/head';
import React from 'react';

const Meta: React.FunctionComponent = () => {
  return (
    <Head>
      <title>Release Racoon</title>
      <meta name="description" content="A music release newsletter" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
