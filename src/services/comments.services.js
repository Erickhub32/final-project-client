import axios from "axios";

class CommentsServices {

  constructor() {

    this.axiosApp = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
    })

    this.axiosApp.interceptors.request.use(config => {

      const storedToken = localStorage.getItem('userAuthToken')

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` }
      }
      return config
    })

  }

  getComments() {
    return this.axiosApp.get(`/comments`)
  }

  putComment(commentId, commentData) {
    return this.axiosApp.put(`/comments/${commentId}`, commentData)
  }

  getCommentsByPost(postId) {
    return this.axiosApp.get(`/comments/post/${postId}`)
  }

  saveComment(postId, commentData) {
    return this.axiosApp.post(`/comments/post/${postId}`, commentData)
  }

  deleteComment(commentId) {
    return this.axiosApp.delete(`/comments/${commentId}`)
  }

  editCommentLike(postId) {
    return this.axiosApp.put(`/comments/post/${postId}/like`)
  }

  editCommentUnlike(postId) {
    return this.axiosApp.put(`/comments/post/${postId}/unlike`)
  }
}
export default new CommentsServices()