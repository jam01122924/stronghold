const equipmentData = {
  commonAttr: {
    all: ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'],
    weapon: ['hpAbsorb', 'mpAbsorb', 'criticalDamageTimer', 'weaponPower', 'speed',],
    shield: ['maxHp', 'hpRecover', 'maxMp', 'mpRecover', 'criticalRate', 'phyDef', 'magDef', 'movementRange', 'speed', 'dodgeRate', 'blockRate',],
    armor: ['maxHp', 'maxMp', 'hpRecover', 'mpRecover', 'phyDef', 'magDef', 'dodgeRate', ],
    glove: ['hpAbsorb', 'mpAbsorb', 'speed', 'criticalRate', 'criticalDamageTimer' ],
    bracers: ['hpRecover', 'mpRecover', 'speed', 'criticalRate', 'phyAttTimer' ],
    belt: ['maxHp', 'maxMp', 'phyDef', 'magDef', 'dodgeRate'],
    ring: ['hpRecover', 'hpAbsorb', 'mpRecover', 'mpAbsorb', 'criticalRate', 'criticalDamageTimer',
    'phyAttTimer', 'magAttTimer', 'healTimer', 'healReceiveTimer', 'speed', 'dodgeRate', 'blockRate'],
    necklace: ['hpRecover', 'hpAbsorb', 'mpRecover', 'mpAbsorb', 'criticalRate', 'criticalDamageTimer',
    'phyAttTimer', 'magAttTimer', 'healTimer', 'healReceiveTimer', 'speed', 'dodgeRate', 'blockRate'],

  },
  sword: {
    weaponPower: {
      base: 10,
      min: 1,
      max: 3,
      qualityIncrease: 0.5,
    },
    type: 'weapon',
    position: ['rightHand', 'leftHand'],
    name: ['shortSword', 'swordstick', 'longSword', 'broadSword', 'cutlass', 'gladius', 'katana'],
    weight: [3, 6, 10, 15, 21, 28, 30],
    lvDiff: [0, 12, 24, 36, 46, 54, 60],
    bonusAttr: []
  },
  dagger: {
    weaponPower: {
      base: 6,
      min: 0.6,
      max: 1.8,
      qualityIncrease: 0.3,
    },
    type: 'weapon',
    position: ['rightHand', 'leftHand'],
    name: ['shortSword', 'swordstick', 'longSword', 'cutlass', 'gladius', 'katana'],
    weight: [2,4,6,9,13,18],
    lvDiff: [5, 12, 21, 32, 45, 60],
  },
  staff: {
    weaponPower: {
      base: 15,
      min: 1.5,
      max: 4.5,
      qualityIncrease: 0.75,
    },
    type: 'weapon',
    position: ['bothHand'],
    name: ['shortSword', 'swordstick', 'longSword', 'cutlass', 'gladius', 'katana'],
    weight: [4,7,11,16,23,30],
    lvDiff: [5, 12, 21, 32, 45, 60],
  },
  wand: {
    weaponPower: {
      base: 10,
      min: 1,
      max: 3,
      qualityIncrease: 0.5,
    },
    type: 'weapon',
    position: ['rightHand'],
    name: ['shortSword', 'swordstick', 'longSword', 'cutlass', 'gladius', 'katana'],
    weight: [2,4,6,8,11,15],
    lvDiff: [5, 12, 21, 32, 45, 60],
  },
  shield: {
    armor: {
      base: 2,
      min: 0.2,
      max: 0.6,
      qualityIncrease: 0.1,
    },
    type: 'shield',
    position: ['leftHand'],
    name: ['shortSword', 'swordstick', 'longSword', 'cutlass', 'gladius', 'katana'],
    weight: [3,6,10,15,21,28],
    lvDiff: [5, 12, 21, 32, 45, 60],
  },

};

export default equipmentData;
