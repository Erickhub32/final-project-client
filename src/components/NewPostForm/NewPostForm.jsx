import uploadServices from "../../services/upload.services"
import postsServices from "../../services/posts.services"
import DatePicker from "react-date-picker"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, FormControl, FormLabel, FloatingLabel, Row, Col, Button, FormCheck } from "react-bootstrap"


const NewPostForm = () => {

  const [postData, setPostData] = useState({
    images: [],
    description: '',
    categories: [],
    date: new Date()
  })

  const [categoriesClicked, setCategoriesClicked] = useState({
    Food: false,
    Nature: false,
    Technology: false,
    Lifestyle: false
  })

  const [loadingImagen, setLoadingImagen] = useState(false)

  const handleInputChange = e => {
    const { value, name } = e.target
    setPostData({ ...postData, [name]: value })
  }

  const handleCheckboxChange = e => {
    const { checked, name } = e.target
    setCategoriesClicked({ ...categoriesClicked, [name]: checked })
  }

  const handleDatePost = date => {
    setPostData({ ...postData, date })
  }

  const navigate = useNavigate()

  const handlePostSubmit = e => {

    e.preventDefault()

    const categories = []

    for (const [key, value] of Object.entries(categoriesClicked)) {
      value && categories.push(key)
    }

    const payloadData = { ...postData, categories }

    postsServices
      .savePost(payloadData)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }

  const handleFileUpload = e => {

    setLoadingImagen(true)

    const formData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('imageData', e.target.files[i])
    }

    uploadServices
      .uploadimage(formData)
      .then(res => {
        setPostData({ ...postData, images: res.data.cloudinary_urls })
        setLoadingImagen(false)
      })
      .catch(err => {
        setLoadingImagen(false)
        console.log(err)
      })

  }




  return (
    <Form onSubmit={handlePostSubmit}>

      <Row className="mb-3">

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload} multiple />
        </Form.Group>

        <Form.Group as={Col} sm={12} className="mb-3" controlId="description">

          <FloatingLabel
            controlId="description"
            label="Description"
            className="mb-3"
          >
            <FormControl className="mb-2" as="textarea" rows={3}
              type="textarea"
              value={postData.description}
              name="description"
              placeholder="Description id"
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} md={6} className="mb-3" controlId="date">
          <FormLabel>Date</FormLabel>
          <div>
            <DatePicker value={postData.date} name="date" onChange={handleDatePost} />
          </div>

        </Form.Group >

        <Form.Group className="mb-3" as={Col} md={6}>
          <FormLabel className="mb-3">Categories</FormLabel>
          <div>
            <FormCheck
              inline
              label="Food"
              name="Food"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Technology"
              name="Technology"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Nature"
              name="Nature"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Lifestyle"
              name="Lifestyle"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Sport"
              name="Sport"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Health"
              name="Health"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Travel"
              name="Travel"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Business"
              name="Business"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Art"
              name="Art"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Beach"
              name="Beach"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Pubs"
              name="Pubs"
              type='checkbox'
              onChange={handleCheckboxChange}
            />
          </div>
        </Form.Group>
        <div className="d-grid">
          <Button
            variant="dark"
            type="submit"
            size="sm"
            disabled={loadingImagen}>{loadingImagen ? 'Charging imagen...' : 'Create Post'}
          </Button>
        </div>
      </Row>
    </Form>
  )
}

export default NewPostForm
