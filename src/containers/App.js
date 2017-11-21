import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../styles/App.css';
import Header from '../components/Header'
import Dashboard from './Home'
import NewPost from './NewPost'
import Article from './Article'
import EditPost from './EditPost'
import { getAllPosts, getAllCategories } from '../actions'


class App extends Component {
  componentDidMount() {
    this.props.getAllPosts()
    this.props.getAllCategories()
  }

  render() {
    return (
      <div className="App">
        <Header page={this.props.location.pathname} categories={this.props.categories} />

        <Switch>
          <Route exact path="/" component={Dashboard} />

          <Route exact path="/post/:category" component={NewPost} />

          <Route exact path="/post" component={NewPost} />
          
          <Route exact path="/:category/:id/edit" component={EditPost} />

          <Route exact path="/:category/:id" component={Article} />
          
          <Route path="/:category" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories })

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getAllPosts, 
    getAllCategories
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
