import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Editor from 'react-medium-editor'
import sanitizeHtml from 'sanitize-html'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'

import '../styles/Comments.css'
import Loading from './Loading'
import Claps from './Claps'
import CommentForm from './CommentForm'
import { getComments, deleteComment, setCommentEditing, updateComment } from '../actions'

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

  createMarkup = body => ({__html: body})

  render() {
    const { activePost, activeComments, deleteComment, updateComment, setCommentEditing } = this.props

    return (
      <div className="comments">
        <div className="comments__inner">
          <h4 className="comments__heading">Responses ({activeComments.comments.length})</h4>
          <CommentForm postId={activePost.id} />
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
                    dangerouslySetInnerHTML={this.createMarkup(comment.body)}
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
                  {!comment.editing ? (
                    <div>
                      <Claps post={comment} contentType="comment" context="CommentsList"/>
                      <button 
                        className="comments-list__control comments-list__edit" 
                        onClick={() => this.setEditing(comment.id, comment.body)}><FontAwesome name='pencil-square-o'/></button>
                      <button 
                        className="comments-list__control comments-list__trash" 
                        onClick={() => deleteComment(comment.id)}><FontAwesome name='trash'/></button>
                    </div>
                  ) : (
                    <div>
                      <button className="btn" onClick={() => updateComment(comment.id, this.state.editingBody)}>Save Edits</button>
                      <button className="btn" onClick={() => setCommentEditing(comment.id, false)}>Cancel</button>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getComments,
    deleteComment,
    updateComment,
    setCommentEditing
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments))