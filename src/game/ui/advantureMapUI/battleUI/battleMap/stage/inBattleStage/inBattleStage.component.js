/*jshint esversion: 6 */

import React from 'react';
import './inBattleStage.component.css';

import { Button, Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as advantureActions from '../../../../../../redux/actions/advantureActions';
import * as heroActions from '../../../../../../redux/actions/heroActions';
import heroServices from '../../../../../../services/heroServices/heroServices';
import * as battleActions from '../../../../../../redux/actions/battleActions';
import battleServices from '../../../../../../services/battleServices/battleServices';
import monsterServices from '../../../../../../services/monsterServices/monsterServices';

import HeroInfoBox from '../../component/heroInfoBox/heroInfoBox.component';

class InBattleStage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;

    this.state = {
    };


  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(nextProps) {
  }

  render() {

  }
}

function mapStoreToProps(store, ownProps) {
  const { hero, battle, map } = store;
  const { battleMapDatas, battleStatus, selectedHero } = battle || { battleMapDatas: {}, battleStatus: 'none', selectedHero: null };
  const { hired, team, currentAdvantureTeamIndex } = hero || { hired: [], team: [], currentAdvantureTeamIndex: null };
  const { mapDatas, currentMapIndex } = map || { mapDatas: [], currentMapIndex: 0 };

  return { hired, team, currentAdvantureTeamIndex, battleMapDatas, battleStatus, selectedHero, mapDatas, currentMapIndex };
}
export default connect(mapStoreToProps)(InBattleStage);
