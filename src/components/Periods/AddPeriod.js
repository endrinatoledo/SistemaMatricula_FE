import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import LoadingButtons from '../commonComponents/LoadingButton';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const AxiosInstance = require("../utils/request").default;


const UseStyles = makeStyles({
    period: {
        marginTop: '2%',
        marginLeft: '4%'
    },
    representatives: {
      marginLeft: '4%',
    },
    typography: {
      marginTop: '2%',
      marginLeft: '2%'
    },
    divider: {
      marginBottom: '2%'
    },
    stack: {
      marginTop: '5%'
    },
  
  
  });

const AddPeriod = () => {

    const [buttonI, setButtonI] = React.useState(true)
    const [periodObject, setPeriodObject] = React.useState({startYear : 0})
    const [message  , setMessage] = React.useState('')
    const [alertType, setAlertType] = React.useState('');
    const [alertModal, setAlertModal] = React.useState(false)
    const mode = 'add'
    const classes = UseStyles();

    const searchPeriod = async () => {
        try{
          const data = (await AxiosInstance.get(`/periods/startYear/${periodObject.startYear}`)).data

          
          if(data.message === 'Periodo registrado'){
            console.log('llegoooooo',data.message)
            setMessage(data.message)
            setAlertType('error')
            setAlertModal(true)
          } else
          if(data.message === 'Periodo no registrado'){
            console.log('llego',data.message)

          }
          
        }catch{
          console.log('***no')
          // setConnErr(true)
        }
    
      }

  return (
    <Box>
        <h4 id="child-modal-title">Nuevo Periodo</h4>
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.period}>
            <TextField
                sx={{ width: '20%' }} 
                required
                type={'number'}
                // key={keyIdentification}
                id="period"
                label="Agregar Año Inicio"
                variant="standard"
                // helperText={errorMessage}
                // error={orfRepIdentificationNumber}
                onChange={e => {
                    console.log('e.target.value',e.target.value)
                    setPeriodObject({...periodObject,startYear : e.target.value ? e.target.value : 0})
                    if(e.target.value.length < 4 ){setButtonI(true)}else{setButtonI(false)}
                }
                }
            />
            <Button variant="outlined" size="small" 
                disabled={buttonI} 
                onClick={() => searchPeriod()}
            >Validar Periodo</Button>

        </Stack>

        {(alertModal) ? 
        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}   
      
    </Box>
  )
}

export default AddPeriod