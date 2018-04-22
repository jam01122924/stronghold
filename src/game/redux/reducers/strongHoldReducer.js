const strongHoldInit = {
  buildings: {
    cityHall: {
      lv: 0,
      name: 'City Hall',
      img: '',
    },
    blacksmithShop: {
      lv: 0,
      name: 'Blacksmith shop',
      img: '',
    },
    workshop: {
      lv: 0,
      name: 'Workshop',
      img: '',
    },
    tavern: {
      lv: 0,
      name: 'Tavern',
      img: '',
    },
    warehouse: {
      lv: 0,
      name: 'Warehouse',
      img: '',
    },
    graveyard: {
      lv: 0,
      name: 'Graveyard',
      img: '',
    },
    merchantShop: {
      lv: 0,
      name: 'Merchant Shop',
      img: '',
    },
    residentialDistrict : {
      lv: 0,
      name: 'Residential District',
      img: '',
    },
  },
  resource: {
    food: {current: 0, max: 0},
    room: {current: 0, max: 0},
    money: {current: 0, max: 0},
    wood: {current: 0, max: 0},
    stone: {current: 0, max: 0},
    iron: {current: 0, max: 0},
    silver: {current: 0, max: 0},
    gold: {current: 0, max: 0},
    mythril: {current: 0, max: 0},
    gem: {current: 0, max: 0},
    crystal: {current: 0, max: 0},
  },
  workPosition: {
    farming: {current: 0, max: 0},
    logging: {current: 0, max: 0},
    stoneMining:{current: 0, max: 0},
    ironMining: {current: 0, max: 0},
    silverMining: {current: 0, max: 0},
    goldMining: {current: 0, max: 0},
    mythrilMining: {current: 0, max: 0},
    gemMining: {current: 0, max: 0},
    crystalMining: {current: 0, max: 0},
  },
  shopList: [],
  HeroList: [],
  visitorList: []
};

const strongHoldReducer = (state = strongHoldInit, action) => {
  switch (action.type) {
    case 'CHANGE_RESOURCE':
      let newState = {...state, state.resource};
      newState.resource[action.data.resource] = {...state.resource[action.data.resource]};
      let newAmount = newState.resource[action.data.resource].current + action.data.amount;
      if(newAmount>newState.resource[action.data.resource].max) {
        newAmount = newState.resource[action.data.resource].max;
      }
      newState.resource[action.data.resource].current = newAmount;
      return newState;
    case 'CHANGE_RESOURCE_MAX':
      let newState = {...state, state.resource};
      newState.resource[action.data.resource] = {...state.resource[action.data.resource]};
      newState.resource[action.data.resource].max = action.data.max;
      return newState;

    case 'CHANGE_WORK_POSITION':
      let newState = {...state, state.workPosition};
      newState.workPosition[action.data.workPosition] = {...state.workPosition[action.data.workPosition]};
      let newAmount = newState.workPosition[action.data.workPosition].current + action.data.amount;
      if(newAmount>newState.workPosition[action.data.workPosition].max) {
        newAmount = newState.workPosition[action.data.workPosition].max;
      }
      newState.workPosition[action.data.workPosition].current = newAmount;
      return newState;
    case 'CHANGE_WORK_POSITION_MAX':
      let newState = {...state, state.workPosition};
      newState.workPosition[action.data.workPosition] = {...state.workPosition[action.data.workPosition]};
      newState.workPosition[action.data.workPosition].max = action.data.max;
      return newState;
      
    case 'CHANGE_BUILDING':
      let newState = {...state, state.buildings};
      newState.buildings[action.data.building] = action.data.data;
      return newState;
    case 'CHANGE_HERO_LIST':
      let newState = {...state};
      newState.HeroList = action.data;
      return newState;

    default:
      return state;
  }
};

export default strongHoldReducer;
