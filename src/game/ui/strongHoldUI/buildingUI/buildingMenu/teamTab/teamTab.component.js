/*jshint esversion: 6 */
import React from 'react';
import './teamTab.component.css';

import { connect } from 'react-redux';
import * as storageActions from '../../../../../redux/actions/storageActions';
import * as heroActions from '../../../../../redux/actions/heroActions';

import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

// import storageServices from '../../../../../services/storageServices/storageServices';
import heroServices from '../../../../../services/heroServices/heroServices';

import PickHeroList from './pickHeroList/pickHeroList.component';

class TeamTab extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      selectedTeam: 0,
      editingTeam: false,
    };

    this.selectHero = this.selectHero.bind(this);
    this.toggleEditTeam = this.toggleEditTeam.bind(this);

  }

  componentDidMount() {

  }

  selectHero(hero) {

  }

  toggleEditTeam() {
    this.setState({editingTeam: !this.state.editingTeam});
  }


  render() {
    let TeamHeroListUI = [];
    for(let i=0; i<this.props.hero.teamSize; i++) {
      // load hero or null as empty
      let hero = this.props.hero.team[this.state.selectedTeam].member.length>i?this.props.hero.team[this.state.selectedTeam].member[i]:null;
      if(hero&&hero.id) {
        TeamHeroListUI.push(
          <div className="team-hero-info" key={'team-hero-' + i}>
            <div className="team-hero-name">
              {hero.name}
            </div>
            <div className="team-hero-lv">
              {this.LAN.hero.info.lv} {hero.lv}. {hero.class}
            </div>
            <div className="team-hero-rate">
              {this.LAN.hero.info.rate}: {hero.rate}
            </div>
            <div className="team-hero-energy">
              {this.LAN.hero.info.energy}: {hero.energy}
            </div>
          </div>
        );
      } else {
        TeamHeroListUI.push(
          <div className="team-hero-info" key={'team-hero-' + i}>
            <div className="team-hero-empty">{this.LAN.strongHoldUI.cityExit.empty}</div>
          </div>
        );
      }
    }


    return (
      <div className="team-tab-container">
      {!this.state.editingTeam?(
        <div className="team-view-container">
          <div className="team-member-list">
            {TeamHeroListUI}
          </div>
          <div className="team-edit-btns">
            <Button onClick={this.toggleEditTeam}>{this.LAN.strongHoldUI.cityExit.editTeam}</Button>
          </div>
        </div>
      ):(
        <div className="team-edit-view">
          <PickHeroList teamIndex={this.state.selectedTeam}/>
          <div className="team-edit-btns">
            <Button onClick={this.toggleEditTeam}>{this.LAN.strongHoldUI.cityExit.leave}</Button>
          </div>
        </div>
      )}

      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, storage } = store;
  const { inventory } = storage || {inventory: {}};

	return { inventory, hero, storage };
}
export default connect(mapStoreToProps)(TeamTab);
