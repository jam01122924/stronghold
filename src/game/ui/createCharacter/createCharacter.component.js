import React from 'react';
import './createCharacter.component.css';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';
import * as characterActions from '../../redux/actions/characterActions';

class CreateCharacter extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      testChar: {
        status: {
          s: 5,
          a: 5,
          e: 5,
          i: 5,
          w: 5
        },
        name: 'test',
        skills: {},
        talent: {}
      }
    };
  }

  componentDidMount() {

  }

  createCharacter(char) {
    this.props.dispatch(characterActions.createCharacter(char));
    this.props.dispatch(gameStageActions.changeStage('inGameLandingUI'));
  }


  render() {
    return (
      <div className="createCharacter-container">
        Intro
        <div className="createCharacter-btn">
          <button className="btn-game btn-black-blue menu-btn" onClick={()=>{this.createCharacter(this.state.testChar)}}>CREATE</button>
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
export default connect(mapStoreToProps)(CreateCharacter);
