const buildingData = {
  upgradeCost: {
    wood: 0,
    stone: 5,
    iron: 10,
    silver: 15,
    gold: 20,
    mythril: 30,
    gem: 40,
    crystal: 50,
  },
  cityLord: {
    upgradeCost: 2,
    increaseType: 'storage',
    increase: 'money',
    increaseParam: 500, // final num = increaseParam * 1.5 * lv
  },
  cityHall: {
    upgradeCost: 2.5,
    increaseType: 'produce',
    increase: 'money',
    amount: 1,
  },
  lumberMill: {
    upgradeCost: 1.2,
    increaseType: 'produce',
    increase: 'wood',
    amount: 10,
  },
  blacksmith: {
    upgradeCost: 1.5,
  },
  tavern: {
    upgradeCost: 1.6,
  },
  warehouse: {
    upgradeCost: 1.2,
    food: {increase: 500, timer:1.2, cost: 200},
    wood: {increase: 500, timer:1.2, cost: 200},
    stone: {increase: 500, timer:1.2, cost: 500},
    iron: {increase: 500, timer:1.2, cost: 1200},
    silver: {increase: 400, timer:1.2, cost: 2000},
    gold: {increase: 400, timer:1.2, cost: 4000},
    mythril: {increase: 400, timer:1.2, cost: 20000},
    gem: {increase: 300, timer:1.2, cost: 100000},
    crystal: {increase: 300, timer:1.2, cost: 500000},
  },
  church: {
    upgradeCost: 1.8,
  },
  merchantShop: {
    upgradeCost: 2,
  },
  residentialDistrict : {
    upgradeCost: 1,
    increaseType: 'storage',
    increase: 'room',
    amount: 5,
  },
  cityPark: {
    upgradeCost: 1.5,
  }
};

export default buildingData;
