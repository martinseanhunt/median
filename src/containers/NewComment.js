import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import Editor from 'react-medium-editor'
import sanitizeHtml from 'sanitize-html'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

import { createNewComment } from '../actions'
import ValidationErrors from '../components/ValidationErrors'
import '../styles/NewComment.css'

class NewComment extends Component{
  state = {
    body: '',
    author: '',
    validationErrors: false,
    showForm: false,
    showConfirm: false,
    triggerRef: null 
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setTriggerRef = triggerRef => this.setState({ triggerRef })

  setEditorRef = editorRef => this.setState({ editorRef })

  handleClickOutside = e => {
    const toolbar = document.querySelector('.medium-editor-toolbar')
    if(this.state.showForm && !this.state.triggerRef.contains(e.target) && !toolbar.contains(e.target))  
      this.setState({ showForm: false })
  }

  showCommentForm = () => {
    if(!this.state.showForm){
      this.setState({ showForm: true })
      document.querySelector('.comment-form__body').focus()
    }
  }

  onCommentSubmit = e => {
    e.preventDefault()

    // Need to strip html tags here otherwise if you start writing a comment and delete everything
    // You can submit a blank comment that will just have <p></p> in it
    const body = this.striptags(this.state.body)

    if (!this.state.author || !body ){
      setTimeout(function(){
        this.setState({validationErrors:false});
      }.bind(this),3000)

      return this.setState({ validationErrors: true })
    }

    this.props.createNewComment({
      id: uuidv1(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.postId
    })

    this.setState({ showForm: false })
    this.setState({ showConfirm: true })
  }

  striptags = html => sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {}
  })

  render() {
    return (
      <div>
        {this.state.showConfirm && 
          <div className="success">
            <span className="success__message">Your comment was submitted...</span> 
            <span className="success__emoji" role="img" aria-label="hands emoji">🙌</span>
          </div>
        }

        {this.state.validationErrors && 
          <ValidationErrors />
        }
        <form 
          className={`comment-form ${!this.state.showForm && 'comment-form--preview'}`}
          onClick={this.showCommentForm} 
          onSubmit={this.onCommentSubmit}
          ref={this.setTriggerRef}
        >
          <div className="comment-form__header">
            <div className="comment-form__user-image"></div>
            <div className="comment-form__slideup">
              <p className="comment-form__placeholder">Write a response...</p>
              <input type="text" 
                className="comment-form__author"
                onChange={e => this.setState({ author: e.target.value })} 
                value={this.state.author} 
                placeholder="User Name" 
              />
            </div>
          </div>

          <div className="comment-form__expand">
            <Editor
              className="comment-form__body"
              onChange={body => this.setState({ body: sanitizeHtml(body) })} 
              placeholder="Comment" 
              value={this.state.body}
              options={{
                toolbar: {
                  buttons: ['bold', 'italic', 'underline']
                }
              }}
            />   
            <input className="btn" type="submit" value="Publish"/>
          </div>      
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ createNewComment }, dispatch)

export default connect(null, mapDispatchToProps)(NewComment)