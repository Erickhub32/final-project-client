import postsServices from "../../services/posts.services"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Form, FormControl, FormGroup, FormLabel, FloatingLabel, Row, Col, Button, FormCheck } from "react-bootstrap"
import DatePicker from "react-date-picker"
import uploadServices from "../../services/upload.services"

const EditPostForm = () => {

  const { postId } = useParams()

  const [postDataId, setPostDataId] = useState({
    images: '',
    description: '',
    categories: [],
    date: new Date()
  })

  const navigate = useNavigate()

  useEffect(() => {
    loadEditPost()
  }, [])


  const loadEditPost = () => {

    postsServices
      .getOnePost(postId)
      .then(({ data }) => {
        setPostDataId(data)
      })
      .catch((err) => console.log(err))
  }

  const handleInputChange = e => {
    const { value, name } = e.target
    setPostDataId({ ...postDataId, [name]: value })
  }
  const handleCheckboxChange = e => {

    const { checked, name } = e.target
    const categoriesCopy = [...postDataId.categories]

    if (checked) {
      categoriesCopy.push(name)
    } else {
      const index = categoriesCopy.indexOf(name)
      if (index > -1) {
        categoriesCopy.splice(index, 1)
      }
    }
    setPostDataId({ ...postDataId, categories: categoriesCopy })
  }

  const handleDatePost = date => {
    setPostDataId({ ...postDataId, date })
  }

  const handleEditPostSubmit = e => {
    e.preventDefault()

    postsServices
      .editPost(postId, {
        description: postDataId.description,
        date: postDataId.date,
        images: postDataId.images,
        categories: postDataId.categories
      })
      .then(() => navigate('/'))
      .catch(err => console.log(err))

  }

  const handleDeletePost = e => {
    e.preventDefault()

    postsServices
      .deletePost(postId, postDataId)
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }


  const [loadingImagen, setLoadingImagen] = useState(false)

  const handleFileUpload = e => {

    setLoadingImagen(true)

    const formData = new FormData()

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('imageData', e.target.files[i])
    }

    uploadServices
      .uploadimage(formData)
      .then(res => {
        setPostDataId({ ...postDataId, images: res.data.cloudinary_urls })
        setLoadingImagen(false)
      })
      .catch(err => {
        setLoadingImagen(false)
        console.log(err)
      })

  }

  return (
    <Form >

      <Row className="mb-3">
        <Form.Group as={Col} sm={12} className="mb-3" controlId="images">
          <FloatingLabel
            controlId="images"
            className="mb-3"
          >
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} multiple placeholder="Introduce here your imagen" />
            </Form.Group>
          </FloatingLabel>
        </Form.Group>


        <Form.Group as={Col} sm={12} className="mb-3" controlId="description">

          <FloatingLabel
            controlId="description"
            label="Description"
            className="mb-3"
          >

            <FormControl className="mb-2" as="textarea" rows={3}
              type="textarea"
              value={postDataId.description}
              name="description"
              placeholder="Description id"
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} md={6} className="mb-3" controlId="date">
          <FormLabel>Date</FormLabel>
          <div>
            <DatePicker value={postDataId.date} name="date" onChange={handleDatePost} />
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
              checked={postDataId.categories.includes('Food')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Technology"
              name="Technology"
              type='checkbox'
              checked={postDataId.categories.includes('Technology')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Nature"
              name="Nature"
              type='checkbox'
              checked={postDataId.categories.includes('Nature')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Lifestyle"
              name="Lifestyle"
              type='checkbox'
              checked={postDataId.categories.includes('Lifestyle')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Sport"
              name="Sport"
              type='checkbox'
              checked={postDataId.categories.includes('Sport')}
              onChange={handleCheckboxChange}

            />
            <FormCheck
              inline
              label="Health"
              name="Health"
              type='checkbox'
              checked={postDataId.categories.includes('Health')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Travel"
              name="Travel"
              type='checkbox'
              checked={postDataId.categories.includes('Travel')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Business"
              name="Business"
              type='checkbox'
              checked={postDataId.categories.includes('Business')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Art"
              name="Art"
              type='checkbox'
              checked={postDataId.categories.includes('Art')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Beach"
              name="Beach"
              type='checkbox'
              checked={postDataId.categories.includes('Beach')}
              onChange={handleCheckboxChange}
            />
            <FormCheck
              inline
              label="Pubs"
              name="Pubs"
              type='checkbox'
              checked={postDataId.categories.includes('Pubs')}
              onChange={handleCheckboxChange}
            />
          </div>
        </Form.Group>

        <div className="d-grid">
          <Button variant="dark" type="submit" size="sm" onClick={handleEditPostSubmit}>Edit Post</Button>
          <hr></hr>
          <Button variant="dark" type="submit" size="sm" onClick={handleDeletePost}>Delete Post</Button>

        </div>
      </Row>
    </Form>
  )
}

export default EditPostForm