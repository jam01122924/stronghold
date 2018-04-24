import React from 'react';
import './strongHoldUI.component.css';

import { connect } from 'react-redux';
import * as gameStageActions from '../../redux/actions/gameStageActions';
import * as characterActions from '../../redux/actions/characterActions';
import * as strongHoldActions from '../../redux/actions/strongHoldActions';

class StrongHoldUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentUI: 'main'
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
        <div className="stronghold-bg">
          <img src="/imgs/village_bg2.jpg" />
          <div className="stronghold-building-container">
            <div className="stronghold-building-content">
              <div className="lord-house">
                <img src="/imgs/house/small/lord-house.gif" />
              </div>
              <div className="shop">
                <img src="/imgs/house/small/shop.png" />
              </div>
              <div className="church">
                <img src="/imgs/house/small/church.png" />
              </div>
              <div className="city-hall">
                <img src="/imgs/house/small/cityHall.png" />
              </div>
              <div className="park">
                <img src="/imgs/house/small/City_Park.png" />
              </div>
              <div className="ware-house">
                <img src="/imgs/house/small/warehouse.png" />
              </div>
              <div className="traven">
                <img src="/imgs/house/small/traven.png" />
              </div>
              <div className="black-smith">
                <img src="/imgs/house/small/blacksmith.png" />
              </div>
              <div className="living-house">
                <div className="living-house1">
                  <img src="/imgs/house/small/livinghouse1.png" />
                </div>
                <div className="living-house2">
                  <img src="/imgs/house/small/livinghouse2.png" />
                </div>
                <div className="living-house4">
                  <img src="/imgs/house/small/livinghouse4.png" />
                </div>
                <div className="living-house5">
                  <img src="/imgs/house/small/livinghouse5.png" />
                </div>
                <div className="living-house6">
                  <img src="/imgs/house/small/livinghouse6.png" />
                </div>
                <div className="living-house7">
                  <img src="/imgs/house/small/livinghouse7.png" />
                </div>
                <div className="living-house3">
                  <img src="/imgs/house/small/livinghouse3.png" />
                </div>
              </div>
            </div>
          </div>
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
export default connect(mapStoreToProps)(StrongHoldUI);
