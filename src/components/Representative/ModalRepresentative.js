import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
const AxiosInstance = require("../utils/request").default;

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

  const UseStyles = makeStyles({
    stack: {
      marginTop : 40
    },
    TextField:{
      marginBottom : '3%',
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
      height : '50%',
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

  const IdentificationType = [
    {value:"v",
      label : "Venezolano"},
    {value:"e",
      label : "Extranjero"},
    {value:"p",
      label : "Pasaporte"}
  ]

const modalRepresentative = ({selectedRepresentative, openModal, setOpenModal,titleModalHeader,
  representativeObject,setRepresentativeObject
}) => {

  const classes = UseStyles();
  const handleClose = () => {
    setOpenModal(false);
  };

  const validateIdentification = async () => {
    try{
      const data = (await AxiosInstance.post("/representatives/byIdentification",representativeObject)).data
      console.log(data)
      // if(data.data === 'registrado'){
      //   
      // }
    }catch{
      console.log('no')
      // setConnErr(true)
    }

  }

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
          <div>
          <Stack direction="row" spacing={2}  justifyContent="flex-start" className={classes.TextField}>
              <TextField 
              id="repIdType"
              select
              label="Tipo Idenfiticación"
              onChange={e => {
                setRepresentativeObject({...representativeObject, repIdType : e.target.value ? e.target.value : 'v'})
              }}
              SelectProps={{
                native: true,
              }}
              // helperText="Tipo Idenfiticación"
              variant="standard"
            >
              {IdentificationType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
                </TextField>
                <TextField
                required
                id="repIdentificationNumber"
                label="Identificación"
                variant="standard"
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repIdentificationNumber : e.target.value ? e.target.value : ''})                }
                }/>
                <Button variant="outlined" size="small" onClick={() => validateIdentification()}>Validar</Button>
         </Stack>
          </div>
          
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
  )
}

export default modalRepresentative