import React from 'react';
import './map.style.css';
import MapLayer from './layer.component';

import {TweenLite} from "gsap";

class Map extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      mapData: this.props.mapData,
      mapVisibleWidth: 15,
      mapVisibleHeight: 15,
      screenOrientation: ''
    };

    this.setOrientation = this.setOrientation.bind(this);
  }

  componentDidMount() {
    this.setOrientation();
    window.onresize = ()=>{
      this.setOrientation();
    };
    // window.addEventListener("resize", this.setOrientation, false);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.position !== nextProps.position){
      console.log('map receive different props:', nextProps.position);
      TweenLite.to(this.refs.mapReposition, 0.5, {
        left: ((nextProps.position.x - (this.state.mapVisibleWidth-1)/2) * -6 + (this.state.screenOrientation==='landscape'?'vh':'vw')),
        top: ((nextProps.position.y - (this.state.mapVisibleHeight-1)/2) * -6 + (this.state.screenOrientation==='landscape'?'vh':'vw'))
      });
    }
  }

  setOrientation(){
    let newOrientation = window.innerHeight > window.innerWidth?'portrait':'landscape';
    if(this.state.screenOrientation !== newOrientation) {
      this.setState({
        screenOrientation: newOrientation
      }, ()=>{
        TweenLite.to(this.refs.mapReposition, 0, {
          left: ((this.props.position.x - (this.state.mapVisibleWidth-1)/2) * -6 + (this.state.screenOrientation==='landscape'?'vh':'vw')),
          top: ((this.props.position.y - (this.state.mapVisibleHeight-1)/2) * -6 + (this.state.screenOrientation==='landscape'?'vh':'vw'))
        });
      });
    }
  }

  render() {
    let mapStyle = {overflow: this.props.overflowShow?'visible':'hidden'};
    let zoomStyle = {transform: 'scale(' + (this.props.zoom?this.props.zoom:1) + ')', marginTop: (this.props.marginTop?this.props.marginTop:0)};
    console.log(this.props.zoom)
    return (
      <div className="map-container" style={mapStyle}>
        <div className="map-zoom-container" style={zoomStyle}>
          <div className="map-reposition" ref="mapReposition">
            <MapLayer mapData={this.props.mapData} handleGridClick={this.props.handleGridClick} handleGridHover={this.props.handleGridHover} showGrid={this.props.showGrid}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
