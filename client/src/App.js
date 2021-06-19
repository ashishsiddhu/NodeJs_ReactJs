import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import './App.css';
import Profile from "./components/Profile";
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
            <Profile/>
        </div>
      </Provider>
    );
  }
}


export default App;