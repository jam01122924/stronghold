import { createStore } from 'redux';
import reducers from './reducers';
import middleware from './middleware';

const persistedState = localStorage.getItem('LastStrongHoldData') ? JSON.parse(localStorage.getItem('LastStrongHoldData')) : {}
const gameStore = createStore(reducers, persistedState, middleware);

export default gameStore;
