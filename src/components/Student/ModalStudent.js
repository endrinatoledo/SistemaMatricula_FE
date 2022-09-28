import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButtons from '../commonComponents/LoadingButton';
import SeeStudent from './SeeStudent';
const AxiosInstance = require("../utils/request").default;
const ValidateIdentification = require('./ValidateIdentification').default 
const StudentForm = require('./StudentForm').default 
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
    height : '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const UseStyles = makeStyles({
    title: {
      marginBottom:40
    },

  });
const ModalStudent = ({ setSeeStudentDetails, seeStudentDetails, fillTable,setSelectedStudent,editStudent, setEditStudent,setAlertModal, setMessage, setAlertType,statusCcircularProgress, setStatusCcircularProgress,identificationValidation, setIdentificationValidation,clearField,setClearField, defaultValue, cleanStudentObject,selectedStudent, openModal, setOpenModal,titleModalHeader,
  studentObject,setStudentObject
}) => {

    // object Required Fields
    const [orfStuFirstName, setOrfStuFirstName] = React.useState(false)
    const [orfStuSurname, setOrfStuSurname] = React.useState(false)
    const [orfStuIdentificationNumber, setOrfStuIdentificationNumber] = React.useState(false)
    const [orfStuDateOfBirth, setOrfStuDateOfBirth] = React.useState(false)
    const [orfStuSex, setOrfStuSex] = React.useState(false)
    const [orfCouId  , setOrfCouId] = React.useState(false)
    const [orfStatus, setOrfStatus] = React.useState(false)
    const [orfFamId  , setOrfFamId] = React.useState(false)
    const [modalCancel  , setModalCancel] = React.useState(false)
    const [userResponse  , setUserResponse] = React.useState('')
  const classes = UseStyles();

  const confirmCancelNewStudent =() =>{
    setModalCancel(true)
    
  }
  const closeModal =() =>{
    setSeeStudentDetails(false)
    setOpenModal(false)
    cleanStudentObject()
    
  }

  

  const handleClose = () => {

    if(userResponse === 'yes'){
      
      cleanStudentObject()
      setModalCancel(false)
      setOpenModal(false);
      setEditStudent(false);
    }else 
    if(userResponse === 'no'){
      setModalCancel(false)
    }

  };

  const validateRequiredFields = () =>{

    let emptyForm = false

    // if(studentObject.stuIdentificationNumber === null || studentObject.stuIdentificationNumber === ''){
    //   setOrfStuIdentificationNumber(true) ;
    //   emptyForm = true
    // }else{ setOrfStuIdentificationNumber(false) }

    if(studentObject.stuFirstName === null || studentObject.stuFirstName === ''){
      setOrfStuFirstName(true) ;
      emptyForm = true
    }else{ setOrfStuFirstName(false) }

    if(studentObject.stuSurname === null || studentObject.stuSurname === ''){
      setOrfStuSurname(true) ;
      emptyForm = true
    }else{ setOrfStuSurname(false) }

    if(studentObject.stuDateOfBirth === null || studentObject.stuDateOfBirth === ''){
      setOrfStuDateOfBirth(true) ;
      emptyForm = true
    }else{ setOrfStuDateOfBirth(false) }

    if(studentObject.stuSex === null || studentObject.stuSex === ''){
      setOrfStuSex(true) ;
      emptyForm = true
    }else{ setOrfStuSex(false) }

    if(studentObject.couId === null || studentObject.couId === ''){
      setOrfCouId(true) ;
      emptyForm = true
    }else{ setOrfCouId(false) }

    if((editStudent) && (studentObject.stuStatus === null || studentObject.stuStatus === '')){
      setOrfStatus(true) ;
      emptyForm = true
    }else{ setOrfStatus(false) }

    // if(studentObject.famId === null || studentObject.famId === ''){
    //   setOrfFamId(true) ;
    //   emptyForm = true
    // }else{ setOrfFamId(false) }

    return emptyForm

  }

  const saveStudent = async () => {

    const emptyForm = await validateRequiredFields()

    if(!emptyForm) {
      setStatusCcircularProgress(true)
      try{

        const data = (await AxiosInstance.post("/students/",studentObject)).data

        setTimeout(() => {
          setStatusCcircularProgress(false)
          
          if(data.message === 'Identificación ya se encuentra registrada'){
            setMessage(data.message)
            setAlertType('error')
            setAlertModal(true)
          }else 
          if(data.message === 'Estudiante creado con éxito'){
              setMessage(data.message)
              setAlertType('success')
              setIdentificationValidation(false)
              setOpenModal(false);
              fillTable() 
              setAlertModal(true)  
              cleanStudentObject()      
          }else{
            setStatusCcircularProgress(false)
            setAlertModal(true)  
            setMessage('Error al crear nuevo Estudiante')
            setAlertType('error')
          }

        }, 2000);
      }catch{
        console.log('error')
            setStatusCcircularProgress(false)
            setMessage('Error al crear nuevo Estudiante')
            setAlertType('error')
            setAlertModal(true)   
      }
    }
  }; 

  const updateStudent = async () => {
    //cuando se procese la accion cambiar setEditStudent(false)
    const emptyForm = validateRequiredFields()

    if(!emptyForm) {
      setStatusCcircularProgress(true)
      try{
         
        const data = (await AxiosInstance.put("/students/"+selectedStudent.stuId, studentObject)).data
        
        setTimeout(() => {
          setStatusCcircularProgress(false)
          
          if(data.message === 'Identificación ya se encuentra registrada'){

          }else 
          if(data.message === 'Estudiante actualizado con éxito'){
              setMessage(data.message)
              setAlertType('success')
              setIdentificationValidation(false)
              setOpenModal(false);
              fillTable() 
              setAlertModal(true)  
              cleanStudentObject()      
          }else{
            setStatusCcircularProgress(false)
            setAlertModal(true)  
            setMessage('Error al Actualizar Estudiante')
            setAlertType('error')
          }

        }, 2000);
      }catch{
            setStatusCcircularProgress(false)
            setMessage('Error al crear nuevo Estudiante')
            setAlertType('error')
            setAlertModal(true)   
      }
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

          {(seeStudentDetails)? 
          <>
            <SeeStudent selectedStudent={selectedStudent}/>
          </>
          :
          <>
              <ValidateIdentification editStudent={editStudent} setOrfStuIdentificationNumber={setOrfStuIdentificationNumber} setIdentificationValidation={setIdentificationValidation} identificationValidation={identificationValidation} orfStuIdentificationNumber={orfStuIdentificationNumber} setStudentObject={setStudentObject} studentObject={studentObject} />
            <StudentForm 
            setSelectedStudent={setSelectedStudent}
            editStudent={editStudent} selectedStudent={selectedStudent}
            orfStuFirstName = {orfStuFirstName} orfStuSurname={orfStuSurname}
            orfStuDateOfBirth = {orfStuDateOfBirth} orfStuSex ={orfStuSex}          
            orfCouId = {orfCouId} orfStatus = {orfStatus} orfFamId = {orfFamId}
            clearField={clearField} setClearField={setClearField} defaultValue={defaultValue} 
            setStudentObject={setStudentObject} studentObject={studentObject}/>            
          </>
          }       
          <Stack spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
           {             
             (seeStudentDetails) ?  
             <>
                <Button variant="outlined" onClick={closeModal} color="error">Cerrar</Button>
             </>
             :
             <>
                <Button variant="outlined" onClick={confirmCancelNewStudent} color="error">Cancelar</Button>
                {
                  (editStudent) ? 
                  (statusCcircularProgress)? 
                    <LoadingButtons message={'Actualizando'} />
                    : <Button variant="contained"onClick={updateStudent} color="success">Actualizar</Button>
                 :
                 (statusCcircularProgress)?
                  <LoadingButtons message={'Guardando'} />
                  : 
                  <>
                    <Button variant="outlined" onClick={cleanStudentObject} >Limpiar</Button>
                    <Button variant="contained"onClick={saveStudent} color="success">Guardar</Button>
                  </>
                }
             </>             
           }           
          </Stack>
        </Box>
      </Modal>
      {(modalCancel) ? 
              <ModalAlertCancel  modalCancel={modalCancel} setModalCancel={setModalCancel} message={'¿ Desea cancelar el registro ?'} setUserResponse={setUserResponse} /> 
       : null}

    </>
    
  )
}

export default ModalStudent