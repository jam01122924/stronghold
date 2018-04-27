/*jshint esversion: 6 */
import React from 'react';
import './buildingUI.component.css';

import { Modal, Button } from 'react-bootstrap';

import CityLordMenu from './buildingMenu/cityLordMenu.component';
import CityHallMenu from './buildingMenu/cityHallMenu.component';
import WarehouseMainMenu from './buildingMenu/warehouseMenu.component';


class BuildingUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
    };

    this.close = this.close.bind(this);
  }

  componentDidMount() {

  }

  close() {
    this.props.close();
  }

  render() {
    let modalContent = '';
    switch(this.props.current) {
      case 'cityLord': modalContent=<CityLordMenu building="cityLord" />;
      break;
      case 'cityHall': modalContent=<CityHallMenu building="cityHall" />;
      break;
      case 'warehouse': modalContent=<WarehouseMainMenu building="warehouse" />;
      break;
      default:
      break;
    }
    return (
      <Modal show={this.props.current!=='main'} onHide={this.close} className="building-ui-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.building?this.LAN.building[this.props.building.name]:''}
            <span className="building-lv"> ({this.LAN.building.lv} {this.props.building?this.props.building.lv:0})</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close} bsStyle="primary">{this.LAN.strongHoldUI.lbls.leave}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BuildingUI;
