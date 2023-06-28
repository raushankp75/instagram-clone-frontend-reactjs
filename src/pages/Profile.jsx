import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import PostDetails from './PostDetails'
import ProfilePicture from '../components/ProfilePicture'

const Profile = () => {

  // const [data, setData] = useState([])

  const profilePictureLink = 'https://cdn-icons-png.flaticon.com/128/149/149071.png'

  const [user, setUser] = useState('')
  const [post, setPost] = useState([])

  const [popup, setPopup] = useState(false)
  const [commentPopupItems, setCommentPopupItems] = useState([])


  // for open popup of upload profile pic
  const [changePic, setChangePic] = useState(false);



  // const getMyPost = () => {
  //   axios.get('http://localhost:8000/post/my', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization": "Bearer " + localStorage.getItem("token")
  //     }
  //   }).then((res) => {
  //     console.log(res.data.post)
  //     setData(res.data.post)

  //   }).catch((err) => {
  //     console.log('Signup Error 48: ', err.response.data)
  //   })
  // }


  const getMyPost = () => {
    axios.get(`http://localhost:8000/user/${JSON.parse(localStorage.getItem('user'))._id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res.data)
      setUser(res.data.user)
      setPost(res.data.post)

    }).catch((err) => {
      console.log('Signup Error 48: ', err.response.data)
    })
  }

  useEffect(() => {
    getMyPost();
  }, [])




  // handle popup
  const handlePopup = (post) => {
    setPopup(true)
    setCommentPopupItems(post)
    // console.log(146,commentPopupItems)
  }


// for open popup of upload profile pic
  const chnageProfilePic = () => {
    setChangePic(true)
  }



  return (
    <Box display="flex" justifyContent="center">


      {popup && <PostDetails popup={setPopup} commentPopupItems={commentPopupItems} getMyPost={getMyPost} />}
      {changePic && <ProfilePicture changePic={setChangePic} getMyPost={getMyPost} /> }


      <Grid sx={{ width: '800px' }} container spacing={10}>
        <Grid item xs={12}>
          <Card>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center', gap: '15px', margin: '10px 10px' }}>
              <CardMedia
                component='img'
                image={user.image ? user.image : profilePictureLink}
                alt=''
                sx={{ width: '140px', height: '140px', borderRadius: '50%', cursor: 'pointer' }}
                onClick={chnageProfilePic}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600', fontSize: '30px' }}>
                  {JSON.parse(localStorage.getItem('user')).name}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
                  <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>{post ? post.length : '0'}</Box> posts</Typography>
                  <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>{user.followers ? user.followers.length : '0'}</Box> followers</Typography>
                  <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>{user.following ? user.following.length : '0'}</Box> following</Typography>
                </Box>
              </Box>
            </Box>



            <hr />
            <CardContent>
              <Grid container spacing={0.3}>
                {post.map((post) => {
                  return (
                    <Grid item xs={4}>
                      <CardMedia
                        component='img'
                        image={post.image}
                        alt=''
                        sx={{ height: '200px', objectFit: 'fill', cursor: 'pointer' }}
                        onClick={() => {handlePopup(post)}}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile