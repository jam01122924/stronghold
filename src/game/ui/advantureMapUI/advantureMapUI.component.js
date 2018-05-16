import React from 'react';
import './advantureMapUI.component.css';
import GridMap from './gridMap/gridMap.component';
import AdvantureInfo from './advantureInfo/advantureInfo.component';
import BattleUI from './battleUI/battleUI.component';


import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';

class AdvantureMapUI extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.goBackToStronghold = this.goBackToStronghold.bind(this);
    this.editMap = this.editMap.bind(this);
  }

  changeStage(stage) {
    this.props.dispatch(gameStageActions.changeStage(stage));
  }

  componentDidMount() {
    //this.changeStage('createMapToolUIMapUI');
  }

  componentWillReceiveProps(nextProps) {
    console.log('InGameLandingUI receive props', this.props, nextProps);
  }

  goBackToStronghold() {
    this.changeStage('strongHoldUI');
  }
  editMap() {
    this.changeStage('createMapToolUIMapUI');
  }

  render() {
    let content = '';
    switch(this.props.stage) {
      case 'map':
        content = (
          <div>
            <div className="map-box">
              <GridMap />
            </div>
            <div className="info-box">
              <AdvantureInfo />
            </div>
            <div className="test-box">
              <button onClick={this.goBackToStronghold} style={{position: 'fixed', bottom: '20px', left: '20px', color: 'black'}} >Back</button>
              <button onClick={this.editMap} style={{position: 'fixed', bottom: '60px', left: '20px', color: 'black'}} >EDIT</button>
            </div>
          </div>
        );
        break;
      case 'inBattle':
        content = (
          <div className="battle-ui-box">
            <BattleUI />
          </div>
        )
      default: break;
    }
    return (
      <div className="advanture-map-ui-container">
        {content}
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { advanture } = store;
  const { stage } = advanture
	return { stage };
}
export default connect(mapStoreToProps)(AdvantureMapUI);
