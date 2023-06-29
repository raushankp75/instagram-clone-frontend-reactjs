import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material'
// import AddCircleOutlineOutlinedIcon from '@mui/material/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import logo from '../assets/logo.png'
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';

import jwt_decode from "jwt-decode";


const Signup = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })


    // input field change function
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const emailRegex = /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/


    // for post data to the api
    const Signup = (e) => {
        e.preventDefault()
        // console.log(data);

        // checking email validation
        if (!emailRegex.test(data.email)) {
            // console.log('true')
            toast.error('Email must be required to signup or Invalid email');
            return
        }
        // else if(!passRegex.test(data.password)){
        //     toast.error('Password must contain at least eight characters, at least 1 no. & 1 char, include upper & lowercase letters & special characters like #,!,? etc')
        //     return
        // }

        axios.post('http://localhost:8000/api/signup', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res.data)
            if (res.data.success === true) {
                toast.success(res.data.message);
                // navigate('/login')
            }
        }).catch((err) => {
            console.log('Signup Error 48: ', err.response.data)
            toast.error(err.response.data.error);
        })
    }



    // continue with google - send data to api and check
    const ContinueWithGoogle = (credentialResponse) => {
        console.log(credentialResponse);
        const jwtDetail = jwt_decode(credentialResponse.credential);
        console.log('jwtDetail', jwtDetail);


        axios.post('http://localhost:8000/api/loginwithgoogle', {
            name: jwtDetail.name,
            email: jwtDetail.email,
            email_verified: jwtDetail.email_verified,
            clientId: credentialResponse.clientId,
            image: jwtDetail.picture,
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log(res.data)
                if (res.data.success === true) {
                    toast.success(res.data.message);
                    // saving Token to localhost
                    console.log(res.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    // localStorage.setItem('role', res.data.role)
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
    // const marginTop = { margin: '0' }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '15px 0' }}>
                    {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}

                    <img src='https://cdn-icons-png.flaticon.com/128/174/174855.png' width={40} alt="" /><span style={{ fontFamily: "'Pacifico', cursive", fontSize: '26px' }}>Instagram Clone</span>
                </Grid>
                <form>
                    <TextField sx={{ margin: '7px 0' }} type='text' name='name' value={data.name} onChange={handleChange} label='Full Name' placeholder='Enter full name' fullWidth required />
                    <TextField sx={{ margin: '7px 0' }} type='email' name='email' value={data.email} onChange={handleChange} label='Email' placeholder='Enter email' fullWidth required />
                    <TextField sx={{ margin: '7px 0' }} type='password' name='password' value={data.password} onChange={handleChange} label='Password' placeholder="Enter password" fullWidth required />
                    {/* <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    /> */}
                    <Button type='submit' onClick={Signup} variant='contained' color='primary' fullWidth>Sign up</Button>
                    <Typography sx={{ textAlign: 'center', fontSize: '13px', margin: '5px 0' }}>OR</Typography>
                    {/* <Button type='submit' onClick={Signup} fullWidth sx={{backgroundColor: 'white', color: 'black', textAlign: 'center', border: '1px solid gray'}}> <img style={{width:'25px', margin: '0 10px'}} src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google image" /> google</Button> */}


                    {/* signup with google button */}
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            // console.log(credentialResponse);
                            // const jwtDetail = jwt_decode(credentialResponse.credential);
                            // console.log('jwtDetail', jwtDetail);
                            ContinueWithGoogle(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />


                    <Typography sx={{ fontSize: '13px', textAlign: 'center', margin: '10px 0' }}> Already signup?
                        <Link href="#" onClick={() => handleChange("event", 1)} >
                            Log in
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;