/**
 * USAGE
 * 
 * const stringSalt = 'loyeteb6kg'
 * // To create a cipher
 * const myCipher = cipher(stringSalt)
 * //Then cipher any text:
 * const stringChipered = myCipher('LW100');
 * console.log(stringChipered);
 * //To decipher, you need to create a decipher and use it:
 * const myDecipher = decipher(stringSalt)
 * console.log(myDecipher(stringChipered))
 * 
 * @param {string} salt 
 * @returns 
 */
export const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}
export const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}


/**
 * USAGE
 * 
 * // encrypting
 * const encrypted_text = crypt(stringSalt, 'LW1000'); // -> 426f666665
 * console.log(encrypted_text)
 * // decrypting
 * const decrypted_string = decrypt(stringSalt, encrypted_text); // -> Hello
 * console.log(decrypted_string)
 * 
 * @param {string} salt 
 * @param {string} text 
 * @returns 
 */
export const crypt = (salt, text) => {
    const textToChars = (text) => String(text).split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

    return String(text)
        .split("")
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join("");
};

export const decrypt = (salt, encoded) => {
    const textToChars = (text) => String(text).split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
};