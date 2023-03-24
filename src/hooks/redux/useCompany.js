import React from 'react'

// react redux
import { useSelector } from 'react-redux';
// slices
import { getOptions } from 'store/reducers/options';
import { getUserFullAddress } from 'utils/app/user';

// crypto hook
import useCryptoJS from '../useCryptoJS'

const useCompany = () => {
    const cryptoJS = useCryptoJS()

    const company = useSelector(getOptions)
    const doctor_option = company?.doctor_option
    const first_name = cryptoJS.decrypt(doctor_option?.first_name) // doctor_option?.first_name ? cryptoJS.decrypt(doctor_option?.first_name) : ""
    const last_name = doctor_option?.last_name ? cryptoJS.decrypt(doctor_option?.last_name) : ""
    const wayAddress = doctor_option?.address ? cryptoJS.decrypt(doctor_option?.address) : ""
    const fullAddress = getUserFullAddress({
        ...doctor_option,
        address: wayAddress,
    })

    const banks = company?.doctor_banks_option

    const res = {
        ...company,
        doctor_option: {
            ...doctor_option,
            company_name: doctor_option?.company_name ? cryptoJS.decrypt(doctor_option?.company_name) : "",
            first_name: first_name,
            last_name: last_name,
            cod_fisc: doctor_option?.cod_fisc ? cryptoJS.decrypt(doctor_option?.cod_fisc) : "",
            piva: doctor_option?.piva ? cryptoJS.decrypt(doctor_option?.piva) : "",
            telephone: doctor_option?.telephone ? cryptoJS.decrypt(doctor_option?.telephone) : "",
            email: doctor_option?.email ? cryptoJS.decrypt(doctor_option?.email) : "",
            pec: doctor_option?.pec ? cryptoJS.decrypt(doctor_option?.pec) : "",
            address: wayAddress,
            name: first_name + " " + last_name, // meta?.first_name + " " + user?.meta?.last_name,
            fullAddress: fullAddress
        },
        doctor_banks_option: banks?.map((item) => {
            return {
                ...item,
                bank_name: cryptoJS.decrypt(item?.bank_name),
                bank_iban: cryptoJS.decrypt(item?.bank_iban),
            }
        })
    }

    return res
}

export default useCompany