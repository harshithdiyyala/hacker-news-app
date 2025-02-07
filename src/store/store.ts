import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { rootReducer } from './reducers.ts';

export const store = createStore(rootReducer, applyMiddleware(thunk));
