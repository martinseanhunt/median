import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import '../styles/PostsList.css';
import PostCard from './PostCard'
import DropDown from './DropDown'
import { orderPosts } from '../actions'

class PostList extends Component { 

  onOrderBy = attr => {
    this.props.orderPosts(attr)
  }

  render() {
    const { posts, title, orderBy, category } = this.props

    const filteredPosts = category 
      ? posts.filter(post => post.category === category )
      : posts

    return (
      <div className="row grid posts-list">
        <div className="grid__col">
          <h2 className="posts-list__title"><span>{title}</span></h2>
          
          <div className="posts-list__order-by">
            <span>Order By: </span>
            <DropDown 
            items={[{ name: 'date' }, { name: 'score' }, { name: 'title' }]}
            onSelect={this.onOrderBy}
            selectedItem={orderBy || 'Order By'}
            />
          </div>
        </div>
        <div className="posts-list__posts grid">
          {filteredPosts.length > 0 && filteredPosts.map(post => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ orderBy, posts }) => ({
    orderBy,
    posts 
})

const mapDispatchToProps = (dispatch) => bindActionCreators({orderPosts}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostList)