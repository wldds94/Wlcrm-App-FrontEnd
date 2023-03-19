import React, { useRef, useState } from 'react'
import { useEffect } from "react";

import { useLocation, Navigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from 'react-redux'

// slices
import { getAuthvalidateStatus, selectAuthStatus, selectCurrentToken, tokenValidation } from "store/reducers/auth";
// import { cleanClient } from 'store/reducers/client';
// import { cleanInvoice } from 'store/reducers/invoice';
// import { cleanOptions } from 'store/reducers/options';
// import { cleanEvents } from 'store/reducers/calendar';
// import { cleanUser } from 'store/reducers/users';
// import { cleanClinical } from 'store/reducers/clinical';
// import { cleanChat } from 'store/reducers/chat';
// import { cleanShopping } from 'store/reducers/shopping';
// import useAuth from 'hooks/redux/useAuth';
import { cleanEncrypt, getHiddenKey } from 'store/reducers/encrypt';

const RequireAuth = ({ /* token = null,  */children }) => {
    console.log('Mount RequireAuth');
    const dispatch = useDispatch()

    const token = useSelector(selectCurrentToken)
    // const hiddenKey = useSelector(getHiddenKey)
    const tokenValidationStatus = useSelector(getAuthvalidateStatus)
    const location = useLocation()

    // const [currentPath, setCurrentPath] = useState(location.pathname)

    // // const [currentLocation, setCurrentLocation] = useState(null)
    // // const navigate = useNavigate()
    const [isValidToken, setIsValidToken] = React.useState(false)
    
    useEffect(() => {
        console.log(location);
        console.log(location.pathname);
        // WORKS
        if(tokenValidationStatus !== 'loading') {
            setIsValidToken(checkValidToken())
        }
    }, [location.pathname])

    useEffect(() => {
        // console.log(token);
        if (/* isValidToken === 'failed' || */ token === null) {
            
            // dispatch(cleanClient())

            // dispatch(cleanOptions())

            // dispatch(cleanEvents())

            // dispatch(cleanUser())

            // dispatch(cleanInvoice())

            // dispatch(cleanClinical())

            // dispatch(cleanChat())

            // dispatch(cleanShopping())

            // HIDDEN KEY
            dispatch(cleanEncrypt())

        }
    }, [token/* , hiddenKey */])

    const checkValidToken = async () => {
        // Validation logic...
        try {
            console.log('Success');
            const resultAction = await dispatch(tokenValidation()) // .unwrap() // console.log(resultAction);

            return resultAction?.payload?.status ? resultAction?.payload?.status && resultAction?.payload?.data?.user?.ID : false // && resultAction?.data?.user?.ID ? true : false
            // return token

        } catch (err) {
            console.log(err);
            // setIsValidToken(false)
            return false
        }
    }


    if (!token) {
        // console.log('Redirecting to Login...');
        return <Navigate to="/login" state={{ from: location }} replace={true} />
        // navigate("/login", { from: location }, { replace: true} )
    }
    if (isValidToken/* checkValidToken() */) {
        // console.log('Not Redirecting...');
        return <>{children}</>
    }
}

export default RequireAuth;