import React, { useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, TextareaAutosize, Typography } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PostDetails = ({ popup, commentPopupItems, getMyPost }) => {
    const navigate = useNavigate();



    // delete post function
    const deletePost = (id) => {
        console.log(15, id)

        if (window.confirm('Are you sure to delete this post?')) {
            axios.delete(`http://localhost:8000/post/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res)
                if (res.data.success === true) {
                    popup(false)
                    toast.success(res.data.message);
                    getMyPost()             // fix problem when delete not refresh profile page
                    navigate('/user/profile')

                    // console.log(res.data.message)
                }
            }).catch((err) => {
                if (err.code === 'ERR_BAD_REQUEST') {
                console.log('Add commment error: ', err)
                    toast.error(err.response.data.error);
                }
            })
        }
    }



    return (
        <Box>
            <Box sx={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', backgroundColor: 'black', opacity: '0.5' }}></Box>

            <Box sx={{ position: 'fixed', width: '70vw', top: '15%', left: '15%', zIndex: '1000' }}>
                <Button onClick={() => popup(false)} sx={{ position: 'relative', backgroundColor: 'transparent', left: '100%', color: 'white' }}><CloseIcon /></Button>
                <Card sx={{ display: 'flex', flexDirection: 'row', gap: '5px', height: '70vh', width: '97%' }}>
                    <Box>
                        <Typography sx={{ fontSize: '26px', fontWeight: '600', textAlign: 'center' }}>{commentPopupItems?.title}</Typography>
                        <CardMedia
                            component='img'
                            image={commentPopupItems.image}
                            alt=''
                            sx={{ height: '78vh', width: '100%', objectFit: 'fill' }}
                            id='output'
                        />
                    </Box>



                    <CardContent sx={{ width: '47%' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                            <CardMedia
                                component='img'
                                image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
                                alt=''
                                sx={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '180px' }}>
                                <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600' }}>{commentPopupItems.postedBy.name}</Typography>
                                <Button onClick={() => { deletePost(commentPopupItems._id) }}>Delete Post</Button>
                            </Box>
                        </Box>

                        <hr />

                        <Box sx={{ height: '380px', overflowY: 'auto' }}>
                            {/* comment section */}

                            {
                                commentPopupItems.comments.map((comment, index) => {
                                    return (
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignSelf: 'center', gap: '15px', margin: '10px 10px' }}>
                                            <CardMedia
                                                component='img'
                                                image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
                                                alt=''
                                                sx={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                            />
                                            <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600' }}>
                                                {comment?.postedBy?.name}
                                                <span style={{ fontWeight: 'normal' }}> {comment?.text}</span>
                                                <Typography fontSize={14} color={'GrayText'}>26 hour ago</Typography>
                                            </Typography>
                                        </Box>
                                    )
                                })
                            }

                        </Box>


                        <Typography>{commentPopupItems.likes.length} likes</Typography>

                    </CardContent>
                </Card>
            </Box>
        </Box>

    )
}

export default PostDetails