import React from 'react';
import './animationItem.component.css';
import GSAP from 'react-gsap-enhancer'
import {TweenMax, Bounce /*, Power2, TimelineLite*/} from "gsap";

class AnimationItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};

    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.animation = this.animation.bind(this);
  }

  componentDidMount() {
    this.icon = document.getElementById("animationIcon");
  }

  animation() {
    switch(this.props.type){
      case 'move':
        return TweenMax.to(this.icon, 1, {x: '+=100px'});
      case 'bounce':
        return TweenMax.to(this.icon, 1, {x: '+=100px', ease: Bounce.easeOut});
      default:
        return TweenMax.to(this.icon, 1, {x: '+=100%'});
    }
  }

  startAnimation() {
    console.log('start animation');
    this.animController = this.addAnimation(this.animation);
    console.log(this.animController);
  }
  stopAnimation() {
    console.log('stop animation');
  }


  render() {
    return (
      <div className="animationItem-container">
        <div className="animationItem-content">
          <div className="animation-area">
            <img src="/favicon.ico" id="animationIcon" alt="animation-icon"></img>
          </div>
          <div className="animation-input-area">
            <div className="animation-control-panel">
              <button type="button" className="btn btn-primary" onClick={this.startAnimation}>START</button>
              <button type="button" className="btn btn-danger" onClick={this.stopAnimation}>STOP</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GSAP()(AnimationItem);
