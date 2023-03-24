import dynamicSortMultiple from "utils/array";

/**
 * Find Max in order for number / duplicate
 * 
 * @param {Array} data 
 * @returns {Object} 
 */
export const getInvoicesMax = (data) => {
    let res = undefined
    if (Array.isArray(data)) {
        res = data.slice().sort(dynamicSortMultiple('-number', '-duplicate'))[0] // ?.number        
    }
    return res ? res : undefined // return state.invoice.invoices.slice().sort((a, b) => (a.number > b.number) ? 1 : -1) // state.invoice.invoices.dynamicSort('number')[0]?.number
};

export const getVatsGroup = (services, vatsList) => {
    let groups = services.reduce((groups, item) => {
        const group = (groups[item.vat_code] || []);
        group.push(item);
        groups[item.vat_code] = group;
        return groups;
    }, {});

    Object.keys(groups).map((group, groupIndex) => {
        // console.log(groups[group]); console.log(groupIndex); console.log(group);

        const subtotal = groups[group].reduce((prev, next) => {
            return prev + next?.subtotal
        }, 0)
        // console.log(subtotal); console.log(vatsList); console.log(group);
        const vatAux = vatsList.filter((vat, index) => {
            // console.log(vat);
            return vat.vat_code == group
        })
        const vatFinded = vatAux.length ? vatAux[0] : undefined
        // console.log(vatFinded);

        groups[group].vat_description = vatFinded ? vatFinded?.vat_description : ""
        groups[group].vat_code = vatFinded ? vatFinded?.vat_code : ""
        groups[group].vat = vatFinded ? vatFinded?.vat : 0
        groups[group].tax = vatFinded ? subtotal * (vatFinded?.vat / 100) : 0
        groups[group].subtotal = vatFinded ? subtotal : 0
    })

    return groups;
}
