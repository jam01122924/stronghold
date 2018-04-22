import React from 'react';
import './landingMenu.component.css';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';

class LandingMenu extends React.Component {

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
    return (
      <div className="landingMenu-container">
        <div className="landingMenu-btn">
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('intro')}}>NEW</button>
        </div>
        <div className="landingMenu-btn">
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('load')}}>CONTINUE</button>
        </div>
        <div className="landingMenu-btn">
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('about')}}>ABOUT</button>
        </div>
        <div className="landingMenu-btn">
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('backToWebsite')}}>EXIT</button>
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
export default connect(mapStoreToProps)(LandingMenu);
