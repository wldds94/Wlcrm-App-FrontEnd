export const findIndexPage = (page, pages) => {
    // const index = pages?.findIndex(element => {
    //     const useBaseRoute = element?.useBaseRoute ? element?.useBaseRoute : false
    //     const res = useBaseRoute
    //         ? (String(element.value) === String(page)
    //             || Number(element.value) === Number(page))
    //         : element.base.substring(1) === page
    // })
    // // OLD
    const index = pages?.findIndex(element => (
        String(element.value) === String(page)
                || Number(element.value) === Number(page))
        // element.value?.length > 0
        //     ? (String(element.value) === String(page)
        //         || Number(element.value) === Number(page))
        //     : element.base.substring(1) === page
        // )
    )
    return index >= 0 ? index : false
}

export const findPageByDefault = (index, pages, defaultPage = {}) => {
    // const page = pages?.find(element => element.key === index)
    const page = pages?.find(element => (String(element.key) === String(index) || Number(element.key) === Number(index)))
    return page ? page : (pages?.length ? pages[0] : defaultPage)
}

export const findIndexPageByLocationPop = (location, pages) => {
    const splitted = location.split('/')
    // console.log(splitted);
    let index = 0
    while (splitted.length > 0) {
        const pop = splitted.pop()
        index = findIndexPage(pop, pages)
        if (index !== false) {
            break
        }
    }

    return index
    // const index = pages?.findIndex(element => element.value === page)
    // return index >= 0 ? index : 0
}