import commentsServices from "../../services/comments.services"
import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const EditCommentForm = ({ setShowModal, currentComment, fetchComments }) => {

  const [commentText, setCommentText] = useState(currentComment.text || "")

  const handleCommentEdit = (e) => {

    e.preventDefault();

    const requestBody = { text: commentText }

    commentsServices
      .putComment(currentComment._id, requestBody)
      .then(() => {
        fetchComments()
        setShowModal(false)
      })
      .catch(err => console.log(err))
  }


  const handleCommentChange = (e) => {
    setCommentText(e.target.value)
  }

  const handleDeleteComment = () => {

    commentsServices
      .deleteComment(currentComment._id)
      .then(() => {
        fetchComments()
        setShowModal(false)
      })
      .catch((err) => console.log(err))
  }


  return (
    <>

      <Modal.Dialog className="modal show" style={{ display: 'block', position: 'initial' }} >
        <Modal.Header >
          <Modal.Title>@{currentComment.owner.nick}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleCommentEdit}>
            <Form.Group controlId="commentInput">
              <Form.Label>Edit Comment</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Escribe tu comentario aquí"
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="dark" type="submit">
                Edit Comment
              </Button>
              <Button variant="outline-danger" onClick={handleDeleteComment}>
                Delete Comment
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </>
  )
}

export default EditCommentForm