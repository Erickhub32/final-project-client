import LoginForm from "../../components/LoginForm/LoginForm"
import { Container } from "react-bootstrap"

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <Container>
        <LoginForm />
      </Container>
    </div>
  )
}

export default LoginPage