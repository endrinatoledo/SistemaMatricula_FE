import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Title from '../Layout/Title';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
//import {Visibility,VisibilityOff} from '@mui/icons-material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import { ErrorAlert } from '../AlertMessages/ErrorAlert';
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
      height : '57%',
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

const UserModal = ({name,openModal,setOpenModal,fillTable}) => {

  const [activeRoles, setActiveRoles] = React.useState([])
  const [Reload, SetReload] = React.useState(0);
  const [userObject, setUserObject] = React.useState({name:'', lastName:'',email:'', password:'',status: 1, rol: ''});
  const [message, setMessage] = React.useState('')
  const [messageFlash, setMessageFlash] = React.useState(false)
  const requiredField = 'Campo requerido'

  const classes = useStyles();
  
  const MessageFlash  = () => {
    
    setMessageFlash(true)
    setTimeout(() => {
      setMessageFlash(false);
    }, 5000);
  }

    const getActiveRoles = async () => {
      try{
        const data = (await AxiosInstance.get("/roles/allRoles/active")).data
        if(data.ok === true){
          setActiveRoles(data.data)
        }
      }catch{
        console.log('no')
        setMessage('Error de Conexion')
        MessageFlash()
      }
    }

    const saveNewUser = async () => {
      try{
        if(userObject.name !== '' && userObject.lastName !== '' && userObject.email !== '' && userObject.password !== '' && userObject.rol !== ''){
          const data = (await AxiosInstance.post("/users/",userObject)).data
          if(data.ok === false){
              setMessage(data.message)
              MessageFlash()
          }else{
            fillTable()
            setOpenModal(false)
          }
        }
      }catch{
        setMessage('Error de conexión')
        MessageFlash()
      }
    }
    React.useEffect(() => {  
      getActiveRoles()

      }, [Reload]);

  return (
    <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
                onChange={(e) => {
                  setUserObject({...userObject, name : e.target.value ? e.target.value : ''})}}
                helperText={(userObject.name === '')? requiredField : ''}
                variant="standard"
                error={(userObject.name === '')? true : false}
                />
                <TextField
                required
                id="lastName"
                label="Apellido"
                variant="standard"
                onChange={(e) => {
                setUserObject({...userObject, lastName : e.target.value ? e.target.value : ''})}}
                helperText={(userObject.lastName === '')? requiredField : ''}
                error={(userObject.lastName === '')? true : false}
                />
         </Stack>
         <Stack direction="row"  justifyContent="space-around" className={classes.TextField}>
                <TextField
                required
                id="email"
                label="Correo"
                variant="standard"
                onChange={(e) => {
                  setUserObject({...userObject, email : e.target.value ? e.target.value : ''}) }}
                helperText={(userObject.email === '')? requiredField : ''}
                error={(userObject.email === '')? true : false}
                />
                <TextField
                required
                id="password"
                label="Contraseña"
                variant="standard"
                onChange={(e) => { setUserObject({...userObject, password : e.target.value ? e.target.value : ''})}}
                helperText={(userObject.password === '')? requiredField : ''}
                error={(userObject.password === '')? true : false}  
                />
         </Stack>
         <Stack direction="row"  justifyContent="space-around" className={classes.TextField}>
         <TextField
          id="status"
          select
          label="Estatus"
          onChange={e => setUserObject({...userObject, status : e.target.value ? e.target.value : null})}
          defaultValue={1}
          variant="standard"
        >
            <MenuItem key={1} value={1}>Activo</MenuItem>
            <MenuItem key={0} value={0}>Inactivo</MenuItem>
        </TextField>
        <TextField
          id="rol"
          select
          label="Rol"
          onChange={(e) => { setUserObject({...userObject, rol : e.target.value })}}
          helperText={(userObject.rol === '')? requiredField : ''}
          error={(userObject.rol === '')? true : false}  
          //   value={currency}
          variant="standard"
        >
          {(activeRoles.length>0)?
            activeRoles.map((option) => (
            <MenuItem key={option.rolId} value={option.rolId}>
              {option.rolName}
            </MenuItem>
           ))
           :
           null
          }
        </TextField>
         </Stack>

        <Stack spacing={2} direction="row" className={classes.stack} 
               justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={() => console.log('nooooo')} color='inherit'>Cancelar</Button>
          <Button variant="contained" onClick={() => saveNewUser()} >Agregar</Button>
        </Stack>
        <Stack className={classes.errorMessage} >
            { (messageFlash) ? <ErrorAlert message={message}/> : <></>}
          </Stack>
        </Box> 
      </Modal>
  )
}

export default UserModal