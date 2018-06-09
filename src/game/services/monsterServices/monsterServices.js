/*jshint esversion: 6 */
import monsterData from './monsterData';

import heroServices from '../heroServices/heroServices';

const monsterServices = {
  getMonsterListByClass: getMonsterListByClass,
  getMonsterData: getMonsterData,
  generateMonster: generateMonster,
  cleanMonsterOnMap: cleanMonsterOnMap,
  generateMonsterOnMap: generateMonsterOnMap,
};

function getMonsterListByClass(monsterClass) {
  return monsterData.monsters[monsterClass];
}

function getMonsterData(monsterClass, monster) {
  return monsterData.monsters[monsterClass]&&monsterData.monsters[monsterClass][monster];
}

function generateMonster(monsterClass, monster, lv) {
  let result = JSON.parse(JSON.stringify(getMonsterData(monsterClass, monster)));
  if(result) {
    for(let attr in result.status) {
      result.status[attr] = result.status[attr] * (1 + (lv-1)*monsterData.monsterGrowthRate);
      result.status[attr] = Math.round(10*result.status[attr]*(Math.random()*(monsterData.monsterAdjustMax - monsterData.monsterAdjustMin) + monsterData.monsterAdjustMin))/10;
      console.log(attr, result.status[attr]);
    }
    
    result.lv = lv;
    result.equipment = [];
    result.calculatedStatus = heroServices.calculateCurrStatus(result)
    // TODO: calculate skills, calculated status, and loot

    return result;
  }
}

function cleanMonsterOnMap(map) {
  for(let y=0; y<map.data.length; y++) {
    for(let x=0; x<map.data[y].length; x++) {
      delete map.data[y][x].monster;
    }
  }
}

function generateMonsterOnMap(map) {
  if(map&&map.monsterData&&map.monsterData.length) {
    cleanMonsterOnMap(map);
    for(let i=0; i<map.monsterData.length; i++) {
      let monsterCurrentGroupNum = 0;
      let openPositions = [];
      for(let posX=map.monsterData[i].range.minX; posX<map.monsterData[i].range.maxX; posX++) {
        for(let posY=map.monsterData[i].range.minY; posY<map.monsterData[i].range.maxY; posY++) {
          let reachable = true;
          for(let layer in map.data[posY][posX]) {
            if(map.data[posY][posX][layer].move==='noPass'){
              reachable = false;
            }
          }
          if(reachable&&!map.data[posY][posX].monster&&!map.data[posY][posX].action) {
            openPositions.push({x:posX, y:posY});
          }
        }
      }
      console.log(openPositions);

      let monsterGroupNum = Math.random()*(map.monsterData[i].amount.max - map.monsterData[i].amount.min) + map.monsterData[i].amount.min;
      console.log(monsterGroupNum);
      while(openPositions.length && monsterCurrentGroupNum < monsterGroupNum) {
        let index = Math.floor(Math.random()*openPositions.length);
        map.data[openPositions[index].y][openPositions[index].x].monster = [];
        for(let mIndex=0; mIndex<map.monsterData[i].monsterGroup.length; mIndex++) {
          let monsterNum = Math.round(Math.random()*(map.monsterData[i].monsterGroup[mIndex].amount.max - map.monsterData[i].monsterGroup[mIndex].amount.min) + map.monsterData[i].monsterGroup[mIndex].amount.min);
          while(monsterNum>0) {
            let lv = Math.round(Math.random()*(map.monsterData[i].monsterGroup[mIndex].lv.max - map.monsterData[i].monsterGroup[mIndex].lv.min) +  map.monsterData[i].monsterGroup[mIndex].lv.min);
            console.log('lv:::::', lv);
            let monster = generateMonster(map.monsterData[i].monsterGroup[mIndex].class, map.monsterData[i].monsterGroup[mIndex].monster, lv);
            map.data[openPositions[index].y][openPositions[index].x].monster.push(monster);
            monsterNum--;
          }
        }
        monsterCurrentGroupNum++;
        openPositions.splice(index, 1);
      }

      console.log(map)
    }
  }
}

export default monsterServices;
