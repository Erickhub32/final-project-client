import 'bootstrap/dist/css/bootstrap.min.css'
import CreatePostPage from '../pages/CreatePostPage/CreatePostPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PostsPage from '../pages/PostsPage/PostsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import PrivateRoutes from './PrivateRoutes'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PostDetailsPage from '../pages/PostDetailsPage/PostDetailsPage'
import EditPostPage from '../pages/EditPostPage/EditPostPage'
import ProfileForm from '../components/ProfileForm/ProfileForm'
import { Routes, Route } from 'react-router-dom'
import AboutUsPage from '../pages/AboutUs/AboutUsPage'


const AppRoutes = () => {

  return (
    <div className="AppRoutes">
      <Routes>
        <Route path={'/'} element={<PostsPage />} />
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
        <Route path={'/aboutus'} element={<AboutUsPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path={'/profile'} element={<ProfilePage />} />
          <Route path={'/profile/edit-profile'} element={<ProfileForm />} />
          <Route path={'/post/edit/:postId'} element={<EditPostPage />} />
          <Route path={'/post/:postId'} element={<PostDetailsPage />} />
          <Route path={"/create-post"} element={<CreatePostPage />} />
        </Route>

      </Routes>
    </div>
  )
}

export default AppRoutes