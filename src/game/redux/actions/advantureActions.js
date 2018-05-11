/*jshint esversion: 6 */
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
