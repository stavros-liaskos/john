import { MainProps } from './Main.types';
import List from '../List/List';
import React, { useState } from 'react';
import { ListEl } from '../List/List.types';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../List/List.data';
import DarkMode from '../DarkMode/DarkMode';
import mockedResponse from '../../mocks/searchResult.json';

const Main: React.FunctionComponent<MainProps> = ({ i18n, className, defaultList = [] }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = useState<ListEl[]>(
    !defaultList.length ? mockedResponse.artistsPerResource.fromLastfm : defaultList,
  ); // todo rm hardcoded data, get scrapped from db

  if (!i18n || !i18n.todo) {
    return null;
  }

  return (
    <main className={`border-x-2 dark:border-slate-800 border-black ${className}`}>
      <DarkMode />
      <Search i18n={searchI18n} />

      <List list={list} i18n={listI18n} />
    </main>
  );
};

export default Main;
