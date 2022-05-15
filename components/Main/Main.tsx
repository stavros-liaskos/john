import { MainProps } from './Main.types';
import List from '../List/List';
import React, { useState } from 'react';
import { ListEl } from '../List/List.types';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../List/List.data';
import DarkMode from '../DarkMode/DarkMode';
import mockedResponse from '../../mocks/searchResult.json';
import { useUser } from '@auth0/nextjs-auth0';
import Login from '../Login/Login';

const Main: React.FunctionComponent<MainProps> = ({ i18n, className, defaultList = [] }) => {
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
    <main className={className}>
      <div className="flex justify-between">
        <DarkMode />
        {user && (
          <button
            className="btn btn-small lg:ml-8 mx-3 my-2"
            onClick={() => (window.location.href = '/api/auth/logout')}
          >
            Logout
          </button>
        )}
      </div>

      {user ? (
        <>
          <Search i18n={searchI18n} />
          <List list={list} i18n={listI18n} />
        </>
      ) : (
        <Login
          i18n={{
            welcome: 'Welcome to Release Raccoon!',
            loginBtn: 'Register',
            text: "Receive your favorite artists' music in your email every week!",
          }}
          handleRegister={() => (window.location.href = '/api/auth/login')}
        />
      )}
    </main>
  );
};

export default Main;
