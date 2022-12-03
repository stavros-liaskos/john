import { MainProps } from './Main.types';
import FollowedArtistList from '../FollowedArtistList/FollowedArtistList';
import React from 'react';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../FollowedArtistList/FollowedArtistList.data';
import { useUser } from '@auth0/nextjs-auth0';
import Login from '../Login/Login';

const Main: React.FunctionComponent<MainProps> = ({ i18n }) => {
  const { user } = useUser();

  if (!i18n || !i18n.todo) {
    return null;
  }

  return (
    <main className={`flex-1 flex flex-col items-center w-full p-3 h-24`}>
      <div className={`flex flex-col items-center w-full lg:w-9/12`}>
        {user ? (
          <>
            <Search i18n={searchI18n} />
            <FollowedArtistList i18n={listI18n} />
          </>
        ) : (
          <Login
            i18n={{
              welcome: 'Welcome to Release Raccoon!',
              loginBtn: 'Register',
              text: "Receive your favorite artists' music in your email every week!",
              artistsCount: 'Artists',
              releasesCount: 'Releases',
            }}
            handleRegister={() => (window.location.href = '/api/auth/login')}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
