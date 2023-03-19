export const getRandomColor = (string, hex = true, alpha = false) => {
    const firstAlphabet = string.charAt(0).toLowerCase();

    // get the ASCII code of the character
    const asciiCode = firstAlphabet.charCodeAt(0);

    // number that contains 3 times ASCII value of character -- unique for every alphabet
    const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    var num = Math.round(0xffffff * parseInt(colorNum));
    var r = (num >> 16) & 255;
    var g = (num >> 8) & 255;
    var b = num & 255;

    if (hex) {
        return rgbToHex(r, g, b)
    } else {
        if (alpha) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
        }
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
    }

}

/** --------------- UTILS ------------- */
/** UTILS */
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}