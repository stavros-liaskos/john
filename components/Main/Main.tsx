import { MainProps } from './Main.types';
import List from '../List/List';
import React, { useState } from 'react';
import { ListEl } from '../List/List.types';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../List/List.data';
import mockedResponse from '../../mocks/searchResult.json';
import { useUser } from '@auth0/nextjs-auth0';
import Login from '../Login/Login';

const Main: React.FunctionComponent<MainProps> = ({ i18n, defaultList = [] }) => {
  const { user, error, isLoading } = useUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = useState<ListEl[]>(
    !defaultList.length ? mockedResponse.artistsPerResource.fromLastfm : defaultList,
  ); // todo rm hardcoded data, get scrapped from db

  if (!i18n || !i18n.todo) {
    return null;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main className={`flex flex-col items-center justify-center w-full p-3 mb-auto min-h-[calc(100vh_-_8.5rem)]`}>
      {user ? (
        <div className={`flex flex-col items-center justify-center w-full lg:w-9/12`}>
          <Search i18n={searchI18n} />
          <List list={list} i18n={listI18n} />
        </div>
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
          counters={{
            artistsCounter: 4965,
            releasesCounter: 3816,
          }}
        />
      )}
    </main>
  );
};

export default Main;
