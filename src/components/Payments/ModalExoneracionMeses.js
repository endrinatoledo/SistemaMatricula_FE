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
import Typography from '@mui/material/Typography';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';

const AxiosInstance = require("../utils/request").default;

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
        minHeight:'30%',
        overflow: 'scroll',
        height: '50%',
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

const ModalExoneracionMeses = ({ limpiarFormularioFactura, mesesApagar, modalExoneracion, setModalExoneracion, datosPago}) => {
    const classes = useStyles();
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [circularProgress, setCircularProgress] = React.useState(false)


    const confirmarExoneracion = async() =>{
        try {
            const result = (await AxiosInstance.post(`/monthlyPayment/exoneracion/mensualidades`, mesesApagar)).data
            
            console.log('result 4exoneracion', result)
            
            if (result.ok === true) {
                setMessage(result.message)                
                setAlertType("success")
                setAlertModal(true)
                setModalExoneracion(false)
                limpiarFormularioFactura()

            } else {
                setMessage(result.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch {
            setMessage('Error**')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    console.log('esto llego de datosPago', datosPago)
  return (
      <Modal
          open={modalExoneracion}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box className={classes.box} >
              <Title>Confirmar exoneracion de Mensualidades</Title>
              {mesesApagar.map(item =>(
                <Box key={item.id}>
                      <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
                          <TextField
                              sx={{ width: '20%' }}
                              label="Nombre"
                              variant="standard"
                              InputProps={{ readOnly: true }}
                              value={item.student}
                          />
                          <TextField
                              sx={{ width: '20%' }}
                              label="Curso"
                              variant="standard"
                              InputProps={{ readOnly: true }}
                              value={item.detallePago.level.levName}
                          />
                          <TextField
                              sx={{ width: '20%' }}
                              label="Mensualidad"
                              variant="standard"
                              InputProps={{ readOnly: true }}
                              value={item.nombreMes}
                          />

                      </Stack> 

                </Box>
                  ))}
              <Stack direction="row" spacing={2} justifyContent="center" className={classes.TextField}>
                  <Button variant="outlined" 
                  onClick={() => setModalExoneracion(false)}
                  color="error">Cancelar</Button>
                  <Button variant="outlined" 
                      onClick={() => confirmarExoneracion()} 
                    >Confirmar</Button>

              </Stack> 
              {(alertModal) ?
              <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
              : null} 
          </Box>
          
      </Modal>
  )
}

export default ModalExoneracionMeses