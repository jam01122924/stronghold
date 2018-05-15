import React from 'react';
import './advantureInfo.component.css';
import { connect } from 'react-redux';

class AdvantureInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;

  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className="advanture-info-container">
        <div className="advanture-positon-info">
          {this.LAN.map[this.props.mapDatas[this.props.currentMapIndex].name]} ( {this.props.mapDatas[this.props.currentMapIndex].position.x}, {this.props.mapDatas[this.props.currentMapIndex].position.y} )
        </div>
        <div className="advanture-weight-info">
          {this.LAN.resource.food}: {this.props.advanture.advantureFood}
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
  const { map, advanture } = store;
  const { mapDatas, currentMapIndex } = map || { mapDatas: [], currentMapIndex: 0, };
	return { mapDatas, currentMapIndex, advanture };
}
export default connect(mapStoreToProps)(AdvantureInfo);
