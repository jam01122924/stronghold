/*jshint esversion: 6 */

import mapWater from './mapWaterServices';
import mapTree from './mapTreeServices';

import maps from '../../data/maps/mapData';

const mapServices = {
  pickTexture: pickTexture,
  changeGrid: changeGrid,
  generateMap: generateMap,
  validateGridData: validateGridData,

  getMapList: getMapList,
  getMapById: getMapById,
  getAllMap: getAllMap,
};

function pickTexture(mapData, x, y) {

}

// ============================== changeGrid ==================================
function changeGrid(mapData, x, y) {

}


// =========================== end of changeGrid ===============================


// ============================== generateMap ==================================
function generateMap(config, mapDatas) {
  console.log(config);
  config = {
    name: config&&config.name?config.name:'test',
    mapSize: config&&config.mapSize?config.mapSize:'small',
    terrain: config&&config.terrain?config.terrain:'plain',
    water: config&&config.water?config.water:'lots',
    sea: config&&config.sea?config.sea:'none',
    monster: config&&config.monster?config.monster:'normal',
    building: config&&config.building?config.building:'some',
    season: config&&config.season?config.season:'spring',
    mapData: []
  };
  let mapId = '';
  if(mapDatas&&mapDatas.length) {
    mapId = 'map' + (parseInt(mapDatas[mapDatas.length-1].id.substring(3), 10)+1)
  } else {
    mapId = 'map1001';
  }
  let sizeX, sizeY;
  switch(config.mapSize) {
    case 'x-small': sizeX = 10; sizeY = 10; break;
    case 'small': sizeX = 20; sizeY = 20; break;
    case 'middle': sizeX = 30; sizeY = 30; break;
    case 'large': sizeX = 50; sizeY = 50; break;
    case 'x-large': sizeX = 70; sizeY = 70; break;
    case 'huge': sizeX = 100; sizeY = 100; break;
    default: sizeX = 10; sizeY = 10; break;
  }

  let result = gTerrain(sizeX, sizeY, config.terrain);

  // Generate Water:
  if(config.water!=='none') {
    mapWater.generate(sizeX, sizeY, config.water, config.sea, result);
  }

  // Generate Tree:
  mapTree.generate(sizeX, sizeY, config.terrain, result);


  // result = gWater(sizeX, sizeY, config.water, result);
  // let mountain = gMountain(sizeX, sizeY, config);
  // let tree = gTree(sizeX, sizeY, config);
  // let building = gBuilding(sizeX, sizeY, config);
  // let item = gItem(sizeX, sizeY, config);
  // let monster = gMonster(sizeX, sizeY, config);

  // let result = {
  //   terrain: terrain,
  //   geomorphology: combineLayer(water, mountain, tree),
  //   building: building,
  //   item: item,
  //   monster: monster,
  // };

  return {
    id: mapId,
    name: config.name,
    position: {x: Math.floor(sizeX/2), y: Math.floor(sizeY/2)},
    props: config,
    data: result
  };
}

function gTerrain(sizeX, sizeY, terrain){
  let type = '';
  let move = 1;

  switch(terrain) {
    case 'plain': type='mud'; move = 1; break;
    case 'grassland': type='grass'; move = 1; break;
    case 'forest': type='grass'; move = 1; break;
    case 'swamp': type='water-shallow'; move = 2; break;
    case 'snowland': type='snow'; move = 3; break;
    case 'desert': type='sand'; move = 2; break;
    case 'mountain': type='dryMud'; move = 1; break;
    case 'volcanic': type='fire'; move = 2; break;
    default: type='mud'; move = 1; break;
  }
  let result = [];
  for(let i = 0; i<sizeY; i++) {
    result.push([]);
    for(let j=0; j<sizeX; j++) {
      result[i].push({
        terrain: {
          type: type,
          img: type,
          move: move,
          value: "0"
        }
      });
    }
  }
  return result;
}




// function gMountain(size, data){
//   return [[]];
// }
//
// function gTree(size, data){
//   return [[]];
// }
//
// function gBuilding(size, data){
//   return [[]];
// }
//
// function gItem(size, data){
//   return [];
// }
//
// function gMonster(size, data){
//   return [[]];
// }


// function gRandomGridGroup(size, layer, type, data) {
//
// }

// ========================== End of generateMap ===============================

function validateGridData(data) {
  let options = ["terrain", "geomorphology", "building", "item", "monster", "action"];
  return options.indexOf(data)!==-1;
}








function getMapList() {
  let result = [];
  maps.mapDatas.forEach(m=>{
    result.push({id: m.id, name: m.name});
  });
  return result;
}

function getMapById(id) {
  console.log('getMapById', id);
  for(let i=0; i<maps.mapDatas.length; i++){
    if(maps.mapDatas[i].id===id){
      console.log('getMapById_result', maps.mapDatas[i]);
      return maps.mapDatas[i];
    }
  }
}

function getAllMap() {
  return maps.mapDatas;
}



export default mapServices;
