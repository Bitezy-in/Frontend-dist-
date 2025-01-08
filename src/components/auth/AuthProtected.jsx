import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';
const AuthProtected = ({ authLoading }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state?.customer?.customerInformation);

    useEffect(() => {
        if (!authLoading && user) { // Wait for authLoading to be false
            navigate("/");
        }
    }, [user, authLoading, navigate]);

    return authLoading ? <Loader /> : <Outlet />;
}

export default AuthProtected;