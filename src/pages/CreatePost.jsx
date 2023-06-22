import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, TextareaAutosize, Typography } from '@mui/material'

const CreatePost = () => {

  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  }

  return (
    <Box>
      <Card sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'space-between' }}>
          <Button>Back btn</Button>
          <Typography>Create new post</Typography>
          <Button sx={{ fontWeight: 'bold', border: '1px solid blue' }}>Share</Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Box>
            <CardMedia
              component='img'
              image='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
              alt=''
              sx={{ height: '400px', width: '400px', objectFit: 'fill' }}
              id='output'
            />

            <Button
              variant="contained"
              component="label"
              sx={{width: '100%'}}
            >
              Click here to select an image
              <input
                type="file"
                hidden
                accept='image/*'
                onChange={(event) => { loadfile(event) }}
              />
            </Button>
          </Box>


          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center', gap: '15px', margin: '30px 10px' }}>
              <CardMedia
                component='img'
                image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
                alt=''
                sx={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600' }}>
                Raushan Kumar
              </Typography>
            </Box>

            <TextareaAutosize placeholder='Write a caption...' style={{ outline: 'none', border: 'none', width: '140%' }} />
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}

export default CreatePost