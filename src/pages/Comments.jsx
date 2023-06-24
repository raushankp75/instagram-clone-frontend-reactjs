import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, TextareaAutosize, Typography } from '@mui/material'

const Comments = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="85vh">
            <Card sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '1300px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <Box>
                        <CardMedia
                            component='img'
                            image='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                            alt=''
                            // sx={{ height: '400px', width: '400px', objectFit: 'fill' }}
                            id='output'
                        />
                    </Box>


                    <CardContent sx={{width:'40%'}}>
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

                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default Comments