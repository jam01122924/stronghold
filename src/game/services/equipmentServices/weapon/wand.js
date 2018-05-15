const wandData = {
  weaponPower: {
    base: 10,
    min: 1,
    max: 3,
    qualityIncrease: 0.5,
  },
  type: 'weapon',
  position: ['rightHand'],
  model: [
    {name: 'shortWand', weight: 2, minLv: 0, img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [
        { attr: 'speed', value: 5},
      ],
    },
    {name: 'Wandstick', weight: 4, minLv: 12,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'handWand', weight: 6, minLv: 24,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'powerWand', weight: 8, minLv: 36,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'mageWand', weight: 11, minLv: 46,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'wizardWand', weight: 15, minLv: 54,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'runeWand', weight: 20, minLv: 60,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 3, lvIncrease: 0.6, max: -1 },
      ],
      defaultAttr: [],
    },
  ],
};

export default wandData;
