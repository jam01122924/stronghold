import React from 'react';
import './snippet.component.css';

import { Col } from 'react-bootstrap'

class Snippet extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      // Use this as an indicator for props
      // Type of the Snippet: (horizontal or vertical, default horizontal)
      type: this.props.data.type==='v'?'v':'h',
      // Size of the Snippet: (default middle size)
      width: this.props.data.width==='sm'?'sm':this.props.data.width==='lg'?'lg':'md',
      height: this.props.data.height==='sm'?'sm':this.props.data.height==='lg'?'lg':'md',
      // url of the image:
      imgUrl: this.props.data.imgUrl,
      // position of the image: (left, right, top, bottom, middle, bg;  default as bg)
      imgPos: this.props.data.imgPos==='left'?'left':this.props.data.imgPos==='right'?'right':this.props.data.imgPos==='top'?'top':this.props.data.imgPos==='bottom'?'bottom':this.props.data.imgPos==='middle'?'middle':'bg',
      // text for title:
      title: this.props.data.title,
      titleAlign: this.props.data.titleAlign,
      // text for sub title:
      subTitle: this.props.data.subTitle,
      subTitleAlign: this.props.data.subTitleAlign,
      // text for content:
      content: this.props.data.content,
      contentAlign: this.props.data.contentAlign,
      // text for button:
      buttonText: this.props.data.buttonText,
      // animation for hover: (default none)
      animation: this.props.data.animation,
      // read more link: (default shown)
      hideReadMore: this.props.data.hideReadMore==='yes'?true:false,
      // Customize snippet number in a row:
      snippetNumXs: this.props.data.snippetNumXs,
      snippetNumSm: this.props.data.snippetNumSm,
      snippetNumMd: this.props.data.snippetNumMd,
      snippetNumLg: this.props.data.snippetNumLg,

    };
  }

  componentDidMount() {
    this.setState({
      imgUrl: 'https://www.rbauction.com/cms_assets/images/photos/media/general-auction-images/02-wheel-loaders-orlando%20.jpg'
    });
  }

  render() {
    let xs = 12, sm = 12, md = 12, lg = 12;
    if(this.state.type==='h'){
      switch(this.state.width) {
        case 'sm':
          xs=12; sm=6; md=4; lg=3;
          break;
        case 'md':
          xs=12; sm=12; md=6; lg=4;
          break;
        case 'lg':
          xs=12; sm=12; md=12; lg=12;
          break;
        default:
          xs=12; sm=12; md=6; lg=4;
          break;
      }
      // overwrite col number if we have customized data:
      xs = this.state.snippetNumXs?this.state.snippetNumXs:xs;
      sm = this.state.snippetNumSm?this.state.snippetNumSm:sm;
      md = this.state.snippetNumMd?this.state.snippetNumMd:md;
      lg = this.state.snippetNumLg?this.state.snippetNumLg:lg;
    }

    let content = this.state.content;
    return (
      <Col xs={xs} sm={sm} md={md} lg={lg}>
        <div className="snippet-container">
          <div className={"snippet-content snippet-height-" + this.state.height}>
            {this.state.imgPos==='bottom'||this.state.imgPos==='middle'?
              <div className="top-content">
                <div className={'title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {this.state.title}
                </div>
                <div className={'sub-title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {this.state.subTitle}
                </div>
              </div>:null
            }
            {this.state.imgPos==='bottom'?
              <div>
                <div className={'content' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {content}
                </div>
              </div>:null
            }
            <div className={'img-container img-' + this.state.imgPos}>
              <img src={this.state.imgUrl} className='snippet-img' alt={this.state.imgUrl} />
            </div>
            {this.state.imgPos==='bg'?
              <div className='img-inside-content'>
                <div className="img-inside-content-box">
                  <div className={'title white-title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                    {this.state.title}
                  </div>
                  <div className={'sub-title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                    {this.state.subTitle}
                  </div>
                  <div className={'content' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                    {content}
                  </div>
                </div>
              </div>:null
            }

            {this.state.imgPos==='top'?
              <div className="bottom-content">
                <div className={'title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {this.state.title}
                </div>
                <div className={'sub-title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {this.state.subTitle}
                </div>
              </div>:null
            }
            {this.state.imgPos==='top'||this.state.imgPos==='middle'?
              <div>
                <div className={'content' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {content}
                </div>
              </div>:null
            }

            {this.state.imgPos==='left'||this.state.imgPos==='right'?
              <div className={this.state.imgPos==='left'?'right-content':'left-content'}>
                <div className={'title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {this.state.title}
                </div>
                <div className={'sub-title' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {this.state.subTitle}
                </div>
                <div className={'content' + (this.state.titleAlign==='right'?' align-right':this.state.titleAlign==='center'?' align-center':' align-left')}>
                  {content}
                </div>
              </div>:null
            }
          </div>
        </div>
      </Col>
    );
  }
}

export default Snippet;
