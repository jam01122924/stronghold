import React from 'react';
// import FontAwesome from 'react-fontawesome';
import {ButtonToolbar, ButtonGroup, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';

import './editMapUI.component.css';

import ToolBtnPanel from './toolBtnPanel/toolBtnPanel.component';

import GenerateMapUI from './generateMapUI/generateMapUI.component';
import OpenMapUI from './openMapUI/openMapUI.component';

import { connect } from 'react-redux';
import * as gameStageActions from '../../../redux/actions/gameStageActions';
import * as mapActions from '../../../redux/actions/mapActions';

class EditMapUI extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeToolBtns: 'files',
      toolModal: ''
    };
    this.generate = this.generate.bind(this);
    this.open = this.open.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);

    this.selectTexture = this.selectTexture.bind(this);

  }

  changeStage(stage) {
    this.props.dispatch(gameStageActions.changeStage(stage));
  }

  componentWillReceiveProps(nextProps) {
    console.log('editMapUI receive props');
  }
  open(){
    this.setState({toolModal: 'openMap'});
  }
  saveMap() {

  }
  load() {
    this.props.dispatch(mapActions.loadMapToLocal());
  }
  save() {
    this.props.dispatch(mapActions.saveMapToLocal('test'));
  }
  generate() {
    this.setState({toolModal: 'generateMap'});
  }

  selectTexture(t, targetlayer) {
    this.props.dispatch(mapActions.changeClickAction('texture_'+targetlayer));
    this.props.dispatch(mapActions.selectTexture(t));
  }

  emptyTexture() {
    this.props.dispatch(mapActions.changeClickAction(''));
    this.props.dispatch(mapActions.selectTexture(''));
  }

  render() {
    let toolBtns = [];
    switch(this.state.activeToolBtns) {
      case 'files':
        toolBtns = (
          <div className="tool-btn-panel-container">
            <ButtonToolbar>
              <ButtonGroup className="tool-btn-panel-btn-group">
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-file-btn-new">new</Tooltip>} key="new">
                  <Button onClick={this.generate}><i className="fa fa-plus-square" aria-hidden="true"></i></Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-file-btn-open">open</Tooltip>} key="open">
                  <Button onClick={this.open}><i className="fa fa-folder-open" aria-hidden="true"></i></Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-file-btn-save">save</Tooltip>} key="save">
                  <Button onClick={this.saveMap}><i className="fa fa-floppy-o" aria-hidden="true"></i></Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-file-btn-download">download</Tooltip>} key="download">
                  <Button onClick={this.load}><i className="fa fa-download" aria-hidden="true"></i></Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-file-btn-upload">upload</Tooltip>} key="upload">
                  <Button onClick={this.save}><i className="fa fa-upload" aria-hidden="true"></i></Button>
                </OverlayTrigger>
              </ButtonGroup>
              <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-file-btn-delete">delete</Tooltip>} key="delete">
                <Button className="tool-btn-panel-btn-group"><i className="fa fa-trash" aria-hidden="true"></i></Button>
              </OverlayTrigger>
            </ButtonToolbar>
          </div>
        );
      break;
      default:
        toolBtns = (<ToolBtnPanel callBack={this.selectTexture} type={this.state.activeToolBtns}></ToolBtnPanel>);
      break;
    }
    return (
      <div className="edit-map-UI-container">
        <ButtonToolbar className="btn-bar">
          <ButtonGroup>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-file">File</Tooltip>}>
              <Button className={this.state.activeToolBtns==='files'?'active-tool-btns':''}
                onClick={()=>{this.setState({activeToolBtns: 'files'}); this.emptyTexture()}}>
                <i className="fa fa-file" aria-hidden="true"></i>
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
          <ButtonGroup>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-terrain">Terrain</Tooltip>}>
              <Button className={this.state.activeToolBtns==='terrain'?'active-tool-btns':''}
                onClick={()=>this.setState({activeToolBtns: 'terrain'})}>
                <i className="fa fa-map" aria-hidden="true"></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-tree">Tree</Tooltip>}>
              <Button className={this.state.activeToolBtns==='geomorphology'?'active-tool-btns':''}
                onClick={()=>this.setState({activeToolBtns: 'geomorphology'})}>
                <i className="fa fa-tree" aria-hidden="true"></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-building">Building</Tooltip>}>
              <Button className={this.state.activeToolBtns==='building'?'active-tool-btns':''}
                onClick={()=>this.setState({activeToolBtns: 'building'})}>
                <i className="fa fa-building" aria-hidden="true"></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-monster">Monster</Tooltip>}>
              <Button className={this.state.activeToolBtns==='monster'?'active-tool-btns':''}
                onClick={()=>this.setState({activeToolBtns: 'monster'})}>
                <i className="fa fa-bug" aria-hidden="true"></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-treasure">Treasure</Tooltip>}>
              <Button className={this.state.activeToolBtns==='item'?'active-tool-btns':''}
                onClick={()=>this.setState({activeToolBtns: 'item'})}>
                <i className="fa fa-trophy" aria-hidden="true"></i>
              </Button>
            </OverlayTrigger>
          </ButtonGroup>

        </ButtonToolbar>
        <div className="tool-panel">
          {toolBtns}
        </div>

        <Modal show={this.state.toolModal==='generateMap'} onHide={()=>{this.setState({toolModal: ''})}}>
          <Modal.Header closeButton>
            <Modal.Title>Generate Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenerateMapUI close={()=>{this.setState({toolModal: ''})}}></GenerateMapUI>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.toolModal==='openMap'} onHide={()=>{this.setState({toolModal: ''})}}>
          <Modal.Header closeButton>
            <Modal.Title>Open Map</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OpenMapUI close={()=>{this.setState({toolModal: ''})}}></OpenMapUI>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapStoreToProps (store, ownProps) {
	const { gameStage } = store;
  const { stage } = gameStage || { stage: '' };
  const { map } = store;
  const { mapDatas } = map || { mapDatas: []};
	return { stage, mapDatas };
}
export default connect(mapStoreToProps)(EditMapUI);
