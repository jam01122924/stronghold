const equipmentData = {
  bonusAttr: {
    all: [
      { attr: 'strength', value: 5, lvIncrease: 2, max: -1 },
      { attr: 'perception', value: 5, lvIncrease: 2, max: -1 },
      { attr: 'endurance', value: 5, lvIncrease: 2, max: -1 },
      { attr: 'sprite', value: 5, lvIncrease: 2, max: -1 },
      { attr: 'intelligence', value: 5, lvIncrease: 2, max: -1 },
      { attr: 'agility', value: 5, lvIncrease: 2, max: -1 },
      { attr: 'luck', value: 5, lvIncrease: 2, max: -1 },
    ],

    weapon: [
      { attr: 'hpAbsorb', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'mpAbsorb', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'hitRate', value: 3, lvIncrease: 0.2, max: 15 },
      { attr: 'criticalDamageTimer', value: 5, lvIncrease: 0.5, max: 50 },
      { attr: 'speed', value: 5, lvIncrease: 2, max: -1 },
    ],
    shield: [
      { attr: 'maxHp', value: 50, lvIncrease: 20, max: -1 },
      { attr: 'hpRecover', value: 5, lvIncrease: 2, max: -1 },
      { attr: 'maxMp', value: 50, lvIncrease: 20, max: -1 },
      { attr: 'mpRecover', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'criticalRate', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'phyDef', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'magDef', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'movementRange', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'speed', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'dodgeRate', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'blockRate', value: 3, lvIncrease: 0.2, max: 30 },
    ],
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
