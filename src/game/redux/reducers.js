import { combineReducers } from 'redux';

import advantureReducer from './reducers/advantureReducer';
import gameStageReducer from './reducers/gameStageReducer';
import heroReducer from './reducers/heroReducer';
import mapReducer from './reducers/mapReducer';
import strongHoldReducer from './reducers/strongHoldReducer';
import storageReducer from './reducers/storageReducer';
// import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  advanture: advantureReducer,
  gameStage: gameStageReducer,
  hero: heroReducer,
  map: mapReducer,
  strongHold: strongHoldReducer,
  storage: storageReducer,
});

export default reducers;
