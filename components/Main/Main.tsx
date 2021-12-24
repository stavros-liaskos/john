import { MainProps } from './Main.types';
import List from '../List/List';
import React, { useState } from 'react';
import { ListEl } from '../List/List.types';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';
import { listI18n } from '../List/List.data';
import DarkMode from '../DarkMode/DarkMode';

const list2 = [
  {
    name: 'Led Zeppeling',
    spotifyUrl: 'www.google.com',
  },
  {
    name: 'YOYOO',
    lastFmUrl: 'www.google.com',
  },
  {
    name: 'Art Beckley',
    lastFmUrl: 'www.google.com',
    spotifyUrl: 'www.google.com',
  },
];

const Main: React.FunctionComponent<MainProps> = ({ i18n, className, defaultList = [] }) => {
  const [list, setList] = useState<ListEl[]>(defaultList);

  if (!i18n || !i18n.todo) {
    return null;
  }

  const handleSearch = (query: string) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: new URLSearchParams(`query=${query}`),
    })
      .then(res => res.json())
      .then(result => setList(list2)) // TODO replace list2 with result
      .catch(() => {});
  };

  return (
    <main className={`${className}`}>
      <DarkMode />
      <Search i18n={searchI18n} handleSearch={handleSearch} />

      <List list={list2} i18n={listI18n} />
    </main>
  );
};

export default Main;
