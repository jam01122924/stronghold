/*jshint esversion: 6 */

import React from 'react';
import './tacticsStage.component.css';

import { connect } from 'react-redux';
import * as battleActions from '../../../../../redux/actions/battleActions';
import battleServices from '../../../../../services/battleServices/battleServices';

class TacticsStage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };

  }

  componentDidMount() {
    this.props.dispatch(
      battleActions.changeBattleMap(battleServices.startTactics(this.props.battleMapDatas.data))
    );

  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(nextProps) {
  }


  render() {
    return (
      <div className="tactics-stage-container">
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, battle } = store;
  const { battleMapDatas, battleStatus } = battle || {battleMapDatas: {}, battleStatus: 'none'};

  return { hero, battleMapDatas, battleStatus };
}
export default connect(mapStoreToProps)(TacticsStage);
