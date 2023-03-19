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

// Store - redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteIvaOption, fetchOptions, getOptions, getOptionsIva, getOptionsStatus } from 'store/reducers/options';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserAddOutlined, DeleteOutlined } from '@ant-design/icons'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import IvaForm from './IvaForm';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const IvaTable = ({ vatData, ...others }) => {
    const dispatch = useDispatch();

    const vatList = useSelector(getOptionsIva)

    const [openDialog, setOpenDialog] = useState(false)

    const [editableIvaData, setEditableIvaData] = useState(null)

    const columns = useMemo(() => [
        // {
        //     accessorKey: 'id', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        //     header: 'ID',
        //     id: 'id',
        //     size: 30,
        // },
        {
            accessorKey: 'vat', //accessorFn used to join multiple data into a single cell
            id: 'vat', //id is still required when using accessorFn instead of accessorKey
            header: 'IVA (%)', // {/* <HeaderTableCell title='Name' icon={<PermIdentityIcon fontSize="small" />} /> */},
            size: 30,
        },
        {
            accessorKey: 'vat_description', //accessorFn used to join multiple data into a single cell
            id: 'vat_description', //id is still required when using accessorFn instead of accessorKey
            header: 'Descrizione', // {/* <HeaderTableCell title='Name' icon={<PermIdentityIcon fontSize="small" />} /> */},
        },
        {
            accessorKey: 'vat_code', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Code',
            id: 'vat_code',
            size: 30,
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
        {
            accessorKey: 'vat_status', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            id: 'vat_status',
            header: 'Stato',
            size: 30,
        },
    ])

    const closeDialog = () => {
        setOpenDialog(false)
        setEditableIvaData(null)
    }

    return (
        <>
            {vatList != undefined &&
                <MaterialReactTable
                    columns={columns}
                    data={vatList}
                    enableRowActions
                    renderRowActionMenuItems={({ closeMenu, row, table }) => [
                        <MenuItem
                            key={1}
                            onClick={async () => {
                                let vatData = Object.assign({}, row.original)

                                setEditableIvaData(vatData)
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

                                const deleteRes = await dispatch(deleteIvaOption({ vatID: row.original.id }))

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
                                    startIcon={<AccountBalanceIcon />}
                                    variant="contained"
                                >
                                    <span className='mobile-hidden'>Crea IVA</span>
                                </Button>
                            </div>
                        )
                    }}
                    muiTablePaperProps={{
                        elevation: 0, //change the mui box shadow
                        //customize paper styles
                        // sx: {
                        //     borderRadius: '0',
                        //     border: '0',
                        // },
                    }}
                />}
            {vatList == undefined && <div>Loading...</div>}

            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%' } }}
                fullWidth={true}
                maxWidth='md'
                open={openDialog}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', /* borderBottom: '1px solid #e6ebf1' */ }}>
                    <DialogTitle variant="h4">Imposte</DialogTitle>
                    <DialogTitle variant="h4">
                        <Button
                            onClick={closeDialog}
                            startIcon={<DeleteOutlined />}
                            variant="outlined"
                        ><span className='mobile-hidden'>Scarta</span></Button>
                    </DialogTitle>
                </Box>
                <DialogContent dividers>
                    <IvaForm formData={editableIvaData} afterSubmitCallback={() => setEditableIvaData(null)} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default IvaTable