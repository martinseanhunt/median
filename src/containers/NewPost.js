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
import { createNewPost } from '../actions'
import DropDown from '../components/DropDown'
import ValidationErrors from '../components/ValidationErrors'

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    selectedCategory: '',
    validationErrors: false
  }

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
      body: sanitizeHtml(this.state.body),
      category: this.state.selectedCategory,
      author: this.state.author
    })

    this.props.history.push('/')
  }

  onSelect = (selectedCategory) => this.setState({ selectedCategory })

  render() {
    return (
      <div className="row grid">
        <div className="grid__col grid__col--3">
          <div className="post-form">
            {this.state.validationErrors && 
              <ValidationErrors />
            }
            <div className="post-form__header">
              <span className="post-form__dropdown-title">Post to category: </span>
              <DropDown 
              items={this.props.categories}
              onSelect={this.onSelect}
              selectedItem={this.state.selectedCategory || 'Select Category'}
              />
            </div>

            <div className="post-form__user">
              <div className="post-form__user-image"></div>
              <div className="post-form__user-details">
                <input 
                  className="post-form__user-name" 
                  placeholder="Type Your User Name"
                  text={this.state.userName}
                  onChange={e => this.setState({ author: e.target.value })}
                />
                <span className="post-form__post-type">Draft</span>
              </div>
            </div>

            <div className="post-form__fields">
              <input 
                className="post-form__title" 
                placeholder="Post Title"
                text={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
              <Editor
                text={this.state.body}
                placeholder="Post content"
                onChange={body => this.setState({ body })}
                className="post-form__body"
              />
            </div>
            <button 
              className="btn"
              onClick={this.onSubmitPost}
            >Create New Post</button>
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
    createNewPost
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))