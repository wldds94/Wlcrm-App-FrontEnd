import React from 'react'

import InvoiceTitle from '../../../../invoices/common/InvoiceTitle';
import SubTabHeader from 'components/page-tab/header/SubTabHeader';

const ClientsInvoiceSubTabHeader = ({
    item = null,
    client = null,
    actions = [],
    OffActions = () => (<></>),
    ...other
}) => {
    console.log(item);
    const TitleComponent = () => <InvoiceTitle item={item} />
    return (
        <>
            <SubTabHeader
                item={item}
                TitleComponent={TitleComponent}
                actions={actions}
                OffActions={OffActions}
            />
            {/* <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: '100%',
                height: '50px',
                background: 'white',
                zIndex: 3,
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 20%)',
                display: 'flex',
                alignItems: "center",
            }}>
                <Stack direction="row" justifyContent="space-between" sx={{ pl: 3, pr: 2, width: "100%", }} >
                    <InvoiceTitle item={item} />
                    <Stack direction="row" >
                        <OffActions />
                        {actions?.map((action, index) => {
                            return (
                                <Box key={index} sx={{ display: 'flex', }}>
                                    <IconButton onClick={() => action?.onClick()}
                                        sx={{ fontSize: item?.fontSize ? item.fontSize : '1.3rem !important', }} >
                                        {action?.icon}
                                    </IconButton>
                                </Box>
                            )
                        })}
                    </Stack>
                </Stack>
            </div> */}
        </>
    )
}

export default ClientsInvoiceSubTabHeader