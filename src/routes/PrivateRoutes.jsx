import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import { Navigate, Outlet } from "react-router-dom"
import { Spinner } from "react-bootstrap"

const PrivateRoutes = () => {

  const { loggedUser, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Spinner/>
  }

  if (!loggedUser) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}

export default PrivateRoutes