import React from 'react';
import './map.style.css';
import MapLayer from './layer.component';

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      mapData: this.props.mapData,
      mapVisibleWidth: 11,
      mapVisibleHeight: 11,
      screenOrientation: ''
    };

    this.setOrientation = this.setOrientation.bind(this);
  }

  componentDidMount() {
    this.setOrientation();
    // window.addEventListener("resize", this.setOrientation, false);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.mapData !== nextProps.mapData){
      console.log('map receive different props:', nextProps.mapData);
    }
  }

  setOrientation(){
    let newOrientation = window.innerHeight > window.innerWidth?'portrait':'landscape';
    console.log(this.state.screenOrientation, 'and', newOrientation, this.state.screenOrientation !== newOrientation)
    if(this.state.screenOrientation !== newOrientation) {
      this.setState({
        screenOrientation: newOrientation
      });
    }
  }

  render() {
    return (
      <div className="map-container" style={{overflow: this.props.overflowShow?'visible':'hidden'}}>
        <div className="map-reposition" style={{
          left: ((this.props.position.x - this.state.mapVisibleWidth/2) * -7.272727 + (this.state.screenOrientation==='landscape'?'vh':'vw')),
          top: ((this.props.position.y - this.state.mapVisibleHeight/2) * -7.272727 + (this.state.screenOrientation==='landscape'?'vh':'vw'))
        }}>
          <MapLayer mapData={this.props.mapData} handleGridClick={this.props.handleGridClick} showGrid={this.props.showGrid}/>
        </div>
      </div>
    );
  }
}

export default Map;
