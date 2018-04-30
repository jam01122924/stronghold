let characterReducerInit = {
  inTeam: [],
  inTraven: [
    {
      id: 'heroID0001',
      name: 'Test Hero',
      class: 'warrior',
      lv: 1,
      status: {
        strength: 10,
        perception: 6,
        endurance: 10,
        charisma: 4,
        intelligence: 4,
        agility: 6,
        luck: 5
      },
      talent: [],
    }
  ],
  special: []
};

const heroReducer = (state = characterReducerInit, action) => {
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

export default heroReducer;
