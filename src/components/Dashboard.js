import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PostsList from './PostsList'
import Loading from './Loading'

class Dashboard extends Component {
  render() {
    const { loading, match } = this.props

    if(loading)
      return (<Loading />)

    return (
      <div className="home">
        <PostsList title={match.params.category || 'All Posts'} category={match.params.category}/>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories, loading }) => ({ 
  posts, 
  categories,
  loading
})

export default withRouter(connect(mapStateToProps)(Dashboard));