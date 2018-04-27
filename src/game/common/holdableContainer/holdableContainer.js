import React from 'react';
import {defineHold, Holdable} from 'react-touch';

class HoldableContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.config = {};
  }

  componentDidMount() {
  }


  render() {
    let config = defineHold({
      updateEvery: this.props.rate?(1000/this.props.rate):250,
      holdFor: this.props.length?this.props.length:1000
    });
    return (
      <Holdable config={config} onHoldComplete={this.props.onComplete} onHoldProgress={this.props.onHold}>
        {this.props.children}
      </Holdable >
    );
  }
}

export default HoldableContainer;
