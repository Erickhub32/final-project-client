import PostCard from "../PostCard/PostCard"
import { Col, Row } from "react-bootstrap"

const PostList = ({ posts }) => {

  return (
    <Row >
      {
        posts.map((elm) => {
          return (
            <Col key={elm._id} md={{ span: 4 }} lg={{ span: 3 }} className="mb-3">
              <PostCard {...elm} />
            </Col>
          )
        })
      }
    </Row >
  )

}
export default PostList