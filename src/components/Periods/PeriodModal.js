import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Title from '../Layout/Title';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import StandardAlert from '../AlertMessages/StandardAlert';
import ActivateFlashMessage from '../AlertMessages/ActivateFlashMessage';

const AxiosInstance = require("../utils/request").default;

const useStyles = makeStyles({
  stack: {
     marginTop : 40,
  },
  errorMessage:{
    marginTop : '3%'
  },
  TextField:{
    marginBottom : '3%'
  },
  box:{
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position : 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    background:'white',
    border: '2px solid #000',
    boxShadow: 24,
    paddingTop : '2%',
    paddingLeft : '2%',
    paddingRight : '2%',
    paddingBottom : '2%',
    '& .MuiTextField-root': { m: 1, width: '25ch' }
    
  }  
});

const PeriodModal = ({message,setAlertModal,setAlertType,fillTable,defaultMessages,setMessage,periodObject,openModal,setOpenModal,setPeriodObject,name }) => {

    const [messageFlash, setMessageFlash] = React.useState(false)
    const requiredField = 'Campo requerido'
    const classes = useStyles();

    const saveNewPeriod = async () => {
        try{
            if(periodObject.startYear !== '' && periodObject.status !== 0){
                const data = (await AxiosInstance.post("/periods/",periodObject)).data
          if(data.ok === false){
              setMessage(data.message)
              setMessageFlash(true)
          }else{
            fillTable()
            setOpenModal(false)
            setMessage(defaultMessages.success)
            setAlertType("success")
            setAlertModal(true)
            setPeriodObject({idPeriod:'',startYear:'',endYear:'',status: 0, modalPeriodDelete:false, editPeriod:false, newPeriod:true})
            setTimeout(() => {
              setAlertModal(false);
          }, 3000)
          }
            }
        }catch{
            setMessage(defaultMessages.connectionError)
            setMessageFlash(true)
          }
    }
    const updatePeriod = async () => {
      try{
        if(periodObject.startYear !== '' ){
  
            const data = (await AxiosInstance.put("/periods/"+periodObject.idPeriod,periodObject)).data
            if(data.ok === false){
              setMessage(data.message)
              setMessageFlash(true)
            }else{
              fillTable()
              setOpenModal(false)
              setMessage(defaultMessages.update)
              setAlertType("success")
              setAlertModal(true)
  
              setTimeout(() => {
                setAlertModal(false);
            }, 3000)
            }
        }
      }catch{
        setMessage(defaultMessages.connectionError)
        setMessageFlash(true)
      }
    }



  return (
    <Modal
        open={openModal}
        onClose={() => {setOpenModal(false);setPeriodObject({idPeriod:'',startYear:'',endYear:'',status: 0, modalPeriodDelete:false, editPeriod:false, newPeriod:false}); }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box component="form" className={classes.box} >
         <Title>Agregar {name}</Title>
         
         <Stack direction="row"  justifyContent="space-around" className={classes.TextField}>
                <TextField
                type={'number'}
                required
                id="startYear"
                label="Año Inicio"
                defaultValue={(periodObject.startYear)?periodObject.startYear : ''}
                onChange={(e) => {
                    setPeriodObject({...periodObject, startYear : e.target.value ? e.target.value : ''})}}
                helperText={(periodObject.startYear === '')? requiredField : ''}
                variant="standard"
                error={(periodObject.startYear === '')? true : false}
                />
                <TextField
                disabled={true}
                id="endYear"
                label="Año Fin"
                defaultValue={(periodObject.endYear)?periodObject.endYear : ''}
                onChange={(e) => {
                    setPeriodObject({...periodObject, endYear : e.target.value ? e.target.value : ''})}}
                variant="standard"
                />
                <TextField
          id="status"
          select
          label="Estatus"
          helperText={(periodObject.status === 0)? requiredField : null}
          error={(periodObject.status === 0)? true : false}  
          defaultValue={(periodObject.status)?periodObject.status : 0}
          onChange={e => {setPeriodObject({...periodObject, status : e.target.value ? e.target.value : 0})}}
          variant="standard"
        >
          {(periodObject.status !==0)?
            <MenuItem key={periodObject.status} value={periodObject.status}>
            {(periodObject.status === 1)? 'Activo' : 'Inactivo'}
            </MenuItem> : null}
            <MenuItem key={1} value={1}>Activo</MenuItem>
            <MenuItem key={2} value={2}>Inactivo</MenuItem>
        </TextField> 
         </Stack>

        <Stack spacing={2} direction="row" className={classes.stack} justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={ () => {setOpenModal(false);setPeriodObject({idPeriod:'',startYear:'',status: 0, modalPeriodDelete:false, editPeriod:false, newPeriod:true}); }} color='inherit'>Cancelar</Button>
          <Button variant="contained" onClick={() => (!periodObject.editPeriod)? saveNewPeriod() : updatePeriod()} >{(!periodObject.editPeriod)? 'Agregar' : 'Actualizar'}</Button>
        </Stack>
        <Stack className={classes.errorMessage} >
            { (messageFlash) ?<>
              <ActivateFlashMessage setMessageFlash={setMessageFlash}/>
              <StandardAlert message={message} alertType={"error"}/>
            </>  : <></>}
          </Stack>
        </Box> 
      </Modal>
  )
}

export default PeriodModal