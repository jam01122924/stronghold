import React from 'react';

// Props:
// width, height, curr, max


class HpMpBar extends React.Component {

  render() {
    let containerStyle = {
        display: 'block',
        height: (this.props.height?this.props.height:10) + 'px',
        minWidth: (this.props.height?this.props.height:80) + 'px',
        overflow: 'hidden',
        position: 'relative',
    }

    let barStyle = {
        borderRadius: '5px',
        background: this.props.type==='hp'?'green':this.props.type==='mp'?'blue':'yellow',
        height: (this.props.height?this.props.height:10) + 'px',
        width: (this.props.curr/this.props.max)*100 + '%',
    };

    let numStyle = {
        color: '#ccc',
        fontSize: (this.props.height?this.props.height:10) + 'px',
        textAlign: 'center',
        margin: '-' + (this.props.height?this.props.height:10) + 'px',
    }
    return (
        <div className="hp-mp-bar-container" style={containerStyle}>
            <div className="hp-mp-bar" style={barStyle}>
            </div>
            <div className="hp-mp-num" style={numStyle}>
                {this.props.curr}
            </div>
        </div>
    );
  }
}

export default HpMpBar;
