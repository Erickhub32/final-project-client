import postsServices from "../../services/posts.services"
import commentsServices from "../../services/comments.services"
import CostumCarousel from "../../components/CostumCarousel/CostumCarousel"
import CommentsList from "../../components/CommentsList/ComentsList"
import LikePostButton from "../../components/LikePostButton/LikePostButton"
import CreateCommentForm from "../../components/CreateCommentForm/CreateCommentForm"
import { useEffect, useState } from "react"
import { Card, Row, Col, Button, Container, Badge } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import 'bootstrap-icons/font/bootstrap-icons.css'


const PostDetailsPage = ({ size }) => {


  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [commentsData, setCommentData] = useState([])
  const { loggedUser } = useContext(AuthContext)

  const dateFormat = new Date(post.date)

  useEffect(() => {
    loadPostDetails()
    loadCommentsDetails()
  }, [])


  const loadPostDetails = () => {

    postsServices
      .getOnePost(postId)
      .then(({ data }) => {
        setPost(data)

      })
      .catch((err) => console.log(err))

  }

  const loadCommentsDetails = () => {

    commentsServices
      .getComments(postId)
      .then(({ data }) => setCommentData(data))
      .catch(err => console.log(err))
  }

  const getPostDetails = () => {

    if (post.images && post.images.length > 1) {
      return <CostumCarousel images={post.images} postId={postId} size={'LG'} />
    }
    else if (post.images && post.images.length === 1) {
      return <img src={post.images} className="img-fluid" />
    } else {
      return null
    }

  }

  return (

    <Container className="pt-0">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm p-4 mb-4" style={{ borderRadius: '10px', border: '1px solid #e3e3e3' }}>
            {getPostDetails()}

            {post.owner?._id === loggedUser?._id && (
              <div className='d-flex justify-content-end mb-3'>
                <Button variant="transparent" as={Link} to={`/post/edit/${postId}`}>
                  <i className="bi bi-pencil-square"></i>
                </Button>
              </div>
            )}

            <Card.Body>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <LikePostButton {...post} loadPostDetails={loadPostDetails} />
                    </li>
                    <li className="mb-2">
                      {post.categories && post.categories.map((category, index) => (
                        <Badge key={index} bg="secondary" className="me-2">
                          #{category}
                        </Badge>
                      ))}
                    </li>
                    <li className="mb-2">{post.description}</li>
                    <li className="text-muted small">{dateFormat.toDateString()}</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>

            <Card.Footer className="bg-light">
              <CommentsList commentsData={commentsData} loadCommentsDetails={loadCommentsDetails} />
              <CreateCommentForm loadCommentsDetails={loadCommentsDetails} />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default PostDetailsPage


