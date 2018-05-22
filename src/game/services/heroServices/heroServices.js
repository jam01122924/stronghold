/*jshint esversion: 6 */

import heroData from '../../data/hero/heroData.js';

const heroServices = {
  createRandomHero: createRandomHero,
  calculateInitStatus: calculateInitStatus,
  calculateCurrStatus: calculateCurrStatus,
  upgradeStatus: upgradeStatus,
  upgradeRating: upgradeRating,
  upgradeHero: upgradeHero,
  getExpRequired: getExpRequired,
  getExpGained: getExpGained,

  getHeroById: getHeroById,
  getHeroIndexById: getHeroIndexById,
};

function createRandomHero(quality) {
  let heroClass = heroData.classes[Math.floor(Math.random()*heroData.classes.length)];
  // console.log(heroClass);
  // MOCKUP: hard code to be first
  heroClass = heroData.classes[0];
  let id = '_' + Math.random().toString(36).substr(2, 9);
  let extraGrow = calculateHeroExtraGrow(quality);
  let initStatus = calculateInitStatus(heroClass, quality, extraGrow);
  let grow = calculateHeroGrow(heroClass, quality, extraGrow);
  let rate = upgradeRating(heroClass, initStatus);
  let newHero = {
    id: id,
    name: heroClass + id,
    class: heroClass,
    lv: 1,
    quality: quality,
    rate: rate,
    energy: 100,
    status: initStatus,
    grow: grow,
    extraGrow: extraGrow,
    talent: [],
    faceImg: heroClass + '-face-img-' + Math.floor(Math.random()*5),
    spriteImg: heroData.classData[heroClass].spriteImg,
    facingNum: 0,   // 0: down, 1: left, 2: right, 3: top
    moving: false,
    equipment: [],
  };
  newHero.calculatedStatus = calculateCurrStatus(newHero);

  return newHero;
}

// function to create lv 1 status for a hero
function calculateInitStatus(heroClass, quality, extraGrow) {
  let result = {
    strength: 0,
    perception: 0,
    endurance: 0,
    sprite: 0,
    intelligence: 0,
    agility: 0,
    luck: 0
  };
  for(let i=0; i<10; i++) {
    result = upgradeStatus(heroClass, quality, extraGrow, result);
  }
  return result;
}

// UNTESTED:
function calculateCurrStatus(hero) {
  let result = hero.status;
  result.weaponPower = 0;
  result.phyDef = 0;
  result.magDef = 0;
  // Calculate Status
  for(let i=0; i<hero.equipment.length; i++) {
    for(let j=0; j<hero.equipment[i].bonus.length; j++) {
      if(hasOwnProperty.call(result, hero.equipment[i].bonus[j].attr)) {
        result[hero.equipment[i].bonus[j].attr] += hero.equipment[i].bonus[j].num;
      }
    }
    if(hero.equipment[i].type === 'weapon') {
      result.weaponPower += hero.equipment[i].weaponPower;
    }
    if(hero.equipment[i].type === 'armor' || hero.equipment[i].type === 'shield') {
      result.phyDef += hero.equipment[i].armor;
      result.magDef += hero.equipment[i].resist;
    }
  }
  result.maxHp = 10 * result.endurance;
  result.hpRecover = 0;
  result.hpAbsorb = 0;
  result.maxMp = 10 * result.intelligence;
  result.mpRecover = 0;
  result.mpAbsorb = 0;
  result.criticalRate = (result.luck - hero.lv*4) * 0.001 + 0.1;
  result.criticalRate = result.criticalRate>0?result.criticalRate:0;
  result.criticalDamageTimer = 1.5;
  result.phyAttTimer = 1;
  result.magDef = 0;
  result.magAttTimer = 1;
  result.healTimer = 1;
  result.healReceiveTimer = 1;
  result.blockRate = 0;



  // Based on Class:
  switch(hero.class) {
    case 'warrior':
      result.phyMeleeAtt = 2 * result.strength + result.weaponPower;
      result.phyRangeAtt = 0;
      result.phyDef += 2 * result.endurance;
      result.magAtt = 0.5 * result.intelligence;
      result.movementRange = 3;
      result.speed = 2 * result.agility;
      result.dodgeRate = (result.agility - hero.lv*4) * 0.001 + 0.1;
      result.hitRate = 2*result.perception;

    break;
    default: break;
  }


  result.hp = hero.calculatedStatus.hp!==undefined?hero.calculatedStatus.hp:result.maxHp;


}

