import { FooterProps } from './Footer.types';
import Image from 'next/image';
import React from 'react';
import useDarkMode from '../../hooks/useDarkMode';

const Footer: React.FunctionComponent<FooterProps> = ({ i18n, className }) => {
  const { dark, loaded } = useDarkMode();

  if (!i18n || !i18n.powered) {
    return null;
  }

  console.warn(dark)
  console.log(loaded)
  return (
    <footer
      className={`flex items-center justify-center border-2 border-b-0  dark:border-slate-800 border-black p-10 ${className}`}
    >
      <a
        className='flex items-center dark:text-slate-400'
        href='https://github.com/jaivalis/release-raccoon'
        target='_blank'
        rel='noopener noreferrer'
      >
        {i18n.powered}
        <div className='mx-2'
        >
          <Image
            src={dark ? '/GitHub-Mark-Light-32px.png' : '/GitHub-Mark-32px.png'}
            alt='Github Logo'
            width={32}
            height={32}
          />
        </div>
      </a>
    </footer>
  );
};

export default Footer;
