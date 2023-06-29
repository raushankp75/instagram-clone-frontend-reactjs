import React from 'react'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin, RotatingLines } from 'react-loader-spinner'
import { Box } from '@mui/material'


const Loader = () => {

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="85vh" minWidth="100%" position="relative">
            {/* <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> */}

            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </Box>
    )
}

export default Loader