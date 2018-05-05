import { combineReducers } from 'redux';

import gameStageReducer from './reducers/gameStageReducer';
import heroReducer from './reducers/heroReducer';
import mapReducer from './reducers/mapReducer';
import strongHoldReducer from './reducers/strongHoldReducer';
import storageReducer from './reducers/storageReducer';
// import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  gameStage: gameStageReducer,
  hero: heroReducer,
  map: mapReducer,
  strongHold: strongHoldReducer,
  storage: storageReducer,
});

export default reducers;
