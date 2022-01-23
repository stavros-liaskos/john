import { SearchProps } from './Search.types';
import React, { useState, SyntheticEvent } from 'react';
import mockedResponse from '../../mocks/searchResult.json';
import { ListEl } from '../List/List.types';

const Search: React.FunctionComponent<SearchProps> = ({ i18n }) => {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<ListEl[] | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  if (!i18n || !i18n.button || !i18n.label) {
    return null;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: new URLSearchParams(`query=${input}`),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        return setResults(mockedResponse.artistsPerResource.fromLastfm); // TODO replace results with result
      })
      .catch(error => {
        console.error('Error:', JSON.stringify(error));
        // TODO handle me
      });
  };

  const handleFollow = (artistData: ListEl) => {
    setDisabled(true);

    fetch('/me/follow', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(artistData),
    })
      .then(() => {
        console.log(`${artistData.name} successfully unfollowed`);
      })
      .catch(error => {
        console.error('Error:', JSON.stringify(error));
      })
      .finally(() => {
        setTimeout(() => {
          setResults(null);
          setDisabled(false);
        }, 1000);
      });
  };

  return (
    <div className="relative flex lg:justify-center items-center px-4 h-20 md:h-48 border-y-2 dark:border-slate-800 border-black">
      <form
        className="flex justify-between md:justify-center w-full items-stretch h-10"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="mr-4 px-2 min-m-lg border-b-2 dark:border-slate-800 border-black dark:bg-slate-800 dark:text-slate-400"
          type="text"
          name="search"
          placeholder={i18n.label}
          onChange={e => setInput(e.target.value)}
        />
        <button className="btn btn-large" type="submit">
          {i18n.button}
        </button>
      </form>
      {results && (
        <div className="absolute px-3 bg-slate-100 dark:bg-slate-800 top-32 border-2 border-zinc-900">
          <ul>
            {results.map((result: ListEl, key: number) => (
              <li
                className="flex justify-between items-center py-2 dark:text-slate-400 border-b-2 border-zinc-900"
                key={key}
              >
                {result.name}
                <button
                  className="btn btn-small !border-zinc-900"
                  onClick={() => handleFollow(result)}
                  disabled={disabled}
                >
                  Follow
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
