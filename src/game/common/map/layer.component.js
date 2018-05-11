import React from 'react';
import './map.style.css';
import MapGrid from './grid.component';

// import {OverlayTrigger, Tooltip} from 'react-bootstrap';

class MapLayer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      layer: []
    };
  }

  componentDidMount() {
    this.generateMap(this.props.mapData);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.mapData!==nextProps.mapData) {
      this.generateMap(nextProps.mapData);
    }
  }

  generateMap(data) {
    let layer = [];
    data.forEach((lineData, i) => {
      let lineArray = [];
      lineData.forEach((gridData, j) => {
        lineArray.push(
          <MapGrid
            data={gridData} key={'grid-' + j}
            handleClick={this.props.handleGridClick}
            handleHover={this.props.handleGridHover}
            showGrid={this.props.showGrid}
            pos={{x: j, y: i}}
          ></MapGrid>
        );
      });
      layer.push(
        <div className="map-line-container" key={'line-' + i}>
          {lineArray}
        </div>
      );
    });
    this.setState({
      layer: layer
    });
  }

  render() {
    return (
      <div className="map-layer-container">
        {this.state.layer}
      </div>
    );
  }
}

export default MapLayer;
