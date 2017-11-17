import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../styles/App.css';
import Header from '../components/Header'
import Home from './Home'
import NewPost from './NewPost'
import Article from './Article'
import { getAllPosts, getAllCategories } from '../actions'


class App extends Component {
  componentDidMount() {
    this.props.getAllPosts()
    this.props.getAllCategories()
  }

  render() {
    return (
      <div className="App">
        <Header page={this.props.location.pathname} />

        <Route exact path="/" render={() => (
          <Home />
        )} />

        <Route exact path="/post" render={() => (
          <NewPost />
        )} />
        
        <Route path="/article/:id" component={Article} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getAllPosts, 
    getAllCategories
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(App)
