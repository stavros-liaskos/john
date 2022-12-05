import { SearchProps } from './Search.types';
import React, { useState, SyntheticEvent } from 'react';
import Button from '../Button/Button';
import { components } from '../../types/schema';
import { getFollowedArtists } from '../../utils/getFollowedArtists';

const Search: React.FunctionComponent<SearchProps> = ({ i18n }) => {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<components['schemas']['SearchResultArtistDto'][] | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  if (!i18n || !i18n.button || !i18n.label) {
    return null;
  }

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    fetch(`${process.env.BE_BASE_URL}/artist/search/?${new URLSearchParams({ pattern: input })}`)
      .then(res => res.json())
      .then(result => {
        return setResults(result.artists); // TODO handle no results
      })
      .catch(console.error);
  };

  const handleFollow = (artistData: components['schemas']['SearchResultArtistDto']) => {
    setDisabled(true);
    fetch(`${process.env.BE_BASE_URL}/me/follow`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(artistData),
    })
      .then(() => {
        console.log(`${artistData.name} successfully followed`);
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
    <div className="relative flex lg:justify-center items-center mb-2 h-20 md:h-40 border-b-2 rr-border w-full">
      <form
        className="flex justify-between md:justify-between items-stretch h-10 w-full"
        noValidate
        onSubmit={handleSearch}
      >
        <input
          className="mr-4 px-2 min-m-lg border-b-2 rr-border dark:bg-gh-darkly rr-text w-full md:w-2/3"
          type="text"
          name="search"
          placeholder={i18n.label}
          onChange={e => setInput(e.target.value)}
        />
        <Button i18n={i18n.button} className="btn-large" type="submit" disabled={disabled} loading={disabled} />
      </form>
      {results && (
        <div className="absolute px-3 bg-slate-100 dark:bg-gh-darkly border-2 border-gh-dark top-16 md:top-32 w-full z-10">
          <ul>
            {results.map((result: components['schemas']['SearchResultArtistDto'], key: number) => (
              <li className="flex justify-between items-center py-2 rr-text border-b-2 border-gh-dark" key={key}>
                {result.name}
                <button
                  className="btn btn-small !border-gh-dark"
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
