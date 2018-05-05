/*jshint esversion: 6 */
import buildingData from '../../data/stronghold/buildingData';

const strongholdServices = {
  getUpgradeResourceRequired: getUpgradeResourceRequired,
  getStorageUpgradeResourceRequired: getStorageUpgradeResourceRequired,
  getStorageMax: getStorageMax,
  getResourceProduce: getResourceProduce,
  getTavernHeroQuality: getTavernHeroQuality,
  getTavernHeroQualityOdds: getTavernHeroQualityOdds,
  convertNum: convertNum,
};

function getUpgradeResourceRequired(building, lv) {
  if(!buildingData[building]) {
    return;
  }
  let resource = {};
  for(let r in buildingData.upgradeCost) {
    resource[r]=0;
    // console.log(r, lv, buildingData.upgradeCost[r]);
    if(buildingData.upgradeCost[r]<lv) {
      let param = lv-buildingData.upgradeCost[r];
      resource[r] = Math.round((30*(param*param + 5*param)*buildingData[building].upgradeCost)/10)*10;
    }
  }
  return resource;
}

function getStorageUpgradeResourceRequired(resource, lv) {
  if(!buildingData.warehouse[resource]) {
    return;
  }
  return Math.floor(buildingData.warehouse[resource].cost * Math.pow(buildingData.warehouse[resource].timer, lv-1)/10)*10;
}

function getStorageMax(resource, lv) {
  if(!buildingData.warehouse[resource]) {
    return;
  }
  return Math.floor(buildingData.warehouse[resource].increase * Math.pow(buildingData.warehouse[resource].timer, lv)/100)*100;

}

function getResourceProduce(building, lv) {

}

function convertNum(num) {
  if(num>=1000000000) {
    num = Math.floor(num/1000000)/1000;
    num += 'B';
  }else if(num>=1000000) {
    num = Math.floor(num/1000)/1000;
    num += 'M';
  }else if(num>=1000) {
    num = Math.floor(num)/1000;
    num += 'K';
  }
  return num;
}

function getTavernHeroQuality(tavernLv) {
  let odds = getTavernHeroQualityOdds(tavernLv);
  let rand = Math.random()*100;
  // console('getTavernHeroQuality < ', rand, odds);
  let result = 'c';
  for(let quality in odds){
    if(rand<odds[quality]) {
      result = quality;
    } else {
      break;
    }
  }
  return result;
}

function getTavernHeroQualityOdds(tavernLv) {
  return {
    c: 100,
    b: 10*tavernLv>80?80:10*tavernLv,
    a: Math.floor((0.5*tavernLv>60?60:0.5*tavernLv)*10000)/10000,
    s: Math.floor((0.025*tavernLv>30?30:0.025*tavernLv)*10000)/10000,
    ss: Math.floor((0.0012*tavernLv>15?15:0.0012*tavernLv)*10000)/10000,
    sss: Math.floor((0.0005*tavernLv>15?15:0.00005*tavernLv)*10000)/10000,
  };
}

export default strongholdServices;
