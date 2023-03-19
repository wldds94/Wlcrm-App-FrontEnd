/**
 * Sort an array by field
 */
export const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property != null) {
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }   
    }
}


export default function dynamicSortMultiple(/* arguments */) {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

/**
 * Sum a column of array or simply an array
 */
export const sumArray = (array, toFixed = true, prop = false, isCurrency = true) => {
    const res = array?.reduce((prev, next) => {
        // console.log(next);
        const nextValue = prop !== false ? next[prop] : next
        return Number(prev) + Number(nextValue)
    }, [0]) // .toFixed(2)
    // console.log(res);
    const fixed = toFixed === true ? res.toFixed(2) : res

    return fixed + (isCurrency ? "€" : "")
}