import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Editor from 'react-medium-editor'
import sanitizeHtml from 'sanitize-html'
import Loading from '../components/Loading'
import moment from 'moment'

import '../styles/CommentsList.css'
import Claps from '../containers/Claps'
import NewComment from '../containers/NewComment'
import { getComments, deleteComment, setCommentEditing, updateComment } from '../actions'

const createMarkup = body => ({__html: body})

class Comments extends Component {
  state = { editingBody: '' }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getComments(id)
  }

  setEditing(id, body) {
    this.setState({ editingBody: body })
    this.props.setCommentEditing(id, true)
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
                {!comment.editing ? (
                  <div 
                    className="comments-list__body" 
                    dangerouslySetInnerHTML={createMarkup(comment.body)}
                  ></div>
                ) : (
                  <div>
                    <Editor
                      className="comment-form__body"
                      placeholder="Comment" 
                      text={this.state.editingBody}
                      onChange={body => this.setState({ editingBody: sanitizeHtml(body) })}
                      options={{
                        toolbar: {
                          buttons: ['bold', 'italic', 'underline']
                        }
                      }}
                    />
                  </div>
                )}
                <div className="comments-list__vote">
                  <Claps post={comment} contentType="comment" context="CommentsList"/>
                  {!comment.editing ? (
                    <div>
                      <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                      <button onClick={() => this.setEditing(comment.id, comment.body)}>Edit Comment</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => this.props.setCommentEditing(comment.id, false)}>Cancel</button>
                      <button onClick={() => this.props.updateComment(comment.id, this.state.editingBody)}>Edit Comment</button>
                    </div>
                  )}
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
    deleteComment,
    updateComment,
    setCommentEditing
  }, dispatch)
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))