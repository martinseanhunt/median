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
import { createNewPost, editPost, orderPosts, clearErrors } from '../actions'
import DropDown from './DropDown'
import Error from './Error'

class PostForm extends Component {
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

  componentDidMount() {
    this.props.clearErrors()
  }

  sanitize = html => sanitizeHtml(html, {
    allowedTags: [ 'b', 'i', 'u', 'b', 'a', 'strong', 'h2', 'h3', 'blockquote' ],
    allowedAttributes: {
      'a': [ 'href' ]
    }
  })

  onSubmitPost = (e) => {
    const btnVal = e.target.innerHTML
    const { createNewPost, orderPosts, error, history } = this.props

    e.persist()
    e.target.disabled = true
    e.target.innerHTML = 'Loading...'

    if (!this.state.title || !this.state.body || !this.state.author || !this.state.selectedCategory ){
      setTimeout(function(){
        this.setState({validationErrors:false})
      }.bind(this),3000)

      e.target.disabled = false
      e.target.innerHTML = btnVal
      return this.setState({ validationErrors: true })
    }

    const id = uuidv1()
    // I don't think this is the way to handle the error when the post is too long but I couldn't
    // Figure out how else to do it? Help?
    createNewPost({
      id,
      timestamp: Date.now(),
      title: this.state.title,
      body: this.sanitize(this.state.body),
      category: this.state.selectedCategory,
      author: this.state.author
    })
    .then(() => {
      orderPosts(this.props.orderBy)
      e.target.disabled = false
      e.target.innerHTML = btnVal
      !error.error && history.push(`/${this.state.selectedCategory}/${id}`)
    })
  }

  onEditPost = (e) => {
    const btnVal = e.target.innerHTML
    const { editPost, editing, orderPosts, orderBy, error, history } = this.props

    e.persist()
    e.target.disabled = true
    e.target.innerHTML = 'Loading...'
    if (!this.state.title || !this.state.body ){
      setTimeout(function(){
        this.setState({validationErrors:false});
      }.bind(this),3000)

      e.target.disabled = false
      e.target.value = btnVal
      return this.setState({ validationErrors: true })
    }

    editPost(editing.id, {
      title: this.state.title,
      body: this.sanitize(this.state.body)
    })
    .then(() => {
      orderPosts(orderBy)
      e.target.disabled = false
      e.target.innerHTML = btnVal
      !error.error && history.push(`/${this.state.selectedCategory}/${editing.id}`)
    })
  }

  onSelect = (selectedCategory) => this.setState({ selectedCategory })

  scrollTop = () => document.body.scrollTop = document.documentElement.scrollTop = 0

  render() {
    const { editing, error, categories } = this.props
    const type = editing ? 'Editing' : 'Draft'

    error.error && this.scrollTop()

    return (
      <div className="row grid">
        <div className="grid__col grid__col--3">
          <div className="post-form">
            {(this.state.validationErrors || error.error ) && 
              <Error errors={error.error || 'Please fill in all fields'}/>
            }
            
            {editing ? (
              <div className="post-form__header">
                <span className="post-form__dropdown-title">Category: {this.state.selectedCategory}</span>
              </div>
            ) : (
              <div className="post-form__header">
                <span className="post-form__dropdown-title">Post to category: </span>
                <DropDown 
                items={categories}
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
              >Save Edits</button>
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

const mapStateToProps = ({ categories, error, orderBy }, ownProps) => {
  return { 
    categories,
    error,
    orderBy 
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createNewPost,
    editPost,
    orderPosts,
    clearErrors
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm))