/*jshint esversion: 6 */

import React from 'react';
import './heroInfoBox.component.css';

class HeroInfoBox extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };

  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(nextProps) {
  }



  render() {
    return (
      <div className="hero-info-box-container">
        <div className="hero-info-img">
        </div>
        <div className="hero-info-name">
        </div>
        <div className="hero-info-lv">
        </div>
        <div className="hero-info-hp">
        </div>
        <div className="hero-info-mp">
        </div>
        <div className="hero-info-view-btn">
        </div>
      </div>
    );
  }
}

export default (HeroInfoBox);
