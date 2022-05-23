import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { makeStyles } from '@mui/styles';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles({
  alert: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    paddingTop : '2%',
    paddingLeft : '3%',
    paddingRight : '3%',
    paddingBottom : '2%',
  },

});

const ModalAlertCancel = ({modalCancel, setModalCancel,message,setUserResponse}) => {


  const handleClose = () => setModalCancel(false);
  const classes = useStyles();
  
  return (
    <div>

      <Modal
        open={modalCancel} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title" 
        aria-describedby="modal-modal-description"
      >
        <>
          <Alert severity={'info'}  className={classes.alert} >
            <AlertTitle variant="h6"><strong>{message}</strong></AlertTitle>
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button variant="contained"onClick={() => setUserResponse('no')} color="error">No</Button>
                <Button variant="contained" onClick={() => setUserResponse('yes')} color="success">Si</Button>
              </Stack>
          </Alert> 
          
        </>
         
       </Modal>

    </div>
 
  );
}

export default ModalAlertCancel