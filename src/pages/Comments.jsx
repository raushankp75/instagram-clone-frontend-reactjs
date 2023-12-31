import React, { useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, TextareaAutosize, Typography } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import moment from 'moment'

import Loader from '../components/Loader'


const Comments = ({ popup, commentPopupItems, text, setText, addComment, IsLoading }) => {

    const profilePictureLink = 'https://cdn-icons-png.flaticon.com/128/149/149071.png'


    return (
        <Box>
            <Box sx={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', backgroundColor: 'black', opacity: '0.5' }}></Box>

            <Box sx={{ position: 'fixed', width: '70vw', top: '15%', left: '15%', zIndex: '1000' }}>
                <Button onClick={() => popup(false)} sx={{ position: 'relative', backgroundColor: 'transparent', left: '100%', color: 'white' }}><CloseIcon /></Button>
                <Card sx={{ display: 'flex', flexDirection: 'row', gap: '5px', height: '70vh', width: '100%' }}>
                    {
                        IsLoading ? <Loader /> : (
                            <>
                                <CardMedia
                                    component='img'
                                    image={commentPopupItems.image}
                                    alt=''
                                    sx={{ height: '78vh', width: '56%', objectFit: 'fill' }}
                                    id='output'
                                />



                                <CardContent sx={{ width: '40%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                                        <CardMedia
                                            component='img'
                                            image={commentPopupItems.postedBy.image ? commentPopupItems.postedBy.image : profilePictureLink}
                                            alt=''
                                            sx={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                        />
                                        <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600' }}>
                                            {commentPopupItems.postedBy.name}
                                        </Typography>
                                    </Box>

                                    <hr />

                                    <Box sx={{ height: '300px', overflowY: 'auto' }}>
                                        {/* comment section */}
                                        {
                                            commentPopupItems.comments.map((comment, index) => {
                                                return (
                                                    <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignSelf: 'center', gap: '15px', margin: '10px 10px' }}>
                                                        <CardMedia
                                                            component='img'
                                                            image={comment.postedBy.image ? comment.postedBy.image : profilePictureLink}
                                                            alt=''
                                                            sx={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                                        />
                                                        <Typography gutterBottom sx={{ margin: '6px 0', fontWeight: '600' }}>
                                                            {comment?.postedBy?.name}
                                                            <span style={{ fontWeight: 'normal' }}> {comment?.text}</span>
                                                            <Typography fontSize={14} color={'GrayText'}>{moment(comment.postedBy.createdAt).format('MMMM Do, YYYY . h:mm:ss a')}</Typography>
                                                        </Typography>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>

                                    <Box>
                                        <hr />
                                        <Typography>{commentPopupItems.likes.length} likes</Typography>
                                        <hr />

                                        <CardActions>
                                            {/* <button onClick={handlePopup} className="bg-blue-200 px-3 py-1 shadow-md rounded-md">Add Task</button> */}
                                            <AddReactionIcon />
                                            <TextField value={text} onChange={(e) => setText(e.target.value)} variant='standard' placeholder='Add a comment...' minRows={1} maxRows={15} fullWidth />
                                            {/* <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> */}
                                            <Button onClick={() => {
                                                addComment(commentPopupItems._id)
                                                popup(false)
                                            }} sx={{ color: 'blue', fontWeight: 'bold', border: '1px solid blue', marginLeft: '10px' }}>Post</Button>
                                        </CardActions>
                                    </Box>
                                </CardContent>
                            </>
                        )}
                </Card>
            </Box>
        </Box>

    )
}

export default Comments