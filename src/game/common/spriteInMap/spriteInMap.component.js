import React from 'react';
import './spriteInMap.component.css';

import Sprite from '../sprite/sprite.component';

// Component used to do sprite animation:
// imgSrc={heroData.spriteImg.url}
// posX={heroData.spriteImg.imgPosX} posY={heroData.spriteImg.imgPosY}
// frameLen={3}
// animateSpeed={12}
// animate={true}
// mapPosition={heroData.targetPosition.position}
// gridSize={6.5}
// handleClick={....}
// opacity={0.5}

class SpriteInMap extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }

  componentDidMount() {
    console.log("11111")
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
  }

  render() {
    let positionUnit = window.innerHeight > window.innerWidth?'vw':'vh';
    let style = {
      position: 'absolute',
      top: this.props.mapPosition.y?(this.props.mapPosition.y*this.props.gridSize + positionUnit):0,
      left: this.props.mapPosition.x?(this.props.mapPosition.x*this.props.gridSize + positionUnit):0,
      opacity: this.props.opacity?this.props.opacity:1,
    }
    return (
      <div className="sprite-in-map-container" style={style} onClick={this.props.handleClick}>
        <Sprite increase={this.props.increase} 
          frameLen={this.props.frameLen} 
          imgSrc={this.props.imgSrc}
          posX={this.props.posX} posY={this.props.posY} 
          animate={this.props.animate} 
          animateSpeed={this.props.animateSpeed} 
        />
      </div>
    )
  }
}

export default SpriteInMap;
