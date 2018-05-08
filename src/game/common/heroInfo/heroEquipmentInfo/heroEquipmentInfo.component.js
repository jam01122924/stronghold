/*jshint esversion: 6 */
import React from 'react';

import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import equipmentServices from '../../../services/equipmentServices/equipmentServices';


class HeroEquipmentInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
    };
    this.test = this.test.bind(this);
  }

  componentDidMount() {

  }

  test() {
    equipmentServices.createEquipment('sword', 'c', 4, 'wood');
  }


  render() {
    return (
      <div className="hero-equipment-info-container">
        <Button onClick={this.test}>CREATE TEST EQUIPMENT</Button>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero, storage } = store;

	return { hero, storage };
}
export default connect(mapStoreToProps)(HeroEquipmentInfo);
