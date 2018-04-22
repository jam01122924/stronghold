import { combineReducers } from 'redux';

import gameStageReducer from './reducers/gameStageReducer';
import characterReducer from './reducers/characterReducer';
import mapReducer from './reducers/mapReducer';
import strongHoldReducer from './reducers/strongHoldReducer';
// import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  gameStage: gameStageReducer,
  character: characterReducer,
  map: mapReducer,
  strongHold: strongHoldReducer,
});

export default reducers;
