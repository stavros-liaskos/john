import { MainProps } from './Main.types';
import List from '../List/List';
import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../List/List.data';
import { useUser } from '@auth0/nextjs-auth0';
import Login from '../Login/Login';
import { components } from '../../types/schema';

const Main: React.FunctionComponent<MainProps> = ({ i18n }) => {
  const { user } = useUser();
  // const { user, error } = { user: 'asdf',  error: null}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = useState<components['schemas']['FollowedArtistsResponse']>();

  useEffect(() => {
    fetch(`${process.env.BE_BASE_URL}/me/followed-artists`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    })
      .then(response => response.json())
      .then(data => setList(data));
  }, []);

  if (!i18n || !i18n.todo) {
    return null;
  }

  return (
    <main className={`flex-1 flex flex-col items-center w-full p-3 h-24`}>
      <div className={`flex flex-col items-center w-full lg:w-9/12`}>
        {user ? (
          <>
            <Search i18n={searchI18n} />
            {list?.rows && <List list={list.rows} i18n={listI18n} />}
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
            counters={{
              artistsCounter: 4965,
              releasesCounter: 3816,
            }}
          />
        )}
      </div>
    </main>
  );
};

export default Main;
