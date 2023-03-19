import React, { useMemo, useState } from 'react';

import MaterialReactTable from 'material-react-table';

// material-ui
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Link,
    ListItemIcon,
    MenuItem,
    Typography,
    TextField,
    Avatar
} from '@mui/material';
// theme
import { createTheme, ThemeProvider, useTheme } from '@mui/material';

// assets
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import TtyIcon from '@mui/icons-material/Tty';
import BadgeIcon from '@mui/icons-material/Badge';
import { AccountCircle, Send, ContentCopy } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserAddOutlined, DeleteOutlined } from '@ant-design/icons'
// import { IconButton } from '../../../../node_modules/@mui/material/index';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Redux
import { useDispatch } from 'react-redux';
// slices
import { deleteBenchOption } from 'store/reducers/options';

// project import
import BankForm from './BankForm';

const BankTable = ({ items, ...others }) => {
    // const theme = useTheme();
    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState(false)

    const [editableBenchData, setEditableBenchData] = useState(null)

    // const tableTheme = useMemo(
    //     () =>
    //         createTheme({
    //             palette: {
    //                 // mode: theme.palette.mode, //let's use the same dark/light mode as the global theme
    //                 primary: theme.palette.primary, //swap in the secondary color as the primary for the table
    //                 // info: {
    //                 //     main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
    //                 // },
    //                 background: {
    //                     default: '#fff'
    //                     // theme.palette.mode === 'light'
    //                     //     ? '#fff' //random light yellow color for the background in light mode
    //                     //     : '#000', //pure black table in dark mode for fun
    //                 },
    //             },
    //             // typography: {
    //             //     button: {
    //             //         textTransform: 'none', //customize typography styles for all buttons in table by default
    //             //         fontSize: '1.2rem',
    //             //     },
    //             // },
    //             // components: {
    //             //     MuiTooltip: {
    //             //         styleOverrides: {
    //             //             tooltip: {
    //             //                 fontSize: '1.1rem', //override to make tooltip font size larger
    //             //             },
    //             //         },
    //             //     },
    //             //     MuiSwitch: {
    //             //         styleOverrides: {
    //             //             thumb: {
    //             //                 color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink
    //             //             },
    //             //         },
    //             //     },
    //             // },
    //         }),
    //     [theme],
    // );

    const columns = useMemo(() => [
        // {
        //     accessorKey: 'id', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        //     header: 'ID',
        //     id: 'id',
        //     size: 30,
        // },
        {
            accessorKey: 'bank_name', //accessorFn used to join multiple data into a single cell
            id: 'bank_name', //id is still required when using accessorFn instead of accessorKey
            header: 'Nome Banca', // {/* <HeaderTableCell title='Name' icon={<PermIdentityIcon fontSize="small" />} /> */},
            // size: 250,
        },
        {
            accessorKey: 'bank_iban', //accessorFn used to join multiple data into a single cell
            id: 'bank_iban', //id is still required when using accessorFn instead of accessorKey
            header: 'Iban', // {/* <HeaderTableCell title='Name' icon={<PermIdentityIcon fontSize="small" />} /> */},
            // size: 250,
        },
        {
            accessorKey: 'favourite', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Preferita',
            id: 'favourite',
            size: 30,
            Cell: ({ cell, row }) => (
                row.original?.favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />
            ),
        },
    ])

    const closeDialog = () => {
        setOpenDialog(false)
        setEditableBenchData(null)
    }

    let tableData = []
    Object.keys(items).map(key => tableData.push(items[key]))

    return (
        <>
            {/* <ThemeProvider theme={tableTheme}> */}
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    enableRowActions
                    enableColumnActions={false}
                    enableColumnFilters={false}
                    // enablePagination={false}
                    enableSorting={false}
                    renderRowActionMenuItems={({ closeMenu, row, table }) => [
                        <MenuItem
                            key={1}
                            onClick={async () => {
                                console.log(row.original.id);

                                let items = Object.assign({}, row.original)
                                items.favourite = Boolean(items.favourite) // console.log(items.favourite); console.log(items);

                                setEditableBenchData(items)
                                setOpenDialog(true)

                                closeMenu()
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <BorderColorIcon />
                            </ListItemIcon>
                            Modifica
                        </MenuItem>,
                        <MenuItem
                            key={2}
                            onClick={async () => {
                                console.log(row.original.id);
                                const deleteRes = await dispatch(deleteBenchOption({ bankID: row.original.id }))
                                // console.log(deleteRes);
                                closeMenu()
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            Cestina
                        </MenuItem>
                    ]}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    onClick={() => setOpenDialog(true)}
                                    startIcon={<AccountBalanceWalletIcon />}
                                    variant="contained"
                                >
                                    <span className='mobile-hidden'>Aggiungi Banca</span>
                                </Button>
                            </div>
                        )
                    }}
                    muiTablePaperProps={{
                        elevation: 0, //change the mui box shadow
                    }}
                />
            {/* </ThemeProvider> */}

            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                fullWidth={true}
                maxWidth='md'
                // TransitionProps={{ onEntering: handleEntering }}
                open={openDialog}
            // {...other}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', /* borderBottom: '1px solid #e6ebf1' */ }}>
                    <DialogTitle variant="h4">Banca</DialogTitle>
                    <DialogTitle variant="h4">
                        <Button
                            onClick={closeDialog/* () => setOpenDialog(false) */}
                            startIcon={<DeleteOutlined />}
                            variant="outlined"
                        ><span className='mobile-hidden'>Scarta</span></Button>
                    </DialogTitle>
                </Box>
                <DialogContent dividers>
                    <BankForm formData={editableBenchData} afterSubmitCallback={() => setEditableBenchData(null)} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BankTable