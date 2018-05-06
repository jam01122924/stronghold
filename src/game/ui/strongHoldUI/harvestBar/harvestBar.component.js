/*jshint esversion: 6 */
import React from 'react';
import './harvestBar.component.css';
import { ProgressBar  } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../redux/actions/strongHoldActions';

import FloatingText from '../../../common/floatingText/floatingText.component';
import strongholdServices from '../../../services/strongholdServices/strongholdServices';

class HarvestBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      harvestTimer: 0,
    };
    this.updateTimer = this.updateTimer.bind(this);
    this.harvestResource = this.harvestResource.bind(this);

  }

  componentDidMount() {
    this.initializeTimer();

  }
  componentWillUnmount() {
    console.log(this.harvestTimer, this.timeoutHarvestInfo);
    clearTimeout(this.timeoutHarvestTimer);
    clearTimeout(this.timeoutHarvestInfo);
  }

  initializeTimer() {
    // check if it's first time:
    let timeNow = Math.floor((new Date()).getTime()/1000);
    if(this.props.timer.heroInTavernTimer===0){
      this.props.dispatch(strongHoldActions.changeHeroInTavernTimer(timeNow));
      this.props.dispatch(strongHoldActions.changeResourceHarvestTimer(timeNow));
    }

    // calculate what has been increased from last time:
    let passNum = Math.floor((timeNow - this.props.timer.resourceHarvestTimer)/this.props.timer.resourceHarvestPeriod);
    let timeLeft = (timeNow - this.props.timer.resourceHarvestTimer)%this.props.timer.resourceHarvestPeriod;
    this.setState({
      harvestTimer: timeLeft
    });
    if(passNum>0) {
      this.harvestResource(passNum);
    }
    this.updateTimer();

  }

  harvestResource(passNum) {
    let timeNow = Math.floor((new Date()).getTime()/1000);
    // Find how many food we need to consume:
    let resourcePerRound = {
      food: 0,
      wood: 0,
      stone: 0,
      iron: 0,
      silver: 0,
      gold: 0,
      mythril: 0,
      gem: 0,
      crystal: 0
    };
    // Loop through all work positions:
    for(let workPos in this.props.workPosition) {
      // Loop through all consume:
      for(let consume in this.props.workPosition[workPos].consume) {
        resourcePerRound[consume] -=  this.props.workPosition[workPos].consume[consume] * this.props.workPosition[workPos].current;
      }
      // Loop through all production:
      for(let product in this.props.workPosition[workPos].produce) {
        resourcePerRound[product] +=  this.props.workPosition[workPos].produce[product] * this.props.workPosition[workPos].current;
      }
    }


    // calculate how many round it can take before we run out of resource:
    for(let r in resourcePerRound) {
      if(resourcePerRound[r]<0) {
        passNum = Math.min(passNum, Math.floor(this.props.resource[r].current/(-resourcePerRound[r])));
      }
    }
    // Display the resource harvested in floating text:
    let harvestInfo = [];

    console.log(resourcePerRound, passNum);
    for(let r in resourcePerRound) {
      if(resourcePerRound[r] > 0){
        harvestInfo.push('+' + resourcePerRound[r]*passNum + ' ' + r);
      }
      this.props.dispatch(strongHoldActions.changeResource({resource: r, amount: resourcePerRound[r]*passNum}));
    }
    this.setState({
      harvestInfo: harvestInfo
    });
    this.timeoutHarvestInfo = setTimeout(()=>{
      this.setState({
        harvestInfo: null
      });
    }, 3000);

    // update timer
    this.props.dispatch(strongHoldActions.changeResourceHarvestTimer(timeNow));
  }

  updateTimer() {
    this.timeoutHarvestTimer = setTimeout(()=>{
      this.setState({
        harvestTimer: this.state.harvestTimer - 5,
      });
      if(this.state.harvestTimer<=0) {
        this.harvestResource(1);
        this.setState({
          harvestTimer: this.props.timer.resourceHarvestPeriod,
        });
      }
      this.updateTimer();
    }, 5000);
  }

  render() {
    return (
      <div className="harvest-bar-container">
        <i className="fa fa-clock-o" aria-hidden="true"></i><ProgressBar className="harvest-progress-bar" bsStyle="info" now={100*this.state.harvestTimer/this.props.timer.resourceHarvestPeriod} />
        {this.state.harvestInfo?<div className="floating-msg"><FloatingText text={this.state.harvestInfo} color="#FFFFFF"/></div>:''}
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold } = store;
  const { resource, workPosition, timer } = strongHold || {resource: {}, workPosition: {}, timer: {}};

	return { resource, workPosition, timer };
}
export default connect(mapStoreToProps)(HarvestBar);
