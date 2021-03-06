/*jshint esversion: 6 */
import battleServices from '../../services/battleServices/battleServices';
import mapServices from '../../services/mapServices/mapServices';


const battleReducerInit = {
  battleMapDatas: {
    id: 'battleMap001',
    name: 'randomBattleMap001',
    data: [[]], //mapServices.getMapById('map1001'),
    props: {
      mapSize: '',
      terrain: '',
      water: '',
      monster: '',
      building: ''
    },
    currHoverGridData: null,
    zoom: 1,
  },
  selectedHero: null,
  battleStatus: 'none', // none, tactics, playerRound, enemyRound, win, lose
  roundNum: 0,
  battleInfo: [],
  battleType: 'wild', // wild, dungeon, boss
  monster: [],
};


const battleReducer = (state = battleReducerInit, action) => {
  switch (action.type) {
    case 'CHANGE_MAP_DATA': {
      let newState = {...state, battleMapDatas: {...state.battleMapDatas}};
      newState.battleMapDatas.data = action.data;
      return newState;
    }
    case 'EMPTY_BATTLE_MAP_PATH': {
      let newState = {...state, battleMapDatas: {...state.battleMapDatas, data: {...state.battleMapDatas.data}}};
      newState.battleMapDatas.data.forEach(line=>{
        line.forEach(grid=>{
          delete grid.path;
        });
      });
      return newState;
    }
    case 'CHANGE_CURR_HOVER_GRID_DATA': {
      let newState = {...state, battleMapDatas: {...state.battleMapDatas}};
      newState.battleMapDatas.currHoverGridData = action.data;
      return newState;
    }

    // lv 1 props:
    case 'CHANGE_BATTLE_DATA': {
      let newState = {...state};
      newState[action.field] = action.data;
      return newState;
    }
    // Battle Info related:
    case 'ADD_MSG_TO_BATTLE_INFO': {
      let newState = {...state};
      newState.battleInfo.pop();
      newState.battleInfo.push(action.data);
      newState.battleInfo.push('...');
      return newState;
    }
    case 'EMPTY_BATTLE_INFO': {
      let newState = {...state};
      newState.battleInfo = [];
      return newState;
    }



    default:
      return state;
  }
}

export default battleReducer;
