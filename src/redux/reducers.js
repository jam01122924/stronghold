import { combineReducers } from 'redux';

import homeReducer from './homeReducer';
// import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  home: rbfsApplyReducer


});

export default reducers;
