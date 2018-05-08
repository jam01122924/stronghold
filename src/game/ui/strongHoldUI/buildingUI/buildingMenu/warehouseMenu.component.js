/*jshint esversion: 6 */
import React from 'react';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../redux/actions/strongHoldActions';

import { Tab, Tabs, Button, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';

import TreasureTab from './treasureTab/treasureTab.component';
import strongholdServices from '../../../../services/strongholdServices/strongholdServices';

class WarehouseMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      key: 'main',
      treasureKey: 'equipment',
      upgradeUI: '',
      resourceNeeded: 0
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.upgradeStorage = this.upgradeStorage.bind(this);
    this.confirmUpgrade = this.confirmUpgrade.bind(this);
    this.closeStorageUpgradeUI = this.closeStorageUpgradeUI.bind(this);
  }

  componentDidMount() {

  }

  handleSelect(key) {
    this.setState({key});
    if(key!=='storage') {
      setTimeout(()=>{
        this.closeStorageUpgradeUI();
      }, 500)
    }
  }
  openStorageUpgradeUI(storage) {
    this.setState({upgradeUI: storage});
  }
  closeStorageUpgradeUI() {
    this.setState({upgradeUI: ''});
  }

  upgradeStorage(storage) {
    if(this.props.buildings.warehouse.storageLv[storage]!==undefined) {
      let resourceNeeded = strongholdServices.getStorageUpgradeResourceRequired(storage, this.props.buildings.warehouse.storageLv[storage]);
      console.log(resourceNeeded);
      let newMax = strongholdServices.getStorageMax(storage, this.props.buildings.warehouse.storageLv[storage]);
      console.log(newMax);
      this.setState({
        upgradeUI: storage,
        newMax: newMax,
        resourceNeeded: resourceNeeded
      });
    }
  }
  confirmUpgrade() {
    if(this.props.buildings.warehouse.storageLv[this.state.upgradeUI]!==undefined) {
      let resourceNeeded = strongholdServices.getStorageUpgradeResourceRequired(this.state.upgradeUI, this.props.buildings.warehouse.storageLv[this.state.upgradeUI]);
      let newMax = strongholdServices.getStorageMax(this.state.upgradeUI, this.props.buildings.warehouse.storageLv[this.state.upgradeUI]);

      this.props.dispatch(strongHoldActions.changeResource({resource: 'wood', amount: -resourceNeeded}));
      this.props.dispatch(strongHoldActions.changeResourceMax({resource: this.state.upgradeUI, max: newMax}));
      this.props.dispatch(strongHoldActions.increaseStorageLv({storage: this.state.upgradeUI, lv: 1}));

      setTimeout(()=>{
        this.upgradeStorage(this.state.upgradeUI);
      }, 200)
    }
  }

  render() {
    //===============================Building Info==============================
    if(this.props.buildings&&this.props.buildings[this.props.building]) {
      let screenMode = window.matchMedia("(orientation: portrait)").matches?'portrait':'landscape';

      //===================================Storage==================================
      let storageUI = [];
      for(let storage in this.props.resource) {
        if(storage!=='money'&&storage!=='room') {
          let percentage = this.props.resource[storage].current*100/this.props.resource[storage].max;
          storageUI.push(
            <ListGroupItem  key={storage + 'Typekey'} className="center">
              <span className="storage-name">{this.LAN.resource[storage]&&this.LAN.resource[storage].toUpperCase()}</span>
              <span className={"storage-num" + (this.props.resource[storage].current===this.props.resource[storage].max?' storage-full-num':'')}>
                <ProgressBar
                  now={percentage}
                  bsStyle={percentage<30?'success':percentage<80?'info':percentage<99?'warning':'danger'}
                />
                <div className="storage-progress-num">{this.props.resource[storage].current+' / '+this.props.resource[storage].max}</div>
              </span>
              <Button bsStyle="primary" className="storage-upgrade-btn" onClick={()=>{this.upgradeStorage(storage)}}>{this.LAN.strongHoldUI.lbls.upgrade}</Button>
              <div className="clear"></div>
            </ListGroupItem>
          );
        }
      }
      let storageUpgradeUI = (
        <div className="storage-upgrade-ui">
          <div className="resource-info">
            <div className="resource-requirement">
              {this.state.upgradeUI?(this.LAN.building.lv + ' ' + this.props.buildings.warehouse.storageLv[this.state.upgradeUI]  + ' - ' + this.LAN.building.lv + (this.props.buildings.warehouse.storageLv[this.state.upgradeUI]+1)):''}
            </div>
            <div className="resource-requirement">
              {this.LAN.strongHoldUI.lbls.need} {this.LAN.resource.wood} {this.state.resourceNeeded}
            </div>
            <div className="resource-condition">
              {this.props.resource.wood.current>=this.state.resourceNeeded?(
                <div className="success">
                  {this.LAN.strongHoldUI.warehouse.youHaveEnoughResource}
                </div>
              ):(
                <div className="danger">
                  {this.LAN.strongHoldUI.lbls.lack} {this.state.resourceNeeded - this.props.resource.wood.current} {this.LAN.resource.wood}
                </div>
              )}
            </div>
            <div className="storage-info">
              <p>{this.LAN.resource[this.state.upgradeUI]} {this.LAN.strongHoldUI.warehouse.storageLimitIncreased}</p>
              <div>
                {this.props.resource[this.state.upgradeUI?this.state.upgradeUI:'wood'].max} <i className="fa fa-long-arrow-right" aria-hidden="true"></i> {this.state.newMax}
              </div>
            </div>
            <div className="storage-action">
              <Button bsStyle="primary" disabled={this.props.resource.wood.current<this.state.resourceNeeded} onClick={this.confirmUpgrade}>{this.LAN.strongHoldUI.lbls.upgrade}</Button>
              <Button onClick={this.closeStorageUpgradeUI}>{this.LAN.strongHoldUI.lbls.cancel}</Button>
            </div>
          </div>
        </div>
      )

      //===============================End of Storage==============================

      return (
        <div className="building-menu-container">
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="warehouseTabs"
          >
            <Tab eventKey={'main'} title={this.LAN.strongHoldUI.lbls.main}>
              <div className="tab-content">
                <div className="building-info" style={{background: 'url(' + this.props.buildings[this.props.building].img + ')', backgroundRepeat: 'no-repeat', backgroundSize: (screenMode==='landscape'?'auto 100%':'100% auto'), backgroundPosition: 'center'}}>
                  <div className="building-title">
                    <div className={this.props.building}>
                      {this.LAN.building[this.props.building]}
                    </div>
                  </div>
                  <div className="building-lv">
                    {this.LAN.building.lv} {this.props.buildings[this.props.building].lv}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={'resource'} title={this.LAN.strongHoldUI.warehouse.resource}>
              <div className="tab-content">
                {!this.state.upgradeUI?<ListGroup>{storageUI}</ListGroup>:storageUpgradeUI}
              </div>
            </Tab>
            <Tab eventKey={'treasure'} title={this.LAN.strongHoldUI.warehouse.treasure}>
              <div className="tab-content">
                <TreasureTab />
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return <div>Error on City Lord Menu</div>
    }
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold } = store;
  const { buildings, resource } = strongHold || {buildings: {}, resource: {}};

	return { buildings, resource };
}
export default connect(mapStoreToProps)(WarehouseMenu);
