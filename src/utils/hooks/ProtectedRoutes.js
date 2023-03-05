import { Navigate, Outlet } from 'react-router-dom';
import { getFromStore } from './storage';

const useAuth = ()=> {
    const user = getFromStore("User");
    return user && user.Token;
}

const ProtectedRoutes = () =>{

    const isAuth = useAuth();
  return (
    isAuth? <Outlet/> : <Navigate to="/" />
  )
}

export default ProtectedRoutes;

