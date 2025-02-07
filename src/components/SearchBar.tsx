import React, { useState, useCallback } from 'react';
import { debounce } from '../utils/debounce.ts';
import { useDispatch } from 'react-redux';
import { addSearchHistory, setNews } from '../store/actions.ts';
import { fetchNews } from '../api/newsApi.ts';

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFocus, onBlur }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const performSearch = async (q: string) => {
    dispatch(addSearchHistory(q));

    try {
      const data = await fetchNews(0, 20, q);
      dispatch(setNews(data.hits));
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const debouncedSearch = useCallback(debounce(performSearch, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search news..."
      value={query}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className="p-2 rounded active:border text-gray-900 dark:text-gray-100 dark:bg-gray-700"
    />
  );
};

export default SearchBar;
