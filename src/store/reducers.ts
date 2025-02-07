import { combineReducers } from 'redux';
import {
  LOGIN,
  LOGOUT,
  SET_NEWS,
  ADD_NEWS,
  SET_SELECTED_NEWS,
  UPDATE_VOTE,
  SET_SEARCH_HISTORY,
  ADD_SEARCH_HISTORY,
  TOGGLE_THEME,
} from './actionTypes.ts';
import { NewsItem } from '../types/index';

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  username: null,
  isAuthenticated: false,
};

const authReducer = (state = initialAuthState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN:
      return { username: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { username: null, isAuthenticated: false };
    default:
      return state;
  }
};

interface NewsState {
  news: NewsItem[];
  selectedNews: NewsItem | null;
}

const initialNewsState: NewsState = {
  news: [],
  selectedNews: null,
};

const newsReducer = (state = initialNewsState, action: any): NewsState => {
  switch (action.type) {
    case SET_NEWS:
      return { ...state, news: action.payload };
    case ADD_NEWS:
      return { ...state, news: [...state.news, ...action.payload] };
    case SET_SELECTED_NEWS:
      return { ...state, selectedNews: action.payload };
      
case 'TOGGLE_VOTE':
  return {
    ...state,
    news: state.news.map((item) => {
      if (item.objectID === action.payload.id) {
        return {
          ...item,
          upvotes: Math.max((item.upvotes || 0) + action.payload.upvoteChange, 0),
          downvotes: Math.max((item.downvotes || 0) + action.payload.downvoteChange, 0),
          voteStatus: action.payload.newVoteStatus,
        };
      }
      return item;
    }),
  };

    default:
      return state;
  }
};

interface SearchState {
  history: string[];
}

const initialSearchState: SearchState = {
  history: [],
};

const searchReducer = (state = initialSearchState, action: any): SearchState => {
  switch (action.type) {
    case SET_SEARCH_HISTORY:
      return { ...state, history: action.payload };
    case ADD_SEARCH_HISTORY:
      // Prepend new query and ensure maximum 10 items.
      const newHistory = [action.payload, ...state.history.filter((item) => item !== action.payload)];
      if (newHistory.length > 10) {
        newHistory.pop();
      }
      return { ...state, history: newHistory };
    default:
      return state;
  }
};


interface ThemeState {
  darkMode: boolean;
}

const initialThemeState: ThemeState = {
  darkMode: true,
};

const themeReducer = (state = initialThemeState, action: any): ThemeState => {
  switch (action.type) {
    case TOGGLE_THEME:
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  news: newsReducer,
  search: searchReducer,
  theme: themeReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
