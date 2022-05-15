import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
const AxiosInstance = require("../utils/request").default;
const ValidateIdentification = require('../commonComponents/ValidateIdentification').default 

const style = {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height : '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


const modalRepresentative = ({selectedRepresentative, openModal, setOpenModal,titleModalHeader,
  representativeObject,setRepresentativeObject
}) => {

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
        hideBackdrop
        open={openModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: '75%' }}>
          <h4 id="child-modal-title">{titleModalHeader} </h4>

          <ValidateIdentification setOpenModal={setOpenModal} setRepresentativeObject={setRepresentativeObject} representativeObject={representativeObject} />
          
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
  )
}

export default modalRepresentative