import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Title from '../Layout/Title';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';


const AxiosInstance = require("../utils/request").default;

const useStyles = makeStyles({
  stack: {
    marginTop: 40,
  },
  TextField: {
    marginBottom: '3%'
  },
  box: {
    flexGrow: 1,
    overflowX: 'hidden',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    background: 'white',
    border: '2px solid #000',
    paddingTop: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
    '& .MuiTextField-root': { m: 1, width: '25ch' }

  }
});

const ModalFamily = ({ periodoSeleccionado, setPeriodoSeleccionado, listadoPeriodo, selectedFamily, setSelectedFamily, openModal, setOpenModal, families }) => {

  const classes = useStyles();

  React.useEffect(() => {
    if (selectedFamily !== null && periodoSeleccionado !== null) {
      setOpenModal(false)
    }
  }, [selectedFamily])

  React.useEffect(() => {
    if (selectedFamily !== null && periodoSeleccionado !== null) {
      setOpenModal(false)
    }
  }, [periodoSeleccionado])

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" className={classes.box} >
        <Title>Seleccionar </Title>

        <Stack direction="row" spacing={2} justifyContent="space-between" className={classes.TextField}>
          <Autocomplete
            options={families}
            renderInput={(params) => (
              <TextField {...params} label="Familia" variant="standard"
              />
            )}
            getOptionLabel={(option) => option.families.famName}
            onChange={(event, newValue) => {
              console.log('esta es la familia Seleccionada', newValue)
              setSelectedFamily(newValue) }}
            required
            noOptionsText={'Sin Opciones'}
            sx={{ width: '80%' }}
            id="clear-on-escape"
          />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" className={classes.TextField}>

          <Autocomplete
            options={listadoPeriodo}
            renderInput={(params) => (
              <TextField {...params} label="Periodo" variant="standard"
              />
            )}
            getOptionLabel={(option) => `${option.perStartYear}-${option.perEndYear}`}
            onChange={(event, newValue) => { setPeriodoSeleccionado(newValue) }}
            required
            noOptionsText={'Sin Opciones'}
            sx={{ width: '80%' }}
            id="clear-on-escape"
          />
        </Stack>
      </Box>
    </Modal>
  )
}

export default ModalFamily