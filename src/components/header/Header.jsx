import React, { useState } from 'react'
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme, styled } from '@mui/material'
import CottageIcon from '@mui/icons-material/Cottage';
import DrawerComponent from './DrawerComponent';
import HeaderData from './HeaderData.json';
import { Link } from 'react-router-dom';


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
    const [value, setValue] = useState();


    const theme = useTheme();
    // console.log(theme)

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    // console.log(isMatch)

    return (
        <>
            <AppBar sx={{ backgroundImage: "linear-gradient(to bottom, #ff1a66, #ff8566)" }}>
                <Container>
                    <Typography sx={{marginRight: 'auto'}}>Instagram</Typography>

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
                                    HeaderData.map((page, index) => (
                                        <Link to={page.link} key={index}>{page.name}</Link>
                                    ))
                                }

                                <Button sx={{ marginLeft: 'auto'}} variant="contained"><Link to='/' style={{textDecoration: 'none', color: 'white'}}>Login</Link></Button>
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