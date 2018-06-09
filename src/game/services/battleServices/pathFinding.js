const pathFinding = {
  findPath: findPath,
  generatePath: generatePath,
  getOpenGrid: getOpenGrid,

  testAccess: testAccess,
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
      let heuristic = 100000;
      let selectIndex = null;
      for(let i=0; i<openList.length; i++) {
        let tempHeuristic = Math.abs(end.x - openList[i].x) + Math.abs(end.y - openList[i].y) + openList[i].cost;
        selectIndex = tempHeuristic<heuristic?i:selectIndex;
        heuristic = tempHeuristic<heuristic?tempHeuristic:heuristic;
      }
      // console.log('picked grid:', openList, selectIndex);

      if(selectIndex!==null) {
        let newOpenGrids = getOpenGrid(map, openList[selectIndex]);
        // console.log('new open grids:', newOpenGrids);
        // remove selected grid from openList
        closeList = closeList.concat(openList.splice(selectIndex, 1));
        // console.log("closeList:", closeList);

        let mergeGrids = []; // Array to save new open grids that is not in open list yet
        // compare new open grids with the current ones in open list, and replace the same one with lower cost
        for(let i=0; i<newOpenGrids.length; i++) {
          // Check if end point is already in the list:
          if(newOpenGrids[i].x === end.x && newOpenGrids[i].y === end.y ) {
            // console.log('========Path Found!========',newOpenGrids[i].path)
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
        // console.log('ready to merge grids:', mergeGrids);
        openList = openList.concat(mergeGrids);
      }
      // console.log("-------while loop result: openList------", openList, " found", found, " count", count);

    }
    console.log('final path:', finalPath);
    console.log('test path:', testPath);

    console.log('Time spend:',new Date() - timeStart);
    return finalPath;

  } else {
    console.log("getPath Error: invalid map or start/end point");
  }
}

function generatePath(map, start, end) {
  let result = findPath(map, start, end);

  let lastGrid = result.path[0];

  for(let i=1; i<result.path.length; i++) {
    let type=(i===result.path.length-1)?'arrow':'path';
    if(lastGrid.x===result.path[i].x){
      if(lastGrid.y===result.path[i].y-1) {
        result.path[i].img = type+'T';
        if(i>1) {
          result.path[i-1].img += 'B';
        }
      } else if(lastGrid.y===result.path[i].y+1) {
        result.path[i].img = type+'B';
        if(i>1) {
          result.path[i-1].img += 'T';
        }
      }
    } else if(lastGrid.x===result.path[i].x-1){
      if(lastGrid.y===result.path[i].y) {
        result.path[i].img = type+'L';
        if(i>1) {
          result.path[i-1].img += 'R';
        }
      }
    } else if(lastGrid.x===result.path[i].x+1){
      if(lastGrid.y===result.path[i].y) {
        result.path[i].img = type+'R';
        if(i>1) {
          result.path[i-1].img += 'L';
        }
      }
    }
    lastGrid =  result.path[i];
  }
  
  console.log(result.path);
  return result;
}

function getOpenGrid(map, pos) {
  let result = [];
  let testGrid = null;
  // console.log(pos.cost);
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

function testAccess(map, pos) {

}


export default pathFinding;
