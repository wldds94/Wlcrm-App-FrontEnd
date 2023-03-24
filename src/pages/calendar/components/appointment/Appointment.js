import React from 'react'
// material ui
import { styled } from '@mui/material/styles';
import {
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

// assets
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'
import {TiCancel} from 'react-icons/ti'

// Color Example
const Appointment = React.memo(({
    children, style, ...restProps
}) => {
    // console.log(restProps?.data);
    // console.log(restProps);
    // console.log(style);
    return (
        <Appointments.Appointment
            {...restProps}
            // draggable={true}
            style={{
                ...style,
                // backgroundColor: '#FFC107',
                borderRadius: '8px',
                maxWidth: '92%',
            }}
        >
            {children}
        </Appointments.Appointment>
    )
})

export default Appointment

// CONTENT
export const AppointmentContent = React.memo(({
    children, style, ...restProps
}) => {
    // console.log(restProps, children); console.log(restProps?.children);
    return (
        <Appointments.AppointmentContent
            {...restProps}
            sx={{
                ['&:hover']: {
                    background: restProps?.resources[1]?.color ? restProps?.resources[0]?.color : "inherit",
                    height: "80px",
                }
            }}
        >
            <div className="VerticalAppointment-container"
            // style={{ back}}
            >
                {Boolean(restProps?.data?.status !== "active") && <div className="VerticalAppointment-time" 
                    style={{ 
                        position: 'absolute',
                        top: '.2rem',
                        right: '.5rem',
                        background: restProps?.resources[1]?.color ? restProps?.resources[0]?.color : "inherit", 
                        height: '20px',
                        width: '20px',
                        textAlign: 'center',
                        borderRadius: '50%',
                        lineHeight: restProps?.data?.status === "deleted" ? 2 : 'unset',
                    }}>
                    {Boolean(restProps?.data?.status === "confirmed") && <FaThumbsUp sx={{ fontSize: "1.15rem" }} />}
                    {Boolean(restProps?.data?.status === "deleted") && <TiCancel style={{ fontSize: "1.2rem" }} />}
                </div>}
                {/* <div className="VerticalAppointment-time" 
                    style={{ 
                        position: 'absolute',
                        top: '.2rem',
                        right: '.5rem',
                        background: restProps?.resources[1]?.color ? restProps?.resources[0]?.color : "inherit", 
                        height: '20px',
                        width: '20px',
                        textAlign: 'center',
                        borderRadius: '50%',
                    }}>
                    
                </div> */}
                <div className="VerticalAppointment-title" style={{ textDecoration: restProps?.data?.status === "deleted" ? 'line-through' : 'none' }}>{restProps?.data?.title}</div>
                <div style={{ lineHeight: 1, textDecoration: restProps?.data?.status === "deleted" ? 'line-through' : 'none' }} >{restProps?.resources[1]?.text}</div>
                <div className="VerticalAppointment-textContainer VerticalAppointment-middleContainer"
                    style={{
                        // position: 'absolute',
                        // bottom: '.2rem',
                        // right: '.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '0.1rem',
                        marginTop: "5px",
                    }}>
                    {/* <div className="VerticalAppointment-time" style={{ marginRight: '1rem' }}>
                        {Boolean(restProps?.data?.confirmation) && <CheckCircleOutlineIcon sx={{ fontSize: "1.15rem" }} />}
                    </div> */}
                    <div className="VerticalAppointment-time" style={{ marginRight: '2px', }}>
                        <AccessAlarmsIcon sx={{ fontSize: "1.15rem" }} />
                    </div>
                    {/* <div className="VerticalAppointment-time">{restProps?.data?.startDate?.substring(11, 16)}</div>
                    <div className="VerticalAppointment-time">-</div>
                    <div className="VerticalAppointment-time">{restProps?.data?.endDate?.substring(11, 16)}</div> */}
                    <div className="VerticalAppointment-time" style={{ textDecoration: restProps?.data?.status === "deleted" ? 'line-through' : 'none' }} >{restProps?.data?.startDate?.substring(11, 16)} - {restProps?.data?.endDate?.substring(11, 16)}</div>
                </div>
            </div>
            {/* <div>
                <div><strong>{restProps?.data?.client_name}</strong></div>
                <div>{restProps?.data?.startDate}<span> - </span>{restProps?.data?.endDate}</div>
                <div>{restProps?.data?.startDate}<span> - </span>{restProps?.data?.endDate}</div>
            </div> */}
        </Appointments.AppointmentContent>
    )
})

// CONTAINER
const StyledAppointmentContainer = styled(Appointments.Container)(({ theme }) => ({
    ['&:hover']: {
        height: '80px !important',
        zIndex: 10, // left: '0 !important', // backgroundColor: '#1890ff', // width: "100% !important", // maxWidth: "350px",
    },
    ['&:focus']: {
        height: '80px !important',
        zIndex: 10, // left: '0 !important', // backgroundColor: '#1890ff', // width: "100% !important", // maxWidth: "350px",
    },
}));

export const AppointmentContainer = React.memo(({
    style, children, ...restProps
}) => {
    // console.log(restProps);
    // console.log(children); console.log(style);
    return (
        <StyledAppointmentContainer
            {...restProps}
            style={{
                ...style,
                minHeight: style.height + " !important",
            }}
        >
            {children}
        </StyledAppointmentContainer>
    )
})