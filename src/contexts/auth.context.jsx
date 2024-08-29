import authServices from "../services/auth.services"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

  const [loggedUser, setLoggedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loginUser = loginData => {

    authServices
      .loginUser(loginData)
      .then(({ data }) => {
        localStorage.setItem('userAuthToken', data.authToken)
        authenticateUser()
      })
      .catch(err => console.log(err))
  }

  const authenticateUser = () => {

    const token = localStorage.getItem('userAuthToken')

    if (token) {
      authServices
        .verifyToken(token)
        .then(({ data }) => {
          setLoggedUser(data)
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    } else {
      logoutUser()
    }
  }



  const logoutUser = () => {
    setLoggedUser(null)
    localStorage.removeItem('userAuthToken')
    setIsLoading(false)
  }

  useEffect(() => {
    authenticateUser()
  }, [])


  return (
    <AuthContext.Provider value={{ loggedUser, loginUser, authenticateUser, logoutUser, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProviderWrapper }