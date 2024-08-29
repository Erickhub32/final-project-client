import axios from "axios";

class ProfilesServices {

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
  getUserProfileData(userData) {
    return this.axiosApp.get(`/profile/profile`, userData)
  }


}
export default new ProfilesServices()