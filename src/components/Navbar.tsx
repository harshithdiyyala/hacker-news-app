import React, { useState } from 'react';
import SearchBar from './SearchBar.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store/reducers.ts';
import { logout, toggleTheme } from '../store/actions.ts';
import { useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const searchHistory = useSelector((state: AppState) => state.search.history);
  const darkMode = useSelector((state: AppState) => state.theme.darkMode);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-blue-500 dark:bg-blue-900">
      <div className="container mx-auto p-2 flex justify-between items-center">
        {/* App Title */}
        <div className="text-white font-bold text-xl">Hacker News App</div>
        
        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {location.pathname === '/news' && (
            <SearchBar
              onFocus={() => setShowSearchHistory(true)}
              onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
            />
          )}
          {showSearchHistory && searchHistory.length > 0 && (
            <div className="absolute bg-white dark:bg-gray-800 shadow-md p-2 mt-1 rounded w-full z-10">
              <ul>
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleToggleTheme}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={() => dispatch(logout())}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500 dark:bg-blue-900">
          <div className="px-4 py-2">
            {location.pathname === '/news' && (
              <SearchBar
                onFocus={() => setShowSearchHistory(true)}
                onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
              />
            )}
            {showSearchHistory && searchHistory.length > 0 && (
              <div className="relative">
                <div className="absolute bg-white dark:bg-gray-800 shadow-md p-2 mt-1 rounded w-full z-10">
                  <ul>
                    {searchHistory.map((item, index) => (
                      <li
                        key={index}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="mt-2 space-y-2">
              <button
                onClick={handleToggleTheme}
                className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => dispatch(logout())}
                className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-2 py-1 rounded-md"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
