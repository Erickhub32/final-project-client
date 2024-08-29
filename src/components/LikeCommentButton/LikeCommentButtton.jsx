import { Button } from "react-bootstrap"
import commentsServices from "../../services/comments.services"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

const LikeCommentButton = ({ fetchComments, likes = [], _id }) => {

  const { loggedUser } = useContext(AuthContext)

  const handleCommentLike = () => {

    if (likes?.includes(loggedUser._id)) {

      commentsServices
        .editCommentUnlike(_id)
        .then(() => fetchComments())
        .catch(err => console.log(err))

    } else {

      commentsServices
        .editCommentLike(_id)
        .then(() => fetchComments())
        .catch(err => console.log(err))
    }
  }

  return (
    <div>
      {
        likes?.includes(loggedUser?._id)
          ?
          <Button className="LikeButton" variant="transparent" onClick={handleCommentLike}>
            ❤️
          </Button>
          :
          <Button className="LikeButton"
            variant="transparent"
            onClick={handleCommentLike}
            style={{ fontSize: '24px', lineHeight: '1' }}>
            ♡
          </Button>
      }
      <span style={{ marginLeft: '8px' }}>{likes.length}</span>
    </div>
  )
}
export default LikeCommentButton