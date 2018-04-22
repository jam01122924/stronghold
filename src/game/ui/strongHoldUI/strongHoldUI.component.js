import React from 'react';
import './introUI.component.css';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';
import * as characterActions from '../../redux/actions/characterActions';
import * as characterActions from '../../redux/actions/characterActions';

class StrongHoldUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentUI = 'main'
    };
  }

  componentDidMount() {
  }


  render() {
    let uiContent = '';
    switch (this.state.currentUI) {
      case 'main':
      break;
      default:
      break;
    }
    return (
      <div className="stronghold-ui-container">
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage } = gameStage || { stage: '' };
	return { stage };
}
export default connect(mapStoreToProps)(StrongHoldUI);
