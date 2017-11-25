import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'

// Middleware
import logger from 'redux-logger'

// Martyware
import rootReducer from './reducers'
import App from './components/App';

import './styles/index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)

// I'm rendering App through an empty route because otherwise it doesn't get passed history 
// and routing doesn't work correctly because it uses connect(). 
// See https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)
