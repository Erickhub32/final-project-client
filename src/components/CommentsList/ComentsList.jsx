import './../CommentsList/CommentsList.css'
import commentsServices from "../../services/comments.services"
import EditCommentForm from "../EditCommentForm/EditCommentForm"
import { Badge, Button, Col, ListGroup, Modal, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import { useContext, useEffect, useState } from 'react'
import LikeCommentButton from '../LikeCommentButton/LikeCommentButtton'
import { AuthContext } from '../../contexts/auth.context'


const CommentsList = () => {

  const [commentsData, setCommentsData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentComment, setCurrentComment] = useState([])
  const { loggedUser } = useContext(AuthContext)

  const { postId } = useParams()

  const fetchComments = () => {

    commentsServices
      .getCommentsByPost(postId)
      .then(({ data }) => setCommentsData(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchComments()
  }, [])


  return (
    <>
      {
        commentsData.map((elm) => {

          return (
            <ListGroup.Item key={elm._id} as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-5 me-auto w-100">
                <Row>
                  <Col>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-bold">
                        {elm.owner.nick}
                      </div>
                      {
                        elm.owner?._id === loggedUser?._id ?
                          <Button className='editbtn' variant='white' onClick={() => {
                            setCurrentComment(elm);
                            setShowModal(true);
                          }}>
                            <ThreeDotsVertical />
                          </Button>
                          :
                          null
                      }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-flex justify-content-between align-items-center">
                      {elm.text}

                      <LikeCommentButton fetchComments={fetchComments} {...elm} postId={postId} />

                    </div>
                  </Col>
                  <hr />
                </Row>
                <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit comment</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditCommentForm fetchComments={fetchComments} setShowModal={setShowModal} currentComment={currentComment} setCurrentComment={setCurrentComment} />
                  </Modal.Body>
                </Modal>
              </div>


            </ListGroup.Item>

          )
        })
      }
    </>
  )
}
export default CommentsList