import React from 'react';
import './heroInfo.component.css';

class HeroInfo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };

  }

  componentDidMount() {
    console.log(this.props.heroData);
  }


  render() {
    return (
      <div className="hero-info-container">
        HeroInfo
      </div>
    );
  }
}

export default HeroInfo;
