/*jshint esversion: 6 */

import React from 'react';
import './tacticsStage.component.css';

import { connect } from 'react-redux';
import * as battleActions from '../../../../../redux/actions/battleActions';
import battleServices from '../../../../../services/battleServices/battleServices';

import HeroInfoBox from '../heroInfoBox/heroInfoBox.component';

class TacticsStage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedHero: null
    };

  }

  componentDidMount() {
    // this.props.dispatch(
    //   battleActions.changeBattleMap(battleServices.startTactics(this.props.battleMapDatas.data))
    // );

  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(nextProps) {
  }

  selectHero(hero) {

  }

  dropHero(hero) {

  }


  render() {
    let heroList = [];
    console.log(this.props.team && this.props.team.length>this.props.currentAdvantureTeamIndex)
    if(this.props.team && this.props.team.length>this.props.currentAdvantureTeamIndex) {
      for(let i=0; i<this.props.team[this.props.currentAdvantureTeamIndex].member.length; i++) {
        console.log(this.props.team[this.props.currentAdvantureTeamIndex].member);
        let currHero = this.props.team[this.props.currentAdvantureTeamIndex].member[i];
        heroList.push(
          <div className="hero-select-list-item" key={"heroSelectListItem" + i}>
            <HeroInfoBox data={currHero} />
          </div>
        );
      }
    }
    return (
      <div className="tactics-stage-container">
        <div className="hero-select-list">
          {heroList}
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, battle } = store;
  const { battleMapDatas, battleStatus } = battle || {battleMapDatas: {}, battleStatus: 'none'};
  const { team, currentAdvantureTeamIndex } = hero || {team: [], currentAdvantureTeamIndex: null};

  return { team, currentAdvantureTeamIndex, battleMapDatas, battleStatus };
}
export default connect(mapStoreToProps)(TacticsStage);
