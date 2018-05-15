/*jshint esversion: 6 */

import reduxStore from '../../redux/store';
import * as advantureActions from '../../redux/actions/advantureActions';
import * as mapActions from '../../redux/actions/mapActions';
import maps from '../../data/maps/mapData';
import advantureData from './advantureData';

let moveAnimateTimeout = null;
const advantureServices = {
  getOpenWeight: getOpenWeight,

  generateMonster: generateMonster,



  handleKeyDown: handleKeyDown,
  movePosition: movePosition,
  toClearTimeout: toClearTimeout,

};

function getOpenWeight(member) {
  let result = 0;
  for(let i=0; i<member.length; i++) {
    result += member[i].calculatedStatus.strength*5;
    for(let j=0; j<member[i].equipment.length; j++) {
      result -= member[i].equipment[j].weight;
    }
  }
  return result;
}

function generateMonster(mapData) {

}




function handleKeyDown(event) {
  if(!moveAnimateTimeout) {
    switch(event.key) {
      case 'ArrowUp':
        movePosition(0, -1);
        reduxStore.store.dispatch(advantureActions.changeMainCharSpritePosY(27.3));
        break;
      case 'ArrowDown':
        movePosition(0, 1);
        reduxStore.store.dispatch(advantureActions.changeMainCharSpritePosY(0));
        break;
      case 'ArrowLeft':
        movePosition(-1, 0);
        reduxStore.store.dispatch(advantureActions.changeMainCharSpritePosY(9.1));
        break;
      case 'ArrowRight':
        movePosition(1, 0);
        reduxStore.store.dispatch(advantureActions.changeMainCharSpritePosY(18.2));
        break;
      default:
        break;
    }
  }
}
function movePosition(x, y) {
  let stateMap = reduxStore.store.getState().map;
  let mapD = stateMap.mapDatas[stateMap.currentMapIndex];
  // Check if target position is in range:
  if((mapD.position.y+y)>=0 && (mapD.position.y+y)<mapD.data.length && (mapD.position.x+x)>=0 && (mapD.position.x+x)<mapD.data[mapD.position.y+y].length) {
    let moveCost = 0;
    for(let layer in mapD.data[mapD.position.y+y][mapD.position.x+x]) {
      if(layer!=='action'){
        if(mapD.data[mapD.position.y+y][mapD.position.x+x][layer].move!=='noPass'&&typeof mapD.data[mapD.position.y+y][mapD.position.x+x][layer].move === 'number') {
          moveCost += mapD.data[mapD.position.y+y][mapD.position.x+x][layer].move;
        } else {
          return;
        }
      }
    }
    // TODO: Deal with moveCost


    reduxStore.store.dispatch(mapActions.movePosition({x: x, y: y}));

    // animate character sprite:
    reduxStore.store.dispatch(advantureActions.changeMoving(true));
    moveAnimateTimeout = setTimeout(()=>{
      reduxStore.store.dispatch(advantureActions.changeMoving(false));
      toClearTimeout();
    }, 200);

    // Trigger action on target position:
    if(mapD.data[mapD.position.y+y][mapD.position.x+x].action) {
      console.log(mapD.data[mapD.position.y+y][mapD.position.x+x].action);
    }
  }
}
function toClearTimeout() {
  clearTimeout(moveAnimateTimeout);
  moveAnimateTimeout = null;
}



export default advantureServices;
