/*jshint esversion: 6 */

import React from 'react';
import './gridMap.component.css';

import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import Map from '../../../common/map/map.component';
import Sprite from '../../../common/sprite/sprite.component';

import { connect } from 'react-redux';
import * as mapActions from '../../../redux/actions/mapActions';
import * as gameStageActions from '../../../redux/actions/gameStageActions';
import * as heroActions from '../../../redux/actions/heroActions';
import * as advantureActions from '../../../redux/actions/advantureActions';
import advantureServices from '../../../services/advantureServices/advantureServices';
import mapServices from '../../../services/mapServices/mapServices';
import monsterServices from '../../../services/monsterServices/monsterServices';

class GridMap extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.LAN = window.localization.gameLanguage;
    this.state = {
      moving: false,
      canMove: true,
      mapVisible: true,
      mainCharSpritePosY: 0,
      confirmText: '',
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
    this.movePosition = this.movePosition.bind(this);
    this.zoom = this.zoom.bind(this);
    this.handleGridClick = this.handleGridClick.bind(this);
    this.handleGridHover = this.handleGridHover.bind(this);
    this.confirmModal = this.confirmModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);

    this.test = this.test.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.moveAnimateTimeout && clearTimeout(this.moveAnimateTimeout);
    this.moveAnimateTimeout = null;
  }


  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  handleKeyDown(event) {
    console.log(this.moveAnimateTimeout)
    if(this.state.canMove && !this.moveAnimateTimeout) {
      switch(event.key) {
        case 'ArrowUp':
          this.movePosition(0, -1);
          this.setState({
            mainCharSpritePosY: 27.3
          });
          break;
        case 'ArrowDown':
          this.movePosition(0, 1);
          this.setState({
            mainCharSpritePosY: 0
          });
          break;
        case 'ArrowLeft':
          this.movePosition(-1, 0);
          this.setState({
            mainCharSpritePosY: 9.1
          });
          break;
        case 'ArrowRight':
          this.movePosition(1, 0);
          this.setState({
            mainCharSpritePosY: 18.2
          });
          break;
        default:
          break;
      }
    }
  }

  handleGridClick(data) {
    console.log(data);
  }
  handleGridHover(data) {
    console.log(data);
  }

  changeGrid(gridData, x, y) {
    this.props.dispatch(mapActions.changeGrid({
      location: {
        x: x,
        y: y
      },
      gridData:gridData
    }));
  }

  movePosition(x, y) {
    let mapD = this.props.mapDatas[this.props.currentMapIndex];
    // Check if target position is in range:
    if((mapD.position.y+y)>=0 && (mapD.position.y+y)<mapD.data.length && (mapD.position.x+x)>=0 && (mapD.position.x+x)<mapD.data[mapD.position.y+y].length) {
      let moveCost = 0;
      for(let layer in mapD.data[mapD.position.y+y][mapD.position.x+x]) {
        if(layer!=='action'&&layer!=='monster'){
          console.log(layer, mapD.data[mapD.position.y+y][mapD.position.x+x][layer].move);

          if(mapD.data[mapD.position.y+y][mapD.position.x+x][layer].move!=='noPass'&&typeof mapD.data[mapD.position.y+y][mapD.position.x+x][layer].move === 'number') {
            moveCost += mapD.data[mapD.position.y+y][mapD.position.x+x][layer].move;
          } else {
            console.log('blocked');
            return;
          }
        }
      }

      if(moveCost>0){
        this.props.dispatch(advantureActions.changeAdvantureFood(-moveCost));
      }

      this.props.dispatch(mapActions.movePosition({x: x, y: y}));

      // animate character sprite:
      this.setState({moving: true});
      this.moveAnimateTimeout = setTimeout(()=>{
        this.setState({moving: false});
        clearTimeout(this.moveAnimateTimeout);
        this.moveAnimateTimeout = null;
      }, 250);

      // Trigger action on target position:
      if(mapD.data[mapD.position.y+y][mapD.position.x+x].action) {
        console.log(mapD.data[mapD.position.y+y][mapD.position.x+x].action);
        switch(mapD.data[mapD.position.y+y][mapD.position.x+x].action.type) {
          case 'gameStageChange':
            this.setState({confirmText: this.LAN.map.confirmBackToStronghold + '. ' + this.LAN.confirm.question, canMove: false});
            break;
          case 'mapChange':
            this.setState({confirmText: this.LAN.map.confirmChangeMap + this.LAN.map[mapServices.getMapById(mapD.data[mapD.position.y+y][mapD.position.x+x].action.data.id).name] + '. ' + this.LAN.confirm.question, canMove: false});
            break;
          default:
            break;
        }
      }

      // Trigger battle if monster near by
      if(mapD.data[mapD.position.y+y][mapD.position.x+x].monster) {
        document.removeEventListener("keydown", this.handleKeyDown);
        this.moveAnimateTimeout && clearTimeout(this.moveAnimateTimeout);
        this.moveAnimateTimeout = null;
        setTimeout(()=>{
          this.props.dispatch(advantureActions.changeStage('inBattle'));
        }, 300);
      }




    }
  }

  zoom(z) {
    if(z>=0.1&&z<=3) {
      this.props.dispatch(mapActions.zoomMap(z));
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextProps.mapDatas[nextProps.currentMapIndex].position !== this.props.mapDatas[this.props.currentMapIndex].position ||
  //   nextState.mainCharSpritePosY !== this.state.mainCharSpritePosY || nextState.moving !== this.state.moving) {
  //     return true;
  //   }
  //   return false;
  // }

  cancelModal() {
    this.setState({
      confirmText: '', canMove: true
    });
  }

  confirmModal() {
    this.setState({
      confirmText: '', canMove: true
    });
    let mapD = this.props.mapDatas[this.props.currentMapIndex];
    if(mapD.data[mapD.position.y][mapD.position.x].action &&
      mapD.data[mapD.position.y][mapD.position.x].action.type==='gameStageChange') {
      this.props.dispatch(gameStageActions.changeStage(mapD.data[mapD.position.y][mapD.position.x].action.data));
      console.log(mapD.data[mapD.position.y][mapD.position.x].action.data, this.props.currentAdvantureTeamIndex)
      if(mapD.data[mapD.position.y][mapD.position.x].action.data==='strongHoldUI' && this.props.currentAdvantureTeamIndex!==null) {
        this.props.dispatch(heroActions.advantureTeamHome(this.props.currentAdvantureTeamIndex));
      }
    } else if (mapD.data[mapD.position.y][mapD.position.x].action &&
      mapD.data[mapD.position.y][mapD.position.x].action.type==='mapChange') {
        this.setState({mapVisible: false});
        //TODO: use new mapActions.changeMap
        this.props.dispatch(mapActions.switchMap(mapD.data[mapD.position.y][mapD.position.x].action.data.id));
        this.props.dispatch(mapActions.setPosition(mapD.data[mapD.position.y][mapD.position.x].action.data.position));
        setTimeout(()=>{this.setState({mapVisible: true});}, 800);
    }
  }




  test() {
    console.log(monsterServices.getMonsterListByClass('nature'));
    // console.log(monsterServices.generateMonster('nature', 'wolf', 1));
    console.log(monsterServices.generateMonster('nature', 'wolf', 20));
    monsterServices.generateMonsterOnMap(this.props.mapDatas[0]);
  }










  render() {
    let zoomStyle = {
      transform: 'scale(' + (this.props.zoom?this.props.zoom:1) + ')',
      opacity: this.state.mapVisible?1:0,
    };
    return (
      <div className="grid-map-container">
        <div className="map-box" style={zoomStyle}>
          <Map
            mapData={this.props.mapDatas[this.props.currentMapIndex].data}
            position={this.props.mapDatas[this.props.currentMapIndex].position}
            handleGridClick={this.handleGridClick}
            handleGridHover={this.handleGridHover}
            overflowShow={false}
            showGrid={this.props.showGrid}
          />
          <div className="character-box-container">
            <div className="character-box">
              <Sprite
                imgSrc="/imgs/hero/4Dir/002.png"
                posX={0} posY={this.state.mainCharSpritePosY}
                frameLen={3}
                animateSpeed={12}
                animate={this.state.moving}
              />
            </div>
          </div>

        </div>


        <div className="zoom-btns">
          <ButtonGroup vertical>
            <Button onClick={()=>{this.zoom(this.props.zoom + 0.2)}}><i className="fa fa-search-plus" aria-hidden="true"></i></Button>
            <Button onClick={()=>{this.zoom(this.props.zoom - 0.2)}}><i className="fa fa-search-minus" aria-hidden="true"></i></Button>
          </ButtonGroup>;
          <Button onClick={this.test}>TEST</Button>
        </div>

        <div>
          <Modal show={!!this.state.confirmText} onHide={()=>{this.setState({confirmText: null, canMove: true})}} className="confirmModal">
            <Modal.Body>
              {this.state.confirmText}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.cancelModal}>{this.LAN.confirm.no}</Button>
              <Button bsStyle="primary" onClick={this.confirmModal}>{this.LAN.confirm.yes}</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, map, advanture } = store;
  const { mapDatas, currentMapIndex, clickPos, zoom, showGrid } = map || { mapDatas: [], currentMapIndex: 0, clickPos: {x:0, y:0}, zoom: 1, showGrid: false };
  const {currentAdvantureTeamIndex} = hero || {currentAdvantureTeamIndex: null};
  const { moving, mainCharSpritePosY } = advanture || { moving: false, mainCharSpritePosY:0 }
  return { currentAdvantureTeamIndex, mapDatas, currentMapIndex, clickPos, zoom, showGrid, moving, mainCharSpritePosY };
}
export default connect(mapStoreToProps)(GridMap);
