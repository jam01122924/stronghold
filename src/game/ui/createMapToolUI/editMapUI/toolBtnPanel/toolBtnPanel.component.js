import React from 'react';
import {ButtonToolbar, ButtonGroup, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import './toolBtnPanel.component.css';
import '../../../../style/mapTexture.css';

import textureData from '../../../../data/texture';

class ToolBtnPanel extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTexture: ''
    };
  }

  render() {
    let self = this;
    let textureGroup = [];
    if(textureData&&textureData[this.props.type]&&textureData[this.props.type].length) {
      textureData[this.props.type].forEach((btn)=>{
        let textureBtns = [];
        btn.data.forEach((t) => {
          textureBtns.push(
            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-texture-btn-' + t}>{t}</Tooltip>} key={t}>
              <Button className={(self.state.activeTexture===t?'active-texture ':'') + 'texture-btn'}
                onClick={()=>{self.setState({activeTexture: t}); self.props.callBack(t, self.props.type)}}>
                <div className={t + ' map-texture texture-btn-img'}></div>
              </Button>
            </OverlayTrigger>
          );
        });
        textureGroup.push(<ButtonGroup className="tool-btn-panel-btn-group" key={btn.name}>{textureBtns}</ButtonGroup>);
      });

      if(this.props.type!=='terrain') {
        textureGroup.push(
          <ButtonGroup className="tool-btn-panel-btn-group" key="eraseButtonGroup">
            <OverlayTrigger placement="top" overlay={<Tooltip id={'tooltip-texture-btn-erase'}>erase</Tooltip>} key="erase">
              <Button className={(self.state.activeTexture==="erase"?'active-texture ':'') + 'texture-btn'}
                onClick={()=>{self.setState({activeTexture: "erase"}); self.props.callBack("erase", self.props.type)}}>
                <i className="fa fa-eraser" aria-hidden="true"></i>
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        );
      }
    }

    return (
      <div className="tool-btn-panel-container">
        <ButtonToolbar>
          {textureGroup}
        </ButtonToolbar>
      </div>
    );
  }
}

export default ToolBtnPanel;
