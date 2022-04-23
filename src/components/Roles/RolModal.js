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
    width: '40%',
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

const RolModal = ({message,setAlertModal,setAlertType,fillTable,defaultMessages,setMessage,rolObject,openModal,setOpenModal,setRolObject,name }) => {

    const [messageFlash, setMessageFlash] = React.useState(false)
    const requiredField = 'Campo requerido'
    const classes = useStyles();

    const saveNewRol = async () => {
        try{
            if(rolObject.name !== '' && rolObject.status !== 0){
                const data = (await AxiosInstance.post("/roles/",rolObject)).data
          if(data.ok === false){
              setMessage(data.message)
              setMessageFlash(true)
          }else{
            fillTable()
            setOpenModal(false)
            setMessage(defaultMessages.success)
            setAlertType("success")
            setAlertModal(true)
            setRolObject({idRol:'',name:'',status: 0, modalRolDelete:false, editRol:false, newRol:true})
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
    const updateRol = async () => {
      try{
        if(rolObject.name !== '' ){
  
            const data = (await AxiosInstance.put("/roles/"+rolObject.idRol,rolObject)).data
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
        onClose={() => {setOpenModal(false);setRolObject({idRol:'',name:'',status: 0, modalRolDelete:false, editRol:false, newRol:false}); }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box component="form" className={classes.box} >
         <Title>Agregar {name}</Title>
         
         <Stack direction="row"  justifyContent="space-around" className={classes.TextField}>
                <TextField
                required
                id="name"
                label="Nombre"
                defaultValue={(rolObject.name)?rolObject.name : ''}
                onChange={(e) => {
                    setRolObject({...rolObject, name : e.target.value ? e.target.value : ''})}}
                helperText={(rolObject.name === '')? requiredField : ''}
                variant="standard"
                error={(rolObject.name === '')? true : false}
                />
                <TextField
          id="status"
          select
          label="Estatus"
          helperText={(rolObject.status === 0)? requiredField : null}
          error={(rolObject.status === 0)? true : false}  
          defaultValue={(rolObject.status)?rolObject.status : 0}
          onChange={e => {setRolObject({...rolObject, status : e.target.value ? e.target.value : 0})}}
          variant="standard"
        >
          {(rolObject.status !==0)?
            <MenuItem key={rolObject.status} value={rolObject.status}>
            {(rolObject.status === 1)? 'Activo' : 'Inactivo'}
            </MenuItem> : null}
            <MenuItem key={1} value={1}>Activo</MenuItem>
            <MenuItem key={2} value={2}>Inactivo</MenuItem>
        </TextField> 
         </Stack>

        <Stack spacing={2} direction="row" className={classes.stack} justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={ () => {setOpenModal(false);setRolObject({idRol:'',name:'',status: 0, modalRolDelete:false, editRol:false, newRol:true}); }} color='inherit'>Cancelar</Button>
          <Button variant="contained" onClick={() => (!rolObject.editRol)? saveNewRol() : updateRol()} >{(!rolObject.editRol)? 'Agregar' : 'Actualizar'}</Button>
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

export default RolModal