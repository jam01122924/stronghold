/*jshint esversion: 6 */

import React from 'react';
import './battleUI.component.css';

import { Button, ButtonGroup, Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as advantureActions from '../../../redux/actions/advantureActions';
import * as battleActions from '../../../redux/actions/battleActions';
import advantureServices from '../../../services/advantureServices/advantureServices';

import BattleMap from './battleMap/battleMap.component';
import BattleGridInfo from './battleGridInfo/battleGridInfo.component';
import BattleInfo from './battleInfo/battleInfo.component';

class BattleUI extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.LAN = window.localization.gameLanguage;
    this.state = {
    };

    this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(battleActions.setBattleStatus('tactics'));
    this.props.dispatch(battleActions.emptyBattleInfo());
    this.props.dispatch(battleActions.addMsgToBattleInfo('Engage Battle...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('Engage Battle...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('Engage Battle...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('111111...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('Engage Battle...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('Engage Battle...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('Engage Battle...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('2222...'));
    this.props.dispatch(battleActions.addMsgToBattleInfo('Engage Battle...'));

  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(nextProps) {
  }

  test() {
    this.props.dispatch(advantureActions.changeStage('map'));
  }

  render() {
    return (
      <div className="battle-ui-container">
        <div className="battle-map-box">
          <BattleMap />
        </div>
        <div className="battle-info-display-section">
          <div className="battle-info-box">
            <BattleInfo />
            <div style={{position: 'absolute', top: '15px', left: '20px'}}><Button onClick={this.test}>Quit Battle</Button></div>
          </div>
          <div className="battle-grid-info-box">
            <BattleGridInfo />
          </div>
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	return { };
}
export default connect(mapStoreToProps)(BattleUI);
