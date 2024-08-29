import commentsServices from "../../services/comments.services"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Button, FloatingLabel, Form } from "react-bootstrap"

const CreateCommentForm = () => {

  const navigate = useNavigate()
  const { postId } = useParams()

  const [commentData, setCommentData] = useState({
    text: ''
  })

  const handleCommentChange = e => {
    const { value } = e.target
    setCommentData({ text: value })
  }


  const handleCommentSubmit = e => {

    e.preventDefault()

    const data = { ...commentData }

    commentsServices
      .saveComment(postId, data)
      .then((res) => {

        const commentId = res.data._id

        setCommentData({ text: '' })

        navigate(`/post/${postId}#comment-${commentId}`)

        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  const PostComments = ({ comments }) => {
    const location = useLocation()

    useEffect(() => {
      const hash = location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }, [location])
  }

  return (

    <Form onSubmit={handleCommentSubmit} gap={2} className="col-md-5 mx-auto" >
      <FloatingLabel
        controlId="floatingTextarea"
        label="Create here your comment"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" name="text" onChange={handleCommentChange} />
      </FloatingLabel>
      <div className="d-grid">
        <Button variant="dark" type="submit" size="sm" className="mb-5">Create comment</Button>
      </div>
    </Form>

  )
}
export default CreateCommentForm