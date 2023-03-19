import React from 'react'

// material-ui
import {
    AvatarGroup,
    Stack,
    Typography
} from '@mui/material';

// project import
import SimpleHeaderBoxed from 'components/typography/SimpleHeaderBoxed';
import { BackgroundLetterAvatars } from 'components/avatar/CustomAvatar';

const ChannelHeader = ({
    channelID = 0,
    users = [],
    ...other
}) => {

    console.log(channelID);
    console.log(users);

    const user = users?.find(item => Number(item?.ID) === Number(channelID))

    const TitleComponent = () => {
        return (
            <>
                <Stack direction="row" gap={1.5} alignItems="center">
                    {channelID > 0 ? <>
                        <BackgroundLetterAvatars
                            name={user?.display_name}
                        />
                        <Typography variant="h6b">{user?.display_name}</Typography>
                    </> : <>
                        <AvatarGroup max={3} total={users?.length}
                            sx={{
                                '& > .MuiAvatar-root': {
                                    width: '24px',
                                    height: '24px',
                                    fontSize: '.8rem',
                                }
                            }}
                        >
                            {users?.map((item, index) => (
                                <BackgroundLetterAvatars
                                    key={index}
                                    name={item?.display_name}
                                />
                            ))}
                        </AvatarGroup>
                        <Typography variant="h6b">#STUDIO</Typography>
                    </>}
                </Stack>

            </>
        )
    }

    return (
        <>
            {/* CHAT TOP */}
            <SimpleHeaderBoxed
                // title={'Live Chat'}
                hasGreyBackground={false}
                TitleComponent={TitleComponent}
            />
            {/* <Box sx={{
                height: "50px",
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                borderBottom: "1px solid #d9d9d9",
                boxShadow: '0px 2px 9px 0px #b9b8b8',
                zIndex: 1,
            }} >
                <Stack direction="row" justifyContent="space-between" >
                    <Typography variant="h6b" >Live Chat</Typography>
                </Stack>
            </Box> */}
        </>
    )
}

export default ChannelHeader