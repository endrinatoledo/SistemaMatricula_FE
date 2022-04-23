import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
const AxiosInstance = require("../utils/request").default;

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

const DeleteRol = ({fillTable,setMessage,setAlertType,rolObject,setRolObject, defaultMessages,setAlertModal}) => {
  
    const [messageFlash, setMessageFlash] = React.useState(false)
    const classes = useStyles();
    const handleClose = () => setRolObject({...rolObject, modalRolDelete:false, newRol:true});


    const deleteRol = async () => {
        try{
            const data = (await AxiosInstance.delete("/roles/"+rolObject.idRol)).data

            if(data.ok === false){
                setMessage(data.message)
                setMessageFlash(true)
              }else{
                fillTable()
                setRolObject({...rolObject,name:'',status: 0, editRol:false, newRol:true,modalRolDelete:false});
                setMessage(defaultMessages.rolDelete)
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
        open={rolObject.modalRolDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            {`${defaultMessages.removeRol} ${rolObject.name} ?`}
            </Typography>

            <Stack spacing={2} direction="row" className={classes.stack} justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={ () => {setRolObject({...rolObject,name:'',status: 0,editRol:false, newRol:true,modalRolDelete:false}); }} color='inherit'>Cancelar</Button>
                <Button variant="contained" onClick={ () => deleteRol()}>Eliminar</Button>
            </Stack>
            </Box>
      </Modal>
    </div>
  )
}

export default DeleteRol
