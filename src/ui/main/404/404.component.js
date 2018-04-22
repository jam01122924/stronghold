import React from 'react';
import './404.component.css';

class Page404 extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="page-404-container">
        <h1 className="title">404</h1>
        <h3 className="sub-title">Page not found</h3>
        <div className="content">
          Sorry, we couldn't find your page
        </div>
        <div className="home-page-btn">
          <a type="button" className="btn btn-default" href="/">Home Page</a>
        </div>
      </div>
    );
  }
}

export default Page404;
