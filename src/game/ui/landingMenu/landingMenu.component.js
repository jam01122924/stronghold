import React from 'react';
import './landingMenu.component.css';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';

class LandingMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage.landingMenu;
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
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('intro')}}>{this.LAN.new}</button>
        </div>
        <div className="landingMenu-btn">
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('load')}}>{this.LAN.continue}</button>
        </div>
        <div className="landingMenu-btn">
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('about')}}>{this.LAN.about}</button>
        </div>
        <div className="landingMenu-btn">
          <button className="btn-game btn-raise btn-blue menu-btn" onClick={()=>{this.changeStage('backToWebsite')}}>{this.LAN.exit}</button>
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
