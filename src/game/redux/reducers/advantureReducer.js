/*jshint esversion: 6 */


const advantureReducerInit = {
  moving: false,
  mainCharSpritePosY: 0,
  advantureFood: 0,
  advantureWeightMax: 0,
  advantureWeight: 0,
  advantureFood: 0,
  
  stage: 'map',
};

const advantureReducer = (state = advantureReducerInit, action) => {
  switch (action.type) {
    case 'CHANGE_MOVING': {
      let newState = Object.assign({}, state);
      newState.moving = action.data;
      return newState;
    }
    case 'CHANGE_MAIN_CHAR_SPRITE_POS_Y': {
      let newState = Object.assign({}, state);
      newState.mainCharSpritePosY = action.data;
      return newState;
    }
    case 'CHANGE_ADVANTURE_PROPS': {
      let newState = Object.assign({}, state);
      newState[action.props] += action.data;
      return newState;
    }
    case 'SET_ADVANTURE_PROPS': {
      let newState = Object.assign({}, state);
      newState[action.props] = action.data;
      return newState;
    }


    default:
      return state;
  }
};

export default advantureReducer;
