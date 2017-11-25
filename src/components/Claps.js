import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addVoteLocally, postVotesToServer, orderPosts } from '../actions'
import FontAwesome from 'react-fontawesome'
import '../styles/Claps.css'
import ClapSvg from '../img/clap.svg'

class Claps extends Component {
  state = {
    voting: false,
    voteInterval: null,
    animateVoting: false
  }

  startVoting = (voteType) => {
    const { post, addVoteLocally } = this.props
    
    addVoteLocally(post.id, voteType)
    this.setState({ voting: true })
    
    const voteInterval = setInterval(() => {
        addVoteLocally(post.id, voteType)
    }, 200)

    this.setState({ voteInterval, animateVoting: voteType })
  }

  stopVoting = () => {
    const { post, contentType, orderPosts, orderBy, postVotesToServer } = this.props
   
    if(this.state.voting) {
      setTimeout(() => this.setState({ voting: false }), 300)
      orderPosts(orderBy)
    }

    clearInterval(this.state.voteInterval)
    this.setState({ voteInterval: null, animateVoting: false })        
    if(post.myUpvotes) {
      postVotesToServer(post.id, {
        option: 'upVote',
        votes: post.myUpvotes
      }, contentType)
    } else if(post.myDownvotes) {
      postVotesToServer(post.id, {
        option: 'downVote',
        votes: post.myDownvotes
      }, contentType)
    }
  }

  render(){
    const { post, context } = this.props
    return(
      <div className={`claps claps--${context}`}>
        <span className={`claps__vote-score ${this.state.voting && 'claps__vote-score--voting'}`}>{post.voteScore}</span>
        <button
          className={`claps__button claps__clap-button ${this.state.animateVoting === 'upVote' && 'popping'}`}
        >
          <div 
            className="claps__button-target"
            onMouseDown={() => this.startVoting('upVote')}
            onMouseUp={this.stopVoting}
            onMouseOut={this.stopVoting}
            onTouchStart={() => this.startVoting('upVote')}
            onTouchEnd={this.stopVoting}
            onTouchMove={this.stopVoting}
          ></div>
          <img src={ClapSvg} className="claps__clap" alt="clap_button"/>
        </button>
        <button 
          className="claps__button claps__boo-button"
        >
          <div 
            className="claps__button-target"
            onMouseDown={() => this.startVoting('downVote')}
            onMouseUp={this.stopVoting}
            onMouseOut={this.stopVoting}
            onTouchStart={() => this.startVoting('downVote')}
            onTouchEnd={this.stopVoting}
            onTouchMove={this.stopVoting}
          ></div>
          <FontAwesome name='thumbs-o-down'/>
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ orderBy }) => ({ orderBy })

const mapDispatchToProps = dispatch => 
  bindActionCreators({ 
    addVoteLocally,
    postVotesToServer, 
    orderPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Claps)