import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PostsList from './PostsList'

class Dashboard extends Component {
  render() {
    return (
      <div className="home">
        <PostsList title={this.props.match.params.category || 'All Posts'} category={this.props.match.params.category}/>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories }) => ({ posts, categories })

export default withRouter(connect(mapStateToProps)(Dashboard));