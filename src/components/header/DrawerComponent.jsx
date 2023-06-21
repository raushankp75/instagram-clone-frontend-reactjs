import React, { useState } from 'react'
import { Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import HeaderData from './HeaderData.json'
import { Link } from 'react-router-dom';



// css
const Container = styled(ListItemButton)`
    display: flex;
    flex-direction: column;
    & > a{
      color: inherit;
      text-decoration: none;
    }
`



const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List sx={{padding: '50px'}}>
                    {
                        HeaderData.map((page, index) => (
                            <ListItemButton onClick={() => setOpenDrawer(false)} key={index}>
                                <Container>
                                    <Link to={page.link} key={index}>{page.name}</Link>
                                </Container>
                            </ListItemButton>
                        ))
                    }

                    <Button sx={{ marginLeft: 'auto', width: '100%', marginTop: '20px'}} variant="contained"><Link to='/' style={{textDecoration: 'none', color: 'white'}} onClick={() => setOpenDrawer(false)}>Signin</Link></Button>
                    {/* <Button sx={{ marginLeft: 'auto', width: '100%', marginTop: '20px'}} variant="contained">"><Link to='/' style={{textDecoration: 'none', color: 'white'}}>Signup</Link></Button> */}

                </List>
            </Drawer>

            <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default DrawerComponent