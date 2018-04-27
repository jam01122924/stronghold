import React from 'react';
import './floatingText.component.css';

class FloatingText extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
  }


  render() {
    let style={
      color: this.props.color?this.props.color:'white',
      fontSize: this.props.fontSize?this.props.fontSize:'20px',
    };
    return (
      <div className="floating-text-container" style={style}>
        {this.props.text}
      </div>
    );
  }
}

export default FloatingText;
