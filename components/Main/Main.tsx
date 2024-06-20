import { MainProps } from './Main.types';
import FollowedArtistList from '../FollowedArtistList/FollowedArtistList';
import React from 'react';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../FollowedArtistList/FollowedArtistList.data';
import { useUser } from '@auth0/nextjs-auth0/client';
import Login from '../Login/Login';
import Scrapers from '../Scrape/Scrapers';
import Recommendations from '../Recommendations/Recommendations';
import { recommendationsI18n } from '../Recommendations/Recommendations.data';

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
            <Scrapers />
            <FollowedArtistList i18n={listI18n} />
            <Recommendations i18n={recommendationsI18n} />
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
          />
        )}
      </div>
    </main>
  );
};
Main.whyDidYouRender = false;
export default Main;
