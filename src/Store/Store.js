import {createStore, applyMiddleware} from 'redux';
import {allReducers} from './allReducer';
import logger from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import Storage from '@react-native-async-storage/async-storage';
import createSaga from 'redux-saga';
import {SagaWatcher} from './SagaWatcher';

const persistConfig = {
  key: 'Asd',
  storage: Storage,
};

const sagaMiddleware = createSaga();

const persistedReducer = persistReducer(persistConfig, allReducers);

export const Store = createStore(
  persistedReducer,
  applyMiddleware(logger, sagaMiddleware),
);

export const Persistor = persistStore(Store);

sagaMiddleware.run(SagaWatcher);
