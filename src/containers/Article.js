import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { getPost, getComments, addUpvotes } from '../actions'
import NotFound from '../components/NotFound'
import Loading from '../components/Loading'
import CommentsList from '../components/CommentsList'
import NewComment from './NewComment'
import '../styles/Article.css'

class Article extends Component {
  state = {
    myUpVotes: 0,
    myDownVotes: 0,
    voteInterval: null
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getPost(id)
    this.props.getComments(id)
  }

  createMarkup = body => ({__html: body})

  startUpVoting = () => {
    this.setState({ myUpVotes: this.state.myUpVotes + 1 })
    const upVoting = setInterval(() => {
      // Limiting upvotes to 50 at a time. To do this properly I'd need to make updates to the 
      // server that are well beyond the scope of this project, this is just a proof of concept :)
      if (this.state.myUpVotes < 50)
        this.setState({ myUpVotes: this.state.myUpVotes + 1 })
    }, 200)
    this.setState({ voteInterval: upVoting })
  }

  stopUpVoting = () => {
    clearInterval(this.state.voteInterval)
    
    if (this.state.myUpVotes > 0) {
      this.props.addUpvotes(this.props.activePost.id, {
        option: 'upVote',
        votes: this.state.myUpVotes
      })
    }

    this.setState({ myUpVotes: 0 })
  }

  startDownVoting = () => {
    this.setState({ myDownVotes: this.state.myDownVotes + 1 })
    const downVoting = setInterval(() => {
      // Limiting upvotes to 50 at a time. To do this properly I'd need to make updates to the 
      // server that are well beyond the scope of this project, this is just a proof of concept :)
      if (this.state.myDownVotes < 50)
        this.setState({ myDownVotes: this.state.myDownVotes + 1 })
    }, 200)
    this.setState({ voteInterval: downVoting })
  }

  stopDownVoting = () => {
    clearInterval(this.state.voteInterval)
    
    if (this.state.myDownVotes > 0) {
      this.props.addUpvotes(this.props.activePost.id, {
        option: 'downVote',
        votes: this.state.myDownVotes
      })
    }

    this.setState({ myDownVotes: 0 })
  }

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

          <div className="claps">
            <button 
              onMouseDown={this.startUpVoting}
              onMouseUp={this.stopUpVoting}
              onMouseOut={this.stopUpVoting}
            >
              Clap
            </button>
            <button 
              onMouseDown={this.startDownVoting}
              onMouseUp={this.stopDownVoting}
              onMouseOut={this.stopDownVoting}
            >
              Boo
            </button>
            {activePost.voteScore + this.state.myUpVotes - this.state.myDownVotes}
          </div>

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
    getComments,
    addUpvotes
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Article)