/*jshint esversion: 6 */
import pathFinding from './pathFinding';

const battleServices = {
  // Tactic stage services:
  generateRandomBattleMap: generateRandomBattleMap,
  startTactics: startTactics,
  endTactics: endTactics,
  getOpenGridForDrop: getOpenGridForDrop,

  // Battle:
  findPath: pathFinding.findPath,
  generatePath: pathFinding.generatePath,
  testAccess: pathFinding.testAccess,
};

function generateRandomBattleMap(map, RandomBattleMapSize) {
  RandomBattleMapSize = RandomBattleMapSize?RandomBattleMapSize:12;
  if(map && map.data && map.data.length && map.data[0].length) {
    let mapH = map.data.length;
    let mapW = map.data[0].length;
    let result = [];
    let startX = map.position.x<Math.floor(RandomBattleMapSize/2)?0:map.position.x>(mapW-Math.floor(RandomBattleMapSize/2)-1)?(mapW-RandomBattleMapSize):(map.position.x-Math.floor(RandomBattleMapSize/2));
    let startY = map.position.y<Math.floor(RandomBattleMapSize/2)?0:map.position.y>(mapH-Math.floor(RandomBattleMapSize/2)-1)?(mapH-RandomBattleMapSize):(map.position.y-Math.floor(RandomBattleMapSize/2));
    console.log('startPoint', startX, startY);
    for(let i=0; i<RandomBattleMapSize; i++) {
      result.push([]);
      for(let j=0; j<RandomBattleMapSize; j++) {
        let gridData = JSON.parse(JSON.stringify(map.data[startY+i][startX+j]));
        gridData = setValueForBattle(gridData, {x: j, y: i}, RandomBattleMapSize);
        // console.log(gridData);
        result[i].push(gridData);
      }
    }
    // console.log(result);
    return result;

  }
}

function setValueForBattle (grid, pos, mapSize) {
  const treeMove = 5;

  delete grid.monster;
  grid.battle = {};
  // Move Cost:
  // Def:
  // att:
  // rangeBonus:
  // GridStatus: // fired, smoke, poison,
  grid.battle.move = 0;
  grid.battle.def = 0;
  for(let layer in grid) {
    if(layer!=='battle' && layer!=='hero') {
      if(grid[layer].move!==undefined){
        if(typeof grid[layer].move === 'number' && grid[layer].move>0){
          grid.battle.move += grid[layer].move;
        }
        // Handle Tree:
        else if(grid[layer].move === 'noPass' && grid[layer].type.indexOf('tree-')!==-1) {
          // console.log('no pass transfer', grid[layer]);
          grid.battle.move += treeMove;
          grid.battle.def += 1;
        }
      }
      // Handle Building:
      if(layer==='building') {
        grid.battle.def += 3;
      }
    }
  }

  return grid;

}

function startTactics(map) {
  console.log('---', map)
  if(map && map.length && map[0].length) {
    let mapH = map.length;
    let mapW = map[0].length;
    for(let i=0; i<mapH; i++) {
      for(let j=0; j<mapW; j++) {
        // FOR NOW: player always appear in bottom 3 lines; AI always appear in top 4 lines;
        if(i<4) {
          map[i][j].battle.tactics = 'enemy';
          map[i][j].battle.img = 'enemy-tactics';
        }
        if(i>mapH-3) {
          map[i][j].battle.tactics = 'player';
          map[i][j].battle.img = 'player-tactics';
        }
      }
    }
    // console.log(result);
  }
  return map;
}

function endTactics(map) {
  if(map && map.length && map[0].length) {
    let mapH = map.length;
    let mapW = map[0].length;
    for(let i=0; i<mapH; i++) {
      for(let j=0; j<mapW; j++) {
        // FOR NOW: player always appear in bottom 3 lines; AI always appear in top 4 lines;
        if(i<4) {
          map[i][j].battle.tactics = null;
          map[i][j].battle.img = null;
        }
        if(i>mapH-3) {
          map[i][j].battle.tactics = null;
          map[i][j].battle.img = null;
        }
      }
    }
    // console.log(result);
  }
  return map;
}

function getOpenGridForDrop(map) {
}



export default battleServices;
