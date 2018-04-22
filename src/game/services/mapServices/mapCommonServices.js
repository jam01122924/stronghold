/*jshint esversion: 6 */
const mapCommonServices = {
  expand: expand,
  getTargetGridArray: getTargetGridArray,
  getEmptyGrid: getEmptyGrid,
  getIsolatedGrid: getIsolatedGrid,
  getAllIsolatedGrid: getAllIsolatedGrid,
  getAllEmptyGrid: getAllEmptyGrid,
  getAdjacentGrid: getAdjacentGrid,
  isIsolatedGrid: isIsolatedGrid,
  changeGrid: changeGrid,
};

function expand(startPoint, amount, data, config) { // config: verticalRate, isEdge, type, texture, move, value
  // check if there's more available empty grid for that type in vertical or horizontal mode:
  // horizontal mode:
  let posChange = 0;
  let hitBorder = false;
  let loopStoper = 2500;
  console.log('==============expand================= startPoint:', startPoint, "config:", config);

  function getPreGridArray(arr, pos){
    if(config.verticalRate===1) {
      return arr.filter(g=>g.y<=pos.y);
    }
    return arr.filter(g=>g.x<=pos.x);
  }
  function getNextGridArray(arr, pos){
    if(config.verticalRate===1) {
      return arr.filter(g=>g.y>pos.y);
    }
    return arr.filter(g=>g.x>pos.x);
  }

  while(amount>0 && loopStoper>0) {
    // Expand on edge:
    let newStartPoint;
    // if it is edge, verticalRate have to be 0 or 1
    if(config.isEdge) {
      if(config.verticalRate===0) {
        newStartPoint = {
          x: startPoint.x,
          y: startPoint.y - posChange
        };
      } else {
        newStartPoint = {
          x: startPoint.x - posChange,
          y: startPoint.y
        };
      }

      // find target array
      let targetGridArray = getTargetGridArray(newStartPoint, data, config.verticalRate===1);
      // find available grids that are still empty on that type:
      targetGridArray = getEmptyGrid(targetGridArray, data, config.type);
      // console.log(targetGridArray);
      // console.log(amount);
      // fill those grids, and reduce the amount
      if(targetGridArray.length) {
        let preGridArray = getPreGridArray(targetGridArray, newStartPoint);
        let nextGridArray = getNextGridArray(targetGridArray, newStartPoint);

        // Fill till the amount is 0, or no more available grids to fill
        while(amount>0 && (preGridArray.length + nextGridArray.length)>0) {
          let targetGridPosition = {};
          // If we have space on both side, randomly pick 1
          if(preGridArray.length>0&&nextGridArray.length>0) {
            let pickSide = Math.random()<0.5?'pre':'next';
            if(pickSide==='pre') {
              targetGridPosition = preGridArray.pop();
            } else {
              targetGridPosition = nextGridArray.shift();
            }
          } else if(preGridArray.length>0) {  // If we only have space on left, pick left
            targetGridPosition = preGridArray.pop();
          } else {  // If we only have space on right, pick right
            targetGridPosition = nextGridArray.shift();
          }
          amount--;
          data[targetGridPosition.y][targetGridPosition.x][config.type] = {
            type: config.texture,
            img: config.texture,
            move: config.move,
            value: config.value
          };
        }
      } else {
        hitBorder = config.verticalRate===0?(startPoint.y - posChange - 1 <0):(startPoint.x - posChange - 1 <0);
        posChange += hitBorder?-1:1;
      }
    } else {
      // Not the edge situation:
      let openList = [startPoint];
      let closeList = [];

      while(amount>0 && openList.length) {
        // pick a random grid from the openList and change it
        let index = Math.floor(Math.random()*openList.length);
        data[openList[index].y][openList[index].x][config.type] = {
          type: config.texture,
          img: config.texture,
          move: config.move,
          value: config.value
        };
        amount--;

        // create an array that is adjacent to the changed grid, and still available to change. Then push them into openList
        [
          {x: openList[index].x-1, y: openList[index].y},
          {x: openList[index].x+1, y: openList[index].y},
          {x: openList[index].x, y: openList[index].y-1},
          {x: openList[index].x, y: openList[index].y+1},
        ].forEach(grid => {
          if(grid.x>=0 && grid.y>=0 && grid.x<data[0].length && grid.y<data.length && data[grid.y][grid.x][config.type]===undefined) {
            if(config.isIsolated && isIsolatedGrid(grid, config.type, data, config.isIsolated==='cross', config.exception)) {
              openList.push(grid);
            } else {
              openList.push(grid);
            }
          }
        });
        // console.log("openList", openList);


        // remove the changed grid from openList, and push it into closeList
        closeList.push(openList[index]);
        openList.splice(index, 1);
      }

    }


    loopStoper--;
  }
  // console.log('final expand result', data);
  return data;
}

