import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import SigninSignupContainer from './containers/signinSignupContainer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './components/PageNotFound'
import PrivateRoutes from './components/privateRoutes'
import Comments from './pages/comments'
import OtherUserProfile from './pages/OtherUserProfile'
import MyFollowingPosts from './pages/MyFollowingPosts'

import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  return (
    <>
      <GoogleOAuthProvider clientId="476878337369-7nvg3aq68s10nqmd8apg1odq5eb0568m.apps.googleusercontent.com">
        <Layout>
          <Routes>
            <Route path='/user' element={<PrivateRoutes />}>
              <Route path='home' element={<Home />} />
              <Route path='create' element={<CreatePost />} />
              <Route exact path='profile' element={<Profile />} />
              <Route path='profile/:userid' element={<OtherUserProfile />} />
              <Route path='posts' element={<MyFollowingPosts />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
            <Route path='/' element={<SigninSignupContainer />} />
          </Routes>
          <ToastContainer />
        </Layout>
        {/* <Navbar /> */}
      </GoogleOAuthProvider>
    </>
  )
}

export default App
