/*jshint esversion: 6 */
import React from 'react';
import './header.component.css';

import { connect } from 'react-redux';

class Header extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state={
      expand: false
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  componentDidMount() {
  }

  toggleExpand() {
    this.setState({
      expand: !this.state.expand
    });
  }

  render() {
    let resourceUI = [];
    let index=0;
    for(let r in this.props.resource) {
      if (!this.props.resource.hasOwnProperty(r)) continue;
      if(this.state.expand || index<4) {
        let num = this.props.resource[r].current;
        if(num>=1000000000) {
          num = Math.round(num/10000000)/100;
          num += this.LAN.strongHoldUI.header.billion;
        }else if(num>=1000000) {
          num = Math.round(num/10000)/100;
          num += this.LAN.strongHoldUI.header.million;
        }else if(num>=1000) {
          num = Math.round(num/10)/100;
          num += this.LAN.strongHoldUI.header.kilo;
        }
        resourceUI.push(
          <div className="resource-container" key={r}>
            <div className="resource-name">{this.LAN.resource[r]}</div>
            <div className="resource-num">{num}</div>
          </div>
        );
      }
      index++;
    }
    return (
      <div className="stronghold-header-container">
        <div className="resource-panel">
          {resourceUI}
          <span className="toggle-btn" onClick={this.toggleExpand}>{this.state.expand?<i className="fa fa-minus-square" aria-hidden="true"></i>:<i className="fa fa-plus-square" aria-hidden="true"></i>}</span>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold } = store;
  const { resource } = strongHold || {resource: {}};

	return { resource };
}
export default connect(mapStoreToProps)(Header);
