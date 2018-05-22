/*jshint esversion: 6 */

import React from 'react';
import './battleMap.component.css';

import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import MapForBattle from '../../../../common/map/mapForBattle.component';
import Sprite from '../../../../common/sprite/sprite.component';
import TacticsStage from './tacticsStage/tacticsStage.component';

import { connect } from 'react-redux';
import * as battleActions from '../../../../redux/actions/battleActions';
import battleServices from '../../../../services/battleServices/battleServices';

class BattleMap extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.LAN = window.localization.gameLanguage;
    this.state = {
      ready: false
    };

    this.handleGridHover = this.handleGridHover.bind(this);
  }

  componentDidMount() {
    let battleMapData = battleServices.generateRandomBattleMap(this.props.mapDatas[this.props.currentMapIndex]);
    battleMapData = battleServices.startTactics(battleMapData);
    this.props.dispatch(battleActions.changeBattleMap(battleMapData));
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
    console.log(data);
    this.props.dispatch(battleActions.changeCurrHoverGridData(data));
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
        {this.props.battleStatus==='tactics'?<TacticsStage />:null}
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, map, battle } = store;
  const { mapDatas, currentMapIndex } = map || { mapDatas: [], currentMapIndex: 0 };
  const { battleMapDatas, battleStatus } = battle || {battleMapDatas: {}, battleStatus: 'none'};

  return { hero, mapDatas, currentMapIndex, battleMapDatas, battleStatus };
}
export default connect(mapStoreToProps)(BattleMap);
