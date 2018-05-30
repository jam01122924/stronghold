/*jshint esversion: 6 */


const battleServices = {
  // Tactic stage services:
  generateRandomBattleMap: generateRandomBattleMap,
  startTactics: startTactics,
  endTactics: endTactics,
  getOpenGridForDrop: getOpenGridForDrop,

  // Battle:
  findPath: findPath,
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
  const treeMove = 1;

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
          map[i][j].battle.img = '';
        }
        if(i>mapH-3) {
          map[i][j].battle.img = '';
        }
      }
    }
    // console.log(result);
  }
  return map;
}

function getOpenGridForDrop(map) {
}

function findPath(map, start, end) {
  console.log('========start path finding===========');
  let timeStart = new Date();
  if(start && end && map.length > start.y && map[0].length > start.x && map.length > end.y && map[0].length > end.x) {
    start.cost = 0;
    let openList = [start];
    let closeList = [];
    let currGrid = start;
    let found = false;
    let count = 0;
    let finalPath = {
      cost: -1,
      path: [],
    };
    let testPath = [];

    while(openList.length>0 && !found && count<1500) {
      count++;
      let heuristic = 10000;
      let selectIndex = null;
      for(let i=0; i<openList.length; i++) {
        let tempHeuristic = Math.abs(end.x - openList[i].x) + Math.abs(end.y - openList[i].y) + openList[i].cost;
        selectIndex = tempHeuristic<heuristic?i:selectIndex;
        heuristic = tempHeuristic;
      }
      console.log('picked grid:', openList, selectIndex);

      if(selectIndex!==null) {
        let newOpenGrids = getOpenGrid(map, openList[selectIndex]);
        console.log('new open grids:', newOpenGrids);
        // remove selected grid from openList
        closeList = closeList.concat(openList.splice(selectIndex, 1));
        console.log("closeList:", closeList);
        
        let mergeGrids = []; // Array to save new open grids that is not in open list yet
        // compare new open grids with the current ones in open list, and replace the same one with lower cost
        for(let i=0; i<newOpenGrids.length; i++) {
          // Check if end point is already in the list:
          if(newOpenGrids[i].x === end.x && newOpenGrids[i].y === end.y ) {
            console.log('========Path Found!========',newOpenGrids[i].path)
            
            console.log('Time spend:',new Date() - timeStart);
            finalPath = finalPath.cost>0&&finalPath.cost<newOpenGrids[i].cost?finalPath:{
              cost: newOpenGrids[i].cost,
              path: newOpenGrids[i].path
            };

            testPath.push({
              name: 'new path',
              path: newOpenGrids[i].path,
              cost: newOpenGrids[i].cost,
            })
          } else {
            let alreadyInList = false;
            for(let j=0; j<openList.length; j++) {
              // check if already in the open list
              if(newOpenGrids[i].x === openList[j].x && newOpenGrids[i].y === openList[j].y) {
                alreadyInList = true;
                // compare and replace
                openList[j] = openList[j].cost>newOpenGrids[i].cost?newOpenGrids[i]:openList[j];
                break;
              }
            }
            if(!alreadyInList) {
              let inCloseList = false;
              for(let k=0; k<closeList.length; k++) {
                if(newOpenGrids[i].x === closeList[k].x && newOpenGrids[i].y === closeList[k].y) {
                  inCloseList = true;
                  break;
                }
              }
              if(!inCloseList) {
                mergeGrids.push(newOpenGrids[i]);
              }
            }
          }
        }
        console.log('ready to merge grids:', mergeGrids);
        openList = openList.concat(mergeGrids);
      }
      console.log("-------while loop result: openList------", openList, " found", found, " count", count);
      
    }
    console.log('final path:', finalPath);
    console.log('test path:', testPath);
    return finalPath;

  } else {
    console.log("getPath Error: invalid map or start/end point");
  }
}

function getOpenGrid(map, pos) {
  let result = [];
  let testGrid = null;
  console.log(pos.cost);
  // top:
  if(pos.y>0 && map[pos.y-1][pos.x] && map[pos.y-1][pos.x].battle && map[pos.y-1][pos.x].battle.move !== 'noPass') {
    result.push({
      x: pos.x, y: pos.y-1, cost: pos.cost + map[pos.y-1][pos.x].battle.move,
      path:pos.path&&pos.path.length?pos.path.concat({x: pos.x, y: pos.y}):[{x: pos.x, y: pos.y}]
    });
  }
  //bttom:
  if(pos.y<map.length-1 && map[pos.y+1][pos.x] && map[pos.y+1][pos.x].battle && map[pos.y+1][pos.x].battle.move !== 'noPass') {
    result.push({
      x: pos.x, y: pos.y+1, cost: pos.cost + map[pos.y+1][pos.x].battle.move,
      path:pos.path&&pos.path.length?pos.path.concat({x: pos.x, y: pos.y}):[{x: pos.x, y: pos.y}]
    });
  }
  //left:
  if(pos.x>0 && map[pos.y][pos.x-1] && map[pos.y][pos.x-1].battle && map[pos.y][pos.x-1].battle.move !== 'noPass') {
    result.push({
      x: pos.x-1, y: pos.y, cost: pos.cost + map[pos.y][pos.x-1].battle.move,
      path:pos.path&&pos.path.length?pos.path.concat({x: pos.x, y: pos.y}):[{x: pos.x, y: pos.y}]
    });
  }
  //right:
  if(pos.x<map[0].length-1  && map[pos.y][pos.x+1] && map[pos.y][pos.x+1].battle && map[pos.y][pos.x+1].battle.move !== 'noPass') {
    result.push({
      x: pos.x+1, y: pos.y, cost: pos.cost + map[pos.y][pos.x+1].battle.move,
      path:pos.path&&pos.path.length?pos.path.concat({x: pos.x, y: pos.y}):[{x: pos.x, y: pos.y}]
    });
  }
  return result;
}


export default battleServices;
