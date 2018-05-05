/*jshint esversion: 6 */
import React from 'react';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../redux/actions/strongHoldActions';

import { Tab, Tabs, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

import strongholdServices from '../../../../services/strongholdServices/strongholdServices';
import HoldableContainer from '../../../../common/holdableContainer/holdableContainer';


class CityHallMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      key: 'main'
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.reducePosition = this.reducePosition.bind(this);
    this.increasePosition = this.increasePosition.bind(this);
    this.upgradeBuilding = this.upgradeBuilding.bind(this);

  }

  componentDidMount() {

  }

  handleSelect(key) {
    this.setState({key});
  }
  upgradeBuilding() {
    let enoughResource = true;
    let resourceNeeded = strongholdServices.getUpgradeResourceRequired(this.props.building, this.props.buildings[this.props.building].lv + 1);
    for(let r in resourceNeeded) {
      if(resourceNeeded[r]>0) {
        enoughResource = resourceNeeded[r]<=this.props.resource[r].current && enoughResource;
      }
    }
    if(enoughResource){
      for(let r in resourceNeeded) {
        this.props.dispatch(strongHoldActions.changeResource({resource: r, amount: -resourceNeeded[r]}));
      }
      this.props.dispatch(strongHoldActions.increaseBuildingLv({building: this.props.building, num: 1}))
    }
  }

  reducePosition(position) {
    if(this.props.workPosition[position].current>0) {
      this.props.dispatch(strongHoldActions.changeWorkPosition({workPosition: position, amount: -1}));
    }
  }

  increasePosition(position) {
    let freeWorker = this.props.resource.room.current - this.props.workPosition.farm.current - this.props.workPosition.lumber.current - this.props.workPosition.stoneMine.current - this.props.workPosition.ironMine.current - this.props.workPosition.silverMine.current - this.props.workPosition.goldMine.current - this.props.workPosition.mythrilMine.current - this.props.workPosition.gemMine.current - this.props.workPosition.crystalMine.current;
    if(this.props.workPosition[position].current<this.props.workPosition[position].max && freeWorker>0) {
      this.props.dispatch(strongHoldActions.changeWorkPosition({workPosition: position, amount: 1}));
    }

  }

  render() {
    //===============================Building Info==============================
    let screenMode = window.matchMedia("(orientation: portrait)").matches?'portrait':'landscape';
    if(this.props.buildings&&this.props.buildings[this.props.building]) {
      let upgradeUI = [];
      let enoughResource = true;
      let resourceNeeded = strongholdServices.getUpgradeResourceRequired(this.props.building, this.props.buildings[this.props.building].lv + 1);
      for(let r in resourceNeeded) {
        if(resourceNeeded[r]>0) {
          enoughResource = resourceNeeded[r]<=this.props.resource[r].current && enoughResource;
          upgradeUI.push(<span className="resouce-type" key={r + 'Typekey'}>{window.localization.gameLanguage.resource[r]}: </span>);
          let currNum = strongholdServices.convertNum(this.props.resource[r].current);
          let requiredNum = strongholdServices.convertNum(resourceNeeded[r]);
          upgradeUI.push(<span style={{color: resourceNeeded[r]>this.props.resource[r].current?"red":"#34F080"}} key={r + 'Shortkey'}>{currNum}</span>);
          upgradeUI.push(<span key={r + 'Needkey'}> / {requiredNum}</span>);
          upgradeUI.push(<div key={r + 'newLine'}></div>);
        }
      }
      upgradeUI.push(<div className="upgrade-btn" key='upgradeBtn'><Button onClick={this.upgradeBuilding} disabled={!enoughResource} bsStyle="primary">{this.LAN.strongHoldUI.lbls.upgradeLevel}</Button></div>)
      //===============================End of Building Info==============================


      //===============================Job Position==============================
      let jobList = [];
      let foodProduce = this.props.workPosition.farm.current*this.props.workPosition.farm.produce.food - this.props.workPosition.lumber.current*this.props.workPosition.lumber.consume.food - this.props.workPosition.stoneMine.current*this.props.workPosition.stoneMine.consume.food - this.props.workPosition.ironMine.current*this.props.workPosition.ironMine.consume.food - this.props.workPosition.silverMine.current*this.props.workPosition.silverMine.consume.food - this.props.workPosition.goldMine.current*this.props.workPosition.goldMine.consume.food - this.props.workPosition.mythrilMine.current*this.props.workPosition.mythrilMine.consume.food - this.props.workPosition.gemMine.current*this.props.workPosition.gemMine.consume.food - this.props.workPosition.crystalMine.current*this.props.workPosition.crystalMine.consume.food;
      for(let position in this.props.workPosition) {
        jobList.push(
          <ListGroupItem key={position + 'Key'}>
            <div>
              <span>{this.LAN.workPosition[position]}:</span>
              <span className="change-position-num-btn">
                <HoldableContainer onHold={()=>this.reducePosition(position)} rate={10}>
                  <Button onClick={()=>this.reducePosition(position)}>-</Button>
                </HoldableContainer>
                <span className="position-num">
                  {this.props.workPosition[position].current} / {this.props.workPosition[position].max}
                </span>
                <HoldableContainer onHold={()=>this.increasePosition(position)} rate={10}>
                  <Button onClick={()=>this.increasePosition(position)}>+</Button>
                </HoldableContainer>
              </span>
              <div className="clear"></div>
            </div>
          </ListGroupItem>
        );
      }






      return (
        <div className="building-menu-container">
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="cityHallTabs"
          >
            <Tab eventKey={'main'} title={this.LAN.strongHoldUI.lbls.main}>
              <div className="tab-content">
                <div className="building-info" style={{background: 'url(' + this.props.buildings[this.props.building].img + ')', backgroundRepeat: 'no-repeat', backgroundSize: (screenMode==='landscape'?'auto 100%':'100% auto'), backgroundPosition: 'center'}}>
                  <div className="building-title">
                    <div className={this.props.building}>
                      {this.props.buildings[this.props.building].name}
                    </div>
                  </div>
                  <div className="building-lv">
                    Lv {this.props.buildings[this.props.building].lv}
                  </div>
                  <div className="building-info-content">
                    <div>{this.LAN.strongHoldUI.lbls.produce}:</div>
                    <p>{this.LAN.resource.money}: {this.props.buildings[this.props.building].lv}/{this.LAN.strongHoldUI.lbls.min}</p>
                    <div>{this.LAN.strongHoldUI.lbls.upgradeResource}</div>
                    <div>{upgradeUI}</div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={'jobs'} title="Worker Arrangement">
              <div className="tab-content">
                <ListGroup>
                  <ListGroupItem>
                    <span className="free-worker-num">
                      {this.LAN.strongHoldUI.cityHall.freeWorkers}: {this.props.resource.room.current - this.props.workPosition.farm.current - this.props.workPosition.lumber.current - this.props.workPosition.stoneMine.current - this.props.workPosition.ironMine.current - this.props.workPosition.silverMine.current - this.props.workPosition.goldMine.current - this.props.workPosition.mythrilMine.current - this.props.workPosition.gemMine.current - this.props.workPosition.crystalMine.current}
                    </span>
                    <span className="food-produce-num right">
                      {this.LAN.resource.food}: <span style={{color: foodProduce>0?'#34F080':'red'}}>{foodProduce}</span>
                    </span>
                  </ListGroupItem>
                  {jobList}
                </ListGroup>
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return <div>Error on City Lord Menu</div>;
    }
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold } = store;
  const { buildings, resource, workPosition } = strongHold || {buildings: {}, resource: {}, workPosition:{},};

	return { buildings, resource, workPosition };
}
export default connect(mapStoreToProps)(CityHallMenu);
