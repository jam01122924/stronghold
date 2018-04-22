import React from 'react';

import { connect } from 'react-redux';
import * as gameStageActions from './redux/actions/gameStageActions';
import * as mapActions from './redux/actions/mapActions';

import LandingMenu from './ui/landingMenu/landingMenu.component';
import IntroUI from './ui/introUI/introUI.component';
import CreateCharacter from './ui/createCharacter/createCharacter.component';
import InGameLandingUI from './ui/inGameLandingUI/inGameLandingUI.component';
import CreateMapToolUI from './ui/createMapToolUI/createMapToolUI.component';

class GameContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() {

  }

  changeStage(stage) {
    this.props.dispatch(gameStageActions.changeStage(stage));
  }

  render() {
    let ui;
    switch(this.props.stage) {
      case 'landingMenu': ui = <LandingMenu></LandingMenu>;
        break;
      case 'intro': ui = <IntroUI></IntroUI>;
        break;
      case 'createCharacter': ui = <CreateCharacter></CreateCharacter>;
        break;
      case 'inGameLandingUI': ui = <InGameLandingUI></InGameLandingUI>;
        break;
      case 'createMapToolUIMapUI': ui = <CreateMapToolUI></CreateMapToolUI>;
        break;
      default: ui = <LandingMenu></LandingMenu>;
        break;
    }
    return (
      <div className="gameContainer-container">
        {ui} {this.props.stage}
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage } = gameStage || { stage: '' }
	return { stage };
}
export default connect(mapStoreToProps)(GameContainer);
