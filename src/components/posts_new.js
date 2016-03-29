import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createPost } from '../actions/index'
import { Link, browserHistory } from 'react-router'

class PostsNew extends Component {

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        browserHistory.push('/')
      })
  }

  render() {
    const { fields:{ title, categories, content }, handleSubmit } = this.props

    return (
    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <h3>Create A New Post</h3>
      <div className={displayErrors(title)}>
        <label>
          Title
        </label>
        <input type='text' className='form-control' {...title} />
        <div className='text-help'>
          {title.touched ? title.error : ''}
        </div>
      </div>
      <div className={displayErrors(categories)}>
        <label>
          Categories
        </label>
        <input type='text' className='form-control' {...categories} />
        <div className='text-help'>
          {categories.touched ? categories.error : ''}
        </div>
      </div>
      <div className={displayErrors(content)}>
        <label>
          Content
        </label>
        <textarea className='form-control' {...content} />
        <div className='text-help'>
          {content.touched ? content.error : ''}
        </div>
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
      <Link to='/' className='btn btn-danger'> Cancel
      </Link>
    </form>
    )
  }
}

// PostsNew.contentTypes = PropTypes

function displayErrors (title) {
  const hasDanger = 'has-danger'
  const showErrorColor = `form-group ${title.touched && title.invalid ? hasDanger : ''}`
  return showErrorColor
}

function validate (values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Enter a username'
  }

  if (!values.categories) {
    errors.categories = 'Enter a category'
  }

  if (!values.content) {
    errors.content = 'Enter some content'
  }

  return errors
}

// connect first argue is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is for config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
validate}, null, {createPost})(PostsNew)
