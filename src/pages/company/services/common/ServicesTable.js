import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialReactTable from 'material-react-table';

// material-ui
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  MenuItem,
} from '@mui/material';

// projet import
import ServicesForm from './ServicesForm';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserAddOutlined, DeleteOutlined } from '@ant-design/icons'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import PublicIcon from '@mui/icons-material/Public';

// Store
import { deleteServiceOption, getOptionsServices } from 'store/reducers/options';

const ServicesTable = () => {
  const dispatch = useDispatch();

  const servicesList = useSelector(getOptionsServices)

  const [openDialog, setOpenDialog] = useState(false)

  const [editableServiceData, setEditableServiceData] = useState(null)


  const columns = useMemo(() => [
    // {
    //     accessorKey: 'id', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
    //     header: 'ID',
    //     id: 'id',
    //     size: 30,
    // },
    {
      accessorKey: 'description', //accessorFn used to join multiple data into a single cell
      id: 'description', //id is still required when using accessorFn instead of accessorKey
      header: 'Descrizione', // {/* <HeaderTableCell title='Name' icon={<PermIdentityIcon fontSize="small" />} /> */},
      // size: 250,
    },
    {
      accessorKey: 'price', //accessorFn used to join multiple data into a single cell
      id: 'price', //id is still required when using accessorFn instead of accessorKey
      header: 'Prezzo di default', // {/* <HeaderTableCell title='Name' icon={<PermIdentityIcon fontSize="small" />} /> */},
      // size: 250,
      Cell: ({ cell, row }) => (
        row.original?.price == null || row.original?.price == 0 ? "0.00€" : row.original?.price + "€"
      )
    },
    {
      accessorKey: 'status', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
      id: 'status',
      header: 'Stato',
      size: 30,
      Cell: ({ cell, row }) => (
        row.original?.status == 'active' ? <PublicIcon /> : <ContentPasteOffIcon />
      ),
    },
  ])

  const closeDialog = () => {
    setOpenDialog(false)
    setEditableServiceData(null)
  }

  return (
    <>
      {servicesList != undefined && <MaterialReactTable
        columns={columns}
        data={servicesList}
        enableRowActions
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          <MenuItem
            key={1}
            onClick={async () => {
              console.log(row);
              console.log(row.original.id);
              // const services = servicesList.filter(serviceRow => serviceRow.id === row.original.id)

              let serviceData = Object.assign({}, row.original) // Object.assign({}, services[0])
              serviceData.price = serviceData.price == null || serviceData?.price == 0 ? "" : Number(serviceData.price) //  : "" // console.log(bankData.favourite); console.log(bankData);

              setEditableServiceData(serviceData)
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
              const deleteRes = await dispatch(deleteServiceOption({ serviceID: row.original.id }))
              // console.log(deleteRes);
              closeMenu()
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            Cestina
          </MenuItem>,
        ]}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                onClick={() => setOpenDialog(true)}
                startIcon={<MedicalServicesIcon />}
                variant="contained"
              >
                <span className='mobile-hidden'>Crea Servizio</span>
              </Button>
            </div>
          )
        }}
        muiTablePaperProps={{
          elevation: 0, //change the mui box shadow
        }}
      />}
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        fullWidth={true}
        maxWidth='md'
        // TransitionProps={{ onEntering: handleEntering }}
        open={openDialog}
      // {...other}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', /* borderBottom: '1px solid #e6ebf1' */ }}>
          <DialogTitle variant="h4">Servizio</DialogTitle>
          <DialogTitle variant="h4">
            <Button
              onClick={closeDialog /* () => setOpenDialog(false) */}
              startIcon={<DeleteOutlined />}
              variant="outlined"
            ><span className='mobile-hidden'>Scarta</span></Button>
          </DialogTitle>
        </Box>
        <DialogContent dividers>
          <ServicesForm formData={editableServiceData} afterSubmitCallback={() => setEditableServiceData(null)} />
        </DialogContent>
      </Dialog>
      {servicesList == undefined && <div>Loading...</div>}
    </>
  )
}

export default ServicesTable