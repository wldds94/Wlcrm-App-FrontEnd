/**
 * Find Max in order for number / duplicate
 * 
 * @param {Object} user 
 * @returns {Object} 
 */
export const getUserFullName = (user, trimmed = true, byMeta = true, withDefaultValue = false) => {
    if (user) {
        if ((user === null || Object.keys(user).length === 0)) {
            // console.log(user);
            if (withDefaultValue) {
                return "Not Provided User"
            } else {
                return null
            }
        } else {
            const meta = user.hasOwnProperty('meta') ? user?.meta : {}
            const { first_name = "", last_name = "" } = byMeta ? meta : user
            // console.log(first_name, last_name);
            const fullName = (first_name !== "" ? first_name : "") + " " + (last_name !== "" ? (trimmed ? last_name[0] + "." : last_name) : "")
            const res = fullName !== " " ? fullName : user?.display_name
            // console.log(res);
            return res
        }
    } else {
        return null
    }
}

/**
 * Return Full address Users By USER ROW
 * 
 * @param {Object} user 
 * @returns {Object} 
 */
export const getUserFullAddress = (value) => {
    // console.log(value);
    const userWay = value != null
        ? (value?.address ? value?.address + ', ' : (value?.way ? value?.way + ', ' : ""))
        : ""
    const res = value != null ?
        userWay
        + (value?.zip_code ? value?.zip_code + ', ' : "")
        + (value?.province ? value?.province + ', ' : "")
        + (value?.region ? value?.region + ', ' : "")
        + (value?.state ? value?.state : "")
        : ""
    // console.log(res);
    return res
}


/**
 * Return STRING for ENCRYPT
 * 
 * @param {Object} user 
 * @returns {Object} 
 */
export const getUserChiperString = (user) => {
    const res = user != null ?
        (user?.last_name ? user?.last_name.substring(0, 2) : "")
        + (user?.first_name ? user?.first_name.substring(0, 2) : "")
        + (user?.id ? user?.id : "")
        + (user?.ID ? user?.ID : "")
        : ""
    // console.log(res);
    return res
}

/**
 * DISPLAY
 */
/**
 * Return STRING for ENCRYPT
 * 
 * @param {Object} user 
 * @returns {Object} 
 */
export const getHumanSex = (sex) => {
    const genres = {
        O: 'Non dichiarato',
        F: 'Femmina',
        M: 'Maschio',
    }

    return genres[sex]
}