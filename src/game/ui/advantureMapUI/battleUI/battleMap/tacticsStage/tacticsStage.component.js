/*jshint esversion: 6 */

import React from 'react';
import './tacticsStage.component.css';

import { Button, Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as advantureActions from '../../../../../redux/actions/advantureActions';
import * as heroActions from '../../../../../redux/actions/heroActions';
import heroServices from '../../../../../services/heroServices/heroServices';
import * as battleActions from '../../../../../redux/actions/battleActions';
import battleServices from '../../../../../services/battleServices/battleServices';
import monsterServices from '../../../../../services/monsterServices/monsterServices';

import HeroInfoBox from '../heroInfoBox/heroInfoBox.component';

class TacticsStage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;

    this.state = {
      deployedHero: false,
      leftHero: false,
      warning: false,
    };

    this.selectHero = this.selectHero.bind(this);
    this.initMonster = this.initMonster.bind(this);
    this.finish = this.finish.bind(this);
    this.confirm = this.confirm.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {
    // this.props.dispatch(
    //   battleActions.changeBattleMap(battleServices.startTactics(this.props.battleMapDatas.data))
    // );
    this.props.dispatch(battleActions.selectHero(''));
    this.props.hired.forEach((h, i)=>{
      h.battleStatus = {
        state: 'finish',
        debuff: [],
        position: {x: null, y: null},
        targetPosition: {x: null, y:null},
        path: [],
      };
      this.props.dispatch(heroActions.changeHero(h, i));
    });

  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(nextProps) {
  }

  selectHero(hero) {
    console.log(this.props.selectedHero)
    let heroData = heroServices.getHeroById(this.props.hired, this.props.selectedHero);
    let heroIndex = heroServices.getHeroIndexById(this.props.hired, this.props.selectedHero);
    if(heroData) {
      heroData.battleStatus.targetPosition = {x: null, y: null};
    }
    this.props.dispatch(heroActions.changeHero(heroData, heroIndex));
    this.props.dispatch(battleActions.selectHero(hero.id));

    setTimeout(()=>{
      heroData = heroServices.getHeroById(this.props.hired, hero.id);
      heroIndex = heroServices.getHeroIndexById(this.props.hired, hero.id);
      if(heroData) {
        heroData.battleStatus.position = {x: null, y: null};
      }
      this.props.dispatch(heroActions.changeHero(heroData, heroIndex));
    }, 100);
  }

  initMonster() {
    let currMap = this.props.mapDatas[this.props.currentMapIndex];
    let monsterArray = currMap.data[currMap.position.y][currMap.position.x]?currMap.data[currMap.position.y][currMap.position.x].monster:null;
    console.log(monsterArray);
    //test:
    battleServices.findPath(this.props.battleMapDatas.data, {x:0, y: 2}, {x:7, y: 0});


    for(let i=0; i<monsterArray.length; i++) {
      let monsterPosX = 0;
      // Pick drop position for monster that is not isolated:















      monsterArray[i].battleStatus = {
        state: 'finish',  // ready, moved, finished, dead,
        debuff: [], // slow, burn, weak, stone, freeze, root, ...
        position: {x: null, y: null},
        targetPosition: {x: null, y:null},
        path: [],
      };
    }

    if(monsterArray) {
      this.props.dispatch(battleActions.setMonsterList(monsterArray));
      this.props.dispatch(battleActions.setBattleStatus('test'));




    } else {
      console.error('Monster Not Found!!!');
      this.props.dispatch(advantureActions.changeStage('map'));
    }


  }

  finish() {
    for(let i=0; i<this.props.team[this.props.currentAdvantureTeamIndex].member.length; i++) {
      let heroData = heroServices.getHeroById(this.props.hired, this.props.team[this.props.currentAdvantureTeamIndex].member[i]);
      if(heroData.battleStatus.position.x === null || heroData.battleStatus.position.y === null) {
        console.log('hero left:', heroData);
        this.setState({
          leftHero: true
        });
      } else if(!this.state.deployedHero) {
        this.setState({
          deployedHero: true
        });
      }
    }
    this.setState({
      warning: true
    });
  }
  confirm() {
    this.setState({
      warning: false
    });
    this.initMonster();
  }

  closeModal() {
    this.setState({
      warning: null,
      leftHero: false,
      deployedHero: false,
    });
  }


  render() {
    let heroList = [];
    if(this.props.team && this.props.team.length>this.props.currentAdvantureTeamIndex) {
      for(let i=0; i<this.props.team[this.props.currentAdvantureTeamIndex].member.length; i++) {
        let currHero = this.props.hired.filter(h=>h.id===this.props.team[this.props.currentAdvantureTeamIndex].member[i]);
        if(currHero&&currHero.length) {
          currHero = currHero[0];
          heroList.push(
            <div className="hero-select-list-item" key={"heroSelectListItem" + i} onClick={()=>{this.selectHero(currHero)}}>
              <HeroInfoBox data={currHero}
                isSelected={this.props.selectedHero && this.props.selectedHero===currHero.id}
                isPlaced={currHero.battleStatus && currHero.battleStatus.position.x!==null&&currHero.battleStatus.position.y!==null}
              />
            </div>
          );
        }
      }
    }
    return (
      <div className="tactics-stage-container">
        <div className="tactics-hero-select-container">
          <div className="hero-select-list">
            <div>{this.LAN.battle.tacticsStage.placeHero}:</div>
            {heroList}
          </div>
        </div>

        <div className="start-btn-container">
          <Button bsStyle="warning" onClick={this.finish}>{this.LAN.confirm.start}</Button>
        </div>

        <Modal show={this.state.warning} onHide={this.closeModal} className="hero-deploy-warning-modal">
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            {!this.state.deployedHero?this.LAN.battle.tacticsStage.noHeroWarning:this.state.leftHero?this.LAN.battle.tacticsStage.unplacedHeroWarning:this.LAN.battle.tacticsStage.startBattleWarning}
          </Modal.Body>
          <Modal.Footer>
            {!this.state.deployedHero?<Button onClick={this.closeModal} bsStyle="primary">{this.LAN.confirm.ok}</Button>:
              <div>
                <Button onClick={this.confirm} bsStyle="primary" disabled={!this.state.deployedHero}>{this.LAN.confirm.yes}</Button>
                <Button onClick={this.closeModal} bsStyle="primary">{this.LAN.confirm.no}</Button>
              </div>
            }
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, battle, map } = store;
  const { battleMapDatas, battleStatus, selectedHero } = battle || {battleMapDatas: {}, battleStatus: 'none', selectedHero: null};
  const { hired, team, currentAdvantureTeamIndex } = hero || {hired: [], team: [], currentAdvantureTeamIndex: null};
  const { mapDatas, currentMapIndex } = map || {mapDatas: [], currentMapIndex: 0};

  return { hired, team, currentAdvantureTeamIndex, battleMapDatas, battleStatus, selectedHero, mapDatas, currentMapIndex };
}
export default connect(mapStoreToProps)(TacticsStage);
