import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PageNotFound from './PageNotFound';
import { isLoggesIn } from '../auth/auth';

const PrivateRoutes = () => {

    // let loggedIn = false;

    // if(isLoggesIn()){
    //     return <Outlet />
    // } else{
    //     return <Navigate to={"/"} />
    // }


    return isLoggesIn() ? <Outlet /> : <Navigate to={"/"} />

}

export default PrivateRoutes