import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { getPost, getComments } from '../actions'
import NotFound from '../components/NotFound'
import Loading from '../components/Loading'
import Claps from './Claps'
import CommentsList from '../components/CommentsList'
import NewComment from './NewComment'
import '../styles/Article.css'

class Article extends Component {

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getPost(id)
    this.props.getComments(id)
  }

  createMarkup = body => ({__html: body})

  render() {
    const { activePost, loading, activeComments } = this.props

    if (activePost.error) 
      return (<NotFound />)

    if (loading)
      return (<Loading />)

    return (
      <div className="article">
        <div className="article__inner"> 
          <div className="article__meta">
            <div className="article__user-image"></div>
            <div className="article__meta-info">
              <span className="article__user-name">{activePost.author}</span>
              <span className="article__date">{moment(activePost.timestamp).format('dddd, MMMM Do YYYY')}</span>
            </div>
          </div>

          <h2 className="article__title">{activePost.title}</h2>
          <div className="article__body" 
            dangerouslySetInnerHTML={this.createMarkup(activePost.body)}>
          </div>

          <Claps post={activePost} context="Article"/>

          <div className="article__categories">
            <span className="article__category">{activePost.category}</span>
          </div>

        </div>

        <div className="comments">
          <div className="comments__inner">
            <h4 className="comments__heading">Responses</h4>
            <NewComment postId={activePost.id} />
            <CommentsList activeComments={activeComments} />
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ activePost, loading, activeComments }) => ({
  activePost,
  activeComments,
  loading
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPost,
    getComments
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Article)