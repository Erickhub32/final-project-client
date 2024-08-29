import { useContext } from "react"
import postsServices from "../../services/posts.services"
import { AuthContext } from "../../contexts/auth.context"
import { Button } from "react-bootstrap"

const LikePostButton = ({ _id, likes = [], loadPostDetails }) => {

  const { loggedUser } = useContext(AuthContext)

  const handlePostLike = () => {

    if (likes?.includes(loggedUser._id)) {
      postsServices
        .editPostUnlike(_id)
        .then(() => loadPostDetails())
        .catch(err => console.log(err))
    } else {
      postsServices
        .editPostLike(_id)
        .then(() => loadPostDetails())
        .catch(err => console.log(err))
    }
  }
  return (
    <div>
      {
        likes?.includes(loggedUser?._id)
          ?
          <Button className="LikeButton" variant="transparent" onClick={handlePostLike}>
            ❤️
          </Button>

          :

          <Button className="LikeButton"
            variant="transparent"
            onClick={handlePostLike}
            style={{ fontSize: '24px', lineHeight: '1' }}>
            ♡
          </Button>
      }
      <span style={{ marginLeft: '8px' }}>{likes.length}</span>
    </div>
  )
}

export default LikePostButton