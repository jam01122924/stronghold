import React from 'react';
import './advantureMapUI.component.css';
import GridMap from './gridMap/gridMap.component';

import { Button, ButtonGroup } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';

class AdvantureMapUI extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.goBackToStronghold = this.goBackToStronghold.bind(this);
  }

  changeStage(stage) {
    this.props.dispatch(gameStageActions.changeStage(stage));
  }

  componentDidMount() {
    //this.changeStage('createMapToolUIMapUI');
  }

  componentWillReceiveProps(nextProps) {
    console.log('InGameLandingUI receive props');
  }

  goBackToStronghold() {
    this.changeStage('strongHoldUI');
  }

  render() {
    return (
      <div className="advanture-map-ui-container">
        <div className="map-box">
          <GridMap />
        </div>
        <button onClick={this.goBackToStronghold} style={{position: 'fixed', bottom: '20px', left: '20px', color: 'black'}} >Back</button>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage, hero } = store;
  const { stage } = gameStage || { stage: '' };
  const { map } = store;
  const { mapDatas, position } = map || { mapDatas: [], position: {x:0, y:0}};
	return { stage, mapDatas, position };
}
export default connect(mapStoreToProps)(AdvantureMapUI);
