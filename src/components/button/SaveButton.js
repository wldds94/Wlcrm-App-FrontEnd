import React from 'react'

// material-ui
import {
    Button,
} from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import {
    SaveOutlined,
} from '@ant-design/icons';

const SaveButton = ({ 
    isSubmitting = false, 
    setSubmitting, 
    label = false, 
    icon = false, 
    ...others 
}) => {
    return (
        <>
            <AnimateButton>
                {label === "" ?
                    <>
                        <Button
                            disableElevation
                            disabled={isSubmitting} // {disabled}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ fontSize: '1.2rem' }}
                            // onClick={() => onSubmit()}
                        >
                            {icon === false ? <SaveOutlined /> : icon}{/* <SaveOutlined fontSize="large" /> */}
                        </Button>
                    </>
                    : <Button
                        disableElevation
                        disabled={isSubmitting} // {disabled}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ gap: ".5rem" }}
                        endIcon={icon === false ? <SaveOutlined /> : icon}
                    >
                        {label === false ? "Salva" : label}
                    </Button>}

            </AnimateButton>
        </>

    )
}

export default SaveButton