const warriorData = {
  growRate: {
    strength: {
      lvIncrease: 10,
      growRate: [
        {rate: 60, grow: 1}, {rate: 40, grow: 2}, {rate: 20, grow: 3},
        {rate: 0, grow: 4}, {rate: -10, grow: 5}, {rate: -20, grow: 6},
        {rate: -30, grow: 7}
      ]
    },
    perception: {
      lvIncrease: 6,
      growRate: [
        {rate: 40, grow: 1}, {rate: 20, grow: 2}, {rate: 0, grow: 3},
        {rate: -10, grow: 4}, {rate: -20, grow: 5}, {rate: -30, grow: 6},
        {rate: -40, grow: 7}
      ]
    },
    endurance: {
      lvIncrease: 10,
      growRate: [
        {rate: 60, grow: 1}, {rate: 40, grow: 2}, {rate: 20, grow: 3},
        {rate: 0, grow: 4}, {rate: -10, grow: 5}, {rate: -20, grow: 6},
        {rate: -30, grow: 7}
      ]
    },
    charisma: {
      lvIncrease: 4,
      growRate: [
        {rate: 30, grow: 1}, {rate: 15, grow: 2}, {rate: 0, grow: 3},
        {rate: -10, grow: 4}, {rate: -15, grow: 5}, {rate: -20, grow: 6},
        {rate: -30, grow: 7}
      ]
    },
    intelligence: {
      lvIncrease: 4,
      growRate: [
        {rate: 30, grow: 1}, {rate: 15, grow: 2}, {rate: 0, grow: 3},
        {rate: -10, grow: 4}, {rate: -15, grow: 5}, {rate: -20, grow: 6},
        {rate: -30, grow: 7}
      ]
    },
    Agility: {
      lvIncrease: 6,
      growRate: [
        {rate: 40, grow: 1}, {rate: 20, grow: 2}, {rate: 0, grow: 3},
        {rate: -10, grow: 4}, {rate: -20, grow: 5}, {rate: -30, grow: 6},
        {rate: -40, grow: 7}
      ]
    },
    luck: {
      lvIncrease: 5,
      growRate: [
        {rate: 30, grow: 1}, {rate: 15, grow: 2}, {rate: 0, grow: 3},
        {rate: -10, grow: 4}, {rate: -15, grow: 5}, {rate: -20, grow: 6},
        {rate: -30, grow: 7}
      ]
    },
  },
  weapon: [
    'sword',
    'gaintSword',
    'axe',
    'gaintAxe',
    'hammer',
    'gaintHammer',
    'shield',
    'gaintShield',
  ],
  talent: {
    defend: {
        lv1: {
          shieldMaster: {
            requireLv: 1,
            requireTalent: [],
            icon: '',
            currentLv: 0,
            maxLv: 5,
            avaiableSkill: [],
            buffType: 'blockRate',
            buffAmount: '2%'
          }
        }
    },

  }
}
