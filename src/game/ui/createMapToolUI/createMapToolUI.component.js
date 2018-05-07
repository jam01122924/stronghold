import React from 'react';

import './createMapToolUI.component.css';

import EditMapUI from './editMapUI/editMapUI.component';
import MapUI from '../mapUI/mapUI.component';

import {ButtonGroup, Button} from 'react-bootstrap';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';
import * as mapActions from '../../redux/actions/mapActions';
import mapServices from '../../services/mapServices/mapServices';

class CreateMapToolUI extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      zoom: 1,
      showGrid: false
    };

    this.handleGridClick = this.handleGridClick.bind(this);
  }

  changeStage(stage) {
    this.props.dispatch(gameStageActions.changeStage(stage));
  }

  zoom(z) {
    if(z>=0.1&&z<=3) {
      this.setState({
        zoom: z
      });
    }
  }

  handleGridClick(data) {
    console.log(data, this.props.clickAction, this.props.mapDatas);
    if(data && this.props.selectedTexture){
      let targetLayer = this.props.clickAction.substring(8);
      let validTargetLayer = mapServices.validateGridData(targetLayer);

      if(validTargetLayer) {
        this.props.dispatch(mapActions.changeGrid({
          targetLayer: targetLayer,
          location: {
            x: data.positionX,
            y: data.positionY
          },
          gridData: {...data.data[targetLayer], type: this.props.selectedTexture, img: this.props.selectedTexture}
        }));
      }
    }
  }

  render() {
    console.log(this.state.showGrid)
    return (
      <div className="create-map-tool-UI-container">
        <div className="map-box">
          <MapUI handleGridClick={this.handleGridClick} zoom={this.state.zoom} overflowShow={true} showGrid={this.state.showGrid}></MapUI>
        </div>
        <div className="tool-bar"><EditMapUI></EditMapUI></div>
        <div className="zoom-btns">
          <ButtonGroup vertical>
            <Button onClick={()=>{this.zoom(this.state.zoom + 0.2)}}><i className="fa fa-search-plus" aria-hidden="true"></i></Button>
            <Button onClick={()=>{this.zoom(this.state.zoom - 0.2)}}><i className="fa fa-search-minus" aria-hidden="true"></i></Button>
            <Button onClick={()=>{this.changeStage('advantureMap')}}>Adv</Button>
          </ButtonGroup>;
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage } = gameStage || { stage: '' };
  const { map } = store;
  const { mapDatas, selectedTexture, clickAction } = map || { mapDatas: [], selectedTexture: '', clickAction: ''};
	return { stage, mapDatas, selectedTexture, clickAction };
}
export default connect(mapStoreToProps)(CreateMapToolUI);
