/*jshint esversion: 6 */
import React from 'react';
import './tavernHeroTab.component.css';

import { connect } from 'react-redux';
import * as strongHoldActions from '../../../../../redux/actions/strongHoldActions';
import * as heroActions from '../../../../../redux/actions/heroActions';

import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import strongholdServices from '../../../../../services/strongholdServices/strongholdServices';
import heroServices from '../../../../../services/heroServices/heroServices';

import HeroInfo from '../../../../../common/heroInfo/heroInfo.component';

class TavernHeroTab extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      selectedHero: null,
    };

    this.selectHero = this.selectHero.bind(this);
    this.closeHero = this.closeHero.bind(this);
    this.hireHero = this.hireHero.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(heroActions.cleanHeroInTavern());
    for(let i=0; i<4; i++) {
      let quality = strongholdServices.getTavernHeroQuality(this.props.buildings.tavern.lv);
      this.props.dispatch(heroActions.addHeroToTavern(heroServices.createRandomHero(quality)));
    }
  }

  selectHero(hero, index) {
    this.setState({selectedHero: hero, selectedHeroIndex: index});
  }

  closeHero() {
    this.setState({selectedHero: null})
  }

  hireHero() {
    this.setState({
      selectedHero: null,
    });
    this.props.dispatch(heroActions.hireHero(this.state.selectedHeroIndex));
  }

  render() {
    let heroList = [];
    for(let index=0; index<this.props.hero.inTavern.length; index++) {
      console.log(this.props.hero.inTavern[index]);
      heroList.push(
        <ListGroupItem onClick={()=>{this.selectHero(this.props.hero.inTavern[index], index)}} key={'hero-list-' + index}>
          <div className="hero-list-item">
            <div className="hero-name">{this.props.hero.inTavern[index].name}</div>
            <div className="hero-class">{this.props.hero.inTavern[index].class}</div>
            <div className="hero-quality">{this.LAN.hero.info.quality}: <span className={'hero-quality-' + this.props.hero.inTavern[index].quality}>{this.props.hero.inTavern[index].quality&&this.props.hero.inTavern[index].quality.toUpperCase()}</span></div>
            <div className="hero-score">{this.LAN.hero.info.rate}: {this.props.hero.inTavern[index].rate}</div>
          </div>
        </ListGroupItem>
      );
    }
    return (
      <div className="hero-tab-container">
        <div className="hero-tab-intro">
          {this.LAN.strongHoldUI.tavern.enterIntro}:
        </div>
        <ListGroup>
          {heroList}
        </ListGroup>









        <div className="hero-info-box">
          <Modal show={!!this.state.selectedHero} onHide={this.closeHero} className="hero-info-modal">
            <Modal.Header closeButton>
              <Modal.Title>
                Hero Info
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <HeroInfo heroData={this.state.selectedHero} hireHero={this.hireHero}/>
            </Modal.Body>
            <Modal.Footer>
              <div className="hero-info-btns">
                <div className="hero-info-btn-container">
                  <Button onClick={this.hireHero}  bsStyle="primary">{this.LAN.strongHoldUI.tavern.hire}</Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { strongHold, hero } = store;
  const { buildings } = strongHold || {hero: {}, buildings: {}};

	return { hero, buildings };
}
export default connect(mapStoreToProps)(TavernHeroTab);
