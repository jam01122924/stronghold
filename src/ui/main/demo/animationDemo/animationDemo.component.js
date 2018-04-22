import React from 'react';
import './animationDemo.component.css';

import AnimationItem from './animationItem/animationItem.component';

class AnimationDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      animationType: 'move'
    };
    this.changeAnimation = this.changeAnimation.bind(this);
  }

  componentDidMount() {

  }

  changeAnimation(e) {
    this.setState({
      animationType: e.target.value
    }, console.log(this.state));
  }

  render() {
    return (
      <div className="animation-container">
        <div className="animation-content">
          <AnimationItem type={this.state.animationType} />
          Animation:
          <select onChange={this.changeAnimation}>
            <option value="move">Simple Move</option>
            <option value="bounce">Bounce-EaseOut</option>
          </select>
        </div>
      </div>
    );
  }
}

export default AnimationDemo;
