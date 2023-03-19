import React, { useState } from 'react'
// style
import './keyStorage.scss'

// material ui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getHiddenKey, setHiddenKey } from 'store/reducers/encrypt';

// project import
import AuthWrapper from 'pages/authentication/components/AuthWrapper';


const PrivateKeyStorage = ({ children }) => {
    // console.log('PrivateKeyStorage');
    const dispatch = useDispatch()

    const hiddenKey = useSelector(getHiddenKey)

    const [currentValue, setCurrentValue] = useState("")

    const onInputChange = (e) => {
        const { value } = e.currentTarget
        if (value !== currentValue) {
            setCurrentValue(value)
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Save Key");

        dispatch(setHiddenKey({
            key: currentValue
        }))
    }

    const comboTarget = 'hack'
    const [currentComboValue, setCurrentComboValue] = useState("")
    const [isValidCombo, setIsValidCombo] = useState(false)
    const onCombinationPress = (event) => {
        const { value } = event.currentTarget
        console.log(value);
        if (value === comboTarget) {
            setIsValidCombo(true)
        }
        setCurrentComboValue(value)
    };

    return <>
        {hiddenKey
            ? children
            : <>
                <AuthWrapper>
                    <div className='hiddenKey-Form'>
                        <div className='input-container'>
                            {isValidCombo
                                ? <TextField
                                    id="wlcrm-lock-key"
                                    variant="outlined"
                                    size="small"
                                    value={currentValue}
                                    onChange={(event) => {
                                        onInputChange(event);
                                    }}
                                />
                                : <TextField
                                    id="wlcrm-lock-key-private"
                                    variant="outlined"
                                    size="small"
                                    value={currentComboValue}
                                    onChange={(e) => {
                                        onCombinationPress(e)
                                    }}
                                />}
                        </div>
                        <div>
                            {isValidCombo &&
                                <Button variant="contained" onClick={(e) => handleSave(e)} >Salva</Button>}
                        </div>
                    </div>
                </AuthWrapper>
            </>}
    </>
}

export default PrivateKeyStorage