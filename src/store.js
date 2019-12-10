import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { devMode } from './utils/Consts';

const initialState = {};
const middleware = [thunk];

const dev = function(argument){
   if(devMode){
      return (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose
   }
   else{
      return compose
   }
}

const store = createStore(
   rootReducer, 
   initialState, 
   compose (
      applyMiddleware(...middleware),
      dev()
   )
);

export default store;


