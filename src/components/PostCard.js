import React from 'react'
import { Link } from 'react-router-dom'
import striptags from 'striptags'
import moment from 'moment'
import '../styles/PostCard.css'

const PostCard = props => {
  const { post } = props
  const body = post.body.length < 180
    ? striptags(post.body)
    : striptags(post.body.substring(0,180) + '...')

  return(
    <Link 
      to={`/article/${post.id}`}
      className="grid__col grid__col--1 post-card"
    >
      <div className="post-card__inner">
        <div className="post-card__image"></div>

        <div className="post-card__content">
          <span className="post-card__category">{post.category}</span>
          <h3 className="post-card__title">{post.title}</h3>
          <p className="post-card__body">{body}</p>
        </div>
        {post.voteScore}
        <div className="post-card__meta">
          <div className="post-card__user-image"></div>
          <div className="post-card__meta-info">
            <span className="post-card__user-name">{post.author}</span>
            <span className="post-card__date">{moment(post.timestamp).format('dddd, MMMM Do YYYY')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}         

export default PostCard