import { MainProps } from './Main.types';
import FollowedArtistList from '../FollowedArtistList/FollowedArtistList';
import React, { Suspense } from 'react';
import Search from '../Search/Search';
import { useUser } from '@auth0/nextjs-auth0/client';
import Login from '../Login/Login';
import Scrapers from '../Scrape/Scrapers';
import Recommendations from '../Recommendations/Recommendations';
import Loading from '../Loading/Loading';
import { searchI18n, followedArtistListI18n, loginI18n, recommendationsI18n } from '../../i18n';

const Main: React.FunctionComponent<MainProps> = ({ i18n }) => {
  const { user } = useUser();

  if (!i18n || !i18n.todo) {
    return null;
  }

  return (
    <main className={`flex-1 flex flex-col items-center w-full px-3 h-24`}>
      <div className={`flex-1 flex flex-col justify-stretch items-center w-full lg:w-9/12`}>
        {user ? (
          <>
            <Search i18n={searchI18n} />
            <Scrapers />
            <FollowedArtistList i18n={followedArtistListI18n} />
            <Suspense fallback={<Loading />}>
              <Recommendations i18n={recommendationsI18n} />
            </Suspense>
          </>
        ) : (
          <Login i18n={loginI18n} />
        )}
      </div>
    </main>
  );
};
Main.whyDidYouRender = false;
export default Main;
