import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';


const Home = () => {
    return (
        <Grid container spacing={10}>
            <Grid item xs={12}>
                <Card>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' , gap: '15px', margin: '10px 10px' }}>
                        <CardMedia
                            component='img'
                            image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
                            alt=''
                            sx={{ width: '40px', height: '40px' ,borderRadius: '50%' }}
                        />
                        <Typography gutterBottom sx={{margin: '6px 0', fontWeight: '600'}}>
                            Raushan Kumar
                        </Typography>
                        <Typography fontSize={14} color={'GrayText'}>15 hour ago</Typography>
                    </Box>

                    <CardMedia
                        component='img'
                        height='auto'
                        width='fullWidth'
                        image='https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg'
                        alt=''
                    />
                    <CardActions>
                        <FavoriteIcon sx={{ padding: '0 10px' }} />
                    </CardActions>
                    <Typography sx={{ padding: '0 20px' }}>2 like</Typography>

                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                            Title
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas laudantium, doloremque ea maxime esse autem non accusamus rem ex nemo.
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <TextField variant='standard' placeholder='Add a comment...' minRows={1} maxRows={15} fullWidth />
                        <AddReactionIcon />
                        <Button sx={{ color: 'blue', fontWeight: 'bold', border: '1px solid blue', marginLeft: '10px' }}>Post</Button>
                    </CardActions>

                </Card>

            </Grid>
        </Grid>
    )
}

export default Home