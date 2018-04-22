import React from 'react';

class MapGrid extends React.Component {

  // constructor(props, context) {
  //   super(props, context);
  // }
  
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }


  render() {
    return (
      <div className={"map-grid-container" + (this.props.showGrid?' map-grid-show-grid':'')}>
        <div className={this.props.data.terrain.img + ' map-grid-unit map-texture'} onClick={this.props.handleClick}></div>
        {this.props.data.geomorphology?
          <div className={this.props.data.geomorphology.img + ' map-grid-unit map-texture map-grid-overlap-unit'} onClick={this.props.handleClick}></div>:null
        }
        {this.props.data.building?
          <div className={this.props.data.building.img + ' map-grid-unit map-texture map-grid-overlap-unit'} onClick={this.props.handleClick}></div>:null
        }
        {this.props.data.item?
          <div className={this.props.data.item.img + ' map-grid-unit map-texture map-grid-overlap-unit'} onClick={this.props.handleClick}></div>:null
        }
        {this.props.data.monster?
          <div className={this.props.data.monster.img + ' map-grid-unit map-texture map-grid-overlap-unit'} onClick={this.props.handleClick}></div>:null
        }
      </div>
    );
  }
}

export default MapGrid;
