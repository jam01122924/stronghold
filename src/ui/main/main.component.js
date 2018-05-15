import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './home/home.component';
import ContactUs from './contactUs/contactUs.component';
import Page404 from './404/404.component';
import Demo from './demo/demo.component';
import AnimationDemo from './demo/animationDemo/animationDemo.component';
import SnippetDemo from './demo/snippetDemo/snippetDemo.component';
import SnippetPage from './snippetPage/snippetPage.component';
import D3Demo from './demo/d3Demo/d3Demo.component';
import Game from '../../game/game.component';

class Main extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="main-container">
        <Switch>
          <Route exact path='/' component={Game}/>
          <Route path='/trips' component={SnippetPage}/>
          <Route path='/entertainment' component={Demo}/>
            <Route path='/entertainment/model' component={AnimationDemo}/>
            <Route path='/entertainment/frisbee' component={SnippetDemo}/>
            <Route path='/entertainment/food' component={D3Demo}/>
            <Route path='/entertainment/3D' component={D3Demo}/>
            <Route path='/entertainment/others' component={D3Demo}/>
          <Route path='/contact-us' component={ContactUs}/>
          <Route path='/game' component={Home}/>

          <Route path="*" component={Page404} />
        </Switch>
      </div>
    );
  }
}

export default Main;
