import postsServices from "../../services/posts.services"
import PostList from "../../components/PostsList/PostsList"
import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import CategorySearch from "../../components/CustomFilter/CustomFilter"

const PostsPage = () => {

  const [posts, setPosts] = useState([])
  const { loggedUser } = useContext(AuthContext)

  const fetchPosts = () => {

    postsServices
      .getAllPosts()
      .then(({ data }) => setPosts(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  return (
    <>
      <Container fluid className="mt-4">
        {loggedUser ? (
          <Row className="align-items-center">
            <Col xs={12} className="d-flex justify-content-end">
              <span className="d-flex align-items-center">
                <img
                  src={loggedUser.avatar}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '10px',
                  }}
                />
                <strong className="mt-2">@{loggedUser.nick}</strong>
              </span>
            </Col>
            <Col xs={12} className="d-flex justify-content-center mt-1 mb-4">
              <CategorySearch />
            </Col>
          </Row>
        ) : null}

        <PostList posts={posts} />
      </Container>
    </>
  )
}

export default PostsPage


// < Col xs = { 12} className = "d-flex justify-content-center mt-1 mb-4" >
//   <Form className="d-flex w-50 justify-content-center">
//     <Form.Control
//       type="search"
//       placeholder="Search"
//       className="me-2"
//       aria-label="Search"
//     />
//     <Button variant="outline-dark">
//       <i className="bi bi-search-heart"></i>
//     </Button>
//   </Form>
//           </Col >