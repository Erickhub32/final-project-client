import profilesServices from "../../services/profiles.services/"
import postsServices from "../../services/posts.services"
import { useEffect, useState } from "react"
import { Row, Col, Image, Container, Button, Badge } from "react-bootstrap"

const ProfileHeader = () => {

  const [userData, setUserData] = useState({})
  const [postData, setPostData] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadUserProfile()
    loadPostData()
  }, [])


  const loadUserProfile = () => {

    profilesServices
      .getUserProfileData()
      .then(({ data }) => {
        setUserData(data)
      })
      .catch((err) => console.log(err))
  }


  const loadPostData = () => {

    postsServices
      .getMyPosts()
      .then(({ data }) => {
        setPostData(data)
        const allCategories = data.flatMap(post => post.categories || [])
        setCategories([...new Set(allCategories)])
      })
      .catch((err) => console.log(err))
  }



  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        <Col xs={6} md={2} className="text-center mt-5">
          <Image
            src={userData.avatar || "https://res.cloudinary.com/drpusr9cu/image/upload/v1722500024/cld-sample-5.jpg"}
            roundedCircle
            className="img-fluid"
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
            }}
          />
        </Col>

        <Col xs={9} md={7}>
          <h2 className="mb-0">@{userData.nick}</h2>
          <h4>{userData.firstname} {userData.lastname}</h4>
          <div className="d-flex mt-3">
            <div className="me-4">
              <strong>{postData.length}</strong> Posts
            </div>
            <div>
              <strong>{categories.length}</strong> Categories
            </div>
          </div>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <h3>Categories</h3>
          <ul className="list-inline">
            {categories.map((category, idx) => (
              <li className="list-inline-item" key={idx}>
                <Badge bg="secondary" className="p-2">#{category}</Badge>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileHeader

// < Button as={ Link } to = { '/profile/edit-profile'} variant = "dark" type = "submit" className="text-center text-md-end mt-3 mt-md-0" > Edit Profile</Button >

