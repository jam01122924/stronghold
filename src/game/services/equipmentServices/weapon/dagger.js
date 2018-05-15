const daggerData = {
  weaponPower: {
    base: 6,
    min: 0.6,
    max: 1.8,
    qualityIncrease: 0.3,
  },
  type: 'weapon',
  position: ['rightHand', 'leftHand'],
  model: [
    {name: 'shortDagger', weight: 2, minLv: 0, img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 1.8, lvIncrease: 0.36, max: -1 },
      ],
      defaultAttr: [
        { attr: 'speed', value: 5},
      ],
    },
    {name: 'toothpick', weight: 4, minLv: 12,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 1.8, lvIncrease: 0.36, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'huntingDagger', weight: 6, minLv: 24,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 1.8, lvIncrease: 0.36, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'parryingDagger', weight: 9, minLv: 36,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 1.8, lvIncrease: 0.36, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'SgianDubh', weight: 13, minLv: 46,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 1.8, lvIncrease: 0.36, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'Dirk', weight: 18, minLv: 54,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 1.8, lvIncrease: 0.36, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'Poignard', weight: 24, minLv: 60,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 1.8, lvIncrease: 0.36, max: -1 },
      ],
      defaultAttr: [],
    },
  ],
};

export default daggerData;
