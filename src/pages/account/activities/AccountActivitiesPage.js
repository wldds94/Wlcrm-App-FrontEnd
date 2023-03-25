import React, { useEffect, useState } from 'react'

// material-ui
import {
    Box,
    Stack,
    Typography
} from '@mui/material';

// project import
import SimpleHeaderDivider from 'components/typography/SimpleHeaderDivider'

// hooks
import useCurrentAccount from 'hooks/redux/aggregate/useCurrentAccount';
import { isDeepEqual } from 'utils/equal';
import ActivityCard from './components/ActivityCard';
import ListsItems from 'components/list-view/ListsItems';

const AccountActivitiesPage = () => {
    const {currentAccount: account} = useCurrentAccount()

    const [activities, setActivities] = useState(account?.activities)
    useEffect(() => {
        if (account?.activities && !isDeepEqual(account?.activities, activities)) {
            setActivities(account?.activities)
        }
    }, [account])

    return (
        <>
            <Stack>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    {/* <EditableButton
                        editable={isEditable}
                        onClick={(val) => setIsEditable(val)}
                    /> */}
                </div>
                {/* <SimpleHeaderDivider title="Le tue postazioni" /> */}
                <Box
                    // sx={{  p: 2, }}
                >
                    <Stack gap={1} >
                    <ListsItems
                        items={activities}
                        ContentCard={(props) => <ActivityCard {...props} />}
                        sortSelected="-data"
                    />
                        {/* {activities?.map((item, index) => {
                            return (
                                <ActivityCard
                                    key={index}
                                    data={item}
                                />
                            )
                        })} */}
                    </Stack>
                </Box>
            </Stack>
        </>
    )
}

export default AccountActivitiesPage