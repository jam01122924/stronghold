const swordData = {
  weaponPower: {
    base: 10,
    min: 1,
    max: 3,
    qualityIncrease: 0.5,
  },
  type: 'weapon',
  position: ['rightHand', 'leftHand'],
  model: [
    {name: 'shortSword', weight: 3, minLv: 0, img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [
        { attr: 'speed', value: 5},
      ],
    },
    {name: 'swordstick', weight: 6, minLv: 12,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'longSword', weight: 10, minLv: 24,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'cutlass', weight: 15, minLv: 36,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'broadSword', weight: 21, minLv: 46,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'katana', weight: 18, minLv: 54,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'gladius', weight: 30, minLv: 60,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
  ],
};

export default swordData;
