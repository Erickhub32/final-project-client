import PostCard from "../PostCard/PostCard"
import postsServices from "../../services/posts.services"
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import profilesServices from "../../services/profiles.services"

const MyPosts = () => {

  const [myPosts, setMyPosts] = useState([])

  const [userData, setUserData] = useState([])

  useEffect(() => {
    fetchMyPosts()
    loadUserData()
  }, [])

  const fetchMyPosts = () => {

    postsServices
      .getMyPosts()
      .then(({ data }) => setMyPosts(data))
      .catch(err => console.log(err))
  }

  const loadUserData = () => {

    profilesServices
      .getUserProfileData()
      .then(({ data }) => {
        setUserData(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Row className="">
        {
          myPosts.map((elm) => {
            return (
              <Col key={elm._id} md={{ span: 4 }} lg={{ span: 3  }} className="mb-3">
                <PostCard {...elm} />
              </Col>
            )
          })
        }
      </Row >
    </>
  )
}
export default MyPosts
