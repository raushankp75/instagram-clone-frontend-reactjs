import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'


const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
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
    })


    // const date = Date.parse(post.createdAt)

    return (
        <Grid container spacing={10}>
            {data.map((post) => {
                return (
                    <Grid item xs={12}>
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
                            <CardActions>
                                <FavoriteIcon sx={{ padding: '0 10px' }} />
                            </CardActions>
                            <Typography sx={{ padding: '0 20px' }}>2 like</Typography>

                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    {post?.title}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                    {post?.content}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <TextField variant='standard' placeholder='Add a comment...' minRows={1} maxRows={15} fullWidth />
                                <AddReactionIcon />
                                <Button sx={{ color: 'blue', fontWeight: 'bold', border: '1px solid blue', marginLeft: '10px' }}>Post</Button>
                            </CardActions>

                        </Card>

                    </Grid>
                )
            })}

        </Grid>
    )
}

export default Home