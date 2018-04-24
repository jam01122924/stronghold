import React from 'react';
import './introUI.component.css';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';

import Intro from '../../common/intro/intro.component';

class IntroUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

    };
    console.log(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    console.log(this);
  }

  confirm() {
    this.props.dispatch(gameStageActions.changeStage('strongHoldUI'));
  }

  render() {
    return (
      <div className="intro-container">
        Intro
        <div className="intro-btn">
          <button className="btn-game btn-black-blue menu-btn" onClick={this.confirm}>CONTINUE</button>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage } = gameStage || { stage: '' };
	return { stage };
}
export default connect(mapStoreToProps)(IntroUI);
