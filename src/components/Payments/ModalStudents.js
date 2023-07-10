import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Title from '../Layout/Title';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


const useStyles = makeStyles({
    stack: {
        marginTop: 40,
    },
    TextField: {
        // marginBottom: '3%',
        marginTop: '2%',
        marginLeft: '3%'
    },
    box: {
        // minHeight:'30%',
        flexGrow: 1,
        overflowX: 'hidden',
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        background: 'white',
        border: '2px solid #000',
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        // '& .MuiTextField-root': { m: 1, width: '25ch' }

    }
});

const ModalStudents = ({ periodoSeleccionado, listadoPeriodo, setPeriodoSeleccionado, setEstudianteSeleccionado, studentData, openModalEstudents, setOpenModalEstudents }) => {
    const classes = useStyles();

    const [seleccion, setSeleccion] = React.useState()
  return (
      <Modal
          open={openModalEstudents}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box className={classes.box} >
              <Title>Coincidencias encontradas</Title>
              {/* <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
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
                      sx={{ width: '20%' }}
                      id="clear-on-escape"
                  />
              </Stack> */}
              
              <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField} >
                  <Autocomplete
                      options={studentData}
                      renderInput={(params) => (
                          <TextField {...params} variant="standard" label="Seleccionar Estudiante" />
                      )}
                      value={seleccion ? seleccion : null}
                      getOptionLabel={(option) => option.detalleCompleto}
                      onChange={(event, newValue) => {
                          setSeleccion(newValue)
                      }}
                      required
                      noOptionsText={'Sin Opciones'}
                      sx={{ width: '100%' }}
                      id="clear-on-escape"
                  />
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="center" className={classes.TextField}>
                  <Button variant="outlined" onClick={() => setOpenModalEstudents(false)} color="error">Cancelar</Button>
                  <Button variant="outlined" disabled={seleccion && periodoSeleccionado ? false : true} onClick={() => setEstudianteSeleccionado(seleccion)}  >Confirmar</Button>

              </Stack>
          </Box>
      </Modal>
  )
}

export default ModalStudents