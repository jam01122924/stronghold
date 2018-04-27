/*jshint esversion: 6 */
import React from 'react';
import './strongHoldUI.component.css';
import { Swipeable } from 'react-touch';
import { ProgressBar  } from 'react-bootstrap';
import $ from 'jquery';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';
import * as characterActions from '../../redux/actions/characterActions';
import * as strongHoldActions from '../../redux/actions/strongHoldActions';

import Header from './header/header.component';
import FloatingText from '../../common/floatingText/floatingText.component';
import BuildingUI from './buildingUI/buildingUI.component';
import strongholdServices from '../../services/strongholdServices/strongholdServices';

class StrongHoldUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      currentUI: 'main',
      lumberProgress: 0,
      needMoreResource: false,
    };
    this.residentialDistrictContent = (
      <div className="living-house">
        {/*
        <div className="living-house1">
          <img src="/imgs/house/small/livinghouse1.png" />
          <div className="building-name-tag-container">
            <div className="building-name-tag">{this.props.buildings.residentialDistrict.name}</div>
          </div>
        </div>
        <div className="living-house2">
          <img src="/imgs/house/small/livinghouse2.png" />
          <div className="building-name-tag-container">
            <div className="building-name-tag">{this.props.buildings.residentialDistrict.name}</div>
          </div>
        </div>
        <div className="living-house4">
          <img src="/imgs/house/small/livinghouse4.png" />
          <div className="building-name-tag-container">
            <div className="building-name-tag">{this.props.buildings.residentialDistrict.name}</div>
          </div>
        </div>
        <div className="living-house5">
          <img src="/imgs/house/small/livinghouse5.png" />
          <div className="building-name-tag-container">
            <div className="building-name-tag">{this.props.buildings.residentialDistrict.name}</div>
          </div>
        </div>
        <div className="living-house6">
          <img src="/imgs/house/small/livinghouse6.png" />
          <div className="building-name-tag-container">
            <div className="building-name-tag">{this.props.buildings.residentialDistrict.name}</div>
          </div>
        </div>
        <div className="living-house3">
          <img src="/imgs/house/small/livinghouse3.png" />
          <div className="building-name-tag-container">
            <div className="building-name-tag">{this.props.buildings.residentialDistrict.name}</div>
          </div>
        </div>
        */}
        <div className="living-house7">
          <img src="/imgs/house/small/livinghouse7.png" />
          <div className="building-name-tag-container">
            <div className="building-name-tag">{this.LAN.building.residentialDistrict}</div>
          </div>
        </div>
      </div>
    );

    this.bgScreen = React.createRef();
    this.openBuilding = this.openBuilding.bind(this);
    this.closeBuilding = this.closeBuilding.bind(this);
  }

  componentDidMount() {
  }

  bgSwipe(direction) {
    let scrollLeft = this.bgScreen.current.scrollLeft + (direction==='left'?450:-450);
    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $("#strongholdBG").stop().animate({scrollLeft: scrollLeft}, 500, 'swing');
    }
  }

  openBuilding(building, event) {
    if (!this.props.buildings.hasOwnProperty(building)) return;
    if(this.props.buildings[building].lv===0) {
      // Check if the resource is enough:
      let resourceNeeded = strongholdServices.getUpgradeResourceRequired(building, 1);
      console.log(resourceNeeded);
      let enough = true;
      let lackMsg = '';
      for(let r in resourceNeeded) {
        if(!(this.props.resource[r]&&this.props.resource[r].current>=resourceNeeded[r])) {
          enough = false;
          lackMsg += this.LAN.strongHoldUI.messages.notEnoughResource.part2 + (resourceNeeded[r]-this.props.resource[r].current) + this.LAN.strongHoldUI.messages.notEnoughResource.part3 + this.LAN.resource[r] +'. ';
        }
      }
      if(enough) {
        for(let r in resourceNeeded) {
          this.props.dispatch(strongHoldActions.changeResource({resource: r, amount: -resourceNeeded[r]}));
        }
        this.props.dispatch(strongHoldActions.increaseBuildingLv({building: building, num: 1}));
      } else {
        if(!this.state.needMoreResource) {
          let msg = this.LAN.strongHoldUI.messages.notEnoughResource.part1;
          this.setState({
            needMoreResource: msg + lackMsg
          });
          setTimeout(()=>{
            this.setState({
              needMoreResource: false
            });
          }, 2100);
        }
      }
    }else if(building==='lumberMill'){
      this.setState({
        lumberProgress: this.state.lumberProgress + 10
      }, ()=>{
        if(this.state.lumberProgress>=100) {
          this.props.dispatch(strongHoldActions.changeResource({resource: 'wood', amount: this.props.buildings.lumberMill.lv*100}));
          this.setState({
            lumberProgress: 0,
            needMoreResource: '+ ' + this.props.buildings.lumberMill.lv*10 + ' ' + this.LAN.resource.wood
          });
          setTimeout(()=>{
            this.setState({
              needMoreResource: false
            });
          }, 1000);
        }
      })
    } else {
      this.setState({currentUI: building});
    }
  }

  closeBuilding() {
    this.setState({currentUI: 'main'});
  }

  render() {
    let buildingContent = [];
    for(let building in this.props.buildings) {
      // skip loop if the property is from prototype
      if (!this.props.buildings.hasOwnProperty(building)) continue;
      if(building!=='residentialDistrict') {
        let obj = this.props.buildings[building];
        buildingContent.push(
          <div className={"building-img-container " + building} key={building} onClick={(e)=>{this.openBuilding(building, e)}}>
            <img src={obj.lv>0?obj.img:'/imgs/house/small/ruin.png'} />
            <div className="building-name-tag-container">
              <div className="building-name-tag">{this.LAN.building[building]} {obj.lv===0?(this.LAN.strongHoldUI.messages.ruinBuild.part1 + strongholdServices.getUpgradeResourceRequired(building, 1).wood + this.LAN.strongHoldUI.messages.ruinBuild.part2):''}</div>
            </div>
            {building==='lumberMill'&&this.state.lumberProgress>0?<div className="lumber-progress-container"><ProgressBar now={this.state.lumberProgress} /></div>:''}
          </div>
        );
      }
    }

    return (
      <div className="stronghold-ui-container">
        <div className="header-container">
          <Header />
        </div>

        <Swipeable onSwipeLeft={()=>{this.bgSwipe('left')}} onSwipeRight={()=>{this.bgSwipe('right')}}>
          <div className="stronghold-bg" ref={this.bgScreen} id="strongholdBG">
            <img src="/imgs/village_bg2.jpg" />
            <div className="stronghold-building-container">
              <div className="stronghold-building-content">
                {buildingContent}
                {this.residentialDistrictContent}
              </div>
            </div>
          </div>
        </Swipeable>
        <div className="building-UI">
          <BuildingUI
            current={this.state.currentUI}
            building={this.props.buildings[this.state.currentUI]}
            close={this.closeBuilding}
          />
        </div>
        {this.state.needMoreResource?<div className="floating-msg"><FloatingText text={this.state.needMoreResource} color="#FFFFFF"/></div>:''}
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage, strongHold } = store;
  const { stage } = gameStage || { stage: '' };
  const { buildings, resource } = strongHold || {buildings: {}, resource: {}};

	return { stage, buildings, resource };
}
export default connect(mapStoreToProps)(StrongHoldUI);
