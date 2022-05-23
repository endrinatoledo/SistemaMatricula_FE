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
const ModalAlertCancel = require('../AlertMessages/ModalAlertCancel').default 

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
const ModalRepresentative = ({clearField, defaultValue, cleanRepresentativeObject,selectedRepresentative, openModal, setOpenModal,titleModalHeader,
  representativeObject,setRepresentativeObject
}) => {
    // object Required Fields
    const [orfRepFirstName, setOrfRepFirstName] = React.useState(false)
    const [orfRepSurname, setOrfRepSurname] = React.useState(false)
    const [orfRepIdentificationNumber, setOrfRepIdentificationNumber] = React.useState(false)
    const [orfRepDateOfBirth, setOrfRepDateOfBirth] = React.useState(false)
    const [orfRepSex, setOrfRepSex] = React.useState(false)
    const [orfRepAddresse, setOrfRepAddress] = React.useState(false)
    const [orfRepCivilStatus , setOrfRepCivilStatus ] = React.useState(false)
    const [orfProId , setOrfProId] = React.useState(false)
    const [orfRepPhones, setOrfPhones] = React.useState(false)
    const [orfRepEmail , setOrfRepEmail ] = React.useState(false)
    const [orfCouId  , setOrfCouId] = React.useState(false)
    const [orfStatus, setOrfStatus] = React.useState(false)
    const [orfRepBond , setOrfRepBond ] = React.useState(false)
    const [orfFamId  , setOrfFamId] = React.useState(false)
    const [modalCancel  , setModalCancel] = React.useState(false)
    const [messagesRepresentative  , setMessagesRepresentative] = React.useState({cancel:'¿ Desea cancelar el registro ?'})
    const [userResponse  , setUserResponse] = React.useState('')
  const classes = UseStyles();
 
  const confirmCancelNewRepresentative =() =>{
    setModalCancel(true)
  }



  const handleClose = () => {

    if(userResponse === 'yes'){
      
      cleanRepresentativeObject()
      setModalCancel(false)
      setOpenModal(false);
    }else 
    if(userResponse === 'no'){
      setModalCancel(false)
    }

    
  };

  const validateRequiredFields = async () =>{

    let emptyForm = false

    if(representativeObject.repIdentificationNumber == null || representativeObject.repIdentificationNumber == ''){
      setOrfRepIdentificationNumber(true) ;
      emptyForm = true
    }else{ setOrfRepIdentificationNumber(false) }

    if(representativeObject.repFirstName == null || representativeObject.repFirstName == ''){
      setOrfRepFirstName(true) ;
      emptyForm = true
    }else{ setOrfRepFirstName(false) }

    if(representativeObject.repSurname == null || representativeObject.repSurname == ''){
      setOrfRepSurname(true) ;
      emptyForm = true
    }else{ setOrfRepSurname(false) }

    if(representativeObject.repDateOfBirth == null || representativeObject.repDateOfBirth == ''){
      setOrfRepDateOfBirth(true) ;
      emptyForm = true
    }else{ setOrfRepDateOfBirth(false) }

    if(representativeObject.repSex == null || representativeObject.repSex == ''){
      setOrfRepSex(true) ;
      emptyForm = true
    }else{ setOrfRepSex(false) }

    if(representativeObject.repAddress == null || representativeObject.repAddress == ''){
      setOrfRepAddress(true) ;
      emptyForm = true
    }else{ setOrfRepAddress(false) }

    if(representativeObject.repCivilStatus == null || representativeObject.repCivilStatus == ''){
      setOrfRepCivilStatus(true) ;
      emptyForm = true
    }else{ setOrfRepCivilStatus(false) }

    if(representativeObject.proId == null || representativeObject.proId == ''){
      setOrfProId(true) ;
      emptyForm = true
    }else{ setOrfProId(false) }

    if(representativeObject.repPhones == null || representativeObject.repPhones == ''){
      setOrfPhones(true) ;
      emptyForm = true
    }else{ setOrfPhones(false) }

    if(representativeObject.repEmail == null || representativeObject.repEmail == ''){
      setOrfRepEmail(true) ;
      emptyForm = true
    }else{ setOrfRepEmail(false) }

    if(representativeObject.couId == null || representativeObject.couId == ''){
      setOrfCouId(true) ;
      emptyForm = true
    }else{ setOrfCouId(false) }

    if(representativeObject.repStatus == null || representativeObject.repStatus == ''){
      setOrfStatus(true) ;
      emptyForm = true
    }else{ setOrfStatus(false) }

    if(representativeObject.repBond == null || representativeObject.repBond == ''){
      setOrfRepBond(true) ;
      emptyForm = true
    }else{ setOrfRepBond(false) }

    if(representativeObject.famId == null || representativeObject.famId == ''){
      setOrfFamId(true) ;
      emptyForm = true
    }else{ setOrfFamId(false) }

    return emptyForm

  }

  const saveRepresentative = async () => {

    const emptyForm = await validateRequiredFields()

    if(emptyForm) {
      console.log('hay form vacios')
    } else {
      console.log('NO hay form vacios')
    }


  };

  React.useEffect(() => {  
    
    handleClose()
    }, [userResponse]);

  return (
    <>
      <Modal
        hideBackdrop open={openModal} onClose={handleClose}
        aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
        <Box sx={{ ...style, width: '65%' }}>
          <h4 className={classes.title}>{titleModalHeader} </h4>

          <ValidateIdentification orfRepIdentificationNumber={orfRepIdentificationNumber} setRepresentativeObject={setRepresentativeObject} representativeObject={representativeObject} />
          
          <RepresentativeForm 
          orfRepFirstName = {orfRepFirstName} orfRepSurname={orfRepSurname}
          orfRepDateOfBirth = {orfRepDateOfBirth} orfRepSex ={orfRepSex}          
          orfRepAddresse = {orfRepAddresse} orfRepCivilStatus = {orfRepCivilStatus}
          orfProId = {orfProId} orfRepPhones = {orfRepPhones}
          orfRepEmail ={orfRepEmail} orfCouId = {orfCouId}
          orfStatus = {orfStatus} orfRepBond = {orfRepBond} orfFamId = {orfFamId}
          clearField={clearField}            
          defaultValue={defaultValue} setRepresentativeObject={setRepresentativeObject} 
          representativeObject={representativeObject}/>

          <Stack spacing={2} direction="row" justifyContent="center">
            <Button variant="outlined" onClick={cleanRepresentativeObject} >Limpiar</Button>
            <Button variant="outlined" onClick={confirmCancelNewRepresentative} color="error">Cancelar</Button>
            <Button variant="contained"onClick={saveRepresentative} color="success">Guardar</Button>
          </Stack>
        </Box>

      </Modal>
      {(modalCancel) ? 
              <ModalAlertCancel  modalCancel={modalCancel} setModalCancel={setModalCancel} message={'¿ Desea cancelar el registro ?'} setUserResponse={setUserResponse} /> 
       : null}
    </>
    
  )
}

export default ModalRepresentative