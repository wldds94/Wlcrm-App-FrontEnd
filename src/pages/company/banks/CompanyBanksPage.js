import useCompany from 'hooks/redux/useCompany';
import React from 'react'
import { useSelector } from 'react-redux';

// react router dom
import { useOutletContext } from "react-router-dom";
import { getOptionsBanks } from 'store/reducers/options';
import BankTable from './common/BankTable';

const CompanyBanksPage = () => {
    // const [company] = useOutletContext();
    // const banks = useSelector(getOptionsBanks)
    const company = useCompany()
    
    return (
        <>
            <BankTable
                items={company?.doctor_banks_option}
            />
        </>
    )
}

export default CompanyBanksPage