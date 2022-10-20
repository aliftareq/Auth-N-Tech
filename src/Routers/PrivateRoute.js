import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import { AuthContext } from '../Context/UseContext';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthContext)
    const location = useLocation()

    //console.log(location);
    //console.log(user);

    if (loader) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user?.email) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;