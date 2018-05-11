import React from 'react';
import {Grid, Row, Col, SplitButton, MenuItem, Button} from 'react-bootstrap';

import './generateMapUI.component.css';

import mapServices from '../../../../services/mapServices/mapServices';

import { connect } from 'react-redux';
import * as gameStageActions from '../../../../redux/actions/gameStageActions';
import * as mapActions from '../../../../redux/actions/mapActions';

class GenerateMapUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      mapSize: '',
      terrain: '',
      water: '',
      monster: '',
      building: '',
      season: '',
      mapData: []
    };
    this.generate = this.generate.bind(this);
  }

  changeStage(stage) {
    this.props.dispatch(gameStageActions.changeStage(stage));
  }

  componentWillReceiveProps(nextProps) {
    console.log('GenerateMapUI receive props');
  }

  generate() {
    let genMapConfig = {
      name: this.state.name,
      mapSize: this.state.mapSize,
      terrain: this.state.terrain,
      water: this.state.water,
      monster: this.state.monster,
      building: this.state.building,
      season: this.state.season
    };
    let data = mapServices.generateMap(genMapConfig, this.props.mapDatas);
    console.log(data);
    this.props.dispatch(mapActions.addMap(data));
    this.props.dispatch(mapActions.switchMap(data.id));
    this.props.close();
  }

  gBase() {}
  gTerrain() {}
  gWater() {}
  gMountain() {}
  gTree() {}
  gBuilding() {}



  render() {
    return (
      <div className="generate-map-UI-container">
        <Grid className="modal-grid">
          <Row className="show-grid">
            <Col xs={12}>
              <label>Map Name:</label>
              <input onChange={(e)=>this.setState({'name': e.target.value})}></input>
            </Col>
            <Col xs={12}>
              <label>Map Size:</label>
              <SplitButton className={'select-box ' + (this.state.mapSize?'':'unselected-dropdown')} title={this.state.mapSize?this.state.mapSize:'select map size...'} id="Dropdown_mapSize">
                <MenuItem eventKey="1" onSelect={()=>this.setState({'mapSize': 'x-small'})}>x-small</MenuItem>
                <MenuItem eventKey="2" onSelect={()=>this.setState({'mapSize': 'small'})}>small</MenuItem>
                <MenuItem eventKey="3" onSelect={()=>this.setState({'mapSize': 'middle'})}>middle</MenuItem>
                <MenuItem eventKey="4" onSelect={()=>this.setState({'mapSize': 'large'})}>large</MenuItem>
                <MenuItem eventKey="5" onSelect={()=>this.setState({'mapSize': 'x-large'})}>x-large</MenuItem>
                <MenuItem eventKey="6" onSelect={()=>this.setState({'mapSize': 'huge'})}>huge</MenuItem>
              </SplitButton>
            </Col>
            <Col xs={12}>
              <label>Terrain:</label>
              <SplitButton className={'select-box ' + (this.state.terrain?'':'unselected-dropdown')} title={this.state.terrain?this.state.terrain:'select terrain...'} id="Dropdown_mapSize">
                <MenuItem eventKey="1" onSelect={()=>this.setState({'terrain': 'plain'})}>Plain</MenuItem>
                <MenuItem eventKey="2" onSelect={()=>this.setState({'terrain': 'grassland'})}>Grassland</MenuItem>
                <MenuItem eventKey="3" onSelect={()=>this.setState({'terrain': 'forest'})}>Forest</MenuItem>
                <MenuItem eventKey="4" onSelect={()=>this.setState({'terrain': 'swamp'})}>Swamp</MenuItem>
                <MenuItem eventKey="5" onSelect={()=>this.setState({'terrain': 'snowland'})}>Snowland</MenuItem>
                <MenuItem eventKey="6" onSelect={()=>this.setState({'terrain': 'desert'})}>Desert</MenuItem>
                <MenuItem eventKey="7" onSelect={()=>this.setState({'terrain': 'mountain'})}>Mountain</MenuItem>
                <MenuItem eventKey="8" onSelect={()=>this.setState({'terrain': 'volcanic'})}>Volcanic</MenuItem>
              </SplitButton>
            </Col>
            <Col xs={12}>
              <label>Water:</label>
              <SplitButton className={'select-box ' + (this.state.water?'':'unselected-dropdown')} title={this.state.water?this.state.water:'water amount...'} id="Dropdown_mapSize">
                <MenuItem eventKey="1" onSelect={()=>this.setState({'water': 'none'})}>None</MenuItem>
                <MenuItem eventKey="2" onSelect={()=>this.setState({'water': 'little'})}>Little</MenuItem>
                <MenuItem eventKey="3" onSelect={()=>this.setState({'water': 'some'})}>Some</MenuItem>
                <MenuItem eventKey="4" onSelect={()=>this.setState({'water': 'plenty'})}>Plenty</MenuItem>
                <MenuItem eventKey="5" onSelect={()=>this.setState({'water': 'lots'})}>Lots</MenuItem>
                <MenuItem eventKey="6" onSelect={()=>this.setState({'water': 'flooded'})}>Flooded</MenuItem>
              </SplitButton>
            </Col>
            <Col xs={12}>
              <label>Sea:</label>
              <SplitButton className={'select-box ' + (this.state.sea?'':'unselected-dropdown')} title={this.state.sea?this.state.sea:'sea amount...'} id="Dropdown_mapSize">
                <MenuItem eventKey="1" onSelect={()=>this.setState({'sea': 'none'})}>None</MenuItem>
                <MenuItem eventKey="2" onSelect={()=>this.setState({'sea': 'little'})}>Little</MenuItem>
                <MenuItem eventKey="3" onSelect={()=>this.setState({'sea': 'some'})}>Some</MenuItem>
                <MenuItem eventKey="4" onSelect={()=>this.setState({'sea': 'plenty'})}>Plenty</MenuItem>
                <MenuItem eventKey="5" onSelect={()=>this.setState({'sea': 'lots'})}>Lots</MenuItem>
                <MenuItem eventKey="6" onSelect={()=>this.setState({'sea': 'island'})}>Island</MenuItem>
              </SplitButton>
            </Col>
            <Col xs={12}>
              <label>Monster:</label>
              <SplitButton className={'select-box ' + (this.state.monster?'':'unselected-dropdown')} title={this.state.monster?this.state.monster:'monster amount...'} id="Dropdown_mapSize">
                <MenuItem eventKey="1" onSelect={()=>this.setState({'monster': 'none'})}>None</MenuItem>
                <MenuItem eventKey="2" onSelect={()=>this.setState({'monster': 'weak'})}>Weak</MenuItem>
                <MenuItem eventKey="3" onSelect={()=>this.setState({'monster': 'normal'})}>Normal</MenuItem>
                <MenuItem eventKey="4" onSelect={()=>this.setState({'monster': 'strong'})}>Strong</MenuItem>
                <MenuItem eventKey="5" onSelect={()=>this.setState({'monster': 'unbeatable'})}>unbeatable</MenuItem>
              </SplitButton>
            </Col>
            <Col xs={12}>
              <label>Buildings:</label>
              <SplitButton className={'select-box ' + (this.state.building?'':'unselected-dropdown')} title={this.state.building?this.state.building:'building amount...'} id="Dropdown_mapSize">
                <MenuItem eventKey="1" onSelect={()=>this.setState({'building': 'none'})}>None</MenuItem>
                <MenuItem eventKey="2" onSelect={()=>this.setState({'building': 'little'})}>Little</MenuItem>
                <MenuItem eventKey="3" onSelect={()=>this.setState({'building': 'some'})}>Some</MenuItem>
                <MenuItem eventKey="4" onSelect={()=>this.setState({'building': 'plenty'})}>Plenty</MenuItem>
                <MenuItem eventKey="5" onSelect={()=>this.setState({'building': 'lots'})}>Lots</MenuItem>
              </SplitButton>
            </Col>
            <Col xs={12}>
              <label>Season:</label>
              <SplitButton className={'select-box ' + (this.state.season?'':'unselected-dropdown')} title={this.state.season?this.state.season:'select season...'} id="Dropdown_mapSize">
                <MenuItem eventKey="1" onSelect={()=>this.setState({'season': 'spring'})}>Spring</MenuItem>
                <MenuItem eventKey="2" onSelect={()=>this.setState({'season': 'summer'})}>Summer</MenuItem>
                <MenuItem eventKey="3" onSelect={()=>this.setState({'season': 'autumn'})}>Autumn</MenuItem>
                <MenuItem eventKey="4" onSelect={()=>this.setState({'season': 'winter'})}>Winter</MenuItem>
              </SplitButton>
            </Col>
          </Row>
        </Grid>
        <Button bsStyle="primary" className="right clear-float" bsSize="small" onClick={this.generate}>Create</Button>
        <div className="clear-float"></div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage } = gameStage || { stage: '' };
  const { map } = store;
  const { mapDatas } = map || { mapDatas: []};
	return { stage, mapDatas };
}
export default connect(mapStoreToProps)(GenerateMapUI);
