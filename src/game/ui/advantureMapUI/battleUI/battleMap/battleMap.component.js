/*jshint esversion: 6 */

import React from 'react';
import './battleMap.component.css';

import MapForBattle from '../../../../common/map/mapForBattle.component';
import CharForBattle from './component/charForBattle/charForBattle.component';

import TacticsStage from './stage/tacticsStage/tacticsStage.component';

import { connect } from 'react-redux';
import * as battleActions from '../../../../redux/actions/battleActions';
import battleServices from '../../../../services/battleServices/battleServices';
import * as heroActions from '../../../../redux/actions/heroActions';
import heroServices from '../../../../services/heroServices/heroServices';

class BattleMap extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.LAN = window.localization.gameLanguage;
    this.state = {
      ready: false
    };

    this.handleGridHover = this.handleGridHover.bind(this);
    this.handleGridClick = this.handleGridClick.bind(this);
  }

  componentDidMount() {
    let battleMapData = battleServices.generateRandomBattleMap(this.props.mapDatas[this.props.currentMapIndex]);
    battleMapData = battleServices.startTactics(battleMapData);
    this.props.dispatch(battleActions.changeBattleMap(battleMapData));
    this.props.dispatch(battleActions.setBattleStatus('tactics'));
    this.props.dispatch(battleActions.setRoundNum(1));
    
    this.setState({
      ready: true,
      gridInfo: null,
    });

  }

  componentWillUnmount() {
    this.props.dispatch(battleActions.changeCurrHoverGridData({
      data: this.props.battleMapDatas.data[0][0],
      positionX: 0, positionY: 0
    }));
  }


  componentWillReceiveProps(nextProps) {
  }




  handleGridHover(data) {
    this.props.dispatch(battleActions.changeCurrHoverGridData(data));

    switch(this.props.battleStatus) {
      case 'tactics':
        if(this.props.selectedHero) {
          let heroIndex = heroServices.getHeroIndexById(this.props.hired, this.props.selectedHero);
          // limit drop position to last 2 lanes at bottom:
          if(heroIndex!==-1 && data.positionY>this.props.battleMapDatas.data.length-3) {
            this.props.hired[heroIndex].battleStatus.targetPosition = {x: data.positionX, y: data.positionY};
            this.props.dispatch(heroActions.changeHero(this.props.hired[heroIndex], heroIndex));
          }
        }
      break;
      default:
      break;
    }
  }

  handleGridClick(data) {
    switch(this.props.battleStatus) {
      case 'tactics':
        console.log(data, this.props.selectedHero);
        if(this.props.selectedHero) {
          let heroIndex = heroServices.getHeroIndexById(this.props.hired, this.props.selectedHero);
          if(heroIndex!==-1) {
            this.props.hired[heroIndex].battleStatus.position = {x: this.props.hired[heroIndex].battleStatus.targetPosition.x, y: this.props.hired[heroIndex].battleStatus.targetPosition.y};
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
    let mapPositionNum = Math.floor(this.props.battleMapDatas.data.length/2);
    let zoomStyle = {
      transform: 'scale(1)'
    };
    

    return (
      <div className="battle-map-container">
        {this.state.ready?
          <div className="map-box" style={zoomStyle}>
            <MapForBattle
              mapData={this.props.battleMapDatas.data}
              mapSize={this.props.battleMapDatas.data.length}
              position={{x: mapPositionNum, y:mapPositionNum}}
              handleGridClick={this.handleGridClick}
              handleGridHover={this.handleGridHover}
              overflowShow={false}
              showGrid={false}
              zoom={this.props.battleMapDatas.zoom}
              marginTop={(window.innerHeight > window.innerWidth)?'0':'0'}
            />
          </div>:''
        }
        <CharForBattle />
        {this.props.battleStatus==='tactics'?<TacticsStage />:null}
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, map, battle } = store;
  const { mapDatas, currentMapIndex } = map || { mapDatas: [], currentMapIndex: 0 };
  const { battleMapDatas, battleStatus, selectedHero} = battle || {battleMapDatas: {}, battleStatus: 'none', selectedHero: ''};
  const { hired, team, currentAdvantureTeamIndex } = hero || {hired: [], team: [], currentAdvantureTeamIndex: null};

  return { hired, team, currentAdvantureTeamIndex, mapDatas, currentMapIndex, battleMapDatas, battleStatus, selectedHero };
}
export default connect(mapStoreToProps)(BattleMap);
