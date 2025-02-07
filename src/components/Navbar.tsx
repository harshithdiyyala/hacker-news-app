import React, { useState } from 'react';
import SearchBar from './SearchBar.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/reducers.ts';
import { logout, toggleTheme } from '../store/actions.ts';
import { useLocation, useParams } from 'react-router-dom';

const NavBar: React.FC = () => {
  const searchHistory = useSelector((state: AppState) => state.search.history);
  const darkMode = useSelector((state: AppState) => state.theme.darkMode);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const dispatch = useDispatch();
  const params = useLocation()
  console.log({params})

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-blue-500 dark:bg-blue-900 ">
      <div className = "container mx-auto p-2 flex justify-between items-center">
      <div className="text-white font-bold text-xl">Hacker News App</div>
      <div className="flex items-center">
        <div className="relative">
          {params?.pathname === "/news" && <SearchBar
            onFocus={() => setShowSearchHistory(true)}
            onBlur={() =>
              setTimeout(() => setShowSearchHistory(false), 200)
            }
          />}
          {showSearchHistory && searchHistory.length > 0 && (
            <div className="absolute bg-white dark:bg-gray-800 shadow-md p-2 mt-1 rounded w-full z-10">
              <ul>
                {searchHistory.map((item, index) => (
                  <li key={index} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer dark:text-white ">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={handleToggleTheme}
          className="ml-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick = {() => dispatch(logout())} className="ml-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md"> Log Out</button>
      </div>
      </div>
    </nav>
  );
};

export default NavBar;
