import React from 'react';

import Sprite from '../sprite/sprite.component';

class UnitSprite extends React.Component {
  render() {
    return (
      <Sprite
        imgSrc={this.props.data.spriteImg.url}
        posX={this.props.data.spriteImg.imgPosX} posY={this.props.data.spriteImg.imgPosY + 9.09*(this.props.data.facingNum?this.props.data.facingNum:0)}
        frameLen={3}
        animateSpeed={12}
        animate={this.props.data.moving}
      />
    );
  }
}

export default UnitSprite;
