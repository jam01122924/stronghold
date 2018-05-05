const strongHoldInit = {
  buildings: {
    cityLord: {
      lv: 1,
      name: 'cityLord',
      img: '/imgs/house/small/lord-house.gif',
    },
    cityHall: {
      lv: 0,
      name: 'cityHall',
      img: '/imgs/house/small/cityHall.png',
    },
    lumberMill: {
      lv: 1,
      name: 'lumberMill',
      img: '/imgs/house/small/Lumber_Mill.png'
    },
    blacksmith: {
      lv: 0,
      name: 'blacksmith',
      img: '/imgs/house/small/blacksmith.png',
    },
    tavern: {
      lv: 0,
      name: 'tavern',
      img: '/imgs/house/small/tavern.png',
    },
    warehouse: {
      lv: 1,
      storageLv: {
        food: 1,
        wood: 1,
        stone: 0,
        iron: 0,
        silver: 0,
        gold: 0,
        mythril: 0,
        gem: 0,
        crystal: 0,
      },
      name: 'warehouse',
      img: '/imgs/house/small/warehouse.png',
    },
    church: {
      lv: 0,
      name: 'church',
      img: '/imgs/house/small/church.png',
    },
    merchantShop: {
      lv: 0,
      name: 'merchantShop',
      img: '/imgs/house/small/merchantShop.png',
    },
    residentialDistrict : {
      lv: 0,
      name: 'residentialDistrict',
      img: '',
    },
    cityPark: {
      lv: 0,
      name: 'cityPark',
      img: '/imgs/house/small/City_Park.png',
    },
    cityExit: {
      lv: 1,
      name: 'cityExit',
      img: '/imgs/house/small/bridge.png',
    }
  },
  resource: {
    food: {current: 50, max: 500},
    room: {current: 10, max: 10},
    money: {current: 0, max: 1000},
    wood: {current: 400, max: 500},
    stone: {current: 0, max: 0},
    iron: {current: 0, max: 0},
    silver: {current: 0, max: 0},
    gold: {current: 0, max: 0},
    mythril: {current: 0, max: 0},
    gem: {current: 0, max: 0},
    crystal: {current: 0, max: 0},
  },
  workPosition: {
    farm: {name:'Farm', current: 0, max: 10, produce: {food: 1}, consume: {}},
    lumber: {name:'Lumber Mill', current: 0, max: 10, produce: {wood: 1}, consume: {food: 1}},
    stoneMine:{name:'Stone Mine', current: 0, max: 10, produce: {stone: 1}, consume: {food: 2}},
    ironMine: {name:'Iron Mine', current: 0, max: 0, produce: {iron: 1}, consume: {food: 3}},
    silverMine: {name:'Silver Mine', current: 0, max: 0, produce: {silver: 1}, consume: {food: 5}},
    goldMine: {name:'Gold Mine', current: 0, max: 0, produce: {gold: 1}, consume: {food: 7}},
    mythrilMine: {name:'Mythril Mine', current: 0, max: 0, produce: {mythril: 1}, consume: {food: 10}},
    gemMine: {name:'Gem Mine', current: 0, max: 0, produce: {gem: 1}, consume: {food: 15}},
    crystalMine: {name:'Crystal Mine', current: 0, max: 0, produce: {crystal: 1}, consume: {food: 30}},
  },
  timer: {
    heroInTavernTimer: 0,
    HeroInTravernPeriod: 3600,
    resourceHarvestTimer: 0,
    resourceHarvestPeriod: 60,
  },
  shopList: [],
  visitorList: []
};

const strongHoldReducer = (state = strongHoldInit, action) => {
  switch (action.type) {
    case 'CHANGE_RESOURCE': {
      let newState = Object.assign({}, state);
      newState.resource = Object.assign({}, state.resource);
      newState.resource[action.data.resource] = {...state.resource[action.data.resource]};
      let newAmount = newState.resource[action.data.resource].current + action.data.amount;
      if(newAmount>newState.resource[action.data.resource].max) {
        newAmount = newState.resource[action.data.resource].max;
      }
      newState.resource[action.data.resource].current = newAmount;
      return newState;
    }
    case 'CHANGE_RESOURCE_MAX': {
      let newState = Object.assign({}, state);
      newState.resource = Object.assign({}, state.resource);
      newState.resource[action.data.resource] = {...state.resource[action.data.resource]};
      newState.resource[action.data.resource].max = action.data.max;
      return newState;
    }

    case 'CHANGE_WORK_POSITION': {
      let newState = Object.assign({}, state);
      newState.workPosition = Object.assign({}, state.workPosition);
      newState.workPosition[action.data.workPosition] = {...state.workPosition[action.data.workPosition]};
      let newAmount = newState.workPosition[action.data.workPosition].current + action.data.amount;
      newState.workPosition[action.data.workPosition].current = newAmount;
      return newState;
    }
    case 'CHANGE_WORK_POSITION_MAX': {
      let newState = Object.assign({}, state);
      newState.workPosition = Object.assign({}, state.workPosition);
      newState.workPosition[action.data.workPosition] = {...state.workPosition[action.data.workPosition]};
      newState.workPosition[action.data.workPosition].max = action.data.max;
      return newState;
    }

    case 'CHANGE_BUILDING': {
      let newState = Object.assign({}, state);
      newState.buildings = Object.assign({}, state.buildings);
      newState.buildings[action.data.building] = action.data.data;
      return newState;
    }
    case 'INCREASE_BUILDING_LV': {
      let newState = Object.assign({}, state);
      newState.buildings = Object.assign({}, state.buildings);
      newState.buildings[action.data.building] = Object.assign({}, state.buildings[action.data.building]);
      newState.buildings[action.data.building].lv += action.data.data;
      return newState;

    }
    case 'CHANGE_STORAGE_LV': {
      let newState = Object.assign({}, state);
      newState.buildings = Object.assign({}, state.buildings);
      newState.buildings.warehouse = Object.assign({}, state.buildings.warehouse);
      newState.buildings.warehouse.storageLv = Object.assign({}, state.buildings.warehouse.storageLv);
      newState.buildings.warehouse.storageLv[action.data.storage] += action.data.lv;
      return newState;

    }
    case 'CHANGE_HERO_LIST': {
      let newState = {...state};
      newState.HeroList = action.data;
      return newState;
    }
    case 'CHANGE_HERO_IN_TAVERN_TIMER': {
      let newState = {...state, timer: {...state.timer}};
      newState.timer.heroInTavernTimer = action.data;
      return newState;
    }
    case 'CHANGE_RESOURCE_HARVEST_TIMER': {
      let newState = {...state, timer: {...state.timer}};
      newState.timer.resourceHarvestTimer = action.data;
      return newState;
    }

    default:
      return state;
  }
};

export default strongHoldReducer;
