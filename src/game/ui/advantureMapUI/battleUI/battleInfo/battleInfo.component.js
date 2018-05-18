import React from 'react';
import './battleInfo.component.css';
import { connect } from 'react-redux';

class BattleInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;

  }

  componentDidMount() {
    this.refs.battleInfoContainer.scrollTop = this.refs.battleInfoContainer.scrollHeight;
  }

  componentWillReceiveProps(nextProps) {
    this.refs.battleInfoContainer.scrollTop = this.refs.battleInfoContainer.scrollHeight;
  }

  render() {
    let content = [];
    for(let i=0; i<this.props.battleInfo.length; i++) {
      content.push(<div key={"battleInfo-" + i}>{this.props.battleInfo[i]}</div>);
    }
    return (
      <div className="battle-info-container" ref="battleInfoContainer">
        {content}
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
  const { battle } = store;
  const { battleInfo } = battle || { battleInfo: [] };
	return { battleInfo };
}
export default connect(mapStoreToProps)(BattleInfo);