function calculateHeroExtraGrow(quality) {
  let result = {
    strength: Math.round(Math.random()*1000)/100,
    perception: Math.round(Math.random()*1000)/100,
    endurance: Math.round(Math.random()*1000)/100,
    sprite: Math.round(Math.random()*1000)/100,
    intelligence: Math.round(Math.random()*1000)/100,
    agility: Math.round(Math.random()*1000)/100,
    luck: Math.round(Math.random()*1000)/100,
  };
  // Final addup of result much equal to sum.
  let sum = 0;
  switch(quality) {
    case 'c': sum = 0; break;
    case 'b': sum = 2; break;
    case 'a': sum = 4; break;
    case 's': sum = 6; break;
    case 'ss': sum = 8; break;
    case 'sss': sum = 10; break;
    default: sum = 0; break;
  }

  let addup = 0 - sum;
  // Add up result, and calculate the extra grow:
  for(let status in result) {
    addup += result[status];
  }
  addup =  Math.round((addup/7)*100)/100;
  for(let status in result) {
    result[status] = Math.round((result[status] - addup)*100)/100;
  }
  return result;
}

function calculateHeroGrow(heroClass, quality, extraGrow) {
  let result = {};
  let qualityEnhance = 0;
  switch(quality) {
    case 'c': break;
    case 'b': qualityEnhance=1; break;
    case 'a': qualityEnhance=2; break;
    case 's': qualityEnhance=3; break;
    case 'ss': qualityEnhance=4; break;
    case 'sss': qualityEnhance=5; break;
    default: break;
  }

  console.log('=========start to calculate hero growth==========');
  console.log('quality:', quality);
  console.log('extraGrow:', extraGrow);
  console.log('growRate:', heroData.classData[heroClass].growRate);


  if(heroData&&heroData.classData&&heroData.classData[heroClass]&&heroData.classData[heroClass].growRate) {
    for(let status in heroData.classData[heroClass].growRate) {

      console.log('-----calculate hero growth of', status, '-----');
      let statusGrowRate = 0;
      for(let i=0; i<heroData.classData[heroClass].growRate[status].growRate.length; i++) {
      console.log('round', i, ' base rate:', heroData.classData[heroClass].growRate[status].growRate[i].rate, ' quality enhance:', qualityEnhance*heroData.classData[heroClass].growRate[status].qualityIncrease, ' extraRandomGrow:', extraGrow[status]);
        let rate = heroData.classData[heroClass].growRate[status].growRate[i].rate + qualityEnhance*heroData.classData[heroClass].growRate[status].qualityIncrease + extraGrow[status];
        if(rate>0) {
          statusGrowRate += rate * heroData.classData[heroClass].growRate[status].growRate[i].grow / 100;
        } else {
          break;
        }
      }
      console.log(statusGrowRate);
      result[status] = Math.round(statusGrowRate*100)/100;
    }
  }
  return result;
}

// function to calculate how much status will increase on a lv up, based on hero class, hero quality, and current status
function upgradeStatus(heroClass, quality, extraGrow, oldStatus) {
  // console.log(heroClass, oldStatus);
  let result = {};
  let qualityEnhance = 0;
  switch(quality) {
    case 'c': break;
    case 'b': qualityEnhance=1; break;
    case 'a': qualityEnhance=2; break;
    case 's': qualityEnhance=3; break;
    case 'ss': qualityEnhance=4; break;
    case 'sss': qualityEnhance=5; break;
    default: break;
  }

  if(heroData&&heroData.classData&&heroData.classData[heroClass]&&heroData.classData[heroClass].growRate) {
    for(let status in heroData.classData[heroClass].growRate) {
      // console.log(status);
      let odds = Math.random()*100 - qualityEnhance*heroData.classData[heroClass].growRate[status].qualityIncrease - extraGrow[status];
      let increasement = 0;
      for(let i=0; i<heroData.classData[heroClass].growRate[status].growRate.length; i++) {
        // console.log(odds, heroData.classData[heroClass].growRate[status].growRate[i].rate);
        if(odds<heroData.classData[heroClass].growRate[status].growRate[i].rate) {
          increasement = heroData.classData[heroClass].growRate[status].growRate[i].grow;
        }else{
          break;
        }
      }
      result[status] = oldStatus[status] + increasement;
    }
  }
  // console.log(result);
  return result;
}

function upgradeRating(heroClass, heroStatus) {
  let rate = 0;
  for(let status in heroStatus) {
    rate += heroStatus[status]*heroData.classData[heroClass].growRate[status].rateWeight;
  }
  return Math.round(rate);
}

function upgradeHero(heroData) {
  console.log(heroData);
  heroData.lv += 1;
  heroData.status = upgradeStatus(heroData.class, heroData.quality, heroData.extraGrow, heroData.status);
  heroData.rate = upgradeRating(heroData.class, heroData.status);
  return heroData;
}

function getExpRequired(lv) {
  return 30*(lv*lv*lv + 5*lv) - 80;
}

function getExpGained(monsterLv, monsterExp, playerLv) {
  return Math.floor(monsterLv * monsterExp/playerLv);
}




function getHeroById(heroList, id) {
  let result = heroList.filter(h=>{
    return h.id === id;
  });

  if(result.length===1){
    return result[0];
  }
  else {
    return [];
  }
}

function getHeroIndexById(heroList, id) {
  for(let i=0; i<heroList.length; i++) {
    if(heroList[i].id===id) {
      return i;
    }
  }
}



export default heroServices;
