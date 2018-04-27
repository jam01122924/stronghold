/*jshint esversion: 6 */
import React from 'react';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../redux/actions/strongHoldActions';

import { Tab, Tabs, Button, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';

import strongholdServices from '../../../../services/strongholdServices/strongholdServices';

class WarehouseMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage.strongHoldUI;
    this.state = {
      key: 'main',
      upgradeUI: '',
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.upgradeStorage = this.upgradeStorage.bind(this);
  }

  componentDidMount() {

  }

  handleSelect(key) {
    this.setState({key});
  }
  openStorageUpgradeUI(storage) {
    this.setState({upgradeUI: storage});
  }

  upgradeStorage(storage) {
    if(this.props.buildings.warehouse.storageLv[storage]!==undefined) {
      let resourceNeeded = strongholdServices.getStorageUpgradeResourceRequired(storage, this.props.buildings.warehouse.storageLv[storage]);
      console.log(resourceNeeded);

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
              <span className="storage-name">{storage.toUpperCase()}</span>
              <span className={"storage-num" + (this.props.resource[storage].current===this.props.resource[storage].max?' storage-full-num':'')}>
                <ProgressBar
                  now={percentage}
                  bsStyle={percentage<30?'success':percentage<80?'info':percentage<99?'warning':'danger'}
                />
                <div className="storage-progress-num">{this.props.resource[storage].current+' / '+this.props.resource[storage].max}</div>
              </span>
              <Button bsStyle="primary" className="storage-upgrade-btn" onClick={()=>{this.upgradeStorage(storage)}}>Upgrade</Button>
              <div className="clear"></div>
            </ListGroupItem>
          );
        }
      }
      let storageUpgradeUI = (
        <div className="storage-upgrade-ui">

        </div>
      )

      //===============================End of Storage==============================

      return (
        <div className="building-menu-container">
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={'main'} title="Main">
              <div className="tab-content">
                <div className="building-info" style={{background: 'url(' + this.props.buildings[this.props.building].img + ')', backgroundRepeat: 'no-repeat', backgroundSize: (screenMode==='landscape'?'auto 100%':'100% auto')}}>
                  <div className="building-title">
                    <div className={this.props.building}>
                      {this.props.buildings[this.props.building].name}
                    </div>
                  </div>
                  <div className="building-lv">
                    Lv {this.props.buildings[this.props.building].lv}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={'storage'} title="Storage">
              <div className="tab-content">
                <ListGroup>
                  {storageUI}
                </ListGroup>
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
