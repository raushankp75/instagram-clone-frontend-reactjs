import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
// import LockOutlinedIcon from '@mui/material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import logo from '../assets/logo.png'



const Signin=({handleChange})=>{

    const paperStyle={padding :20,height:'60vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper  style={paperStyle} >
                <Grid align='center'>
                     {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                    {/* <h2>Sign In</h2> */}
                    <img src={logo} width={200} alt="" />
                </Grid>
                <TextField sx={{margin: '10px 0'}} label='Email' placeholder='Enter email' fullWidth required/>
                <TextField sx={{margin: '10px 0'}} label='Password' placeholder='Enter password' type='password' fullWidth required/>
                {/* <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 /> */}
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography sx={{fontSize:'13px', textAlign: 'center', margin: '12px 0'}}>
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography sx={{fontSize:'13px', textAlign: 'center', margin: '12px 0'}}> Do you have an account ?
                     <Link href="#" onClick={()=>handleChange("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signin