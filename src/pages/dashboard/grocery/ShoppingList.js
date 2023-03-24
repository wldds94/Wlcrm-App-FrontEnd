import React, { useState } from 'react';

// material-ui
import {
    Grid,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// components
import ShoppingItemForm from './components/ShoppingItemForm';
import ItemCart from './components/ItemCart';

// Store
import { useSelector } from 'react-redux';
// slices
import { getShoppingList, getShoppingStatus } from 'store/reducers/shopping';

// assets
import AccordionCard from 'components/card/list/AccordionCard';
import SimpleHeaderBoxed from 'components/typography/SimpleHeaderBoxed';

const ShoppingList = () => {
    console.log('ShoppingList');
    const [openCart, setOpenCart] = useState(false);

    // HINT: each "item" in our list names a name,
    // a boolean to tell if its been completed, and a quantity
    // In store
    const items = useSelector(getShoppingList) // []

    const shoppingStatus = useSelector(getShoppingStatus)

    const [itemSelected, setItemSelected] = useState(null)
    // const [items, setItems] = useState([
    //     { id: 1, name: 'item 1', quantity: 1, isSelected: false },
    //     { id: 2, name: 'item 2', quantity: 3, isSelected: true },
    //     { id: 3, name: 'item 3', quantity: 2, isSelected: false },
    // ]);

    /**
     * DATA ACTIONS
     */
    const handleEditItem = (item) => {
        console.log("selected")
        console.log(item);

        const editable = items.find(el => el.id === item.id)
        setItemSelected(editable)

    }


    return (
        <>
            <Grid container sx={{ /* height: '100%' *//* , background: "red"  */ }} /* spacing={2} */ >
                <Grid item xs={12} style={{ /* height: '100%' *//* , background: "yellow" */ }} >
                    <AccordionCard
                        bottomBorder={false}
                        fullWidth={true}
                        ContentSummary={() => <SimpleHeaderBoxed title={'Shopping Cart'} lightShadow={true} />}
                        ContentDetails={() => <>
                            <div style={{
                                // height: openCart ? '100%' : 0,
                                // transition: "height 320ms ease-in-out",
                                overflow: "hidden", /* , background: "yellow" */
                                position: "relative",
                            }} className="cart-wrapper-container" >
                                <div className='cart-background'>
                                    <div className='main-container'>
                                        {/* <div className='add-item-box'>
                                        <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
                                        <AddShoppingCartIcon onClick={() => handleAddButtonClick()} />
                                    </div> */}
                                        <div>
                                            <ShoppingItemForm formData={itemSelected} afterSubmitCallback={() => setItemSelected(null)} />
                                        </div>
                                        <div className='item-list'>
                                            {items.map((item, index) => (
                                                <ItemCart key={index} index={index} item={item} onEditCallback={() => { handleEditItem(item) }} />
                                            ))}
                                        </div>
                                        <div className='total'>Total: {items.reduce((prev, next) => {
                                            return prev + (next.isCompleted ? 0 : next.quantity)
                                        }, 0)}</div>
                                    </div>
                                </div>
                                {shoppingStatus === "loading" && (
                                    <div className='loader-container' style={{ display: 'flex' }}>
                                        <CircularProgress size={20} />
                                    </div>
                                )}
                            </div>
                        </>}
                    />

                </Grid>
            </Grid>
        </>

    );
};

export default ShoppingList;