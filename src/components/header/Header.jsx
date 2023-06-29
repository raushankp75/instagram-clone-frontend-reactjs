import React, { useState } from 'react'
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, styled } from '@mui/material'
import CottageIcon from '@mui/icons-material/Cottage';
import DrawerComponent from './DrawerComponent';
import HeaderData from './HeaderData.json';
import { Link, useNavigate } from 'react-router-dom';
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

    return (
        <>
            <AppBar sx={{ backgroundImage: "linear-gradient(to bottom, #ff1a66, #ff8566)" }}>
                <Container>
                    <Typography onClick={() => {navigate('/user/home')}} sx={{ marginRight: 'auto', cursor: 'pointer' }}>RK</Typography>

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
                                            {
                                                HeaderData.map((page, index) => (
                                                    <Link to={page.link} key={index}>{page.name}</Link>
                                                ))
                                            }

                                            <Button onClick={logout} sx={{ marginLeft: 'auto', backgroundColor: 'red' }} variant="contained"><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Button>
                                        </> :
                                        <Button sx={{ marginLeft: 'auto' }} variant="contained"><Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Login</Link></Button>
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