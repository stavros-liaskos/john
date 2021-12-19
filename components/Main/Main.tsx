import { MainProps } from './Main.types';
import List from '../List/List';
import React, { useState } from 'react';
import { ListEl } from '../List/List.types';
import Search from '../Search/Search';
import { searchI18n } from '../Search/Search.data';

const list2 = [
  {
    name: 'Led Zeppeling',
    href: 'www.google.com',
  },
  {
    name: 'YOYOO',
    href: 'www.google.com',
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
      <Search i18n={searchI18n} handleSearch={handleSearch} />

      <List list={list} />
    </main>
  );
};

export default Main;
