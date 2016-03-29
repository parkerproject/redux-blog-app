import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/index'
import { Link, browserHistory } from 'react-router'

class PostsShow extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.id)
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        browserHistory.push('/')
      })
  }

  render() {
    const {post} = this.props
    if (!post) {
      return <div>
               Loading...
             </div>
    }
    return (<div>
              <h3>{post.title}</h3>
              <h6>Categories: {post.categories}</h6>
              <p>
                {post.content}
              </p>
              <Link to='/'> Back to Index
              </Link>
              <button className='btn btn-danger pull-xs-right' onClick={this.onDeleteClick.bind(this)}>
                Delete Post
              </button>
            </div>)
  }
}

PostsShow.propTypes = {
  children: React.PropTypes.node
}

function mapStateToProps (state) {
  return {post: state.posts.post}
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow)
