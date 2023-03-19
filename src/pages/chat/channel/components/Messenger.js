import { /* useContext,  */useEffect, useRef, useState } from "react";
// // style
// import './style/messenger.scss'

// material-ui
import {
    Box,
    Grid,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
// styled
import { useTheme, styled } from '@mui/material/styles';

// project import
import Message from "pages/chat/components/message/Message";
import ChannelHeader from "pages/chat/components/messenger/ChannelHeader";
import ChatFormWrapper from "pages/chat/components/messenger/ChatFormWrapper";
import { isDeepEqual } from "utils/equal";

const Messenger = ({
    items,
    account,
    channelID,
    users = [],
    ...other
}) => {
    // theme
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const scrollRef = useRef(null);
    const containerRef = useRef(null);

    const [messages, setMessages] = useState(items)
    useEffect(() => {
        if (!isDeepEqual(items, messages)) {
            setMessages(items)
        }
    }, [items]);

    const scrollToBottom = (behavior = "auto") => {
        scrollRef.current?.scrollIntoView({ behavior: behavior/* "smooth" */, block: "end", inline: "nearest" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <>
            <Grid container sx={{ /* height: '100%' *//* , background: "red"  */ }} /* spacing={2} */ >
                {/* CHAT */}
                <Grid item xs={12} style={{ /* height: '100%' *//* , background: "yellow" */ }} >

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column', // p: 1, // bgcolor: 'background.paper',
                            // height: '100%',
                            // overflow: "hidden",
                        }}
                    >
                        <ChannelHeader channelID={channelID} users={users} />

                        <Box sx={{ height: matchDownSM ? '100%' : 'calc(100vh - 110px)'/* , background: 'red' */ }}>
                            {/* LIST MESSAGES */}
                            {/* <Box sx={{ height: 'calc(100vh - (110px + 120px))', overflow: 'auto' }}> */}
                            <Box sx={{
                                height: matchDownSM ? 'calc(100vh - (110px + 170px))' : 'calc(100vh - (110px + 120px))',
                                overflow: 'auto'/* , background: 'yellow' */
                            }}>
                                <Box
                                    ref={containerRef}
                                    sx={{
                                        flex: 5,
                                        minHeight: "100%",
                                        // overflow: 'auto', // overflowY: "auto",
                                        backgroundColor: "#f5f5f5",
                                    }}
                                >
                                    {messages?.map((m, index) => (
                                        <div
                                            key={index}
                                            ref={scrollRef}
                                            style={{ padding: '12px', /* borderBottom: Number(messages.length - 1 - index) % rowsPerPage === 0 ? "1px solid #dfdfdf" : "" */ }} >
                                            <Message key={index}
                                                message={m}
                                                own={Number(m?.user_id) === Number(account?.ID)}
                                                user={users?.find(item => Number(item?.ID) === Number(m?.user_id))} 
                                            />
                                        </div>
                                    ))}
                                </Box>
                            </Box>

                            {/* CHAT BOTTOM */}
                            <ChatFormWrapper />
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Messenger