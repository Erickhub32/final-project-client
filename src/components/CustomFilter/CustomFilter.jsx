import { useEffect, useState } from "react"
import { Container, Row, Col, FormControl, Form, Button } from "react-bootstrap"
import postsServices from "../../services/posts.services"
import PostCard from "../PostCard/PostCard"

const CategorySearch = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadAllPosts()
  }, [])


  const loadAllPosts = () => {
    postsServices
      .getAllPosts()
      .then(({ data }) => {
        setPosts(data)
        setFilteredPosts(data)
      })
      .catch((err) => console.log(err))
  }

  const filterPostsByCategory = (term) => {
    const filtered = posts.filter(post =>
      post.categories && post.categories.some(cat => cat.toLowerCase().includes(term.toLowerCase()))
    )
    setFilteredPosts(filtered)
  }


  const handleSearchChange = (e) => {

    const { value } = e.target

    setSearchTerm(value)

    value.length === 0 ? setFilteredPosts([]) : filterPostsByCategory(value)
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={12} className="d-flex justify-content-center mt-1 mb-4">
          <Form className="d-flex w-50 justify-content-center">
            <FormControl
              type="text"
              placeholder="Search categories ..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="me-2"
            />
            <Button variant="outline-dark">
              <i className="bi bi-search-heart"></i>
            </Button>
          </ Form>
        </Col>
      </Row>
      <Row>
        {
          filteredPosts.map((post, index) => (
            <Col key={index} md={{ span: 3 }} className="mb-5">
              <PostCard {...post} />
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

export default CategorySearch
