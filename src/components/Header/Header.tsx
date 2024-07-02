import React from 'react';
import DarkMode from '../DarkMode/DarkMode';
import Link from 'next/link';

const Header: React.FunctionComponent = () => (
  <header className="rr-column justify-center flex-none h-14 rr-border border-b-2">
    <div className="flex justify-between items-center w-full lg:w-9/12">
      <DarkMode />

      <Link href="/api/auth/logout">
        <button className="btn btn-small">Logout</button>
      </Link>
    </div>
  </header>
);
Header.whyDidYouRender = false;
export default Header;
