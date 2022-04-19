import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
const AxiosInstance = require("../utils/request").default;

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const useStyles = makeStyles({
    modal:{
    background:'white',
    boxShadow: 24,
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    border: '2px solid #000',
    paddingTop : '2%',
    paddingBottom : '2%',
    },
    stack: {
        marginTop : 40,
     },
  
  });

const DeleteUser = ({fillTable,setMessage,setAlertType,userObject,setUserObject, defaultMessages,alertModal,setAlertModal,message,alertType}) => {
  
    const [messageFlash, setMessageFlash] = React.useState(false)
    const classes = useStyles();
    const handleClose = () => setUserObject({...userObject, modalUserDelete:false, newUser:true});

    const deleteUser = async () => {
        try{
            const data = (await AxiosInstance.delete("/users/"+userObject.idUser)).data

            if(data.ok === false){
                setMessage(data.message)
                setMessageFlash(true)
              }else{
                fillTable()
                setUserObject({...userObject,name:'', lastName:'',email:'', password:'',status: 1, rol: '',editUser:false, newUser:true,seePassword:false,modalUserDelete:false});
                setMessage(defaultMessages.userDelete)
                setAlertType("success")
                setAlertModal(true)
    
                setTimeout(() => {
                  setAlertModal(false);
              }, 3000)
              }
        }catch{
            setMessage(defaultMessages.connectionError)
            setMessageFlash(true)
          }
    }
    return (
    <div>
      <Modal
        open={userObject.modalUserDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            {`${defaultMessages.removeUser} ${userObject.name} ?`}
            </Typography>

            <Stack spacing={2} direction="row" className={classes.stack} justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={ () => {setUserObject({...userObject,name:'', lastName:'',email:'', password:'',status: 1, rol: '',editUser:false, newUser:true,seePassword:false,modalUserDelete:false}); }} color='inherit'>Cancelar</Button>
                <Button variant="contained" onClick={ () => deleteUser()}>Eliminar</Button>
            </Stack>
            </Box>
      </Modal>
    </div>
  )
}

export default DeleteUser