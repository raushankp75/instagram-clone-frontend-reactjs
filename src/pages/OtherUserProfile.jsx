import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import PostDetails from './PostDetails'
import { useParams } from 'react-router-dom'

const OtherUserProfile = () => {

    const { userid } = useParams()

    const [user, setUser] = useState('')
    const [post, setPost] = useState([])

    // const [popup, setPopup] = useState(false)
    // const [commentPopupItems, setCommentPopupItems] = useState([])



    const getMyPost = () => {
        axios.get(`http://localhost:8000/user/${userid}`, {
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
    //   const handlePopup = (post) => {
    //     setPopup(true)
    //     setCommentPopupItems(post)
    //     // console.log(146,commentPopupItems)
    //   }



    return (
        <Box display="flex" justifyContent="center">

            {/* {popup && <PostDetails popup={setPopup} commentPopupItems={commentPopupItems} getMyPost={getMyPost} />} */}

            <Grid sx={{ width: '800px' }} container spacing={10}>
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
                                    {user.name}
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
                                {post.map((post) => {
                                    return (
                                        <Grid item xs={4}>
                                            <CardMedia
                                                component='img'
                                                image={post.image}
                                                alt=''
                                                sx={{ height: '200px', objectFit: 'fill', cursor: 'pointer' }}
                                            // onClick={() => {handlePopup(post)}}
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

export default OtherUserProfile