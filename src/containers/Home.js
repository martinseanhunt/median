import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostsList from '../components/PostsList'

class Home extends Component {
  render() {
    return (
      <PostsList title="All Posts"/>
    )
  }
}

const mapStateToProps = ({ posts, orderBy }) => ({ posts, orderBy })

export default connect(mapStateToProps)(Home);
