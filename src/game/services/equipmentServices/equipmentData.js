import swordData from './weapon/sword';
import daggerData from './weapon/dagger';
import staffData from './weapon/staff';
import wandData from './weapon/wand';
import shieldData from './weapon/shield';

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
      { attr: 'speed', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'blockRate', value: 3, lvIncrease: 0.2, max: 30 },
    ],
    armor: [
      { attr: 'maxHp', value: 50, lvIncrease: 20, max: 30 },
      { attr: 'maxMp', value: 50, lvIncrease: 20, max: 30 },
      { attr: 'hpRecover', value: 5, lvIncrease: 2, max: 30 },
      { attr: 'mpRecover', value: 5, lvIncrease: 2, max: 30 },
      { attr: 'phyDef', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'magDef', value: 3, lvIncrease: 0.2, max: 30 },
      { attr: 'dodgeRate', value: 3, lvIncrease: 0.2, max: 30 },
    ],


    // glove: ['hpAbsorb', 'mpAbsorb', 'speed', 'criticalRate', 'criticalDamageTimer' ],
    // bracers: ['hpRecover', 'mpRecover', 'speed', 'criticalRate', 'phyAttTimer' ],
    // belt: ['maxHp', 'maxMp', 'phyDef', 'magDef', 'dodgeRate'],
    // ring: ['hpRecover', 'hpAbsorb', 'mpRecover', 'mpAbsorb', 'criticalRate', 'criticalDamageTimer',
    // 'phyAttTimer', 'magAttTimer', 'healTimer', 'healReceiveTimer', 'speed', 'dodgeRate', 'blockRate'],
    // necklace: ['hpRecover', 'hpAbsorb', 'mpRecover', 'mpAbsorb', 'criticalRate', 'criticalDamageTimer',
    // 'phyAttTimer', 'magAttTimer', 'healTimer', 'healReceiveTimer', 'speed', 'dodgeRate', 'blockRate'],

  },
  sword: swordData,
  dagger: daggerData,
  staff: staffData,
  wand: wandData,
  shield: shieldData,

};

export default equipmentData;
