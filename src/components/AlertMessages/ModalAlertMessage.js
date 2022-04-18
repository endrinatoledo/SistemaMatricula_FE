import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { makeStyles } from '@mui/styles';
import ActivateFlashMessage from '../AlertMessages/ActivateFlashMessage'
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

const ModalAlertMessage = ({alertModal,setAlertModal, message, alertType}) => {

  const handleOpen = () => setAlertModal(true);
  const handleClose = () => setAlertModal(false);
  const classes = useStyles();

  function closeAlert() {
    setTimeout(() => {
      setAlertModal(false);
    }, 4000);
  }
  
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={alertModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Alert severity={alertType} className={classes.alert} >
          <AlertTitle variant="h5"><strong>{message}</strong></AlertTitle>
        </Alert>
      </Modal>
    </div>
  );
}

export default ModalAlertMessage