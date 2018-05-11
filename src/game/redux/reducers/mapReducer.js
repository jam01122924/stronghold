/*jshint esversion: 6 */
import mapServices from '../../services/mapServices/mapServices';

let initMap = [mapServices.getMapById('map1001')];

const mapReducerInit = {
  mapDatas: initMap,
  // [
  //   {
  //     id: 'map1001',
  //     name: 'peacefulForest',
  //     data: mapServices.getMapById('map1001'),
  //     props: {
  //       mapSize: '',
  //       terrain: '',
  //       water: '',
  //       monster: '',
  //       building: ''
  //     },
  //     position: {
  //       x: 0,
  //       y: 0
  //     },
  //     foodConsume: 1,
  //   }
  // ],
  currentMapIndex: 0,
  season: 'spring',
  selectedTexture: {},
  selectedAction: {
    type: null,
    data: null
  },
  clickAction: '',
  zoom: 1,
  showGrid: false,
  clickPos: {
    x: 0,
    y: 0
  },
};


const mapReducer = (state = mapReducerInit, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      console.log('characterReducer LOAD_DATA');
      return action.data;
    case 'SWITCH_MAP':
      let newMap = mapServices.getMapById(action.data.mapID);
      if(newMap) {
        return {
          ...state,
          mapDatas: [newMap]
        };
      }
      // let mapIndex = findMapIndex(action.data.mapID);
      // if(mapIndex!==-1) {
      //   return {
      //     ...state,
      //     currentMapIndex: mapIndex
      //   };
      // }
      return state;
    case 'ADD_MAP':
      if(action.data) {
        let newState = Object.assign({}, state);
        newState.mapDatas = [].concat(state.mapDatas).concat(action.data);
        console.log(newState);
        return newState;
      }
      return state;
    case 'CHANGE_GRID': {
      console.log(state.mapDatas[state.currentMapIndex].data)
      if(action.data.gridData && action.data.location && action.data.targetLayer &&
        action.data.location.x>=0 &&
        action.data.location.x<state.mapDatas[state.currentMapIndex].data[0].length &&
        action.data.location.y>=0 &&
        action.data.location.y<state.mapDatas[state.currentMapIndex].data.length
      ) {
        console.log('CHANGE_GRID', action.data.targetLayer, state.mapDatas[state.currentMapIndex].data);
        console.log('GRID_DATA', action.data.gridData)
        let newState = {...state};
        newState.mapDatas = [].concat(state.mapDatas.slice(0));
        newState.mapDatas[state.currentMapIndex] = Object.assign({}, state.mapDatas[state.currentMapIndex]);
        newState.mapDatas[state.currentMapIndex].data = [].concat(state.mapDatas[state.currentMapIndex].data.slice(0));
        newState.mapDatas[state.currentMapIndex].data[action.data.location.y] = [].concat(state.mapDatas[state.currentMapIndex].data[action.data.location.y].slice(0));
        newState.mapDatas[state.currentMapIndex].data[action.data.location.y][action.data.location.x] = Object.assign({}, state.mapDatas[state.currentMapIndex].data[action.data.location.y][action.data.location.x]);
        newState.mapDatas[state.currentMapIndex].data[action.data.location.y][action.data.location.x][action.data.targetLayer] = action.data.gridData;
        if(action.data.gridData.type==="erase") {
          delete newState.mapDatas[state.currentMapIndex].data[action.data.location.y][action.data.location.x][action.data.targetLayer];
        }

        return newState;
      }
      return state;
    }
    // case 'CHANGE_LAYER': {
    //   if(action.data.mapData) {
    //     let newState = Object.assign({}, state);
    //     newState.mapDatas = [].concat(state.mapDatas.slice(0));
    //     newState.mapDatas[state.currentMapIndex] = Object.assign({}, state.mapDatas[state.currentMapIndex]);
    //     newState.mapDatas[state.currentMapIndex].data = [].concat(state.mapDatas[state.currentMapIndex].data.slice(0));
    //     return newState;
    //   }
    //   return state;
    // }
    case 'CHANGE_CLICK_ACTION': {
      let newState = Object.assign({}, state);
      newState.clickAction = action.data;
      return newState;
    }
    case 'CHANGE_SELECT_TEXTURE': {
      let newState = Object.assign({}, state);
      newState.selectedTexture = action.data;
      return newState;
    }
    case 'CHANGE_SELECT_ACTION': {
      let newState = Object.assign({}, state);
      newState.selectedAction = action.data;
      return newState;
    }
    case 'SET_MAP_PROPS': {
      //TODO: apply map config to target map
      return state;
    }
    case 'SET_POSITION': {
      let newState = Object.assign({}, state);
      newState.position = action.data;
      newState.mapDatas = [].concat(state.mapDatas);
      newState.mapDatas[state.currentMapIndex] = Object.assign({}, state.mapDatas[state.currentMapIndex]);
      newState.mapDatas[state.currentMapIndex].position = action.data;
      return newState;
    }
    case 'MOVE_POSITION': {
      if((state.mapDatas[state.currentMapIndex].position.y+action.data.y)>=0 &&
      (state.mapDatas[state.currentMapIndex].position.y+action.data.y)<state.mapDatas[state.currentMapIndex].data.length &&
      (state.mapDatas[state.currentMapIndex].position.x+action.data.x)>=0 &&
      (state.mapDatas[state.currentMapIndex].position.x+action.data.x)<state.mapDatas[state.currentMapIndex].data[state.mapDatas[state.currentMapIndex].position.y+action.data.y].length &&
      state.mapDatas[state.currentMapIndex].data[state.mapDatas[state.currentMapIndex].position.y+action.data.y][state.mapDatas[state.currentMapIndex].position.x+action.data.x].move !== -1){
        let newState = Object.assign({}, state);
        newState.position = Object.assign({}, newState.position);
        newState.mapDatas = [].concat(state.mapDatas);
        newState.mapDatas[state.currentMapIndex] = Object.assign({}, state.mapDatas[state.currentMapIndex]);
        newState.mapDatas[state.currentMapIndex].position = Object.assign({}, state.mapDatas[state.currentMapIndex].position);
        newState.mapDatas[state.currentMapIndex].position.x += action.data.x;
        newState.mapDatas[state.currentMapIndex].position.y += action.data.y;

        return newState;
      }
      return state;
      // let newState = Object.assign({}, state);
      // newState.position = Object.assign({}, newState.position);
      // newState.position.x += action.data.x;
      // newState.position.y += action.data.y;
      // // limit boundry
      // newState.position.x = newState.position.x<0?0:newState.position.x;
      // newState.position.x = newState.position.x>=newState.mapData[0].length?(newState.mapData[0].length-1):newState.position.x;
      // newState.position.y = newState.position.y<0?0:newState.position.y;
      // newState.position.y = newState.position.y>=newState.mapData.length?(newState.mapData.length-1):newState.position.y;
      // return newState;
    }

    case 'ZOOM_MAP': {
      let newState = Object.assign({}, state);
      newState.zoom = action.data;
      return newState;
    }
    case 'SHOW_HIDE_GRID': {
      let newState = Object.assign({}, state);
      newState.showGrid = action.data;
      return newState;
    }








    case 'LOAD_LOCALSTORAGE_MAP':
      try {
        // const newState = localStorage.getItem('UCX2018_STATE_MAP');
        // if(newState === null) {
        //   console.log('failed to load map store from localStorage');
        //   return state;
        // }
        // return JSON.parse(newState);
        console.log('ss')
        let newState = Object.assign({}, state);
        newState.mapDatas = mapServices.getAllMap();
        return newState;
      } catch(err) {
        console.log('error on loading map store from localStorage', err);
        return state;
      }

    case 'SAVE_LOCALSTORAGE_MAP':
      try {
        for(let i=0; i<state.mapDatas.length; i++) {
          const serializedState  = JSON.stringify(state.mapDatas[i]);
          localStorage.setItem(state.mapDatas[i].name, serializedState);
        }
      } catch(err) {
        console.log('error on saving map store to localStorage', err);
      }
      return state;

    case 'DELETE_MAP': {
      let newState = {...state};
      newState.mapDatas = [].concat(state.mapDatas);
      newState.mapDatas.splice(action.data, 1);
      return newState;
    }



    default:
      return state;
  }

  // Helper Functions:
  function findMapIndex(id) {
    if(state.mapDatas&&state.mapDatas.length) {
      let index = -1;
      state.mapDatas.forEach((data, i) => {
        if(id===data.id){
          index = i;
          return;
        }
      });
      return index;
    }
  }
};

export default mapReducer;
