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
  import { NewsItem } from '../types/index.ts';
  
  export const login = (username: string) => ({
    type: LOGIN,
    payload: username,
  });
  
  export const logout = () => ({
    type: LOGOUT,
  });
  
  export const setNews = (news: NewsItem[]) => ({
    type: SET_NEWS,
    payload: news,
  });
  
  export const addNews = (news: NewsItem[]) => ({
    type: ADD_NEWS,
    payload: news,
  });
  
  export const setSelectedNews = (news: NewsItem) => ({
    type: SET_SELECTED_NEWS,
    payload: news,
  });
  
  export const updateVote = (id: string, voteType: 'upvote' | 'downvote') => ({
    type: UPDATE_VOTE,
    payload: { id, voteType },
  });
  
  export const setSearchHistory = (history: string[]) => ({
    type: SET_SEARCH_HISTORY,
    payload: history,
  });
  
  export const addSearchHistory = (query: string) => ({
    type: ADD_SEARCH_HISTORY,
    payload: query,
  });
  
  export const toggleTheme = () => ({
    type: TOGGLE_THEME,
  });
  