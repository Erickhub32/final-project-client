import NewPostForm from "../../components/NewPostForm/NewPostForm"
import { Container } from "react-bootstrap"

const CreatePostPage = () => {

  return (
    <Container>
      <h1>Nuevo post</h1>
      <hr />
      <NewPostForm />
    </Container>
  )
}

export default CreatePostPage