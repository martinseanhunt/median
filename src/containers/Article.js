import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'


import { getPost, deletePost } from '../actions'
import NotFound from '../components/NotFound'
import Loading from '../components/Loading'
import Claps from './Claps'
import Comments from '../components/Comments'
import '../styles/Article.css'

class Article extends Component {

  componentDidMount() {
    const id = this.props.match.params.id
    if (id !== this.props.activePost.id)
      this.props.getPost(id)
  }

  createMarkup = body => ({__html: body})

  deletePost = () => {
    const { activePost, history } = this.props
    this.props.deletePost(activePost.id)
    history.goBack()
  }

  render() {
    const { activePost, loading } = this.props

    if (loading)
      return (<Loading />)

    if (activePost.error || !activePost.id) 
      return (<NotFound />)

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

          {activePost.updates ? (
            <div>
              <h2 className="article__title">{activePost.updates.title}</h2>
              <div className="article__body" 
                dangerouslySetInnerHTML={this.createMarkup(activePost.updates.body)}>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="article__title">{activePost.title}</h2>
              <div className="article__body" 
                dangerouslySetInnerHTML={this.createMarkup(activePost.body)}>
              </div>
            </div>
          )}

          <div className="article__categories">
            <span className="article__category">
              <Link to={`/${activePost.category}`}>{activePost.category}</Link>
            </span>
          </div>

          <div className="article__controls">
            <Claps post={activePost} context="Article"/>
            <Link to={`/${activePost.category}/${activePost.id}/edit`} className="article__edit"><FontAwesome name='pencil-square-o'/></Link>
            <button onClick={this.deletePost} className="article__delete"><FontAwesome name='trash'/></button>
          </div>

        </div>

        <Comments />

      </div>
    )
  }
}

const mapStateToProps = ({ activePost, loading, activeComments }) => ({
  activePost,
  loading
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getPost,
    deletePost
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Article)