import './Search.css';
import { Search as SearchIcon } from 'lucide-react';

import { useSearch } from './useSearch';

const SEARCH_PLACEHOLDER = 'Search for things like address, transaction, block';
const SEARCH_INPUT_ID = 'block-explorer-search';

export function Search() {
  const { searchValue, handleSearchChange, handleSearchSubmit } = useSearch();

  return (
    <form
      className="search-bar"
      role="search"
      aria-label="Block Explorer Search"
      onSubmit={handleSearchSubmit}
    >
      <label htmlFor={SEARCH_INPUT_ID} className="visually-hidden">
        {SEARCH_PLACEHOLDER}
      </label>
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" size={20} aria-hidden="true" />
        <input
          id={SEARCH_INPUT_ID}
          className="search-input"
          type="text"
          placeholder={SEARCH_PLACEHOLDER}
          autoComplete="off"
          aria-label="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
}
