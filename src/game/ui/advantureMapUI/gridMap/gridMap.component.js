import React from 'react';
import './gridMap.component.css';

import { Button, ButtonGroup } from 'react-bootstrap';
import Map from '../../../common/map/map.component';
import Sprite from '../../../common/sprite/sprite.component';

import { connect } from 'react-redux';
import * as mapActions from '../../../redux/actions/mapActions';

class GridMap extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      moving: false,
      mainCharSpritePosY: 0,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
    this.movePosition = this.movePosition.bind(this);
    this.zoom = this.zoom.bind(this);

  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.moveAnimateTimeout && clearTimeout(this.moveAnimateTimeout);
  }


  componentWillReceiveProps(nextProps) {

  }

  handleKeyDown(event) {
    switch(event.key) {
      case 'ArrowUp':
        if(!this.moveAnimateTimeout) {
          this.movePosition(0, -1);
          this.setState({
            mainCharSpritePosY: 27.3
          });
        }
        break;
      case 'ArrowDown':
        if(!this.moveAnimateTimeout) {
          this.movePosition(0, 1);
          this.setState({
            mainCharSpritePosY: 0
          });
        }
        break;
      case 'ArrowLeft':
        if(!this.moveAnimateTimeout) {
          this.movePosition(-1, 0);
          this.setState({
            mainCharSpritePosY: 9.1
          });
        }
        break;
      case 'ArrowRight':
        if(!this.moveAnimateTimeout) {
          this.movePosition(1, 0);
          this.setState({
            mainCharSpritePosY: 18.2
          });
        }
        break;
      default:
        break;
    }
  }

  handleGridClick(data) {
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
    console.log('moveAnimateTimeout', this.moveAnimateTimeout);
    // animate character sprite:
    this.setState({moving: true});
    this.moveAnimateTimeout = setTimeout(()=>{
      this.setState({moving: false});
      clearTimeout(this.moveAnimateTimeout);
      this.moveAnimateTimeout = null;
    }, 500);
    this.props.dispatch(mapActions.movePosition({x: x, y: y}));
  }

  zoom(z) {
    if(z>=0.1&&z<=3) {
      this.props.dispatch(mapActions.zoomMap(z));
    }
  }

  render() {
    console.log(this.props.mapDatas[this.props.currentMapIndex].position.x, this.props.mapDatas[this.props.currentMapIndex].position.y);
    let zoomStyle = {
      transform: 'scale(' + (this.props.zoom?this.props.zoom:1) + ')'
    };
    return (
      <div className="grid-map-container">
        <div className="map-box" style={zoomStyle}>
          <Map
            mapData={this.props.mapDatas[this.props.currentMapIndex].data}
            mapSize={64}
            position={this.props.mapDatas[this.props.currentMapIndex].position}
            handleGridClick={this.handleGridClick}
            overflowShow={true}
            showGrid={this.props.showGrid}
          />
          <div className="character-box-container">
            <div className="character-box">
              <Sprite
                imgSrc="/imgs/hero/4Dir/002.png"
                posX={0} posY={this.state.mainCharSpritePosY}
                frameLen={3}
                animateSpeed={10}
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
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, map } = store;
  const { mapDatas, currentMapIndex, clickPos, zoom, showGrid } = map || { mapDatas: [], currentMapIndex: 0, clickPos: {x:0, y:0}, zoom: 1, showGrid: false };
  const {advantureFood} = hero || {advantureFood: 0};
  return { advantureFood, mapDatas, currentMapIndex, clickPos, zoom, showGrid };
}
export default connect(mapStoreToProps)(GridMap);
