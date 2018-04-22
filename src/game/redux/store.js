import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import reducers from './reducers';
import middleware from './middleware';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, middleware);
const persistor = persistStore(store);

export default {store, persistor};
