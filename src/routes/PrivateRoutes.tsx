import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode, type JwtPayload } from "jwt-decode"; 

export const PrivateRoute = () => {
    
    const getToken = () => {
        return sessionStorage.getItem('authToken');
    }
    
    const token = getToken();

    if (token) {
        try {
            const decodedToken = jwtDecode<JwtPayload>(token); 
            if (!decodedToken.exp || decodedToken.exp * 1000 < Date.now()){
                sessionStorage.removeItem('authToken');
                return <Navigate to={'/login'} />;
            }
            return <Outlet />;
        } catch (error) {
            console.error(error)
            sessionStorage.removeItem('authToken');
            return <Navigate to={'/login'} />;
        }
    } else {
        return <Navigate to={'/login'} />; 
    }
}