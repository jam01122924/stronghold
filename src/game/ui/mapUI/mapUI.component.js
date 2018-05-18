import React from 'react';
import './mapUI.component.css';
import Map from '../../common/map/map.component';

import { connect } from 'react-redux';
import * as mapActions from '../../redux/actions/mapActions';

class MapUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
    // this.changeLayer = this.changeLayer.bind(this);
    this.movePosition = this.movePosition.bind(this);

  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    console.log('mapUI receive props', nextProps.mapDatas[nextProps.currentMapIndex]);

  }

  handleKeyDown(event) {
    switch(event.key) {
      case 'ArrowUp':
        this.movePosition(0, -1);
        break;
      case 'ArrowDown':
        this.movePosition(0, 1);
        break;
      case 'ArrowLeft':
        this.movePosition(-1, 0);
        break;
      case 'ArrowRight':
        this.movePosition(1, 0);
        break;
      default:
        break;
    }
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

  // changeLayer(layerData) {
  //   this.props.dispatch(mapActions.changeLayer(layerData));
  // }
  movePosition(x, y) {
    this.props.dispatch(mapActions.movePosition({x: x, y: y}));
  }


  render() {
    let zoomStyle = {
      transform: 'scale(' + (this.props.zoom?this.props.zoom:1) + ')'
    };
    return (
      <div className="map-UI-container" style={zoomStyle}>
        {this.props.mapDatas[this.props.currentMapIndex].position.x}, {this.props.mapDatas[this.props.currentMapIndex].position.y}
        <Map
          mapData={this.props.mapDatas[this.props.currentMapIndex].data}
          position={this.props.mapDatas[this.props.currentMapIndex].position}
          handleGridClick={this.props.handleGridClick}
          handleGridHover={this.props.handleGridHover}
          overflowShow={this.props.overflowShow}
          showGrid={this.props.showGrid}
          />
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage, map } = store;
  const { stage } = gameStage || { stage: '' };
  const { mapDatas, currentMapIndex } = map || { mapDatas: [{}], currentMapIndex: 0 };
	return { stage, mapDatas, currentMapIndex };
}
export default connect(mapStoreToProps)(MapUI);
