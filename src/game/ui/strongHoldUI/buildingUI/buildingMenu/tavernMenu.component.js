/*jshint esversion: 6 */
import React from 'react';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../redux/actions/strongHoldActions';

import { Tab, Tabs, Button } from 'react-bootstrap';

import strongholdServices from '../../../../services/strongholdServices/strongholdServices';
import TavernHeroTab from './tavernHeroTab/tavernHeroTab.component';

class tavernMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage.strongHoldUI;
    this.state = {
      key: 'main'
    };

    this.handleSelect = this.handleSelect.bind(this);
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
      upgradeUI.push(<div className="upgrade-btn" key='upgradeBtn'><Button onClick={this.upgradeBuilding} disabled={!enoughResource} bsStyle="primary">{this.LAN.lbls.upgradeLevel}</Button></div>)

      //===============================Tavern Upgarde Info==============================
      let tavernUpgardeInfo = [];
      let currentOdds = strongholdServices.getTavernHeroQualityOdds(this.props.buildings.tavern.lv);
      let upgradeOdds = strongholdServices.getTavernHeroQualityOdds(this.props.buildings.tavern.lv + 1);
      for(let quality in currentOdds) {
        tavernUpgardeInfo.push(
          <div className="quality-odds" key={quality + '-odds'}>
            <span className={"quality-name  hero-quality-" + quality}>{quality&&quality.toUpperCase()}:</span>
            <span className="quality-num"> {currentOdds[quality]}% <i className="fa fa-long-arrow-right" aria-hidden="true"></i> {upgradeOdds[quality]}%</span>
          </div>
        );
      }

      return (
        <div className="building-menu-container">
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="tavernTabs"
          >
            <Tab eventKey={'main'} title={this.LAN.lbls.main}>
              <div className="tab-content">
                <div className="building-info" style={{background: 'url(' + this.props.buildings[this.props.building].img + ')', backgroundRepeat: 'no-repeat', backgroundSize: (screenMode==='landscape'?'auto 100%':'100% auto'), backgroundPosition: 'center'}}>
                  <div className="building-title">
                    <div className={this.props.building}>
                      {window.localization.gameLanguage.building[this.props.buildings[this.props.building].name]}
                    </div>
                  </div>
                  <div className="building-lv">
                    {window.localization.gameLanguage.building.lv} {this.props.buildings[this.props.building].lv}
                  </div>
                  <div className="building-info-content" style={{margin: '60px 0 0 0'}}>
                    <div className="tavern-upgrade-info">
                      <div>{this.LAN.tavern.heroQualityRate}:</div>
                      {tavernUpgardeInfo}
                    </div>
                    <div>{this.LAN.lbls.upgradeResource}</div>
                    <div>
                      {upgradeUI}
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey={'heroList'} title={this.LAN.cityLord.heroes}>
              <div className="tab-content">
                <TavernHeroTab />
              </div>
            </Tab>
          </Tabs>
        </div>
      );
    } else {
      return <div>Error on Tavern Menu</div>
    }
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold } = store;
  const { buildings, resource } = strongHold || {buildings: {}, resource: {}};

	return { buildings, resource };
}
export default connect(mapStoreToProps)(tavernMenu);
