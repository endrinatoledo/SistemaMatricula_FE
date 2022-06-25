import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import SearchRepresentative from './SearchRepresentative'
import TableRepresentative from './TableRepresentative';
import SearchStudent from './SearchStudent';
import TableStudent from './TableStudent';
import FamilyData from './FamilyData';
import {NavLink} from 'react-router-dom'
import LoadingButtons from '../commonComponents/LoadingButton';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const AxiosInstance = require("../utils/request").default;
const ModalAlertCancel = require('../AlertMessages/ModalAlertCancel').default 

const UseStyles = makeStyles({
  stack: {
    marginTop:'5%'
  },

});

const AddFamily = () => {
 
  const [listRepresentative, setListRepresentative] = React.useState([])
  const [listStudent, setListStudent] = React.useState([])
  const [familyName, setFamilyName] = React.useState('')
  const [disableButtonSave, setDisableButtonSave] = React.useState(true)
  const [modalCancel  , setModalCancel] = React.useState(false)
  const [userResponse  , setUserResponse] = React.useState('')
  const [message  , setMessage] = React.useState('')
  const [redirect  , setRedirect] = React.useState(false)
  const [statusCcircularProgress  , setStatusCcircularProgress] = React.useState(false)
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false)
  const familyData = null
  const representativesData = null
  const studentsData = null
  const mode = 'add'
  const family = null
  const repStuData = null

  const classes = UseStyles();

  const confirmCancelNewRepresentative =() =>{
    setModalCancel(true)
  }

  const enableButton = () =>{

    if(listRepresentative.length > 0 && listStudent.length > 0 && familyName !== '' && familyName !== null){
      setDisableButtonSave(false)
    }else{
      setDisableButtonSave(true)
    }
  }

  const saveFamily = async () =>{
    setStatusCcircularProgress(true)
    const objData ={
      representatives: listRepresentative,
      students: listStudent,
      family:familyName
    }
    try {
      const result = (await AxiosInstance.post("/representativeStudent",objData)).data
      setTimeout(() => {
        setStatusCcircularProgress(false)
      if(result.message === 'Familia creada con éxito'){
        setMessage(result.message)
        setAlertType('success')
        setAlertModal(true) 
        window.location = '/familias';

      }else if(result.message === 'Error de conexión'){

      }else{

      }
    }, 2000);
    } catch (error) {
      
    }

  }
  const handleClose = () => {

    if(userResponse === 'yes'){
      
      setModalCancel(false)
       setRedirect(true);
    }else 
    if(userResponse === 'no'){
      setModalCancel(false)
    }

  };

  React.useEffect(() => {  
    enableButton()
    }, [listRepresentative.length])

    React.useEffect(() => {  
      enableButton()
      }, [listStudent.length])
      React.useEffect(() => {  
        enableButton()
        }, [familyName])

    React.useEffect(() => {  
        handleClose()
    }, [userResponse]);

  return (
    <>
    <Box >
      <h4 id="child-modal-title">Agregar Familia </h4>
      
        <FamilyData familyName={familyName} setFamilyName={setFamilyName} familyData={familyData}/>
        <SearchRepresentative listRepresentative={listRepresentative} setListRepresentative={setListRepresentative}/>
        <TableRepresentative repStuData={repStuData} family={family} mode={mode} listRepresentative={listRepresentative} setListRepresentative={setListRepresentative} representativesData={representativesData}/>
        <SearchStudent listStudent={listStudent} setListStudent={setListStudent} ></SearchStudent>
        <TableStudent listStudent={listStudent} setListStudent={setListStudent} studentsData={studentsData}></TableStudent>
    
              {
                (statusCcircularProgress)?
                  <Stack className={classes.stack} spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
                      <LoadingButtons message={'Guardando'} />
                  </Stack>
                  
                  : 
                  <Stack className={classes.stack} spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
                    <NavLink to='/familias' >
                      <Button variant="outlined" onClick={confirmCancelNewRepresentative} color="error">Cancelar</Button>
                    </NavLink>
                    <Button variant="contained" disabled={disableButtonSave} onClick={saveFamily} color="success">Guardar</Button>
                  </Stack>
                }
        
    </Box>
    {(modalCancel) ? 
              <ModalAlertCancel  modalCancel={modalCancel} setModalCancel={setModalCancel} message={'¿ Desea cancelar el registro ?'} setUserResponse={setUserResponse} /> 
       : null}

      {(alertModal) ? 
        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}   
              

        
         
    </>
  )
}

export default AddFamily