import React from 'react';
import './floatingText.component.css';

class FloatingText extends React.Component {

  // constructor(props, context) {
  //   super(props, context);
  //
  // }

  componentDidMount() {
  }


  render() {
    let style={
      color: this.props.color?this.props.color:'white',
      fontSize: this.props.fontSize?this.props.fontSize:'20px',
    };
    let arrayText = [];
    if(Array.isArray(this.props.text)) {
      for(let i =0; i<this.props.text.length; i++) {
        arrayText.push(<div key={'floatingText-' + i}>{this.props.text[i]}</div>)
      }
    }
    return (
      <div className="floating-text-container" style={style}>
        {arrayText.length?arrayText:this.props.text}
      </div>
    );
  }
}

export default FloatingText;
