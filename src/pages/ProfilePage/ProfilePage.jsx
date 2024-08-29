import MyPosts from "../../components/MyPosts/MyPosts"
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader"
import { Container } from "react-bootstrap"


const ProfilePage = () => {

  return (
    <Container>

      <ProfileHeader />
      <hr></hr>
      <MyPosts />

    </Container>
  )
}

export default ProfilePage