import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'
import { Button } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const commentHandler = () => {
    if (comment) dispatch(commentBlog(comment, blog.id))
    setComment('')
  }

  return (
    <div>
      <h4>Comments</h4>
      <div className="buttons">
        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        <Button onClick={commentHandler} variant="primary">
          Comment
        </Button>
      </div>
      {blog.comments.map(comment => (
        <li key={comment} className="list">{comment}</li>
      ))}
    </div>
  )
}

export default Comments
