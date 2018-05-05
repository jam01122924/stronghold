/*jshint esversion: 6 */
import React from 'react';
import './heroTab.component.css';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../../redux/actions/strongHoldActions';
import * as storageActions from '../../../../../redux/actions/storageActions';
import * as heroActions from '../../../../../redux/actions/heroActions';

import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import strongholdServices from '../../../../../services/strongholdServices/strongholdServices';
import heroServices from '../../../../../services/heroServices/heroServices';

import HeroInfo from '../../../../../common/heroInfo/heroInfo.component';

class HeroTab extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      selectedHero: null,
      confirmModal: null,
    };

    this.selectHero = this.selectHero.bind(this);
    this.closeHero = this.closeHero.bind(this);
    this.upgradeHero = this.upgradeHero.bind(this);
    this.fireHero = this.fireHero.bind(this);
    this.fireHeroConfirm = this.fireHeroConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);

  }

  componentDidMount() {

  }

  selectHero(hero) {
    this.setState({selectedHero: hero});
  }
  closeHero() {
    this.setState({selectedHero: null})
  }
  upgradeHero() {
    let requiredSoul = heroServices.getExpRequired(this.state.selectedHero.lv+1) - heroServices.getExpRequired(this.state.selectedHero.lv);

    // TODO: check if hero can be upgrade:
    if("lordHall Lv is enough, and hero hasn't reach his lv limit") {
      if(requiredSoul<=this.props.storage.resource.soul) {
        this.props.dispatch(storageActions.changeSoul(-requiredSoul));
        let result = heroServices.upgradeHero(this.state.selectedHero);
        this.props.dispatch(storageActions.changeSoul(-requiredSoul));
        this.props.hero.hired.forEach((h, i) => {
          if(h.id===result.id) {
            this.props.dispatch(heroActions.changeHero(result, i));
          }
        });
      }
    }
  }

  fireHero() {
    this.setState({ confirmModal: 'fireHero' });
  }
  closeConfirm() {
    this.setState({ confirmModal: null });
  }

  fireHeroConfirm() {
    if(this.state.selectedHero) {
      for(let i = 0; i<this.props.hero.hired.length; i++) {
        if(this.props.hero.hired[i].id===this.state.selectedHero.id) {
          this.props.dispatch(heroActions.fireHero(i));
          this.setState({selectedHero: null, confirmModal: null});
          break;
        }
      }
    }
  }

  render() {
    let heroList = [];
    if(this.props.hero.hired&&this.props.hero.hired.length) {
      for(let i=0; i<this.props.hero.hired.length; i++) {
        let index = i;
        console.log(this.props.hero.hired[i]);
        heroList.push(
          <ListGroupItem onClick={()=>{this.selectHero(this.props.hero.hired[index])}} key={'hero-list-' + i}>
            <div className="hero-list-item">
              <div className="hero-name">{this.props.hero.hired[index].name}</div>
              <div className="hero-class">{this.props.hero.hired[index].class}</div>
              <div className="hero-quality">{this.LAN.hero.info.quality}: <span className={'hero-quality-' + this.props.hero.hired[index].quality}>{this.props.hero.hired[index].quality&&this.props.hero.hired[index].quality.toUpperCase()}</span></div>
              <div className="hero-score">{this.LAN.hero.info.rate}: {this.props.hero.hired[index].rate}</div>
            </div>
          </ListGroupItem>
        );
      }

    }
    return (
      <div className="hero-tab-container">
        <ListGroup>
          {heroList}
        </ListGroup>
        <div className="hero-info-box">
          <Modal show={!!this.state.selectedHero} onHide={this.closeHero} className="hero-info-modal">
            <Modal.Header closeButton>
              <Modal.Title>
                {this.LAN.strongHoldUI.cityLord.heroInfo}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <HeroInfo heroData={this.state.selectedHero} upgradeHero={this.upgradeHero}/>
            </Modal.Body>
            <Modal.Footer>
              <div className="hero-info-btns">
                <div className="hero-info-btn-container">
                  <Button onClick={this.fireHero} bsStyle="warning" className="fire-hero-btn">
                    {this.LAN.strongHoldUI.cityLord.fire}
                  </Button>
                </div>
                <div className="hero-info-btn-container">
                  <Button onClick={this.upgradeHero} bsStyle="primary" disabled={heroServices.getExpRequired(this.state.selectedHero?(this.state.selectedHero.lv + 1):1) > this.props.storage.resource.soul}>
                    {this.LAN.strongHoldUI.cityLord.upgrade}
                    <div className={heroServices.getExpRequired(this.state.selectedHero?(this.state.selectedHero.lv + 1):1) > this.props.storage.resource.soul?'danger':''}>( {heroServices.getExpRequired(this.state.selectedHero?(this.state.selectedHero.lv + 1):1)} / {this.props.storage.resource.soul} )</div>
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal show={!!this.state.confirmModal} onHide={this.closeConfirm} className="hero-info-modal">
            <Modal.Body>
              {this.LAN.strongHoldUI.cityLord.fireWarning} {this.LAN.confirm.question}
            </Modal.Body>
            <Modal.Footer>
              <Button className="left" onClick={this.fireHeroConfirm}> {this.LAN.confirm.yes} </Button>
              <Button className="right" onClick={this.closeConfirm}> {this.LAN.confirm.no} </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold, hero, storage } = store;
  const { inventory } = storage || {inventory: {}};

	return { hero, storage, inventory };
}
export default connect(mapStoreToProps)(HeroTab);
