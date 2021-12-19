import { SearchProps } from './Search.types';

const Search = ({ i18n }: SearchProps) => {
  if (!i18n || !i18n.button || !i18n.label) {
    return null;
  }

  const handleSubmit = () => {};

  return (
    <form className="border border-indigo-600" noValidate onSubmit={handleSubmit}>
      <label htmlFor="search">{i18n.label}</label>
      <input type="text" name="search" />
      <button data-testid="search-button">{i18n.button}</button>
    </form>
  );
};

export default Search;
