/**
 * Find Max in order for number / duplicate
 * 
 * @param {Object} data 
 * @returns {Object} 
 */
export const buildNotice = (res) => {
    const notice = {}
    const hasSuccess = res?.status
    notice.content = hasSuccess ? res.message : res.errorCode + " - " + res.message
    notice.severity = hasSuccess ? 'success' : "error"

    return notice
};

export const dispatchNotice = (notice, dispatch, addNotice, toBuild = true) => {
    dispatch(addNotice(toBuild ? buildNotice(notice) : notice))
}