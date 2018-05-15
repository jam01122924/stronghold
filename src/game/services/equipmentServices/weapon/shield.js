const shieldData = {
  armor: {
    base: 5,
    min: 0.5,
    max: 1.5,
    qualityIncrease: 0.1,
  },
  type: 'shield',
  position: ['leftHand'],
  model: [
    {name: 'handShield', weight: 3, minLv: 0, img:'',
      bonusAttr: [
        { attr: 'phyDef', value: 1.5, lvIncrease: 0.3, max: -1 },
        { attr: 'magDef', value: 1.5, lvIncrease: 0.3, max: -1 },
      ],
      defaultAttr: [
        { attr: 'blockRate', value: 15},
      ],
    },
    {name: 'bucklerShield', weight: 6, minLv: 12,  img:'',
      bonusAttr: [
        { attr: 'phyDef', value: 1.5, lvIncrease: 0.3, max: -1 },
        { attr: 'magDef', value: 1.5, lvIncrease: 0.3, max: -1 },
      ],
      defaultAttr: [
        { attr: 'blockRate', value: 20},
      ],
    },
    {name: 'heaterShield', weight: 10, minLv: 24,  img:'',
      bonusAttr: [
        { attr: 'phyDef', value: 1.5, lvIncrease: 0.3, max: -1 },
        { attr: 'magDef', value: 1.5, lvIncrease: 0.3, max: -1 },
      ],
      defaultAttr: [
        { attr: 'blockRate', value: 25},
      ],
    },
    {name: 'kiteShield', weight: 15, minLv: 36,  img:'',
      bonusAttr: [
        { attr: 'phyDef', value: 1.5, lvIncrease: 0.3, max: -1 },
        { attr: 'magDef', value: 1.5, lvIncrease: 0.3, max: -1 },
      ],
      defaultAttr: [
        { attr: 'blockRate', value: 30},
      ],
    },
    {name: 'boucheShield', weight: 21, minLv: 46,  img:'',
      bonusAttr: [
        { attr: 'phyDef', value: 1.5, lvIncrease: 0.3, max: -1 },
        { attr: 'magDef', value: 1.5, lvIncrease: 0.3, max: -1 },
      ],
      defaultAttr: [
        { attr: 'blockRate', value: 35},
      ],
    },
    {name: 'targeShield', weight: 27, minLv: 54,  img:'',
      bonusAttr: [
        { attr: 'phyDef', value: 1.5, lvIncrease: 0.3, max: -1 },
        { attr: 'magDef', value: 1.5, lvIncrease: 0.3, max: -1 },
      ],
      defaultAttr: [
        { attr: 'blockRate', value: 40},
      ],
    },
    {name: 'paviseShield', weight: 35, minLv: 60,  img:'',
      bonusAttr: [
        { attr: 'phyDef', value: 1.5, lvIncrease: 0.3, max: -1 },
        { attr: 'magDef', value: 1.5, lvIncrease: 0.3, max: -1 },
      ],
      defaultAttr: [
        { attr: 'blockRate', value: 45},
      ],
    },
  ],

};

export default shieldData;
