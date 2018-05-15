const staffData = {
  weaponPower: {
    base: 15,
    min: 1.5,
    max: 4.5,
    qualityIncrease: 0.75,
  },
  type: 'weapon',
  position: ['bothHand'],
  model: [
    {name: 'shortStaff', weight: 4, minLv: 0, img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 4.5, lvIncrease: 0.9, max: -1 },
      ],
      defaultAttr: [
        { attr: 'speed', value: 5},
      ],
    },
    {name: 'longStaff', weight: 7, minLv: 12,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 4.5, lvIncrease: 0.9, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'healingStaff', weight: 11, minLv: 24,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 4.5, lvIncrease: 0.9, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'powerStaff', weight: 16, minLv: 36,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 4.5, lvIncrease: 0.9, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'mageStaff', weight: 23, minLv: 46,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 4.5, lvIncrease: 0.9, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'wizardStaff', weight: 30, minLv: 54,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 4.5, lvIncrease: 0.9, max: -1 },
      ],
      defaultAttr: [],
    },
    {name: 'runeStaff', weight: 40, minLv: 60,  img:'',
      bonusAttr: [
        { attr: 'weaponPower', value: 4.5, lvIncrease: 0.9, max: -1 },
      ],
      defaultAttr: [],
    },
  ],
};

export default staffData;
