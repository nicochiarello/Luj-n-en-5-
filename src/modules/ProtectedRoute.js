import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Access } from '../Access'
const ProtectedRoute = () => {
    const access = useContext(Access)
    console.log(access)
    return access.logged ? <Outlet/> : <Navigate to="/user"/>
}

export default ProtectedRoute
