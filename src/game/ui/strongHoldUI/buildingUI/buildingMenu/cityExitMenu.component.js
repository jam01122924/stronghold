/*jshint esversion: 6 */
import React from 'react';

import { connect } from 'react-redux';

import { Tab, Tabs } from 'react-bootstrap';

import TeamTab from './teamTab/teamTab.component';

class CityExitMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage.strongHoldUI;
    this.state = {
      key: 'advanture'
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
      <div className="building-menu-container">
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="cityExitTab"
        >
          <Tab eventKey={'advanture'} title={this.LAN.cityExit.advanture}>
            <div className="tab-content">
              <TeamTab type="advanture" />
            </div>
          </Tab>
          <Tab eventKey={'farming'} title={this.LAN.cityExit.farming}>
            <div className="tab-content">
              <TeamTab type="farming" />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold, hero } = store;
  const { buildings, resource } = strongHold || {buildings: {}, resource: {}};

	return { buildings, resource, hero };
}
export default connect(mapStoreToProps)(CityExitMenu);
