/*jshint esversion: 6 */
import React from 'react';

import { connect } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import equipmentServices from '../../../services/equipmentServices/equipmentServices';

import * as storageActions from '../../../redux/actions/storageActions';


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
    const qualityClass = ['worn', 'normal', 'good', 'excellent', 'magical', 'epic', 'legendary'];
    let newEquipment = equipmentServices.createEquipment('sword', qualityClass[4], 4);

    this.props.dispatch(storageActions.addItem({target: 'inBag', data: newEquipment, itemType:'weapon'}));
    this.props.dispatch(storageActions.addItem({target: 'inBag', data: newEquipment, itemType:'item', amount: 5}));
    this.props.dispatch(storageActions.removeItem({target: 'inBag', id: newEquipment.id, itemType:'item', amount: 2}));
    // this.props.dispatch(storageActions.removeItem({target: 'inBag', id: newEquipment.id, itemType:'item', amount: 12}));
    this.props.dispatch(storageActions.collectItemFromBagToStorage());
    this.props.dispatch(storageActions.changeInventorySize({target: 'bagSize', data: 5}));



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
