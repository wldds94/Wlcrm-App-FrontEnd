import React, { useEffect, useState } from 'react'

// react-router-dom
import { Navigate  } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';

// types store - Redux slices
import { logOut } from 'store/reducers/auth';

const LogOut = () => {
    // Redux
    const dispatch = useDispatch();

    const [haveToRedirect, setHaveToRedirect] = useState(false);

    useEffect(() => {
        dispatch(logOut());

        setHaveToRedirect(true);
    }, [])

    if (haveToRedirect) {
        return <Navigate to="/" /* state={{ from: location }} */ replace={true} />
    };

    return (<></>)
}

export default LogOut