import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
// import LockOutlinedIcon from '@mui/material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = ({ handleChange }) => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    // input field change function
    const handleValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    // const emailRegex = /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


    // for post data to the api
    const Login = (e) => {
        e.preventDefault()
        // console.log(data);

        // checking email validation
        // if (!emailRegex.test(data.email)) {
        //     // console.log('true')
        //     toast.error('Invalid email');
        //     return
        // }

        axios.post('http://localhost:8000/api/signin', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.success === true) {
                toast.success(res.data.message);
                // saving Token to localhost
                console.log(res.data.token)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('role', res.data.role)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                // localStorage.setItem('email', res.data.email)
                navigate('/user/home')
                // setRole(localStorage.getItem("role"))
            }
        }).catch((err) => {
            if (err.code === 'ERR_BAD_REQUEST') {
                console.log('Signup Error 48: ', err.code)
                toast.error(err.response.data.error);
            }
        })
    }




    const paperStyle = { padding: 20, height: '58vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }


    return (
        <Grid>
            <Paper style={paperStyle} >
                <Grid sx={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', margin:'15px 0'}}>
                    {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
                    
                    <img src='https://cdn-icons-png.flaticon.com/128/174/174855.png' width={40} alt="" /><span style={{fontFamily: "'Pacifico', cursive", fontSize: '26px'}}>Instagram Clone</span>
                </Grid>
                <form>
                    <TextField sx={{ margin: '7px 0' }} type='email' name='email' value={data.email} onChange={handleValueChange} label='Email' placeholder='Enter email' fullWidth required />
                    <TextField sx={{ margin: '7px 0' }} type='password' name='password' value={data.password} onChange={handleValueChange} label='Password' placeholder='Enter password' fullWidth required />
                    {/* <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 /> */}
                    <Button type='submit' onClick={Login} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                    <Typography sx={{ textAlign: 'center', fontSize: '13px', margin: '5px 0' }}>OR</Typography>
                    {/* <Button type='submit' fullWidth sx={{ backgroundColor: 'white', color: 'black', textAlign: 'center', border: '1px solid gray' }}> <img style={{ width: '25px', margin: '0 10px' }} src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google image" /> google</Button> */}
                    {/* <Typography sx={{ fontSize: '13px', textAlign: 'center', margin: '12px 0' }}>
                        <Link href="#" >
                            Forgot password ?
                        </Link>
                    </Typography> */}
                    <Typography sx={{ fontSize: '13px', textAlign: 'center', margin: '12px 0' }}> Do you have an account ?
                        <Link href="#" onClick={() => handleChange("event", 1)} >
                            Sign up
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}

export default Login