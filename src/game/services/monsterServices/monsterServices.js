/*jshint esversion: 6 */
/*
equipment lv:
worn   -> normal -> good -> excellent -> magical -> epic -> legendary，     set
破损的 -> 普通的 -> 优秀的 -> 精良的 -> 附魔的 -> 史诗级 -> 传说级，           套装
gray  ->  white -> green -> blue -> golden -> purple -> orange             bright green


*/
import equipmentData from './equipmentData';


const qualityClass = ['worn', 'normal', 'good', 'excellent', 'magical', 'epic', 'legendary'];

const equipmentServices = {
  createEquipment: createEquipment,
  // createSpecificEquipment: createSpecificEquipment,
  // upgradeEquipment: upgradeEquipment,
  // breakDownEquipment: breakDownEquipment,
  // sellEquipment: sellEquipment,
  // calculateQuality: calculateQuality,
};

function createEquipment(eClass, quality, lv) {
  if(equipmentData[eClass]){
    let model = {};
    equipmentData[eClass].model.forEach((m)=>{
      model = (m.minLv<=lv)?m:model;
    });
    let qualityClassLv = qualityClass.indexOf(quality);
    console.log(model, qualityClassLv);

    // Calculate default Attr first, and avoid repeat attr:
    let defaultAttr = calculateDefaultAttr(model);

    let result = {
      id: equipmentData[eClass].type + '_' + eClass + '_' + model.minLv + '_' + model.name + '_' + Math.random().toString(36).substr(2, 9),
      class: eClass,
      type: equipmentData[eClass].type,
      name: model.name,
      img: model.img,
      weight: model.weight,
      position: equipmentData[eClass].position,
      quality: quality,
      weaponPower: calculateWeaponPower(eClass, qualityClassLv, lv),
      lv: lv,
      requiredLv: model.minLv,
      forgeLv: 0,
      bonus: calculateBonusArray(eClass, model, qualityClassLv, lv, defaultAttr).concat(defaultAttr),
    };
    console.log(result);
    return result;
  }
  console.log('equipment class not found:', eClass);
}

function calculateWeaponPower(eClass, qualityClassLv, lv) {
  let result = 0;
  let wp = equipmentData[eClass].weaponPower;
  return Math.round(wp.base + lv*(Math.random()*(wp.max-wp.min) + wp.min + qualityClassLv*wp.qualityIncrease));
}

function calculateBonusArray(eClass, model, qualityClassLv, lv, forbiddenAttr) {
  let result = [];
  let attrNum = [0, 0, 1, 2, 3, 4, 4];
  let availableAttr = equipmentData.bonusAttr.all.concat(equipmentData.bonusAttr[equipmentData[eClass].type]).concat(model.bonusAttr);

  // remove forbidden attr from available attr:
  forbiddenAttr.forEach(fAttr => {
    availableAttr.forEach((aAttr, i) => {
      if(fAttr.attr === aAttr.attr) {
        availableAttr.splice(i, 1);
      }
    });
  });

  // Normal Equipment:
  if(qualityClassLv<5) {
    let attrMaxNum = attrNum[qualityClassLv]<=availableAttr.length?attrNum[qualityClassLv]:availableAttr.length;
    for(let i=0; i<attrMaxNum; i++) {
      let bonusItem = calculateBonusItem(availableAttr, lv);
      availableAttr.forEach((aAttr, i) => {
        if(bonusItem.attr === aAttr.attr) {
          availableAttr.splice(i, 1);
        }
      });
      result.push(bonusItem);
    }
  }

  // TODO: Handle special equipment later

  return result;
}

function calculateBonusItem(availableBonusAttrArray, lv) {
  // random pick attr:
  let bonusAttr = availableBonusAttrArray[Math.floor(Math.random()*availableBonusAttrArray.length)];
  // 属性浮动 90% - 110%；
  let floatNum = Math.round(Math.random()*200 + 900)/1000;
  let value = (bonusAttr.value + bonusAttr.lvIncrease * lv) * floatNum;
  if(bonusAttr.max!==-1) {
    value = value>bonusAttr.max?bonusAttr.max:value;
  }
  return {
    attr: bonusAttr.attr,
    value: Math.round(value*100)/100
  };
}

function calculateDefaultAttr(model) {
  let result = [];
  model.defaultAttr.forEach(attr=>{
    result.push(attr);
  });
  return result;
}

function addRandomBonus(eClass, qualityClassLv, lv) {

}

export default equipmentServices;
