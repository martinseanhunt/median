import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header'
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" render={() => (
          <div>Home page fools</div>
        )} />
        <Route path="/article" render={() => (
          <div>article page fools</div>
        )} />
      </div>
    );
  }
}

export default App;
