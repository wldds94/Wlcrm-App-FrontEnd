import React, { useCallback } from 'react'

// crypto JS
import { AES, enc } from 'crypto-js';

// redux
import { useSelector } from 'react-redux';
// slices
import { getHiddenKey } from 'store/reducers/encrypt'

const useCryptoJS = () => {
    const hiddenKey = useSelector(getHiddenKey)

    const encryptCallback = useCallback((message) => {
        const cipherText = AES.encrypt(message, hiddenKey);
        // console.log(cipherText);
        return cipherText.toString();
    }, [hiddenKey])

    const decryptCallback = useCallback((message) => {
        let bytes;

        try {
            bytes = AES.decrypt(message, hiddenKey);
            return bytes.toString(enc.Utf8);
        } catch (err) {
            console.log('UNABLE TO DECIPHER', err);
        }
    }, [hiddenKey])

    return {
        encrypt: encryptCallback,/* (message) => {
            const cipherText = AES.encrypt(message, hiddenKey);
            // console.log(cipherText);
            return cipherText.toString();
        }, */
        decrypt: decryptCallback/* (message) => {
            let bytes;

            try {
                bytes = AES.decrypt(message, hiddenKey);
                return bytes.toString(enc.Utf8);
            } catch (err) {
                console.log('UNABLE TO DECIPHER', err);
            }
        } */,
    }
}

export default useCryptoJS