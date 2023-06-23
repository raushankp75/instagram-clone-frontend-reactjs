import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'

const Profile = () => {

  const [images, setImages] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/post/my', {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res.data.post)
      setImages(res.data.post)

    }).catch((err) => {
      console.log('Signup Error 48: ', err.response.data)
    })
  })



  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center', gap: '15px', margin: '10px 10px' }}>
            <CardMedia
              component='img'
              image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
              alt=''
              sx={{ width: '140px', height: '140px', borderRadius: '50%' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600', fontSize: '30px' }}>
                Raushan Kumar
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
                <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>15</Box> posts</Typography>
                <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>15</Box> followers</Typography>
                <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>15</Box> following</Typography>
              </Box>
            </Box>
          </Box>



          <hr />
          <CardContent>
            <Grid container spacing={0.3}>
              {images.map((image) => {
                return (
                  <Grid item xs={4}>
                    <CardMedia
                      component='img'
                      image={image.image}
                      alt=''
                      sx={{ height: '200px', objectFit: 'fill' }}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>



        </Card>

      </Grid>
    </Grid>
  )
}

export default Profile