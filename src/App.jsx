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


function App() {

  return (
    <>
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
    </>
  )
}

export default App
