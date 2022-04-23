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

const DeletePeriod = ({fillTable,setMessage,setAlertType,periodObject,setPeriodObject, defaultMessages,setAlertModal}) => {
  
    const [messageFlash, setMessageFlash] = React.useState(false)
    const classes = useStyles();
    const handleClose = () => setPeriodObject({...periodObject, modalPeriodDelete:false, newPeriod:true});


    const deletePeriod = async () => {
        try{

            const data = (await AxiosInstance.delete("/periods/"+periodObject.idPeriod)).data
            if(data.ok === false){
                setMessage(data.message)
                setMessageFlash(true)
              }else{
                fillTable()
                setPeriodObject({...periodObject,startYear:'',endYear:'',status: 0, editPeriod:false, newPeriod:true,modalPeriodDelete:false});
                setMessage(defaultMessages.periodDelete)
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
        open={periodObject.modalPeriodDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box className={classes.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            {`${defaultMessages.removePeriod} ${periodObject.startYear} ?`}
            </Typography>

            <Stack spacing={2} direction="row" className={classes.stack} justifyContent="center" alignItems="center">
                <Button variant="contained" onClick={ () => {setPeriodObject({...periodObject,startYear:'',endYear:'',status: 0,editPeriod:false, newPeriod:true,modalPeriodDelete:false}); }} color='inherit'>Cancelar</Button>
                <Button variant="contained" onClick={ () => deletePeriod()}>Eliminar</Button>
            </Stack>
            </Box>
      </Modal>
    </div>
  )
}

export default DeletePeriod
