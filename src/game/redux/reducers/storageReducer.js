// Game Stage:
// landingMenu
// intro
// createCharacter
// inGameLandingUI



const storageReducerInit = {
  inventory: {
    inBag: {
      weapon: [],
      offHand: [],
      armor: [],
      jewelry: [],
      item: [],
      specialItem: [],
    },
    inStorage: {
      weapon: [],
      offHand: [],
      armor: [],
      jewelry: [],
      item: [],
      specialItem: [],
    },
    bagSize: 20,
    storageSize: 100,
  },
  resource: {
    soul: 1000000,
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
    case 'ADD_ITEM': {
      let newState = {...state, inventory: {...state.inventory}};
      newState.inventory[action.target] = {...state.inventory[action.target]};
      if(action.itemType!=='item'&&action.itemType!=='specialItem'){
        newState.inventory[action.target][action.itemType] = state.inventory[action.target][action.itemType].concat([action.data]);
      } else {
        let found = false;
        // Increase the amount of the item in inventory:
        for(let i=0; i<newState.inventory[action.target][action.itemType].length; i++) {
          if(newState.inventory[action.target][action.itemType][i].id === action.data.id) {
            found = true;
            newState.inventory[action.target][action.itemType][i] = {...state.inventory[action.target][action.itemType][i]};
            newState.inventory[action.target][action.itemType][i].amount += action.amount;
            break;
          }
        }
        if(!found) {
          newState.inventory[action.target][action.itemType].push(action.data);
          newState.inventory[action.target][action.itemType][newState.inventory[action.target][action.itemType].length-1].amount = action.amount;
        }
      }
      return newState;
    }
    case 'REMOVE_ITEM': {
      let newState = {...state, inventory: {...state.inventory}};
      newState.inventory[action.target] = {...state.inventory[action.target]};
      newState.inventory[action.target][action.itemType] = [].concat(state.inventory[action.target][action.itemType]);

      if(action.itemType!=='item'&&action.itemType!=='specialItem'){
        for(let i=0; i<newState.inventory[action.target][action.itemType].length; i++) {
          if(newState.inventory[action.target][action.itemType][i].id === action.id) {
            newState.inventory[action.target][action.itemType].splice(i, 1);
            break;
          }
        }
      } else {
        let found = false;
        // Decrease the amount of the item in inventory:
        for(let i=0; i<newState.inventory[action.target][action.itemType].length; i++) {
          if(newState.inventory[action.target][action.itemType][i].id === action.id) {
            found = true;
            newState.inventory[action.target][action.itemType][i] = {...state.inventory[action.target][action.itemType][i]};
            if(newState.inventory[action.target][action.itemType][i].amount - action.amount<0) {
              console.error('remove item not enough! Currently Have:', newState.inventory[action.target][action.itemType][i].amount, ' Want to remove:', action.amount);
            } else {
              newState.inventory[action.target][action.itemType][i].amount -= action.amount;
              if(newState.inventory[action.target][action.itemType][i].amount === 0) {
                newState.inventory[action.target][action.itemType].splice(i, 1);
              }
            }
            break;
          }
        }
        if(!found) {
          console.error('remove item not found!', action);
        }
      }
      return newState;
    }
    case 'COLLECT_ITEM_FROM_BAG_TO_STORAGE': {
      let newState = {...state, inventory: {...state.inventory}};
      newState.inventory.inStorage = {...state.inventory.inStorage};
      for(let itemType in state.inventory.inBag) {
        if(itemType!=='item'&&itemType!=='specialItem') {
          newState.inventory.inStorage[itemType] = state.inventory.inStorage[itemType].concat(state.inventory.inBag[itemType]);
          newState.inventory.inBag[itemType] = [];
        } else {
          // Add item/specialItem from bag to storage:
          for(let i=0; i<state.inventory.inBag[itemType].length; i++) {
            let itemFound = false;
            for(let j=0; j<state.inventory.inStorage[itemType].length; j++) {

            }
          }




        }
      }
      return newState;
    }
    case 'CHANGE_INVENTORY_SIZE': {
      let newState = {...state, inventory: {...state.inventory}};
      newState.inventory[action.target] += action.data;
      return newState;
    }


    default:
      return state;
  }
};

export default storageReducer;
