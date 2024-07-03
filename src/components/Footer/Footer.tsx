import { FooterProps } from './Footer.types';
import React from 'react';
import Github from '../Icons/github';

const Footer: React.FunctionComponent<FooterProps> = ({ i18n }) => {
  if (!i18n || !i18n.powered) {
    return null;
  }

  return (
    <footer className="rr-column flex-none h-16 border-t-2 rr-border justify-center">
      <a
        className="flex items-center rr-text"
        href="https://github.com/jaivalis/release-raccoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        {i18n.powered}
        <div className="mx-2">
          <Github />
        </div>
      </a>
    </footer>
  );
};
Footer.whyDidYouRender = true;
export default Footer;
