/*jshint esversion: 6 */

export const changeAdvantureFood = data=>{
  return {
    type: 'CHANGE_ADVANTURE_PROPS',
    props: 'advantureFood',
    data
  };
}
export const setAdvantureFood = data=>{
  return {
    type: 'SET_ADVANTURE_PROPS',
    props: 'advantureFood',
    data
  };
}
export const changeStage = data=>{
  return {
    type: 'SET_ADVANTURE_PROPS',
    props: 'stage',
    data
  };
}







export const changeMoving = data => {
  return {
    type: 'CHANGE_MOVING',
    data
  };
};

export const changeMainCharSpritePosY = data => {
  return {
    type: 'CHANGE_MAIN_CHAR_SPRITE_POS_Y',
    data
  };
};
