import React from 'react';

import { connect } from 'react-redux';
import * as gameStageActions from './redux/actions/gameStageActions';

import LandingMenu from './ui/landingMenu/landingMenu.component';
import IntroUI from './ui/introUI/introUI.component';
import CreateCharacter from './ui/createCharacter/createCharacter.component';
import InGameLandingUI from './ui/inGameLandingUI/inGameLandingUI.component';
import CreateMapToolUI from './ui/createMapToolUI/createMapToolUI.component';
import StrongHoldUI from './ui/strongHoldUI/strongHoldUI.component';
import AdvantureMapUI from './ui/advantureMapUI/advantureMapUI.component';

import gameLanguage from './data/localization/gameLanguage';

class GameContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    window.localization = {
      gameLanguage: gameLanguage[props.language]
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
      case 'strongHoldUI': ui = <StrongHoldUI></StrongHoldUI>;
        break;
      case 'inGameLandingUI': ui = <InGameLandingUI></InGameLandingUI>;
        break;
      case 'createMapToolUIMapUI': ui = <CreateMapToolUI></CreateMapToolUI>;
        break;
      case 'advantureMap': ui = <AdvantureMapUI></AdvantureMapUI>;
        break;
      default: ui = <LandingMenu></LandingMenu>;
        break;
    }
    return (
      <div className="gameContainer-container">
        <div className="gameContainer-content">
          {ui}
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage, language } = gameStage || { stage: '', language: 'en' };
	return { stage, language };
}
export default connect(mapStoreToProps)(GameContainer);
