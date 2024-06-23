import { SearchProps } from './Search.types';
import React, { useState } from 'react';
import Button from '../Button/Button';
import { components } from '../../types/schema';
import FormInput from '../FormInput/FormInput';

const Search: React.FunctionComponent<SearchProps> = ({ i18n }) => {
  const [results, setResults] = useState<components['schemas']['SearchResultArtistDto'][] | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  if (!i18n?.button || !i18n?.label) {
    return null;
  }
  return (
    <div className="relative flex lg:justify-center items-center mb-2 basis-16 md:basis-20 border-b-2 rr-border w-full">
      <FormInput handleAction={handleSearch} i18n={i18n} actionEventTrigger={'onSubmit'}>
        <Button i18n={i18n.button} className="btn-large" type="submit" disabled={disabled} loading={disabled} />
      </FormInput>

      {results && (
        <div className="absolute px-3 bg-slate-100 dark:bg-gh-darkly border-2 border-gh-dark top-14 md:top-16 w-full z-10">
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

  function handleSearch(inputValue: string) {
    fetch(`${process.env.BE_BASE_URL}/artist/search?${new URLSearchParams({ pattern: inputValue })}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        return setResults(result.artists); // TODO handle no results
      })
      .catch(console.error);
  }

  function handleFollow(artistData: components['schemas']['SearchResultArtistDto']) {
    setDisabled(true);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    fetch(`${process.env.BE_BASE_URL}/me/follow`, {
      method: 'POST',
      credentials: 'include',
      headers,
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
  }
};
Search.whyDidYouRender = true;
export default Search;
