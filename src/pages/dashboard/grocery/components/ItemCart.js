import React from 'react';

// material-ui
import {
    IconButton,
} from '@mui/material';

// Store
import { useDispatch } from 'react-redux';
// slices
import { addShoppingItem } from 'store/reducers/shopping';

// components
import DeleteItemButton from './DeleteItemButton';

// assets
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import ShoppingItemForm from './ShoppingItemForm';


const ItemCart = ({ item, index, ...other }) => {
    // console.log(item);
    const dispatch = useDispatch()

    // const [openDialog, setOpenDialog] = useState(false)

    const toggleComplete = async (item) => {
        const newItem = { ...item }
        newItem.isCompleted = !Boolean(item.isCompleted) ? 1 : 0
        console.log(newItem);
        try {
            const resultAction = await dispatch(addShoppingItem(newItem)).unwrap() // console.log(resultAction);
        } catch (err) {
            console.log('Failed');
        }
    };

    const handleChangeQuantity = async (item, increase = 1) => {
        const newItem = { ...item }
        newItem.quantity = item.quantity + increase
        console.log(newItem);
        try {
            const resultAction = await dispatch(addShoppingItem(newItem)).unwrap() // console.log(resultAction);
        } catch (err) {
            console.log('Failed');
        }
    }

    return (
        <>
            <div key={index} className='item-container'>
                <div className='item-name' onClick={() => toggleComplete(item)}>
                    {item.isCompleted ? (
                        <>
                            <CheckCircleOutlineIcon />
                            <span className='completed'>{item.name}</span>
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon />
                            <span>{item.name}</span>
                        </>
                    )}
                </div>

                <div className='actions'>
                    <div className='data-actions'>
                        <IconButton onClick={other.onEditCallback} >
                            <BorderColorIcon fontSize="inherit" />
                        </IconButton>
                        <DeleteItemButton item={item} />
                    </div>
                    <div className='quantity'>
                        <button>
                            <KeyboardArrowLeftIcon onClick={() => handleChangeQuantity(item, -1)} />
                        </button>
                        <span> {item.quantity} </span>
                        <button>
                            <KeyboardArrowRightIcon onClick={() => handleChangeQuantity(item)} />
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ItemCart