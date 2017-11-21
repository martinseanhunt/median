import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loading from '../components/Loading'
import moment from 'moment'

import '../styles/CommentsList.css'
import Claps from '../containers/Claps'
import NewComment from '../containers/NewComment'
import { getComments, deleteComment } from '../actions'

const createMarkup = body => ({__html: body})

class Comments extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getComments(id)
  }

  render() {
    const { activePost, activeComments, deleteComment } = this.props
    return (
      <div className="comments">
        <div className="comments__inner">
          <h4 className="comments__heading">Responses ({activeComments.comments.length})</h4>
          <NewComment postId={activePost.id} />
          <div className="comments-list">
            {activeComments.loading && 
              <Loading />
            }
            {activeComments.comments.map(comment => (
              <div key={comment.id} className="comments-list__comment">
                <div className="comments-list__meta">
                  <div className="comments-list__user-image"></div>
                  <div className="comments-list__meta-info">
                    <span className="comments-list__user-name">{comment.author}</span>
                    <span className="comments-list__date">{moment(comment.timestamp).format('dddd, MMMM Do YYYY')}</span>
                  </div>
                </div>
                <div 
                  className="comments-list__body" 
                  dangerouslySetInnerHTML={createMarkup(comment.body)}
                ></div>
                <div className="comments-list__vote">
                  <Claps post={comment} contentType="comment" context="CommentsList"/>
                  <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ activePost, loading, activeComments }) => ({
  activePost,
  activeComments
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getComments,
    deleteComment
  }, dispatch)
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))