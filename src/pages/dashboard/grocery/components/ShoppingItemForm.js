import React from 'react'

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Store
import { useDispatch, useSelector } from 'react-redux'
// slices
import { addShoppingItem } from 'store/reducers/shopping';

// assets
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ShoppingItemForm = ({ formData = null, ...others }) => {
    const dispatch = useDispatch()

    // console.log(formData);
    const initialValues = formData != null ? {
        id: formData?.id,
        name: formData?.name,
        quantity: formData?.quantity,
        isSelected: formData?.isSelected,
        submit: null
    } : {
        name: '',
        quantity: 1,
        isSelected: false,
        submit: null
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Campo obbligatorio'),
        quantity: Yup.number(),
    })

    const handleSubmitCallback = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        try {
            const resultAction = await dispatch(addShoppingItem(values)).unwrap() // console.log(resultAction);
            console.log('Success');

            // const notice = buildNotice(resultAction)
            // dispatch(addNotice(notice))

            setStatus({ success: true });
            setSubmitting(false);

            if (resultAction?.status) {
                resetForm()

                if (others?.afterSubmitCallback) {
                    others.afterSubmitCallback()
                } 
            }

        } catch (err) {
            console.log('Failed');

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
        // return true
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmitCallback}
                enableReinitialize={true}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <div className='add-item-box'>
                            <input type="text" name='name' id="item-name" value={values.name} onChange={handleChange} onBlur={handleBlur} className='add-item-input' placeholder='Add an item...' />
                            <input type="number" min="0" name='quantity' id="item-quantity" value={values.quantity} onChange={handleChange} onBlur={handleBlur} className='quantity-item-input' placeholder='1' />
                            {/* <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} /> */}
                            <AddShoppingCartIcon onClick={handleSubmit} />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default ShoppingItemForm