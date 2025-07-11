import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

export function useSearch() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchValue) {
      return;
    }

    /**
     * For the purpose of this test,
     * we only support searching for exact block numbers.
     */
    navigate(`/${searchValue}`);
  }

  return { searchValue, handleSearchChange, handleSearchSubmit };
}
