import React from 'react';
import './heroInfo.component.css';

import HeroEquipmentInfo from './heroEquipmentInfo/heroEquipmentInfo.component';

import { Grid, Row, Col } from 'react-bootstrap';

// Props: 
// heroData

class HeroInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.LAN = window.localization.gameLanguage;
    this.state = {
    };

  }

  componentDidMount() {
  }

  render() {
    let heroStatus = [];
    let heroGrowth = [];
    if(this.props.heroData&&this.props.heroData.status&&this.props.heroData.quality) {
      for(let status in this.props.heroData.status) {
        heroStatus.push(
          <div className="hero-status-line" key={'hero-status-' + status}>
            <span className="status-name">{this.LAN.hero.statusShort[status]}</span>
            <span className="status-num">{this.props.heroData.status[status]}</span>
          </div>
        );
        heroGrowth.push(
          <div className="hero-status-line" key={'hero-growth-' + status}>
            <span className="status-name">{this.LAN.hero.statusShort[status]}</span>
            <span className="status-num">{this.props.heroData.grow[status]}</span>
          </div>
        );
      }

      return (
        <div className="hero-info-container">
          <div className="hero-info-top">
            <div className="hero-name">
              {this.props.heroData.name}
            </div>
            <div className="hero-lv">
              {this.LAN.hero.info.lv} {this.props.heroData.lv} {this.props.heroData.class}
            </div>
          </div>
          <div className="hero-info-center">
            <HeroEquipmentInfo heroData={this.props.heroData}/>
          </div>
          <div className="hero-info-bottom">
            <div className="hero-info-panel">
              <Grid style={{width: '100%'}}>
                <Row className="hero-info-row">
                  <Col xs={12} sm={6} className="hero-info-col">
                    <div className="hero-quality">
                      <div className="hero-info-name">
                        {this.LAN.hero.info.quality}:
                      </div>
                      <span className={'hero-info-value hero-quality-' + this.props.heroData.quality}>
                        {this.props.heroData.quality&&this.props.heroData.quality.toUpperCase()}
                      </span>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} className="hero-info-col">
                    <div className="hero-rate">
                      <div className="hero-info-name">
                        {this.LAN.hero.info.rate}:
                      </div>
                      <div className="hero-info-value">
                        {this.props.heroData.rate}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={12} sm={6} className="hero-info-col">
                    <div className="hero-status">
                      <div className="hero-info-name">
                        {this.LAN.hero.info.status}:
                      </div>
                      <div className="hero-info-value">
                        {heroStatus}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} className="hero-info-col">
                    <div className="hero-grow">
                      <div className="hero-info-name">
                        {this.LAN.hero.info.growth}:
                      </div>
                      <div className="hero-info-value">
                        {heroGrowth}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col xs={12} sm={6} className="hero-info-col">

                  </Col>
                  <Col xs={12} sm={6} className="hero-info-col">

                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default HeroInfo;
