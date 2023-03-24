import { InvoicesListIcon, UsersMultiIcon } from 'assets/font-icons/icons'
import React from 'react'
import { getRandomColor } from 'utils/color'
import { Grid, Stack } from '../../../../node_modules/@mui/material/index'
import LinkCard from './LinkCard'

// assets
import { ImStatsDots } from 'react-icons/im';
import EventIcon from '@mui/icons-material/Event';

const UsefullLinks = () => {
    const links = [
        {
            to: "/schedule",
            label: "Agenda",
            color: getRandomColor("Calendario"),
            icon: EventIcon,
        },
        {
            to: "/invoices/list",
            label: "Fatture",
            color: getRandomColor("Fatturazione"),
            icon: InvoicesListIcon,
        },
        {
            to: "/clients/view",
            label: "Rubrica",
            color: getRandomColor("Rubrica"),
            icon: UsersMultiIcon,
        },
        {
            to: "/management",
            label: "Management",
            color: getRandomColor("Scrivania"),
            icon: ImStatsDots,
        },
    ]
    
    return (
        <>
            {/* <Stack gap={2} direction="row" sx={{ flexWrap: 'wrap', }} > */}
            <Grid container spacing={1} >
                {links?.map((item, index) => {
                    return (
                        <Grid item xs={6} sm={3} key={index} >
                            <LinkCard  item={item} />
                        </Grid>
                    )
                })}
            </Grid>

            {/* </Stack> */}
        </>
    )
}

export default UsefullLinks