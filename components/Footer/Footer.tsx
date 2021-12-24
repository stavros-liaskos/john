import { FooterProps } from './Footer.types';
import Image from 'next/image';
import React from 'react';

const Footer: React.FunctionComponent<FooterProps> = ({ i18n, className }) => {
  if (!i18n || !i18n.powered) {
    return null;
  }

  return (
    <footer className={`border border-indigo-600 ${className}`}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        {i18n.powered}
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </a>
    </footer>
  );
};

export default Footer;
