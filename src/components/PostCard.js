import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'
import sanitizeHtml from 'sanitize-html'

import '../styles/PostCard.css'
import Claps from '../containers/Claps'
import { deletePost } from '../actions'

class PostCard extends Component {
  striptags = html => sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {}
  })

  render() {
    const { post, deletePost } = this.props
    const title = post.updates ? post.updates.title : post.title
    const fullBody = post.updates ? post.updates.body : post.body
    const body = fullBody.length < 85
      ? this.striptags(fullBody)
      : this.striptags(fullBody.substring(0,85) + '...')
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

          <div className="post-card__controls">
            <Claps post={post} context="PostCard" />
            <Link to={`/${post.category}/${post.id}/edit`} className="post-card__control-button post-card__edit">
              <FontAwesome name='pencil-square-o'/>
            </Link>
            <button onClick={() => deletePost(post.id)} className="post-card__control-button post-card__delete">
              <FontAwesome name='trash '/>
            </button>
          </div>

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