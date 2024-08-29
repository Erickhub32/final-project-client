import axios from 'axios'

class PostsServices {

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

  savePost(postData) {
    return this.axiosApp.post(`/posts`, postData)

  }

  getAllPosts() {
    return this.axiosApp.get(`/posts`)
  }

  getOnePost(postId) {
    return this.axiosApp.get(`/posts/${postId}`)
  }

  editPost(postId, postDataId) {
    return this.axiosApp.put(`/posts/post/${postId}`, postDataId)
  }

  deletePost(postId) {
    return this.axiosApp.delete(`posts/post/${postId}`)
  }

  getMyPosts() {
    return this.axiosApp.get(`/posts/my-posts`)
  }

  editPostLike(postId) {
    return this.axiosApp.put(`/posts/post/${postId}/like`)
  }

  editPostUnlike(postId) {
    return this.axiosApp.put(`/posts/post/${postId}/unlike`)
  }

  getPostProfileInformation() {
    return this.axiosApp.get(`/profile/profile`)
  }
}

export default new PostsServices()