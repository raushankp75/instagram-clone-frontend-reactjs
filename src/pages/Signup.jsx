import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
// import AddCircleOutlineOutlinedIcon from '@mui/material/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import logo from '../assets/logo.png'



const Signup = () => {
    const paperStyle = { padding: 20,height:'60vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { margin:'8px 0'}
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    {/* <h2>Sign Up</h2> */}
                    <img src={logo} width={200} alt="" />
                    <Typography>Sign up to see photos and videos from your friends.</Typography>
                </Grid>
                <form>
                    <TextField sx={{margin: '10px 0'}} label='Full Name' placeholder='Enter full name' fullWidth required />
                    <TextField sx={{margin: '10px 0'}} label='Email' placeholder='Enter email' fullWidth required />
                    <TextField sx={{margin: '10px 0'}} label='Password' placeholder="Enter password" type='password' fullWidth required />
                    {/* <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    /> */}
                    <Button type='submit' variant='contained' color='primary' fullWidth>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;