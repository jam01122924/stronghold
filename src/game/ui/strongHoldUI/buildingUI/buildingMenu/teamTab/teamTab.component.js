/*jshint esversion: 6 */
import React from 'react';
import './teamTab.component.css';

import { connect } from 'react-redux';
import * as heroActions from '../../../../../redux/actions/heroActions';
import * as gameStageActions from '../../../../../redux/actions/gameStageActions';

import { Button, Pagination } from 'react-bootstrap';

// import storageServices from '../../../../../services/storageServices/storageServices';
import HoldableContainer from '../../../../../common/holdableContainer/holdableContainer';

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
    this.createNewTeam = this.createNewTeam.bind(this);
    this.start = this.start.bind(this);

  }

  componentDidMount() {

  }

  selectHero(hero) {

  }

  toggleEditTeam() {
    this.setState({editingTeam: !this.state.editingTeam});
  }

  createNewTeam() {
    this.props.dispatch(heroActions.addNewTeam());

  }

  start() {
    if(this.props.hero.team[this.state.selectedTeam]&&this.props.hero.team[this.state.selectedTeam].member.length){
      this.props.dispatch(gameStageActions.changeStage('advantureMap'));
      this.props.dispatch(heroActions.sendHeroToAdvanture(this.state.selectedTeam));
    }
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

    // team list:
    let teamListPagination = [];
    for(let i=1; i<=this.props.hero.team.length; i++) {
      teamListPagination.push(
        <Pagination.Item active={i === this.state.selectedTeam+1} key={'team-page-item-' + i} onClick={()=>{this.setState({selectedTeam: i-1})}}>{i}</Pagination.Item>
      );
    }


    return (
      <div className="team-tab-container">
      {!this.state.editingTeam?(
        <div className="team-view-container">
          <div className="team-member-list">
            {TeamHeroListUI}
          </div>
          <div className="team-edit-btns">
            <div className="team-list-pagination">
              <Pagination bsSize="medium">{teamListPagination}</Pagination>
            </div>
            <div className="team-luggage">
              <div className="luggage-food">
                <HoldableContainer onHold={()=>this.changeFood(-1)} rate={10}>
                  <Button onClick={()=>this.changeFood(-1)}>-</Button>
                </HoldableContainer>
                <span className="luggage-num">
                  
                </span>
                <HoldableContainer onHold={()=>this.changeFood(1)} rate={10}>
                  <Button onClick={()=>this.changeFood(1)}>+</Button>
                </HoldableContainer>
              </div>
            </div>
            <Button onClick={this.start} bsStyle="warning" className="team-start-btn" disabled={!(this.props.hero.team[this.state.selectedTeam]&&this.props.hero.team[this.state.selectedTeam].member.length)}>{this.LAN.strongHoldUI.cityExit.start}</Button>
            <Button onClick={this.toggleEditTeam} >{this.LAN.strongHoldUI.cityExit.editTeam}</Button>
            <Button onClick={this.createNewTeam} >{this.LAN.strongHoldUI.cityExit.createNewTeam}</Button>
          </div>
        </div>
      ):(
        <div className="team-edit-view">
          <PickHeroList teamIndex={this.state.selectedTeam}/>
          <div className="team-edit-btns">
            <Button onClick={this.toggleEditTeam} >{this.LAN.strongHoldUI.cityExit.leave}</Button>
          </div>
        </div>
      )}

      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, storage, gameStage } = store;

	return { hero, storage, gameStage };
}
export default connect(mapStoreToProps)(TeamTab);
