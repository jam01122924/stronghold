// Game Stage:
// landingMenu
// intro
// createCharacter
// inGameLandingUI



const storageReducerInit = {
  inventory: {
    inBag: [],
    inStorage: [],
  },
  resource: {
    soul: 1000000000,
  }
};

const storageReducer = (state = storageReducerInit, action) => {
  switch (action.type) {
    case 'CHANGE_SOUL': {
      let newState = {
        ...state,
        resource: {
          ...state.resource,
          soul: state.resource.soul + action.data
        }
      };
      return newState;
    }
    
    default:
      return state;
  }
};

export default storageReducer;
