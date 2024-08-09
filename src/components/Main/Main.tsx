import FollowedArtistList from '../FollowedArtistList/FollowedArtistList';
import React, { Suspense } from 'react';
import Search from '../Search/Search';
import { useUser } from '@auth0/nextjs-auth0/client';
import Login from '../Login/Login';
import Scrapers from '../Scrape/Scrapers';
import Recommendations from '../Recommendations/Recommendations';
import Loading from '../Loading/Loading';
import { searchI18n, followedArtistListI18n, loginI18n, recommendationsI18n } from '../../i18n';

const Main: React.FunctionComponent = () => {
  const { user } = useUser();

  function loginBE() {
    window.location.assign('https://api.releaseraccoon.online/me');
  }

  function fetchy() {
    fetch('https://api.releaseraccoon.online/me', {
      headers: { 'X-Requested-With': 'JavaScript' },
    });
  }

  return (
    <main className="rr-column flex-auto">
      <div className="flex flex-col flex-auto w-full lg:w-9/12">
        <button className={'rr-text btn'} onClick={loginBE}>
          login with assign
        </button>

        <button className={'rr-text btn'} onClick={fetchy}>
          login with fetch
        </button>

        <a href="https://api.releaseraccoon.online/me">
          <button className={'rr-text btn'}>login with anchor</button>
        </a>

        {user ? (
          <>
            <Search i18n={searchI18n} />
            <Scrapers />
            <div className="flex flex-auto flex-col h24">
              <FollowedArtistList i18n={followedArtistListI18n} />
              <Suspense fallback={<Loading />}>
                <Recommendations i18n={recommendationsI18n} />
              </Suspense>
            </div>
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
