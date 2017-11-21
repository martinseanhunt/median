import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import NotFound from '../components/NotFound'
import NewPost from './NewPost'
import { getPost } from '../actions'

class EditPost extends Component {
  componentDidMount(){
    const { activePost, match } = this.props
    const id = match.params.id
    if(id !== activePost.id)
      this.props.getPost(id)
  }

  render() {
    const { activePost, loading } = this.props

    if (loading)
      return (<Loading />)

    if (activePost.error || !activePost.id) 
      return (<NotFound />)

    return (
      <NewPost editing={activePost} />
    )
  }  
}

const mapStateToProps = ({ activePost, loading }) => ({ activePost, loading })

const mapDispatchToProps = dispatch => bindActionCreators({
  getPost,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
