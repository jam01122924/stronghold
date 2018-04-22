// Game Stage:
// landingMenu
// intro
// createCharacter
// inGameLandingUI



const gameStageReducerInit = {
  stage: 'landingMenu'
};

const gameStageReducer = (state = gameStageReducerInit, action) => {
  switch (action.type) {
    case 'CHANGE_STAGE': {
      var newState = Object.assign({}, state);
      newState['stage'] = action.stage;
      return newState;
    }

    default:
      return state;
  }
};

export default gameStageReducer;
