import React from 'react';
import './battleGridInfo.component.css';
import { connect } from 'react-redux';
import MapGrid from '../../../../common/map/grid.component';

class BattleGridInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    // this.LAN = window.localization.gameLanguage;

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className="battle-grid-info-container">
        {this.props.currHoverGridData?
          <div className="grid-info-box">
            <div className="grid-img-container">
              <MapGrid
                data={this.props.currHoverGridData.data}
                showGrid={true}
                pos={{x: 0, y: 0}}
              ></MapGrid>
            </div>
            <div className="grid-info-position">
              Pos: {this.props.currHoverGridData.positionX}, {this.props.currHoverGridData.positionY}
            </div>
            <div className="grid-info-move">
              Mov: {this.props.currHoverGridData.data.battle.move}
            </div>
            <div className="grid-info-def">
              Def: {this.props.currHoverGridData.data.battle.def}
            </div>
          </div>:''
        }
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
  const { battle } = store;
  const { battleMapDatas } = battle || { battleMapDatas: {} };
  const { currHoverGridData } = battleMapDatas || {currHoverGridData: null};
	return { currHoverGridData };
}
export default connect(mapStoreToProps)(BattleGridInfo);
