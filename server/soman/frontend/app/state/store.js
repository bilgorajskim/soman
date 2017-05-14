import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducers from './modules/index';

const logger = createLogger();
let middleware = [];
if (process.env.NODE_ENV !== 'production')
{
    middleware.push(logger);
}
const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

export default store;
