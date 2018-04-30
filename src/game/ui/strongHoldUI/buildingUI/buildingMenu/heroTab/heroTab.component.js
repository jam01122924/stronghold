/*jshint esversion: 6 */
import React from 'react';
import './heroTab.component.css';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../../redux/actions/strongHoldActions';

import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import strongholdServices from '../../../../../services/strongholdServices/strongholdServices';
import HeroInfo from '../../../../../common/heroInfo/heroInfo.component';

class HeroTab extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      ui: 'list',
    };

    this.selectHero = this.selectHero.bind(this);
    this.closeHero = this.closeHero.bind(this);

  }

  componentDidMount() {

  }

  selectHero(hero) {
    this.setState({ui: 'heroInfo'})
  }
  closeHero() {
    this.setState({ui: 'list'})
  }

  render() {
    return (
      <div className="hero-tab-container">
        <ListGroup>
          <ListGroupItem onClick={()=>{this.selectHero('testHero')}}>
            Test Hero 1
          </ListGroupItem>
        </ListGroup>
        <div className="hero-info-container">
          <Modal show={this.state.ui==='heroInfo'} onHide={this.closeHero} className="hero-info-modal">
            <Modal.Header closeButton>
              <Modal.Title>
                Hero Info
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <HeroInfo heroData={{}} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold } = store;
  const { treasure } = strongHold || {treasure: {}};

	return { treasure };
}
export default connect(mapStoreToProps)(HeroTab);
