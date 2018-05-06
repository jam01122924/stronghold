import React from 'react';

class MapGrid extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }

  handleClick() {
    console.log('click on', this.props.pos);
    this.props.handleClick({data: this.props.data, positionX: this.props.pos.x, positionY: this.props.pos.y});
  }


  render() {
    return (
      <div className={"map-grid-container" + (this.props.showGrid?' map-grid-show-grid':'')} onClick={this.handleClick}>
        <div className={this.props.data.terrain.img + ' map-grid-unit map-texture'} ></div>
        {this.props.data.geomorphology?
          <div className={this.props.data.geomorphology.img + ' map-grid-unit map-texture map-grid-overlap-unit'} ></div>:null
        }
        {this.props.data.building?
          <div className={this.props.data.building.img + ' map-grid-unit map-texture map-grid-overlap-unit'} ></div>:null
        }
        {this.props.data.item?
          <div className={this.props.data.item.img + ' map-grid-unit map-texture map-grid-overlap-unit'} ></div>:null
        }
        {this.props.data.monster?
          <div className={this.props.data.monster.img + ' map-grid-unit map-texture map-grid-overlap-unit'} ></div>:null
        }
      </div>
    );
  }
}

export default MapGrid;