function getTargetGridArray(startPoint, data, isVertical) {
  let result = [];
  if(data.length>startPoint.y && data[0].length>startPoint.x) {
    if(isVertical) {
      for(let i=0; i<data.length; i++) {
        result.push({x: startPoint.x, y: i});
      }
    } else {
      for(let i=0; i<data[0].length; i++) {
        result.push({x: i, y: startPoint.y});
      }
    }
  }else {
    console.error('map data is invalid. StartPoint:', startPoint);
    console.error('map data:', data);
  }
  return result;
}

function getEmptyGrid(array, data, type) {
  return array.filter(e => e.y>=0 && data.length>e.y && e.x>=0 && data[e.y].length>e.x && data[e.y][e.x][type] === undefined);
}

function getIsolatedGrid(array, data, type, isCrossOnly) {
  return array.filter(e => e.y>=0 && data.length>e.y && e.x>=0 && data[e.y].length>e.x && isIsolatedGrid(e, type, data, isCrossOnly));
}

function getAllIsolatedGrid(data, type, isCrossOnly) {
  let testArray = [];
  for(let i=0; i<data.length; i++){
    for(let j=0; j<data[i].length; j++){
      testArray.push({x: j, y: i});
    }
  }
  return testArray.filter(e => e.y>=0 && data.length>e.y && e.x>=0 && data[e.y].length>e.x && isIsolatedGrid(e, type, data, isCrossOnly));
}

function getAllEmptyGrid(data, type) {
  let testArray = [];
  for(let i=0; i<data.length; i++){
    for(let j=0; j<data[i].length; j++){
      testArray.push({x: j, y: i});
    }
  }
  return testArray.filter((e)=>{
    return !data[e.y][e.x][type];
  });
}

// function to get adjacent grid based on given data and position:
// isCrossOnly: only consider left, right, top, bottom adjacent grid. If false, consider all 8 grids around
function getAdjacentGrid(pos, data, isCrossOnly) {
  if(data&&data.length&&data.length>pos.y&&data[0].length>pos.x) {
    let result = [];
    let testGrid = [{x: pos.x, y: pos.y}, {x: pos.x-1, y: pos.y}, {x: pos.x+1, y: pos.y}, {x: pos.x, y: pos.y-1}, {x: pos.x, y: pos.y+1}];
    if(!isCrossOnly) {
      testGrid = testGrid.concat([{x: pos.x-1, y: pos.y-1}, {x: pos.x+1, y: pos.y-1}, {x: pos.x-1, y: pos.y+1}, {x: pos.x+1, y: pos.y+1}]);
    }
    testGrid.forEach(p=>{
      if(p.x>=0&&p.x<data[0].length&&p.y>=0&&p.y<data.length) {
        result.push(p);
      }
    });
    // console.log(result);
    return result;
  }
}

function isIsolatedGrid(pos, type, data, isCrossOnly, exception) {
  exception = exception?exception:[];
  let testGrid = getAdjacentGrid(pos, data, isCrossOnly);
  console.log("isIsolatedGrid testGrid(" + pos.x + ", " + pos.y + ")", testGrid, data, exception);
  console.log("result", !testGrid.filter(gridPos => {
    return data[gridPos.y][gridPos.x][type]!==undefined&&exception.indexOf(data[gridPos.y][gridPos.x][type].type)===-1;
  }).length);
  return !testGrid.filter(gridPos => {
    // console.log("isIsolatedGrid", data[gridPos.y][gridPos.x][type], data[gridPos.y][gridPos.x][type]&&exception.indexOf(data[gridPos.y][gridPos.x][type].type));
    return data[gridPos.y][gridPos.x][type]!==undefined&&exception.indexOf(data[gridPos.y][gridPos.x][type].type)===-1;
  }).length;
}

// function isFilled(gridPos, type, data, exception) {
//   return data[gridPos.y][gridPos.x][type]!==undefined&&exception.indexOf(data[gridPos.y][gridPos.x][type].type)===-1;
// }

function changeGrid(data, grid) {

}





export default mapCommonServices;
