import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllPosts } from '../actions'
import Header from '../components/Header'
import '../styles/App.css';

class App extends Component {
  componentDidMount() {
    // Trigger action creator
  }

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

const mapStateToProps = ({ posts }) => {
 return {
  posts
 }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllPosts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
