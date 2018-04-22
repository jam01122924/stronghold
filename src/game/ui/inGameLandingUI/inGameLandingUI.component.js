import React from 'react';
import './inGameLandingUI.component.css';
import MapUI from '../mapUI/mapUI.component';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';

class InGameLandingUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
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

  render() {
    return (
      <div className="in-game-landing-UI-container">
        <MapUI />
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage } = gameStage || { stage: '' };
  const { map } = store;
  const { mapDatas, position } = map || { mapDatas: [], position: {x:0, y:0} };
	return { stage, mapDatas, position };
}
export default connect(mapStoreToProps)(InGameLandingUI);
