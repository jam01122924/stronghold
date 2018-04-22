import React from 'react';
import './game.component.css';

import { Provider } from 'react-redux';
import persistedStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import GameContainer from './gameContainer.component';

class Game extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="game-container" unselectable="on" >
        <Provider store={persistedStore.store}>
          <PersistGate loading={null} persistor={persistedStore.persistor}>
            <GameContainer></GameContainer>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default Game;
