import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


const ProfilePicture = ({ changePic }) => {
    return (
        <Box>
            <Box sx={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', backgroundColor: 'black', opacity: '0.5' }}></Box>
            <Box sx={{ position: 'fixed', width: '70vw', top: '30%', left: '35%', zIndex: '1000' }}>
                {/* <Button onClick={() => changePic(false)} sx={{ position: 'relative', backgroundColor: 'transparent', left: '40%', color: 'white' }}><CloseIcon /></Button> */}
                {/* <Card sx={{ display: 'flex', flexDirection: 'row', gap: '5px', height: '70vh', width: '40%' }}> */}
                <CardContent sx={{ width: '40%', backgroundColor: '#fff', display:'flex', flexDirection:'column', justifyContent:'center', borderRadius: '20px' }}>
                    <CardMedia
                        component='img'
                        image='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'
                        alt=''
                        sx={{ width: '80px', height: '80px', borderRadius: '50%', cursor: 'pointer', textAlign: 'center', margin:'0 41% ' }}
                    />
                    <Typography sx={{textAlign:'center', fontSize: '25px', margin:'3% 0'}}>Update Profile Image</Typography>
                    <Button sx={{textTransform:'capitalize', fontSize: '18px',fontWeight:'600', borderTop: '1px solid gray'}}>Upload Photo</Button>
                    <Button sx={{color:'black', textTransform:'capitalize',fontSize: '18px',borderTop: '1px solid gray'}}>Remove Photo</Button>
                    <Button onClick={() => changePic(false)} sx={{color:'black', textTransform:'capitalize',fontSize: '18px',borderTop: '1px solid gray'}}>Cancel</Button>
                </CardContent>
                {/* </Card> */}
            </Box>
        </Box>
    )
}

export default ProfilePicture