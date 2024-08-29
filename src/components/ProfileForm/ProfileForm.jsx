import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import authServices from "../../services/auth.services"
import DatePicker from "react-date-picker"
import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { subtractYears } from "../../utils/date.utils"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import uploadServices from '../../services/upload.services'

const ProfileForm = () => {

  const navigate = useNavigate()

  const { loggedUser, logoutUser } = useContext(AuthContext)

  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    nick: "",
    email: "",
    avatar: "",
    country: "",
    phone: "",
    birth: new Date()
  })

  const fetchProfileData = () => {

    authServices
      .getUserProfile()
      .then(({ data }) => {
        setProfileData({
          firstname: data.firstname,
          lastname: data.lastname,
          nick: data.nick,
          email: data.email,
          avatar: data.avatar,
          country: data.country,
          phone: data.phone,
          birth: data.birth
        })
      })
      .catch(err => console.log(err))
  }

  const handleInputChange = e => {
    const { value, name } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  const handleDatePost = date => {
    setProfileData({ ...profileData, date })
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    authServices
      .updateUserProfile(profileData)
      .then(() => {
        fetchProfileData()
        // loggedUser()
        navigate('/profile')
      })
      .catch(err => console.log(err))
  }

  const maxDate = subtractYears(new Date(), 18)

  useEffect(() => {
    fetchProfileData()
  }, [])


  const handleDeletePost = e => {
    e.preventDefault()

    authServices
      .deleteUserProfile(profileData._id)
      .then(() => {
        logoutUser()
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  const [loadingImagen, setLoadingImagen] = useState(false)

  const handleFileUpload = e => {

    setLoadingImagen(true)

    const formData = new FormData()
    formData.append('imageData', e.target.files[0])


    uploadServices
      .uploadimage(formData)
      .then(res => {
        setProfileData({ ...profileData, avatar: res.data.cloudinary_urls[0] })
        setLoadingImagen(false)
      })
      .catch(err => {
        setLoadingImagen(false)
        console.log(err)
      })
  }


  return (

    <Form onSubmit={handleFormSubmit} className="ProfileForm">

      <Container fluid>

        <Row className="mb-4">
          <div className="text-center mb-4">
            <h1>Edit Profile</h1>
          </div>
          <hr />

          <Col className="mt-4" md={6}>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={profileData.nick} name="nick" disabled></Form.Control>
            </Form.Group>
          </Col>

          <Col className="mt-4" md={6}>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={profileData.email} name="email" disabled />
            </Form.Group>
          </Col>

          <Col className="mt-4" md={6}>
            <Form.Group>
              <Form.Label>First name:</Form.Label>
              <Form.Control type="text" value={profileData.firstname} name="firstname" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col className="mt-4" md={6}>
            <Form.Group>
              <Form.Label>Last name:</Form.Label>
              <Form.Control type="text" value={profileData.lastname} name="lastname" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col className="mt-4" md={6}>
            <Form.Group>
              <Form.Label>Country:</Form.Label>
              <Form.Control type="text" value={profileData.country} name="country" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col className="mt-4" md={6}>
            <Form.Group>
              <Form.Label>Phone:</Form.Label>
              <Form.Control type="text" value={profileData.phone} name="phone" onChange={handleInputChange} ></Form.Control>
            </Form.Group>
          </Col>

          <Col className="mt-4" md={6}>
            <div className="d-flex align-items-center">
              <img
                src={profileData.avatar}
                alt={profileData.nick}
                className="flex-1"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '10px'
                }} />

              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Avatar (URL)</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </div>
          </Col>

          <Col className="mt-4" md={6}>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <div>
                <DatePicker value={profileData.birth} name="birth" onChange={handleDatePost} maxDate={maxDate} required />
              </div>
              <Form.Text className="text-muted">
                Restrict to users 18 years and older
              </Form.Text>
            </Form.Group>
          </Col>

        </Row>

        <Button
          variant="dark"
          className="w-100"
          type="submit"
          disabled={loadingImagen}>{loadingImagen ? 'Charging imagen...' : 'Edit Profile'}
        </Button>

        <Button className="mt-4 w-100" onClick={handleDeletePost} variant="outline-danger">delete Profile</Button>

      </Container>

    </Form>
  )
}

export default ProfileForm  