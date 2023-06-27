import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import PostDetails from './PostDetails'
import { useParams } from 'react-router-dom'

const OtherUserProfile = () => {

    const { userid } = useParams()

    const [user, setUser] = useState('')
    const [post, setPost] = useState([])

    // for dynamic follow unfollow button
    const [isFollow, setIsFollow] = useState(false)



    // get user profile
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

            /// conditionally follow and unfollow
            if (res.data.user.followers.includes(JSON.parse(localStorage.getItem('user'))._id)) {
                setIsFollow(true)
            }

        }).catch((err) => {
            console.log('Signup Error 48: ', err.response.data)
        })
    }

    useEffect(() => {
        getMyPost();
    }, [isFollow])





    // follow users function
    const followUser = (userId) => {

        console.log(userId)

        axios.put(`http://localhost:8000/user/follow`, { followId: userId }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data)

            // change follow unfollow conditionally
            setIsFollow(true)
            // if (res.data.success === true) {
            //     setText('');
            //     toast.success(res.data.message);
            //     getAllPost()
            //     // console.log(res.data.message)
            // }
        }).catch((err) => {
            // if (err.code === 'ERR_BAD_REQUEST') {
            console.log('Add commment error: ', err)
            //     toast.error(err.response.data.error);
            // }
        })

    }



    // unfollow users function
    const unfollowUser = (userId) => {

        console.log(userId)

        axios.put(`http://localhost:8000/user/unfollow`, { followId: userId }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data)

            // change follow unfollow conditionally
            setIsFollow(false)
            // if (res.data.success === true) {
            //     setText('');
            //     toast.success(res.data.message);
            //     getAllPost()
            //     // console.log(res.data.message)
            // }
        }).catch((err) => {
            // if (err.code === 'ERR_BAD_REQUEST') {
            console.log('Add commment error: ', err)
            //     toast.error(err.response.data.error);
            // }
        })

    }



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
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
                                    <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600', fontSize: '30px' }}>{user.name}</Typography>

                                    {/* conditionaliy render function on follow and unfollow */}
                                    <Box>
                                        <Button
                                            onClick={() => {
                                                if (isFollow) {
                                                    unfollowUser(user._id)
                                                } else {
                                                    followUser(user._id)
                                                }
                                            }}
                                            sx={{ textTransform: 'capitalize', border: '2px solid black', padding: '2px 20px' }}>
                                            {isFollow ? 'Unfollow' : 'Follow'}
                                        </Button>
                                    </Box>
                                </Box>


                                {/* follow and following count */}
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
                                    <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>{post.length}</Box> Post</Typography>
                                    <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>{user.followers ? user.followers.length : '0'}</Box> followers</Typography>
                                    <Typography fontSize={16}><Box component='span' sx={{ fontWeight: 'bold' }}>{user.following ? user.following.length : '0'}</Box> following</Typography>
                                </Box>
                            </Box>
                        </Box>



                        <hr />
                        {/* post image view */}
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