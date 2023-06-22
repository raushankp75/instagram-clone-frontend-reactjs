import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import SigninSignupContainer from './containers/signinSignupContainer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<SigninSignupContainer />} />
        </Routes>
        <ToastContainer />
      </Layout>
      {/* <Navbar /> */}
    </>
  )
}

export default App