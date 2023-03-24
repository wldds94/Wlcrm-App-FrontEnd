import { useMemo } from 'react'

// redux
import { useSelector } from 'react-redux'
// slices
import { getAllInvoices } from 'store/reducers/invoice'

// hooks
import useClients from './useClients';
import useCompany from './useCompany';
import useUsers from './useUsers';
import useCryptoJS from 'hooks/useCryptoJS';

// utils
import { getVatsGroup } from 'utils/app/invoice/invoice';

const useInvoicesData = () => {
    const cryptoJS = useCryptoJS()

    const invoices = useSelector(getAllInvoices)
    // filters - grouping
    const users = useUsers()
    const { clients } = useClients() // useSelector(selectAllClients)

    const companyOptions = useCompany()

    const data = useMemo(() => {
        return invoices?.map((item, index) => {
            // const aux = Object.assign({}, item)
            // aux.journals = journals?.filter(row => Number(row?.eventId) === Number(item?.id) )
            // aux.user = users?.find(row => Number(row?.ID) === Number(item?.userId) )
            // aux.client = clients?.find(row => Number(row?.id) === Number(item?.clientId) )
            // return aux
            return {
                // ...mapEventData(item, clients, users),
                ...item,
                // company
                company_full_name: cryptoJS.decrypt(item?.company_full_name),
                company_piva: cryptoJS.decrypt(item?.company_piva),
                company_cod_fisc: cryptoJS.decrypt(item?.company_cod_fisc),
                company_telephone: cryptoJS.decrypt(item?.company_telephone),
                company_email: cryptoJS.decrypt(item?.company_email),
                company_pec: cryptoJS.decrypt(item?.company_pec),
                company_address: cryptoJS.decrypt(item?.company_address),
                company_name: cryptoJS.decrypt(item?.company_name),
                // bank
                bank_name: cryptoJS.decrypt(item?.bank_name),
                bank_iban: cryptoJS.decrypt(item?.bank_iban),
                // client
                client_full_name: cryptoJS.decrypt(item?.client_full_name),
                client_piva: cryptoJS.decrypt(item?.client_piva),
                client_telephone: cryptoJS.decrypt(item?.client_telephone),
                client_email: cryptoJS.decrypt(item?.client_email),
                client_pec: cryptoJS.decrypt(item?.client_pec),
                client_address: cryptoJS.decrypt(item?.client_address),
                client: clients?.find(client => Number(client?.id) === Number(item?.clientId)),
                // services
                services: item?.services?.map(service => {
                    return {
                        ...service,
                        description: cryptoJS.decrypt(service?.description),
                    }
                }),
                // derivated
                vatsListSummary: getVatsGroup(item?.services, companyOptions?.iva_option),
            }
        })
    }, [invoices, users, clients])

    return {
        data: data,
        users: users,
        clients: clients,
    }
}

export default useInvoicesData