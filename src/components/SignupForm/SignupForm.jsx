import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import authServices from "../../services/auth.services"
import DatePicker from "react-date-picker"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { subtractYears } from "../../utils/date.utils"
import uploadServices from '../../services/upload.services'
import { AuthContext } from '../../contexts/auth.context'

const SignupForm = () => {

  const { loggedUser, logoutUser } = useContext(AuthContext)

  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    nick: "",
    email: "",
    password: "",
    avatar: []
  })

  const [birthData, setBirthData] = useState({ birth: new Date() })

  const handleInputChange = e => {
    const { value, name } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const handleBirthData = date => {
    setBirthData({ birth: date })
  }

  const navigate = useNavigate()

  const handleFormSubmit = event => {
    event.preventDefault()

    const requestPayload = { ...signupData, ...birthData }

    authServices
      .signupUser(requestPayload)
      .then(() => navigate('/login'))
      .catch(err => console.log(err))
  }

  const maxDate = subtractYears(new Date(), 18)

  const [loadingImagen, setLoadingImagen] = useState(false)

  const handleFileUpload = e => {

    setLoadingImagen(true)

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])


    uploadServices
      .uploadimage(formData)
      .then(res => {
        setSignupData({ ...signupData, avatar: res.data.cloudinary_urls[0] })
        setLoadingImagen(false)

      })
      .catch(err => {
        setLoadingImagen(false)
        console.log(err)
      })

  }



  return (

    <Form onSubmit={handleFormSubmit} className="SignupForm">
      <div className="text-center mb-4">
        <h1>Signup</h1>
      </div>
      <hr />
      <Container fluid>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Username:<sup>*</sup></Form.Label>
              <Form.Control type="text" value={signupData.nick} name="nick" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Email:<sup>*</sup></Form.Label>
              <Form.Control type="email" value={signupData.email} name="email" onChange={handleInputChange} required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>First name:<sup>*</sup></Form.Label>
              <Form.Control type="text" value={signupData.firstname} name="firstname" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Last name:<sup>*</sup></Form.Label>
              <Form.Control type="text" value={signupData.lastname} name="lastname" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Password:<sup>*</sup></Form.Label>
              <Form.Control type="password" value={signupData.password} name="password" onChange={handleInputChange} required></Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Birthday:<sup>*</sup></Form.Label>
              <div>
                <DatePicker value={birthData.birth} name="birth" onChange={handleBirthData} maxDate={maxDate} required />
              </div>
              <Form.Text className="text-muted">
                Restrict to users 18 years and older
              </Form.Text>
            </Form.Group>
          </Col>

        </Row>
        <Button
          variant="black"
          className="w-100"
          type="submit"
          disabled={loadingImagen}>{loadingImagen ? 'Charging imagen...' : 'Register'}
        </Button>
      </Container>
    </Form>
  )
}

export default SignupForm