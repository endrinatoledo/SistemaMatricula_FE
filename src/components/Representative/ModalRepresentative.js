import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
const AxiosInstance = require("../utils/request").default;
const ValidateIdentification = require('../commonComponents/ValidateIdentification').default 
const RepresentativeForm = require('./RepresentativeForm').default 

const style = {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height : '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const UseStyles = makeStyles({
    title: {
      // marginTop : 40,
      marginBottom:40
    },

 
  });
const modalRepresentative = ({clearField, setClearField,defaultValue, cleanRepresentativeObject,selectedRepresentative, openModal, setOpenModal,titleModalHeader,
  representativeObject,setRepresentativeObject
}) => {

  const classes = UseStyles();

  const handleClose = () => {
    // cleanRepresentativeObject()
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
        <Box sx={{ ...style, width: '65%' }}>
          <h4 className={classes.title}>{titleModalHeader} </h4>

          <ValidateIdentification setOpenModal={setOpenModal} setRepresentativeObject={setRepresentativeObject} representativeObject={representativeObject} />
          
          <RepresentativeForm clearField={clearField} setClearField={setClearField}  defaultValue={defaultValue} setRepresentativeObject={setRepresentativeObject} representativeObject={representativeObject}/>

          <Stack spacing={2} direction="row" justifyContent="center">
          
            <Button variant="outlined" onClick={cleanRepresentativeObject} >Limpiar</Button>
            <Button variant="outlined" color="error">Cancelar</Button>
            <Button variant="contained" color="success">Guardar</Button>
            
          </Stack>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
  )
}

export default modalRepresentative