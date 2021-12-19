import { SearchProps } from './Search.types';
import { useState, SyntheticEvent } from 'react';

const Search = ({ i18n, handleSearch }: SearchProps) => {
  const [input, setInput] = useState<string>();
  if (!i18n || !i18n.button || !i18n.label) {
    return null;
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <div className="flex justify-center items-center h-48 bg-red-300">
      <form className="flex justify-center items-stretch h-10" noValidate onSubmit={handleSubmit}>
        <input
          className="rounded mr-4 px-2 max-w-md"
          type="text"
          name="search"
          placeholder={i18n.label}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
          type="submit"
        >
          {i18n.button}
        </button>
      </form>
    </div>
  );
};

export default Search;
