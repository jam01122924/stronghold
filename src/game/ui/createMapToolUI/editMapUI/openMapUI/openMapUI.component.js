import React from 'react';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import './openMapUI.component.css';

import { connect } from 'react-redux';
import * as mapActions from '../../../../redux/actions/mapActions';
import mapServices from '../../../../services/mapServices/mapServices';

class OpenMapUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedMap: this.props.mapDatas[this.props.currentMapIndex].id
    };
    this.open = this.open.bind(this);
  }

  open() {
    this.props.dispatch(mapActions.switchMap(this.state.selectedMap));
    this.props.close();
  }

  render() {
    let mapSelection = [];
    mapServices.getAllMap().forEach((map) => {
      mapSelection.push(
        <ListGroupItem onClick={()=>{this.setState({selectedMap: map.id})}} active={this.state.selectedMap===map.id} key={map.id}>
          {map.id} - {map.name}
        </ListGroupItem>
      );
    })
    return (
      <div className="open-map-UI-container">
        <div className="map-selections">
          <ListGroup>
            {mapSelection}
          </ListGroup>
        </div>
        <Button bsStyle="primary" className="right clear-float" bsSize="small" onClick={this.open}>Open</Button>
        <Button bsStyle="default" className="right clear-float" bsSize="small" onClick={this.props.close}>Cancel</Button>
        <div className="clear-float"></div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
  const { map } = store;
  const { mapDatas, currentMapIndex } = map || { mapDatas: [], currentMapIndex: -1};
	return { mapDatas, currentMapIndex };
}
export default connect(mapStoreToProps)(OpenMapUI);
