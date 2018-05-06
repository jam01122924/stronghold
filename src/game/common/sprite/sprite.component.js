import React from 'react';
import './sprite.component.css';

// Component used to do sprite animation:
// increase: {x: 111, y: 111}. Object tells the difference of position between current frame and the next one
// frameLen: frame length. How many pictures are in the animation
// imgSrc: img url
// posX: start position x
// posY: start position y
// animate: bool, decide whether to stop or start animation
// animateSpeed: how many frame per second


class Sprite extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      imgCurrIndex: 0,
    }
    this.animateInterval = null;
    this.animateScript = this.animateScript.bind(this);
  }

  componentDidMount() {
    if(this.props.animate) {
      this.animateScript();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.animateInterval && !nextProps.animate) {
      clearInterval(this.animateInterval);
      this.animateInterval = null;
    }
    if(nextProps.animate && !this.animateInterval) {
      this.animateScript();
    }
  }

  componentWillUnmount() {
    clearInterval(this.animateInterval);
  }

  animateScript() {
    this.animateInterval = setInterval(()=>{
      let imgNextIndex = this.state.imgCurrIndex+1;
      imgNextIndex = imgNextIndex===this.props.frameLen?0:imgNextIndex;
      this.setState({
        imgCurrIndex: imgNextIndex
      });
    }, this.props.animateSpeed?1000/this.props.animateSpeed:100);
  }

  render() {
    let increase = this.props.increase?this.props.increase:{x: 9.1, y: 0};

    console.log()
    let imgStyle = {
      backgroundImage: 'url("' + this.props.imgSrc + '")',
      backgroundPosition: (this.props.posX + this.state.imgCurrIndex*increase.x) + '% ' + (this.props.posY + this.state.imgCurrIndex*increase.y)+'%'
    }
    // console.log('sprite position:', (this.props.posX - this.state.imgCurrIndex*increase.x), (-this.props.posY - this.state.imgCurrIndex*increase.y));

    return (
      <div className="sprite-container">
        <div style={imgStyle} className="sprite-grid-unit"></div>
      </div>
    );
  }
}

export default Sprite;
