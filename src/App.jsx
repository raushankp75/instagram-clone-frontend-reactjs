import { Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/header/Header'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import Layout from './layout/Layout'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import SigninSignupContainer from './containers/signinSignupContainer'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/create' element={<CreatePost />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signin-signup' element={<SigninSignupContainer />} />
        </Routes>
      </Layout>
      {/* <Navbar /> */}
    </>
  )
}

export default App
