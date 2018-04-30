/*jshint esversion: 6 */
import React from 'react';
import './treasureTab.component.css';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../../redux/actions/strongHoldActions';

import { Tab, Tabs, Button } from 'react-bootstrap';

import strongholdServices from '../../../../../services/strongholdServices/strongholdServices';

class TreasureTab extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      key: 'equipment'
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {

  }

  handleSelect(key) {
    this.setState({key});
  }

  render() {
    return (
      <div className="treasure-tab-container">
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="treasureTabs"
        >
          <Tab eventKey={'equipment'} title={this.LAN.strongHoldUI.warehouse.equipment}>
            <div className="tab-content">
              EQUIPMENT
            </div>
          </Tab>
          <Tab eventKey={'item'} title={this.LAN.strongHoldUI.warehouse.item}>
            <div className="tab-content">
              ITEM
            </div>
          </Tab>
          <Tab eventKey={'questItem'} title={this.LAN.strongHoldUI.warehouse.questItem}>
            <div className="tab-content">
              QUEST ITEM
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold } = store;
  const { treasure } = strongHold || {treasure: {}};

	return { treasure };
}
export default connect(mapStoreToProps)(TreasureTab);
