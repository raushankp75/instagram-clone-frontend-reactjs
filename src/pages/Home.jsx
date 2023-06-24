import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

// mui icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import axios from 'axios';
import { useParams } from 'react-router-dom';
// import ReactTimeAgo from 'react-time-ago'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
    const { id } = useParams();

    const [data, setData] = useState([])
    const [text, setText] = useState()


    const getAllPost = () => {
        axios.get('http://localhost:8000/post/all', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data.posts)
            setData(res.data.posts)

        }).catch((err) => {
            console.log('Signup Error 48: ', err.response.data)
        })
    }


    // get all post
    useEffect(() => {
        getAllPost()
    }, [])




    // like post
    const likePost = (id) => {
        fetch("http://localhost:8000/post/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                getAllPost()

                // const newData = data.map((post) => {
                //     // console.log(result._id)
                //     if (post._id == result) {
                //         return result;
                //     } else {
                //         return post;
                //     }
                // });
                // setData(newData);
                console.log(result);
            });

    };


    // like post
    const unlikePost = (id) => {
        fetch("http://localhost:8000/post/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                getAllPost()

                // const newData = data.map((post) => {
                //     // console.log(result)
                //     if (post._id == result) {
                //         return result;
                //     } else {
                //         return post;
                //     }
                // });
                // setData(newData);
                console.log(result);
            });
    };





    // add comment function
    const addComment = (id) => {
        console.log(text)

        axios.put(`http://localhost:8000/post/comment/${id}`, { text, id }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.success === true) {
                toast.success(res.data.message);
                // console.log(res.data.message)
            }
        }).catch((err) => {
            if (err.code === 'ERR_BAD_REQUEST') {
                console.log('Add commment error: ', err)
                toast.error(err.response.data.error);
            }
        })
    }



    // const date = Date.parse(post.createdAt)

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="85vh">
            <Grid sx={{ width: '700px' }} container spacing={10}>
                {data.map((post, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            <Card>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center', gap: '15px', margin: '10px 10px' }}>
                                    <CardMedia
                                        component='img'
                                        image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
                                        alt=''
                                        sx={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                    />
                                    <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600' }}>
                                        {post?.postedBy?.name}
                                    </Typography>
                                    <Typography fontSize={14} color={'GrayText'}>26 hour ago</Typography>
                                </Box>

                                <CardMedia
                                    component='img'
                                    height='auto'
                                    width='fullWidth'
                                    image={post?.image}
                                    alt=''
                                    sx={{ height: '400px', width: '100%', objectFit: 'fill' }}
                                />

                                {/* like and unlike post */}
                                <CardActions>
                                    {
                                        post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ?
                                            (
                                                <FavoriteIcon onClick={() => { unlikePost(post._id) }} sx={{ padding: '0 10px', color: 'red', cursor: 'pointer' }} />
                                            ) :
                                            (
                                                <FavoriteIcon onClick={() => { likePost(post._id) }} sx={{ padding: '0 10px', color: '#d9cfce', cursor: 'pointer' }} />
                                            )
                                    }
                                </CardActions>

                                <Typography sx={{ padding: '0 20px' }}>{post.likes.length} likes</Typography>

                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        {post?.title}
                                    </Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        {post?.content}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <TextField value={text} onChange={(e) => setText(e.target.value)} variant='standard' placeholder='Add a comment...' minRows={1} maxRows={15} fullWidth />
                                    <AddReactionIcon />
                                    {/* <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> */}
                                    <Button onClick={() => { addComment(post._id) }} sx={{ color: 'blue', fontWeight: 'bold', border: '1px solid blue', marginLeft: '10px' }}>Post</Button>
                                </CardActions>

                            </Card>

                        </Grid>
                    )
                })}

            </Grid>
        </Box>
    )
}

export default Home