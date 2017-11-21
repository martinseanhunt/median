import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import striptags from 'striptags'
import moment from 'moment'

import '../styles/PostCard.css'
import Claps from '../containers/Claps'
import { deletePost } from '../actions'

class PostCard extends Component {
  render() {
    const { post, deletePost } = this.props
    const title = post.updates ? post.updates.title : post.title
    const fullBody = post.updates ? post.updates.body : post.body
    const body = fullBody.length < 85
      ? striptags(fullBody)
      : striptags(fullBody.substring(0,85) + '...')
    const postLink = `/${post.category}/${post.id}`

    return(
      <div className="grid__col grid__col--1 post-card">
        <div className="post-card__inner">
          <Link to={postLink} className="post-card__image"></Link>

          <div className="post-card__content">
            <span className="post-card__category">{post.category}</span>
            <h3 className="post-card__title"><Link to={postLink}>{title}</Link></h3>
            <p className="post-card__body"><Link to={postLink}>{body}</Link></p>
          </div>

          <Claps post={post} context="PostCard" />

          <button onClick={() => deletePost(post.id)}>Delete Post</button>
          <Link to={`/article/${post.id}/edit`}>Edit Post</Link>

          <div className="post-card__meta">
            <div className="post-card__user-image"></div>
            <div className="post-card__meta-info">
              <span className="post-card__user-name">{post.author}</span>
              <span className="post-card__date">{moment(post.timestamp).format('dddd, MMMM Do YYYY')}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}         

const mapDispatchToProps = dispatch => bindActionCreators({ deletePost }, dispatch)

export default connect(null, mapDispatchToProps)(PostCard)