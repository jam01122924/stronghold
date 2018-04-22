import React from 'react';
import './snippetDemo.component.css';

import Snippet from '../../../../common/snippet/snippet.component';

class SnippetDemo extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      snippetArray: [
        {
          type: 'h',
          width: 'sm',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'top',
          title: 'test1-title',
          subTitle: 'test1-subTitle',
          content: 'test1',
          buttonText: 'test1-btn',
          animation: null,
          hideReadMore: 'yes',
        },
        {
          type: 'h',
          width: 'sm',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'middle',
          title: 'test2-title',
          subTitle: 'test2-subTitle',
          content: 'test2ggggggggggggg ggggggggggg gggggggggg ggggggg ggggggggggg gggggggggggggggg ggggggggggg gggggggggg ggggggg ggggggggggg ggg',
          buttonText: 'test2-btn',
        },
        {
          type: 'h',
          width: 'sm',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'bottom',
          title: 'test3-title-longgggggg ggggggggg gggggggggggggggggggg ggggggggggggggggg ggggggggggg ggggggg gggggggg',
          subTitle: 'test3-subTitle-longggggggggg ggggggggggggg ggggggggggggg ggggggggggggg ggggggg gggggggggggg ggggggggggg',
          content: 'test3-longgggggggggggg ggggggggggg gggggggggg ggggggg ggggggggggg gggggg gggggg gggggggggggg ggggggggggggg ggggggggggggg gggggggggg gggggggggggg ggggggggggggg ggggggggggg gggggggg ggggggggggggggg gggggggggggg gggggggggggg ggggggggggg ggggggggggggg ggggggggg ggggggg ggggg ggggg',
          buttonText: 'test3-btn-longggggg gggggggggggg ggggggggggg gggggggggg ggggggg ggggggggggggg gggggg gggggggg gggggg',
        },
        {
          type: 'h',
          width: 'sm',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'bg',
          title: 'test4-title',
          subTitle: 'test4-subTitle',
          content: 'test4',
          buttonText: 'test4-btn',
        },
        {
          type: 'h',
          width: 'md',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'left',
          title: 'test5-title',
          subTitle: 'test5-subTitle',
          content: 'test5',
          buttonText: 'test5-btn',
        },
        {
          type: 'h',
          width: 'md',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'right',
          title: 'test5-title',
          subTitle: 'test5-subTitle',
          content: 'test5',
          buttonText: 'test5-btn',
        },
        {
          type: 'h',
          width: 'md',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'middle',
          title: 'test5-title',
          subTitle: 'test5-subTitle',
          content: 'test5',
          buttonText: 'test5-btn',
        },
        {
          type: 'h',
          width: 'md',
          height: 'md',
          imgUrl: 'this.props.data.imgUrl',
          imgPos: 'bg',
          title: 'test5-title',
          subTitle: 'test5-subTitle',
          content: 'test5',
          buttonText: 'test5-btn',
        }
      ]
    };
  }

  componentDidMount() {

  }

  render() {
    let snippetArray = [];
    for(let i=0; i<this.state.snippetArray.length; i++) {
      snippetArray.push(<Snippet data={this.state.snippetArray[i]} key={'snippet-' + i} />);
    }
    return (
      <div className="snippet-demo-container">
        {snippetArray}
      </div>
    );
  }
}

export default SnippetDemo;
