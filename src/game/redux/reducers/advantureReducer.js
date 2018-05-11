/*jshint esversion: 6 */


const advantureReducerInit = {
  moving: false,
  mainCharSpritePosY: 0,
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

    default:
      return state;
  }
};

export default advantureReducer;
