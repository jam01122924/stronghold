// Game Stage:
// landingMenu
// intro
// createCharacter
// inGameLandingUI



const gameStageReducerInit = {
  stage: 'landingMenu',
  language: 'en',
};

const gameStageReducer = (state = gameStageReducerInit, action) => {
  switch (action.type) {
    case 'CHANGE_STAGE': {
      let newState = Object.assign({}, state);
      newState['stage'] = action.stage;
      return newState;
    }
    case 'CHANGE_LANGUAGE': {
      let newState = Object.assign({}, state);
      newState['language'] = action.language;
      return newState;
    }

    default:
      return state;
  }
};

export default gameStageReducer;
