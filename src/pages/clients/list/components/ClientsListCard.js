import React, { useEffect, useState } from 'react'

// mui material
import { Box, Stack, Typography } from '@mui/material'
import { Checkbox } from '@mui/material'

// react redux
import { useDispatch } from 'react-redux'
//slices
import { activeClient, deleteClient, trashClient } from 'store/reducers/client'
import { addNotice } from 'store/reducers/notices'

// project import
import AccordionCard from 'components/card/list/AccordionCard'
import PulsingDot from 'components/@extended/pulsing-dot/PulsingDot'
import ActionsCard from 'components/card/list/actions/ActionsCard'
import DeleteButton from 'components/button/DeleteButton'

// icons
import { EditIcon, OpenFolderIcon, RestoreIcon, RestoreItemIcon } from 'assets/font-icons/icons'
import {BsFillTelephoneOutboundFill} from 'react-icons/bs'

// utils
import { dispatchNotice } from 'utils/app/notice'
import { isDeepEqual } from 'utils/equal'

const ClientsListCard = ({
    item = null,
    // off = false,
    // isInTrash
    ...other
}) => {
    // console.log(item);
    const dispatch = useDispatch()


    const [currentItem, setCurrentItem] = useState(item)
    useEffect(() => {
        if (!isDeepEqual(item, currentItem)) {
            setCurrentItem(item)
        }
    }, [item])

    const [isCheckable, setIsCheckable] = useState(false)

    // const [isSavingChange, setIsSavingChange] = useState(false)

    // /**
    //  * NOTICES
    //  */
    // const saveNotice = (result) => {
    //     const notice = buildNotice(result)
    //     dispatch(addNotice(notice))
    // }

    /**
     * ACTIONS HANDLE
     */
    // SUBMIT ACTIVE STATUS
    const handleActive = async () => {
        // setIsSavingChange(true)
        try {
            console.log('Try to active...');
            const resultAction = await dispatch(activeClient({ clientID: currentItem?.id })).unwrap()

            // const notice = buildNotice(resultAction)
            // dispatch(addNotice(notice))
            // saveNotice(resultAction)
            dispatchNotice(resultAction, dispatch, addNotice)

            // if (deleteRes?.status) {
            //     setIsSavingChange(false)
            // }
            return resultAction
            // const deleteRes = await dispatch(deleteInvoice({ invoiceID: item?.id }))
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // SUBMIT DELETE PERMANET
    const handleDeletePermanet = async () => {
        try {
            console.log('Try to delete...');
            const deleteRes = await dispatch(deleteClient({ clientID: currentItem?.id })).unwrap()

            // saveNotice(deleteRes)
            dispatchNotice(deleteRes, dispatch, addNotice)

            // if (deleteRes?.status) {
            //     setIsSavingChange(false)
            // }
            return deleteRes
            // const deleteRes = await dispatch(deleteInvoice({ invoiceID: item?.id }))
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // SUBMIT TRASH
    const handleMoveToTrash = async () => {
        // setIsSavingChange(true)
        try {
            console.log('Try to delete...');
            const trashRes = await dispatch(trashClient({ clientID: currentItem?.id })).unwrap()

            // saveNotice(trashRes)
            dispatchNotice(trashRes, dispatch, addNotice)
            // if (deleteRes?.status) {
            //     setIsSavingChange(false)
            // }
            return trashRes
            // const deleteRes = await dispatch(deleteInvoice({ invoiceID: item?.id }))
        } catch (error) {
            console.log(error);
            return false
        }
    }

    const ContentSummary = () => {
        return (
            <>

                <Stack>
                    <Stack direction="row" gap={2} /* justifyContent="space-between" */ >
                        <Typography variant="h5">{currentItem?.name?.toUpperCase()}</Typography>
                        <Box sx={{ mr: 1 }} >
                            <PulsingDot status={currentItem?.status} />
                            {/* <Dot color="success" /> */}
                        </Box>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">{currentItem?.piva?.toUpperCase()}</Typography>
                    <Stack gap={.8} sx={{ mt: 1 }} >
                        <Typography variant="body" sx={{ fontWeight: '600', color: '#5f6168' }} >{currentItem?.address}</Typography>
                        <Stack /* direction="row" gap={} justifyContent="space-between" */ >
                            <Typography variant="body2" color="text.secondary">{currentItem?.email}</Typography>
                            <Typography variant="body2" color="text.secondary">{currentItem?.telephone}</Typography>
                        </Stack>
                    </Stack>
                </Stack>

            </>
        )
    }

    const actionsTrashItems = [
        {
            icon: <RestoreItemIcon color="#1890ff" />,
            onClick: () => handleActive()
            // withLink: "/clients/profile/" + item?.chiperId + "/edit"
        },
    ]

    const actionsItems = [
        {
            icon: <BsFillTelephoneOutboundFill size={15} />,
            withLink: "tel:" + currentItem?.telephone, //  + "/view"
            color: "primary",
        },
        {
            icon: <OpenFolderIcon />,
            withLink: "/clients/profile/" + currentItem?.chiperId //  + "/view"
        },
        {
            icon: <EditIcon />,
            withLink: "/clients/profile/" + currentItem?.chiperId + "/view"
        },
    ]
    const ContentDetails = () => {
        return (
            <>
            {!isCheckable && <>
                {item?.status !== 'trash' ?
                    <ActionsCard
                        items={actionsItems}
                    >
                        <DeleteButton
                            label=""
                            color=""
                            onConfirm={() => handleMoveToTrash()}
                        />
                    </ActionsCard> :
                    <ActionsCard
                        items={actionsTrashItems}
                    >
                        <DeleteButton
                            label=""
                            color=""
                            onConfirm={() => handleDeletePermanet()}
                            confirmDialogTitle="Sei sicuro di voler confermare l'operazione? Questa cancellazione è permanente."
                        />
                    </ActionsCard>}</>}
            </>
        )
    }

    return (
        <>
            {isCheckable
                ? <>
                    <Checkbox
                        sx={{
                            width: '100%',
                            borderRadius: 0,
                            padding: 0,
                            // '& span': {},
                            '&>div': {
                                width: '100%',
                            },
                        }}
                        icon={<AccordionCard
                            withHoverBackground={false}
                            item={currentItem}
                            ContentSummary={() => <ContentSummary />}
                            ContentDetails={() => <ContentDetails />}
                        // isSavingChange={isSavingChange}
                        />}
                        checkedIcon={<Box sx={{ position: 'relative',}}>
                            <AccordionCard
                            withHoverBackground={false}
                            item={currentItem}
                            ContentSummary={() => <ContentSummary />}
                            ContentDetails={() => <ContentDetails />}
                        // isSavingChange={isSavingChange}
                        />
                        <Box sx={{ position: 'absolute', width: '100%', background: '#1890ff', top: 0, bottom: 0, opacity: .5, }}></Box>
                        </Box>}
                    />
                </>
                : <>
                    <AccordionCard
                        item={currentItem}
                        // ContentSummary={() => <ContentSummaryWrapper />}
                        ContentSummary={() => <ContentSummary />}
                        ContentDetails={() => <ContentDetails />}
                    // isSavingChange={isSavingChange}
                    />
                </>}


            {/* test */}
        </>
    )
}

export default ClientsListCard