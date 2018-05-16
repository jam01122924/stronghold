/*jshint esversion: 6 */

import React from 'react';
import './battleUI.component.css';

import { Button, ButtonGroup, Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as advantureActions from '../../../redux/actions/advantureActions';
import advantureServices from '../../../services/advantureServices/advantureServices';

import BattleMap from './battleMap/battleMap.component';

class BattleUI extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.LAN = window.localization.gameLanguage;
    this.state = {
    };

    this.test = this.test.bind(this);
  }

  componentDidMount() {
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
      <div>
        <h1>BATTLE UI</h1>
        <Button onClick={this.test}>Quit Battle</Button>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	return { };
}
export default connect(mapStoreToProps)(BattleUI);
