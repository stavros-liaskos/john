import React from 'react';
import DarkMode from '../DarkMode/DarkMode';
import { useUser } from '@auth0/nextjs-auth0';

const Header: React.FunctionComponent = () => {
  const { user } = useUser();

  return (
    <header className="flex justify-between basis-14 rr-border border-b-2">
      <DarkMode />

      {user && (
        <button className="btn btn-small lg:ml-8 mx-3 my-2" onClick={() => (window.location.href = '/api/auth/logout')}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
