/*jshint esversion: 6 */

import React from 'react';
import './charForBattle.component.css';

import { Button } from 'react-bootstrap';
import SpriteInMap from '../../../../../../common/spriteInMap/spriteInMap.component';

import { connect } from 'react-redux';
import * as battleActions from '../../../../../../redux/actions/battleActions';
import battleServices from '../../../../../../services/battleServices/battleServices';
import * as heroActions from '../../../../../../redux/actions/heroActions';
import heroServices from '../../../../../../services/heroServices/heroServices';

import spritePosition from '../../../../../../data/spritePosition';

class CharForBattle extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.LAN = window.localization.gameLanguage;

    this.handleCharHover = this.handleCharHover.bind(this);
    this.handleCharClick = this.handleCharClick.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  componentWillReceiveProps(nextProps) {
  }




  handleCharHover() {
    switch (this.props.battleStatus) {
      case 'tactics':
        if (this.props.selectedHero) {

        }
        break;
      default:
        break;
    }
  }

  handleCharClick() {
    switch (this.props.battleStatus) {
      case 'tactics':
        if (this.props.selectedHero) {
          let heroIndex = heroServices.getHeroIndexById(this.props.hired, this.props.selectedHero);
          let positionOccupied = false;
          // loop through all hired heroes to save trouble:
          for(let i=0; i<this.props.hired.length; i++) {
            if(this.props.hired[i].battleStatus.position.x === this.props.hired[heroIndex].battleStatus.targetPosition.x && this.props.hired[i].battleStatus.position.y === this.props.hired[heroIndex].battleStatus.targetPosition.y) {
              console.log('occupied');
              positionOccupied = true;
            }
          }
          if(heroIndex!==-1 && !positionOccupied) {
            this.props.hired[heroIndex].battleStatus.position = this.props.hired[heroIndex].battleStatus.targetPosition;
            this.props.hired[heroIndex].battleStatus.targetPosition = {x: null, y: null};
            this.props.dispatch(heroActions.changeHero(this.props.hired[heroIndex], heroIndex));
            this.props.dispatch(battleActions.selectHero(null));
          }
        }
        break;

      default:
        break;
    }
  }


  render() {
    console.log(this.props.monster);
    let heroSpriteList = [];
    for (let i = 0; i < this.props.team[this.props.currentAdvantureTeamIndex].member.length; i++) {
      let heroData = heroServices.getHeroById(this.props.hired, this.props.team[this.props.currentAdvantureTeamIndex].member[i]);
      let imgPosYAdd = 0;
      if(heroData && heroData.battleStatus && heroData.battleStatus.position.x!==null && heroData.battleStatus.position.y!==null ) {
        switch(heroData.battleStatus.facing) {
          case 'top': imgPosYAdd = 27.3;
          break;
          case 'bottom': imgPosYAdd = 0;
          break;
          case 'left': imgPosYAdd = 9.1;
          break;
          case 'right': imgPosYAdd = 18.2;
          break;
          default: break;
        }
        
        heroSpriteList.push(
          <SpriteInMap key={'hero-' + i}
            imgSrc={heroData.spriteImg.url}
            posX={heroData.spriteImg.imgPosX} posY={heroData.spriteImg.imgPosY + imgPosYAdd}
            frameLen={3}
            animateSpeed={12}
            animate={heroData.moving}
            mapPosition={heroData.battleStatus.position}
            gridSize={6.5}
          />
        )
      }
      // hover:
      if(heroData && heroData.battleStatus && heroData.battleStatus.targetPosition.x!==null && heroData.battleStatus.targetPosition.y!==null ) {
        heroSpriteList.push(
          <SpriteInMap key={'hero-hover-' + i}
            imgSrc={heroData.spriteImg.url}
            posX={heroData.spriteImg.imgPosX} posY={heroData.spriteImg.imgPosY + imgPosYAdd}
            frameLen={3}
            animateSpeed={12}
            animate={true}
            mapPosition={heroData.battleStatus.targetPosition}
            gridSize={6.5}
            handleClick={this.handleCharClick}
            opacity={0.6}
          />
        )
      }
    }
    let monsterSpriteList = [];
    for (let i = 0; i < this.props.monster.length; i++) {
      let monsterData = this.props.monster[i];      let imgPosYAdd = 0;
      switch(monsterData.battleStatus.facing) {
        case 'top': imgPosYAdd = 27.3;
        break;
        case 'bottom': imgPosYAdd = 0;
        break;
        case 'left': imgPosYAdd = 9.1;
        break;
        case 'right': imgPosYAdd = 18.2;
        break;
        default: break;
      }
      if(monsterData && monsterData.battleStatus && monsterData.battleStatus.position.x!==null && monsterData.battleStatus.position.y!==null ) {
        monsterSpriteList.push(
          <SpriteInMap key={'monster-' + i}
            imgSrc={monsterData.spriteImg.url}
            posX={monsterData.spriteImg.imgPosX} posY={monsterData.spriteImg.imgPosY + imgPosYAdd}
            frameLen={3}
            animateSpeed={12}
            animate={monsterData.moving}
            mapPosition={monsterData.battleStatus.position}
            gridSize={6.5}
          />
        )
      }
      // hover:
      if(monsterData && monsterData.battleStatus && monsterData.battleStatus.targetPosition.x!==null && monsterData.battleStatus.targetPosition.y!==null ) {
        monsterSpriteList.push(
          <SpriteInMap key={'monster-hover-' + i}
            imgSrc={monsterData.spriteImg.url}
            posX={monsterData.spriteImg.imgPosX} posY={monsterData.spriteImg.imgPosY + imgPosYAdd}
            frameLen={3}
            animateSpeed={12}
            animate={true}
            mapPosition={monsterData.battleStatus.targetPosition}
            gridSize={16.5}
          />
        )
      }
    }

    return (
      <div className="char-for-battle-container">
        {heroSpriteList}
        {monsterSpriteList}
        
        <SpriteInMap
            imgSrc="/imgs/monster/4Dir/001.png"
            posX={spritePosition[0][2].x} posY={spritePosition[0][2].y}
            frameLen={3}
            animateSpeed={12}
            animate={true}
            mapPosition={{x: 3, y: 11}}
            gridSize={6.5}
            handleClick={this.handleCharClick}
            opacity={0.6}
          />
      </div>
    );
  }
}

function mapStoreToProps(store, ownProps) {
  const { hero, map, battle } = store;
  const { mapDatas, currentMapIndex } = map || { mapDatas: [], currentMapIndex: 0 };
  const { battleMapDatas, battleStatus, selectedHero, monster } = battle || { battleMapDatas: {}, battleStatus: 'none', selectedHero: '' };
  const { hired, team, currentAdvantureTeamIndex } = hero || { hired: [], team: [], currentAdvantureTeamIndex: null };

  return { hired, team, currentAdvantureTeamIndex, mapDatas, currentMapIndex, battleMapDatas, battleStatus, selectedHero, monster };
}
export default connect(mapStoreToProps)(CharForBattle);
