import React, { useState } from 'react'
import Paper from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const SigninSignupContainer = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }



    return (
        <Paper square>
            <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                <Tab label="Active" />
                <Tab label="Active" />
            </Tabs>

            <TabPanel value={value} index={0}>

            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
        </Paper>


    )
}

export default SigninSignupContainer
