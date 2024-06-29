import Head from 'next/head';
import React from 'react';
import { metaI18n } from '../../i18n';

const Meta: React.FunctionComponent = () => {
  return (
    <Head>
      <title>{metaI18n.title}</title>
      <meta name="description" content={metaI18n.description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
Meta.whyDidYouRender = true;
export default Meta;
