import React from 'react'

// material-ui
import {
    Box,
    Button,
    Checkbox,
    FormGroup,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    MenuItem,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Store
import { useDispatch, useSelector } from 'react-redux'
// types
import { saveMessage } from 'store/reducers/chat';

// project import
import SaveButton from 'components/button/SaveButton';
import BasicOutlinedInput from 'components/input/BasicOutlinedInput';

// assets
import SendIcon from '@mui/icons-material/Send';
import useCryptoJS from 'hooks/useCryptoJS';

const ChatForm = ({ formData = null, user_id = "", group_id = 0, ...others }) => {
    const dispatch = useDispatch()

    const initialValues = formData != null ? {
        id: formData.id,
        text: formData.text,
        group_id: formData.group_id,
        user_id: user_id,
        createdAt: formData.createdAt
    } : {
        text: "Il primo messaggio",
        user_id: user_id,
        group_id: group_id,
        submit: null
    }

    const cryptoJS = useCryptoJS()
    const handleSubmit = async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
        console.log(values);

        const dataValues = {
            ...values,
            text: cryptoJS.encrypt(values?.text),
        }
        try {
            const resultAction = await dispatch(saveMessage(dataValues)).unwrap()

            console.log('Success');

            setStatus({ success: true });
            setSubmitting(false);
            // resetForm()
            if (typeof others.afterSubmitCallback === 'function') {
                others.afterSubmitCallback()
            } 
            resetForm()
            
        } catch (err) {
            console.log('Failed');

            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
    }

    return (
        <>
            {/* <Box> */}
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ pt: 1, }} >
                            <Grid item xs={12} /* sm={7} */>
                                <Stack direction="row" spacing={1} /* sx={{ padding: "0 8px 8px 8px"}} */>
                                    {/** MESSAGE **/}
                                    <Box sx={{ width: '100%', }}>
                                        <BasicOutlinedInput
                                            id="chat-text"
                                            name="text"
                                            label="Il tuo messaggio"
                                            placeholder="Scrivi un messaggio"
                                            inputValue={values.text}
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            multiline
                                            rows={3}
                                        />
                                    </Box>

                                    {/** SUBMIT */}
                                    <Box>
                                        <Grid item xs={2}>
                                            <SaveButton
                                                isSubmitting={isSubmitting}
                                                onSubmit={handleSubmit}
                                                label=""
                                                icon={<SendIcon />}
                                            />
                                        </Grid>
                                    </Box>
                                </Stack>
                                {/* <Grid container spacing={2} >
                                    <Grid item xs={10} >

                                    </Grid>

                                    
                                </Grid> */}

                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            {/* </Box> */}
        </>
    )
}

export default ChatForm