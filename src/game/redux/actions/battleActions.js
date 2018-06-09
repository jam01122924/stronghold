/*jshint esversion: 6 */

export const changeBattleMap = data=>{
  return {
    type: 'CHANGE_MAP_DATA',
    data
  };
};

export const removeBattleMapPath = ()=>{
  return {
    type: 'EMPTY_BATTLE_MAP_PATH'
  };
}

export const changeCurrHoverGridData = data=>{
  return {
    type: 'CHANGE_CURR_HOVER_GRID_DATA',
    data
  };
};
export const addMsgToBattleInfo = data => {
  return {
    type: 'ADD_MSG_TO_BATTLE_INFO',
    data
  };
};
export const emptyBattleInfo = () => {
  return {
    type: 'EMPTY_BATTLE_INFO',
  };
};

export const setBattleStatus = data => {
  return {
    type: 'CHANGE_BATTLE_DATA',
    field: 'battleStatus',
    data: data
  };
};
export const setRoundNum = data => {
  return {
    type: 'CHANGE_BATTLE_DATA',
    field: 'roundNum',
    data: data
  };
};
export const setBattleType = data => {
  return {
    type: 'CHANGE_BATTLE_DATA',
    field: 'battleType',
    data: data
  };
};
export const selectHero = data => {
  return {
    type: 'CHANGE_BATTLE_DATA',
    field: 'selectedHero',
    data:  data
  };
};

export const setMonsterList = data => {
  return {
    type: 'CHANGE_BATTLE_DATA',
    field: 'monster',
    data:  data
  };
};