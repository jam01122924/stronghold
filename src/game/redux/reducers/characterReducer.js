import Character from '../../common/classes/character';

let characterReducerInit = {
  inTeam: [{}],
  inTraven: [],
  all: []
};

const characterReducer = (state = characterReducerInit, action) => {
  switch (action.type) {
    case 'CREATE_CHARACTER': {
      let newState = Object.assign({}, state);
      let newCharacter = action.data?(new Character(action.data.status, action.data.name, action.data.skills, action.data.talent)):(new Character());
      console.log(newCharacter);
      newState.inTeam[0] = newCharacter;
      return newState;
    }
    case 'LOAD_DATA':
      console.log('characterReducer LOAD_DATA');
      return action.data;

    default:
      return state;
  }
};

export default characterReducer;
