import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Editor from 'react-medium-editor';
import uuidv1 from 'uuid/v1'
import sanitizeHtml from 'sanitize-html'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

import '../styles/NewPost.css'
import { createNewPost, editPost } from '../actions'
import DropDown from '../components/DropDown'
import ValidationErrors from '../components/ValidationErrors'

class NewPost extends Component {
  constructor(props) {
    super(props)
    const { editing, match } = this.props
    this.state = editing ? 
      {
        title: editing.updates ? editing.updates.title : editing.title,
        body: editing.updates ? editing.updates.body : editing.body,
        author: editing.author,
        selectedCategory: editing.category,
        validationErrors: false
      } : 
      {
        title: '',
        body: '',
        author: '',
        selectedCategory: match.params.category,
        validationErrors: false
      }
  }

  sanitize = html => sanitizeHtml(html, {
    allowedTags: [ 'b', 'i', 'u', 'b', 'a', 'strong', 'h2', 'h3', 'blockquote' ],
    allowedAttributes: {
      'a': [ 'href' ]
    }
  })

  onSubmitPost = () => {
    if (!this.state.title || !this.state.body || !this.state.author || !this.state.selectedCategory ){
      setTimeout(function(){
        this.setState({validationErrors:false});
      }.bind(this),3000)

      return this.setState({ validationErrors: true })
    }

    this.props.createNewPost({
      id: uuidv1(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.sanitize(this.state.body),
      category: this.state.selectedCategory,
      author: this.state.author
    })

    this.props.history.push('/')
  }

  onEditPost = () => {
    if (!this.state.title || !this.state.body ){
      setTimeout(function(){
        this.setState({validationErrors:false});
      }.bind(this),3000)

      return this.setState({ validationErrors: true })
    }

    this.props.editPost(this.props.editing.id, {
      title: this.state.title,
      body: this.sanitize(this.state.body)
    })

    this.props.history.push(`/article/${this.props.editing.id}`)
  }

  onSelect = (selectedCategory) => this.setState({ selectedCategory })

  render() {
    const { editing } = this.props
    const type = editing ? 'Editing' : 'Draft'
    return (
      <div className="row grid">
        <div className="grid__col grid__col--3">
          <div className="post-form">
            {this.state.validationErrors && 
              <ValidationErrors />
            }
            
            {editing ? (
              <div className="post-form__header">
                <span className="post-form__dropdown-title">Category: {this.state.selectedCategory}</span>
              </div>
            ) : (
              <div className="post-form__header">
                <span className="post-form__dropdown-title">Post to category: </span>
                <DropDown 
                items={this.props.categories}
                onSelect={this.onSelect}
                selectedItem={this.state.selectedCategory || 'Select Category'}
                />
              </div>
            )}

            <div className="post-form__user">
              <div className="post-form__user-image"></div>
              <div className="post-form__user-details">
                {editing ? (
                  <span className="post-form__user-name">{this.state.author}</span>
                ) : (
                  <input 
                    className="post-form__user-name" 
                    placeholder="Type Your User Name"
                    value={this.state.author}
                    onChange={e => this.setState({ author: e.target.value })}
                  />
                )}
                <span className="post-form__post-type">
                  {type}
                </span>
              </div>
            </div>

            <div className="post-form__fields">
              <input 
                className="post-form__title" 
                placeholder="Post Title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
              <Editor
                text={this.state.body}
                placeholder="Post content"
                onChange={body => this.setState({ body })}
                className="post-form__body"
              />
            </div>
            {editing ? (
              <button 
                className="btn"
                onClick={this.onEditPost}
              >Edit Post</button>
            ) : (
              <button 
                className="btn"
                onClick={this.onSubmitPost}
              >Create New Post</button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createNewPost,
    editPost
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))