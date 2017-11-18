import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addVoteLocally, postVotesToServer } from '../actions'
import '../styles/Claps.css'

class Claps extends Component {
  state = {
    voteInterval: null
  }

  startVoting = (voteType) => {
    const { post } = this.props
    this.props.addVoteLocally(post.id, voteType)
    const voteInterval = setInterval(() => {
        this.props.addVoteLocally(post.id, voteType)
    }, 200)
    this.setState({ voteInterval })
  }

  stopVoting = () => {
    const { post } = this.props
    clearInterval(this.state.voteInterval)
    if(post.myUpvotes) {
      this.props.postVotesToServer(post.id, {
        option: 'upVote',
        votes: post.myUpvotes
      })
    } else if(post.myDownvotes) {
      this.props.postVotesToServer(post.id, {
        option: 'downVote',
        votes: post.myDownvotes
      })
    }
  }

  render(){
    const { post } = this.props
    return(
      <div className={`claps claps--${this.props.context}`}>
        <button 
          onMouseDown={() => this.startVoting('upVote')}
          onMouseUp={this.stopVoting}
          onMouseOut={this.stopVoting}
        >
          Clap
        </button>
        <button 
          onMouseDown={() => this.startVoting('downVote')}
          onMouseUp={this.stopVoting}
          onMouseOut={this.stopVoting}
        >
          Boo
        </button>
        {post.voteScore}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({ addVoteLocally ,postVotesToServer }, dispatch)

export default connect(null, mapDispatchToProps)(Claps)