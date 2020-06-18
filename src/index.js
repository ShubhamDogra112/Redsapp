import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {applyMiddleware ,createStore , compose , combineReducers} from 'redux'
import AuthReducer from './store/reducers/auth'
import userReducer from './store/reducers/auth_user'
import screamReducer from "./store/reducers/screams"
import thunk from 'redux-thunk'
import './index.scss';



const logger = store=>{
  return next=>{
      return action=>{

          // console.log("Middleware dispatching" +action)
          next(action)

      }
  }
}

const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;


const rootReducer = combineReducers({
  auth:AuthReducer,
  user:userReducer,
  screams:screamReducer

})
const store = createStore( rootReducer , composeEnhancers(applyMiddleware( logger ,thunk)))

const app = <Provider store = {store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
 </React.StrictMode>
 </BrowserRouter>
</Provider>

ReactDOM.render(
  app
  ,
  document.getElementById('root')
);


serviceWorker.unregister();
