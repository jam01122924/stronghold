/*jshint esversion: 6 */
/*
equipment lv:
worn   -> normal -> good -> excellent -> magical -> epic -> legendary，     set
破损的 -> 普通的 -> 优秀的 -> 精良的 -> 附魔的 -> 史诗级 -> 传说级，           套装
gray  ->  white -> green -> blue -> golden -> purple -> orange             bright green


*/
import equipmentData from './equipmentData';


const qualityClass = ['worn', 'normal', 'good', 'excellent', 'magical', 'epic', 'legendary'];
const attrArray = [
  'strength',
  'perception',
  'endurance',
  'charisma',
  'intelligence',
  'agility',
  'luck',
  'maxHp',
  'hpRecover',
  'hpAbsorb',
  'maxMp',
  'mpRecover',
  'mpAbsorb',
  'criticalRate',
  'criticalDamageTimer',
  'weaponPower',
  'phyAtt',
  'phyRangeAtt',
  'phyDef',
  'phyAttTimer',
  'magAtt',
  'magDef',
  'magAttTimer',
  'healTimer',
  'healReceiveTimer',
  'movementRange',
  'speed',
  'speach',
  'dodgeRate',
];

const equipmentServices = {
  createEquipment: createEquipment,
  // upgradeEquipment: upgradeEquipment,
  // breakDownEquipment: breakDownEquipment,
  // sellEquipment: sellEquipment,
  // calculateQuality: calculateQuality,
};

function createEquipment(eClass, quality, lv) {
  if(equipmentData[eClass]){
    let diffLvIndex = 0;
    equipmentData[eClass].lvDiff.forEach((diffLv, i)=>{
      diffLvIndex = (lv>=diffLv)?i:diffLvIndex;
    });
    let qualityClassLv = 0;
    qualityClass.forEach((q, i)=>{
      if(q===quality) {
        qualityClassLv = i;
      }
    });
    console.log(diffLvIndex, qualityClassLv);
    let result = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      class: eClass,
      type: equipmentData[eClass].type,
      name: equipmentData[eClass].name[diffLvIndex],
      weight: equipmentData[eClass].weight[diffLvIndex],
      position: equipmentData[eClass].position,
      quality: quality,
      weaponPower: calculatedWeaponPower(eClass, qualityClassLv, lv),
      lv: lv,
      requiredLv: equipmentData[eClass].lvDiff[diffLvIndex],
      bonus: calculatedBonus(eClass, qualityClassLv, lv),
    };
    console.log(result);
    return result;
  }
  console.log('equipment class not found:', eClass);
}

function calculatedWeaponPower(eClass, qualityClassLv, lv) {
  let result = 0;
  let wp = equipmentData[eClass].weaponPower;
  return Math.round(wp.base + lv*(Math.random()*(wp.max-wp.min) + wp.min + qualityClassLv*wp.qualityIncrease));
}

function calculatedBonus(eClass, qualityClassLv, lv) {
  let result = [];
  let attrNum = [0, 0, 1, 2, 3, 4, 4];
  let availableAttr = equipmentData.commonAttr.all.concat(equipmentData.commonAttr[equipmentData[eClass].type]).concat(equipmentData[eClass].bonusAttr);
  let mustHaveAttr = equipmentData[eClass].bonusAttr;
  // Normal Equipment:
  if(qualityClassLv<5) {
    switch(eClass) {
      case 'sword':
      break;
      default:
      break;
    }
  }

  // TODO: Handle special equipment later


  return result;
}

function addRandomBonus(eClass, qualityClassLv, lv) {

}

export default equipmentServices;
