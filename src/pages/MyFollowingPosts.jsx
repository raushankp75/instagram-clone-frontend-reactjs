import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

// mui icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {FcLikePlaceholder} from 'react-icons/fc'

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
// import ReactTimeAgo from 'react-time-ago'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comments from './comments';

import moment from 'moment'


const MyFollowingPosts = () => {
    const profilePictureLink = 'https://cdn-icons-png.flaticon.com/128/149/149071.png'

    const { id } = useParams();

    const [data, setData] = useState([])
    const [text, setText] = useState()

    const [popup, setPopup] = useState(false)
    const [commentPopupItems, setCommentPopupItems] = useState([])
    console.log(23, popup);
    


    const getAllPost = () => {
        axios.get('http://localhost:8000/post/myfollowingpost', {
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
    }, [popup])




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
            console.log(res.data.post.comments)
            if (res.data.success === true) {
                setText('');
                toast.success(res.data.message);
                getAllPost()
                // console.log(res.data.message)
            }
        }).catch((err) => {
            if (err.code === 'ERR_BAD_REQUEST') {
                console.log('Add commment error: ', err)
                toast.error(err.response.data.error);
            }
        })
    }



    // handle popup
    const handlePopup = (post) => {
        setPopup(true)
        setCommentPopupItems(post)
        console.log(146,commentPopupItems)
    }





    // const date = Date.parse(post.createdAt)

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="85vh" position="relative">
            {popup && <Comments popup={setPopup} commentPopupItems={commentPopupItems} text={text} setText={setText} addComment={addComment} />}
            {/* popup={setPopup}  */}
            <Grid sx={{ width: '700px' }} container spacing={10}>
                {data.map((post, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            <Card>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center', gap: '15px', margin: '10px 10px' }}>
                                    <CardMedia
                                        component='img'
                                        image={post.postedBy.image ? post.postedBy.image : profilePictureLink}
                                        alt=''
                                        sx={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                    />
                                    <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600' }}>
                                        <Link to={`/user/profile/${post?.postedBy?._id}`} style={{ textDecoration: 'none', color: 'black'}}>{post?.postedBy?.name}</Link>
                                    </Typography>
                                    <Typography fontSize={14} color={'GrayText'}>{moment(post?.createdAt).format('MMMM Do, YYYY . h:mm:ss a')}</Typography>
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
                                <CardActions sx={{display:'flex', flexDirection:'row', gap:'20px', margin: '5px 15px'}}>
                                    {
                                        post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ?
                                            (
                                                <FcLike onClick={() => { unlikePost(post._id) }} size={30} style={{cursor:'pointer'}} />
                                            ) :
                                            (
                                                <FcLikePlaceholder onClick={() => { likePost(post._id) }} size={30} style={{cursor:'pointer'}} />
                                            )
                                    }

                                    <FaRegComment onClick={() => {handlePopup(post)}} size={30} style={{cursor:'pointer'}} />
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

                                {/* comment popup function */}
                                <Typography onClick={() => {handlePopup(post)}} sx={{cursor: 'pointer', padding: '0 17px'}}>View all {post.comments.length} comments</Typography>


                                <CardActions>
                                    {/* <button onClick={handlePopup} className="bg-blue-200 px-3 py-1 shadow-md rounded-md">Add Task</button> */}
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

export default MyFollowingPosts