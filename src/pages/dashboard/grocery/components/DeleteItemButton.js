import React from 'react';

// material-ui
import {
    IconButton,
} from '@mui/material';

// components
import { deleteShoppingItem } from 'store/reducers/shopping';

// Store
import { useDispatch } from 'react-redux';
// slices

// assets
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteItemButton = ({item, ...other}) => {
    const dispatch = useDispatch()
    
    const handleDeleteItem = async (itemId) => {
        console.log(itemId);
        const deleteRes = await dispatch(deleteShoppingItem({ itemID: itemId }))
        // console.log(deleteRes);
    }

    return (
        <IconButton onClick={() => handleDeleteItem(item.id)} /* aria-label="delete" size="small" */>
            <DeleteIcon fontSize="inherit" />
        </IconButton>
    )
}

export default DeleteItemButton