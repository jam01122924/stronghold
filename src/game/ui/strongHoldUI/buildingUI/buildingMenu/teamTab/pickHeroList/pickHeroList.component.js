/*jshint esversion: 6 */
import React from 'react';
import './pickHeroList.component.css';

import { connect } from 'react-redux';
import * as heroActions from '../../../../../../redux/actions/heroActions';

import { Modal, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

// import heroServices from '../../../../../../services/heroServices/heroServices';

import HeroInfo from '../../../../../../common/heroInfo/heroInfo.component';

// Component to display heroList.
// Accept Props:
// heroes: list of Heroes

class PickHeroList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
      viewHero: null,
      currentHeroInTeamIdList: [],
    };

    this.viewHero = this.viewHero.bind(this);
    this.closeViewHero = this.closeViewHero.bind(this);
    this.toggleHero = this.toggleHero.bind(this);
    this.getCurrentInTeamHeroIdList = this.getCurrentInTeamHeroIdList.bind(this);
  }

  componentDidMount() {
    this.getCurrentInTeamHeroIdList();
  }

  getCurrentInTeamHeroIdList() {
    if(this.props.teamIndex!==undefined) {
      let heroIDs = [];
      this.props.hero.team[this.props.teamIndex].member.forEach(h=>{
        heroIDs.push(h.id);
      });
      this.setState({
        currentHeroInTeamIdList: heroIDs
      });
    }

  }

  viewHero(hero) {
    this.setState({viewHero: hero});
  }
  closeViewHero() {
    this.setState({viewHero: null});
  }
  toggleHero(hero, isSelected) {
    if(!isSelected){
      if(this.state.currentHeroInTeamIdList.length<this.props.hero.teamSize) {
        this.props.dispatch(heroActions.addHeroToTeam({teamIndex: this.props.teamIndex, hero: hero}));
      }
    } else {
      this.props.dispatch(heroActions.removeHeroFromTeam({teamIndex: this.props.teamIndex, hero: hero}));
    }
    this.getCurrentInTeamHeroIdList();
  }

  render() {
    let heroList = [];
    if(this.props.hero.team[this.props.teamIndex]) {
      for(let index=0; index<this.props.hero.hired.length; index++) {
        let isSelectedIndex = -1;
        isSelectedIndex = this.state.currentHeroInTeamIdList.indexOf(this.props.hero.hired[index].id) + 1;
        heroList.push(
          <ListGroupItem key={'hero-list-' + index}  className={isSelectedIndex>0?' selected-hero':''}>
            <div className="hero-list-item">
              <div className="hero-info hero-name">{this.props.hero.hired[index].name}</div>
              <div className="hero-info hero-class">{this.props.hero.hired[index].class}</div>
              <div className="hero-info hero-quality">{this.LAN.hero.info.quality}: <span className={'hero-quality-' + this.props.hero.hired[index].quality}>{this.props.hero.hired[index].quality&&this.props.hero.hired[index].quality.toUpperCase()}</span></div>
              <div className="hero-info hero-score">{this.LAN.hero.info.rate}: {this.props.hero.hired[index].rate}</div>
              <div className="hero-info hero-list-btn">
                <div className="hero-index">{isSelectedIndex>0?isSelectedIndex:''}</div>
                <Button onClick={()=>{this.viewHero(this.props.hero.hired[index])}} bsStyle="info">{this.LAN.hero.info.view}</Button>
                <Button onClick={()=>{this.toggleHero(this.props.hero.hired[index], !!isSelectedIndex)}} bsStyle={isSelectedIndex>0?"danger":"primary"}>{isSelectedIndex>0?this.LAN.strongHoldUI.cityExit.remove:this.LAN.strongHoldUI.cityExit.select}</Button>
              </div>
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
          <Modal show={!!this.state.viewHero} onHide={this.closeViewHero} className="hero-info-modal">
            <Modal.Header closeButton>
              <Modal.Title>
                {this.LAN.strongHoldUI.cityLord.heroInfo}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <HeroInfo heroData={this.state.viewHero} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { hero } = store;

	return { hero };
}
export default connect(mapStoreToProps)(PickHeroList);
