import React, { useState } from 'react'
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, styled, Grid, Box } from '@mui/material'
import CottageIcon from '@mui/icons-material/Cottage';
import DrawerComponent from './DrawerComponent';
import HeaderData from './HeaderData.json';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isLoggesIn } from '../../auth/auth';


// const pages = ['Create post', 'Profile'];


// css
const Container = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    & > a{
        padding: 20px;
      color: inherit;
      text-decoration: none;
    }
`



const Header = () => {
    const navigate = useNavigate();

    // const TOKEN = localStorage.getItem('token')
    // console.log(28, TOKEN)


    const [value, setValue] = useState();


    const theme = useTheme();
    // console.log(theme)

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    // console.log(isMatch)




    // logout
    const logout = async () => {
        // try {
        //   const response = await axios.post(
        //     'http://localhost:3000/auth/logout',
        //     {},
        //     {
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       withCredentials: true,
        //     }
        //   );

        localStorage.clear();
        // setRole('');
        navigate('/');
        // } catch (error) {
        //   console.error(error);
        // }
    };




    // is active menu
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? "Bold" : "normal",
            // borderBottom: isActive ? "2px solid gree" : "",
            // backgroundColor: isActive ? "#555" : "",
            padding: isActive ? "0 0 3px 0" : "",
            margin: isActive ? "0px 20px 0px  20px" : "",
            color: isActive ? "cyan" : "",
            borderBottom: isActive ? "2px solid cyan" : ""
        }
    }


    return (
        <>
            <AppBar sx={{ backgroundImage: "linear-gradient(to bottom, #ff1a66, #ff8566)" }}>
                <Container>
                    <Grid onClick={() => { navigate('/user/home') }} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '15px 0' }}>
                        {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}

                        <img src='https://cdn-icons-png.flaticon.com/128/174/174855.png' width={30} alt="" /><span style={{ fontFamily: "'Pacifico', cursive", fontSize: '20px' }}>Instagram Clone</span>
                    </Grid>

                    {
                        isMatch ? (
                            <>
                                <DrawerComponent />
                            </>
                        ) : (
                            <>
                                {/* <Tabs sx={{ marginLeft: 'auto' }} textColor='inherit' value={value} onChange={(e, value) => setValue(value)} indicatorColor='secondary'>
                                    {
                                        HeaderData.map((page, index) => (
                                            <Tab key={index} label={page.name} />
                                        ))
                                    }
                                </Tabs> */}

                                {
                                    isLoggesIn() ?
                                        <>
                                            {/* style={{fontFamily: "'Open Sans', sans-serif", fontWeight: '600' }} */}
                                            {
                                                HeaderData.map((page, index) => (
                                                    <NavLink to={page.link} key={index} style={navLinkStyles} className='fontOpenSansBold'>{page.name}</NavLink>
                                                ))
                                            }

                                            <Button onClick={logout} sx={{ marginLeft: 'auto', backgroundColor: 'red', fontFamily: "'Open Sans', sans-serif", textTransform: 'capitalize' }}><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Button>
                                        </> :
                                        <Button sx={{ marginLeft: 'auto', fontFamily: "'Open Sans', sans-serif" }} variant="contained"><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Login</Link></Button>
                                }




                                {/* <Button sx={{ marginLeft: '10px' }} variant="contained"><Link to='/signup' style={{textDecoration: 'none', color: 'white'}}>Signup</Link></Button> */}
                            </>
                        )
                    }
                </Container>
            </AppBar>
        </>
    )
}

export default Header