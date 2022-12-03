import { FooterProps } from './Footer.types';
import Image from 'next/image';
import React from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';

const Footer: React.FunctionComponent<FooterProps> = ({ i18n }) => {
  const { dark } = useThemeContext();

  if (!i18n || !i18n.powered) {
    return null;
  }

  return (
    <footer className={`flex items-center justify-center basis-16 border-t-2 rr-border`}>
      <a
        className="flex items-center rr-text"
        href="https://github.com/jaivalis/release-raccoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        {i18n.powered}
        <div className="mx-2">
          <Image
            src={dark ? '/GitHub-Mark-Light-32px.png' : '/GitHub-Mark-32px.png'}
            alt="Github Logo"
            width={32}
            height={32}
          />
        </div>
      </a>
    </footer>
  );
};

export default Footer;
