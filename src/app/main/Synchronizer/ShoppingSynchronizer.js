import React, { useEffect } from 'react'

// Store
import { useSelector, useDispatch } from 'react-redux';
// slices
import { getShoppingStatus, getShoppingSyncStatus, syncShopping } from 'store/reducers/shopping';

// project import
import AjaxLoading from 'components/loader/AjaxLoading';
import SecondaryAjaxLoading from 'components/loader/SecondaryAjaxLoading';
import Alerts from 'app/main/Alerts/Alerts';

const ShoppingSynchronizer = () => {
    const POLL_TIME_CHAT = 1000 * 30
    const POLL_TIME = 1000 * 60 //  30 // 90// 60
    const POLL_TIME_TEST = 1000 * 120 //  30 // 90// 60
    // redux
    const dispatch = useDispatch();

    // // SHOPPING
    const shoppingStatus = useSelector(getShoppingStatus)
    const shoppingSyncStatus = useSelector(getShoppingSyncStatus)
    // const shoppingList = useSelector(getShoppingList)

    // shopping
    useEffect(() => {
        const shoppingTimer = setInterval(() => {
            if (shoppingStatus !== 'loading' && shoppingSyncStatus !== 'loading') {
                dispatch(syncShopping())
            }
        }, POLL_TIME_TEST)

        return () => clearInterval(shoppingTimer)
    }, [/* shoppingList */])

    return (
        <></>
    )
}

export default ShoppingSynchronizer