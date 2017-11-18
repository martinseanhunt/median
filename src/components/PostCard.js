import React from 'react'
import { Link } from 'react-router-dom'
import striptags from 'striptags'
import moment from 'moment'

import '../styles/PostCard.css'
import Claps from '../containers/Claps'

const PostCard = props => {
  const { post } = props
  const body = post.body.length < 85
    ? striptags(post.body)
    : striptags(post.body.substring(0,85) + '...')
  const postLink = `/article/${post.id}`

  return(
    <div className="grid__col grid__col--1 post-card">
      <div className="post-card__inner">
        <Link to={postLink} className="post-card__image"></Link>

        <div className="post-card__content">
          <span className="post-card__category">{post.category}</span>
          <h3 className="post-card__title"><Link to={postLink}>{post.title}</Link></h3>
          <p className="post-card__body"><Link to={postLink}>{body}</Link></p>
        </div>

        <Claps post={post} context="PostCard" />

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

export default PostCard