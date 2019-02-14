import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';
import middlewares from './middlewares';
import thunkMiddleware from 'redux-thunk';

// Our store is basically a huge object with all the data we are going to display
const store = createStore(
  // Reducers are like namespaces inside this big object
  combineReducers(reducers),
  // Middlewares are tools our actions (functions that handle
  // the application logic) will have access to.
  applyMiddleware(thunkMiddleware.withExtraArgument(middlewares))
);

export default store;
