import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, TextareaAutosize, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreatePost = () => {

  const navigate = useNavigate();

  const [createPost, setCreatePost] = useState({
    title: '',
    content: ''
  })
  const [image, setImage] = useState("");

  // const [imageUrl, setImageUrl] = useState();
  const [url, setUrl] = useState("");



  useEffect(() => {
    if (url) {
      // saving post data to the api
      fetch('http://localhost:8000/post/create', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          createPost,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data.success)
          if (data.success === true) {
            toast.success(data.message);
            navigate('/home')
          } else {
            toast.error(data.error)
          }
        })
        .catch(err => {
          console.log(err)
          toast.error(err);
        })
    }
  }, [url])


  // input field change function
  const handleChange = (e) => {
    setCreatePost({ ...createPost, [e.target.name]: e.target.value })
  }



  // for post image to cloudinary
  const handleSubmit = () => {
    console.log(createPost, image)
    const data = new FormData();
    data.append('file', image)
    data.append('upload_preset', 'instagram')
    data.append('cloud_name', 'raushancloud')

    // axios.post('https://api.cloudinary.com/v1_1/:raushancloud/:upload', imageData)

    //   .then((res) => {
    //     console.log(res.imageData)

    //   }).catch((err) => {
    //     console.log('Create post Error 34: ', err.response.imageData)
    //   })

    fetch('https://api.cloudinary.com/v1_1/raushancloud/image/upload',
      {
        method: 'post',
        body: data
      }
    ).then(res => {
      return res.json()
    })
      .then(data => {
        // console.log(data.url)
        // setImageUrl(data.url)
        setUrl(data.url)
      })
      .catch(err => console.log(err))





    // for post data to the api
    // const handleCreatePost = () => {
    //   // e.preventDefault()
    //   console.log(createPost, image);

    // axios.post('http://localhost:8000/post/create',createPost, url, {


    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Authorization": "Bearer " + localStorage.getItem("token")
    //   }
    // }).then((res) => {
    //   console.log(res.data)
    //   // if (res.createPost.success === true) {
    //   //   toast.success(res.createPost.message);
    //   //   navigate('/home')
    //   // }
    // }).catch((err) => {
    //   console.log('Create post Error 34: ', err)
    //   // toast.error(err);
    // })
    // }


  }




  // for post data to the api
  // const handleCreatePost = () => {
  //   // e.preventDefault()
  //   console.log(createPost, image);

  //   axios.post('http://localhost:8000/post/create', createPost, {
  //     pic: imageUrl,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization": "Bearer " + localStorage.getItem("token")
  //     }
  //   }).then((res) => {
  //     console.log(res.data)
  //     // if (res.createPost.success === true) {
  //     //   toast.success(res.createPost.message);
  //     //   navigate('/home')
  //     // }
  //   }).catch((err) => {
  //     console.log('Create post Error 34: ', err)
  //     // toast.error(err);
  //   })
  // }




  // load image to show
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
          <Button onClick={handleSubmit} sx={{ fontWeight: 'bold', border: '1px solid blue' }}>Share</Button>
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
              sx={{ width: '100%' }}
            >
              Click here to select an image
              <input
                type="file"
                hidden
                accept='image/*'
                onChange={(event) => {
                  loadfile(event);
                  setImage(event.target.files[0])
                }}
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

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <TextField name='title' value={createPost.title} onChange={handleChange} variant='standard' placeholder='Write a caption title...' style={{ outline: 'none', border: 'none', width: '140%' }} />
              <TextareaAutosize name='content' value={createPost.content} onChange={handleChange} minRows={2} maxRows={12} placeholder='Write a description...' style={{ outline: 'none', border: 'none', width: '140%', fontSize: '15px' }} />
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  )
}

export default CreatePost