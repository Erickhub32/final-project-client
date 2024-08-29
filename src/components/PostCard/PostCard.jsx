import './PostCard.css'
import CostumCarousel from "../CostumCarousel/CostumCarousel"
import { Button, Card } from "react-bootstrap"
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

const PostCard = ({ owner, images, _id, size }) => {

  const { nick, avatar } = owner
  const { loggedUser } = useContext(AuthContext)

  const customStyle = size === 'LG' ?
    { objectFit: 'cover', width: '100%', height: '200px' } :
    { width: '100%', height: '200px' }


  const getCardImages = () => {


    if (images.length > 1) {

      return (
        <CostumCarousel images={images} postId={_id} size={'SM'} />
      )
    }
    else {
      return (
        <Card.Img variant="top" src={images[0]} style={customStyle} size={'SM'} />
      )
    }
  }

  return (

    <Card className="justify-content-center" >
      {getCardImages()}
      <Card.Body>
        <Card.Text>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={avatar}
              alt="User avatar"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '10px'
              }}
            />
            <span>{nick}</span>
          </span>

          {
            loggedUser &&
            <span className='d-flex justify-content-end'>
              <Button variant='transparent' as={Link} to={`/post/${_id}`} ><i className="bi bi-eye"></i></Button>
            </span>
          }

        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PostCard

