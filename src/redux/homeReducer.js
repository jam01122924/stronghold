
const homeReducerInit = {
  home: {

  },
  trips: {
    Y2012: {},
    Y2013: {},
    Y2014: {},
    Y2015: {},
    Y2016: {
      Toronto: {}
    },
    Y2017: {
      WestAmerica: {
        day1: {},
        
      }
    }
  },
  entertainment: {
    models: {},
    frisbee: {},
    food: {},
    game: {},
    others: {},
  },

};

const homeReducer = (state = homeReducerInit, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT': {
      var newState = Object.assign({}, state);
      newState[action.step] = Object.assign({}, state[action.step]);
      newState[action.step][action.field] = action.data;
      return newState;
    }

    default:
      return state;
  }
};

export default homeReducer;
