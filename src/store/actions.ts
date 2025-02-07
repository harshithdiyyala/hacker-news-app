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
  
  export const rupdateVote = (id: string, voteType: 'upvote' | 'downvote') => ({
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
  
  export const updateVote = (id: string, voteType: 'upvote' | 'downvote') => (dispatch: any, getState: any) => {
    const { news } = getState().news;
    const item: NewsItem | undefined = news.find((i: NewsItem) => i.objectID === id);
    if (!item) return;
  
    let newVoteStatus: 'upvote' | 'downvote' | null;
    let upvoteChange = 0;
    let downvoteChange = 0;
  
    // If the same vote is clicked, remove the vote.
    if (item.voteStatus === voteType) {
      newVoteStatus = null;
      if (voteType === 'upvote') {
        upvoteChange = -1;
      } else {
        downvoteChange = -1;
      }
    } else {
      // If a different vote is active, remove its effect first.
      if (item.voteStatus === 'upvote') {
        upvoteChange = -1;
      } else if (item.voteStatus === 'downvote') {
        downvoteChange = -1;
      }
      // Then apply the new vote.
      if (voteType === 'upvote') {
        upvoteChange += 1;
      } else {
        downvoteChange += 1;
      }
      newVoteStatus = voteType;
    }
  
    dispatch({
      type: 'TOGGLE_VOTE',
      payload: {
        id,
        newVoteStatus,
        upvoteChange,
        downvoteChange,
      },
    });
  
    // Update local storage
    let votes = {};
    try {
      votes = JSON.parse(localStorage.getItem('votes') || '{}');
    } catch (e) {
      console.error("Error parsing votes from local storage", e);
    }
    // Calculate new vote counts.
    votes[id] = {
      voteStatus: newVoteStatus,
      upvotes: Math.max((item.upvotes || 0) + upvoteChange, 0),
      downvotes: Math.max((item.downvotes || 0) + downvoteChange, 0),
    };
    localStorage.setItem('votes', JSON.stringify(votes));
  };
  