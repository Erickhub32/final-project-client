import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"

const LoginForm = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const { loginUser, isLoading, logoutUser } = useContext(AuthContext)

  const handleLoginData = e => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const navigate = useNavigate()

  const handleLoginSubmit = event => {
    event.preventDefault()

    loginUser(loginData)
    !isLoading && navigate('/')
  }

  return (
    <>
      <Form onSubmit={handleLoginSubmit} gap={2} className="col-md-5 mx-auto">
        <div className="text-center mb-4">
          <h1>Login</h1>
        </div>
        <hr />
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={loginData.email || ""} onChange={handleLoginData}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" value={loginData.password} onChange={handleLoginData} ></Form.Control>
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">Login</Button>

      </Form>
    </>
  )
}

export default LoginForm