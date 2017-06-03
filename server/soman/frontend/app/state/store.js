import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducers from './modules/index';
import thunk from 'redux-thunk';

const logger = createLogger();
let middleware = [thunk, logger];
const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

export default store;
