import React from 'react';

class MapGrid extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }

  handleClick() {
    console.log('click on', this.props.pos);
    this.props.handleClick&&this.props.handleClick({data: this.props.data, positionX: this.props.pos.x, positionY: this.props.pos.y});
  }

  handleHover() {
    this.props.handleHover&&this.props.handleHover({data: this.props.data, positionX: this.props.pos.x, positionY: this.props.pos.y});
  }

  render() {
    return (
      <div className={"map-grid-container" + (this.props.showGrid?' map-grid-show-grid':'')}
        onClick={this.handleClick} onMouseEnter={this.handleHover}>
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
          <div className={'map-grid-unit map-texture map-grid-overlap-unit map-grid-monster-icon'} ></div>:null
        }
        {this.props.showGrid&&this.props.data.action?
          <div className='map-grid-unit map-texture map-grid-overlap-unit'>
            {this.props.data.action.type==="mapChange"?(
              <div style={{lineHeight: '10px', fontSize: '8px'}}>
                <div>{this.props.data.action.data.id}</div>
                <div>x: {this.props.data.action.data.position.x}, y: {this.props.data.action.data.position.y}</div>
              </div>):this.props.data.action.data?this.props.data.action.data:this.props.data.action.type}
          </div>:null
        }
      </div>
    );
  }
}

export default MapGrid;
