import React, { Component } from 'react';
import Header from './ui/header/header.component';
import Main from './ui/main/main.component';
import './App.css';
import './style/font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <div className="App-header">
          <Header />
        </div>
        <div className="App-main">
          <Main />
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default App;
