/*jshint esversion: 6 */

import React from 'react';
import './heroInfoBox.component.css';
import UnitSprite from '../../../../../../common/unitSprite/unitSprite.component';
import HpMpBar from '../../../../../../common/battle/hpMpBar/hpMpBar.component';

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
      <div className={"hero-info-box-container" + (this.props.isPlaced?' placed-hero-info-box-container':'') + (this.props.isSelected?' selected-hero-info-box-container':'')}>
        <div className="hero-info-img">
          <UnitSprite data={this.props.data} />
        </div>
        <div className="hero-info-name">
          {this.props.data.name}
        </div>
        <div className="hero-info-lv">
          Lv {this.props.data.lv}. {this.props.data.class}
        </div>
        <div className="hero-info-hp">
          <HpMpBar width="80" height="10" curr={this.props.data.calculatedStatus.hp} max={this.props.data.calculatedStatus.maxHp} type="hp"/>
        </div>
        <div className="hero-info-mp">
          <HpMpBar width="80" height="10" curr={this.props.data.calculatedStatus.mp - 10} max={this.props.data.calculatedStatus.maxMp} type="mp"/>
        </div>
        <div className="hero-info-view-btn">
        </div>
      </div>
    );
  }
}

export default (HeroInfoBox);
