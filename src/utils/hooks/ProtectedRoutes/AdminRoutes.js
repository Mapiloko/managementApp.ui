import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { Roles } from '../../Configs/Roles';
import { getFromStore } from '../storage';

const useAuth = ()=> {
    const user = getFromStore("User");
    return user && user.Role === Roles.admin ;
}

const AdminRoutes = () =>{

    const isAuth = useAuth();
  return (
    isAuth? <Outlet/> : <Navigate to="/employees-list"/>
  )
}

export default AdminRoutes;

