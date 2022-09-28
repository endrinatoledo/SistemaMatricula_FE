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
import { useParams } from 'react-router-dom';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const AxiosInstance = require("../utils/request").default;
const ModalAlertCancel = require('../AlertMessages/ModalAlertCancel').default 

const UseStyles = makeStyles({
  stack: {
    marginTop:'5%'
  },

});

const EditFamily = () => {
  let { famid } = useParams();
  const [family, setFamily] = React.useState(famid)
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
  const [toShow, setToShow] = React.useState(0)
  const [familyData, setFamilyData] = React.useState({})
  const [representativesData, setRepresentativesData] = React.useState([])
  const [studentsData, setStudentsData] = React.useState([])
  const [repStuData, setRepStuData] = React.useState({})
  const [renderStatus, setRenderStatus] = React.useState(0)
  const [estudiantesEstaticos, setEstudiantesEstaticos] = React.useState(0)
  let conteoLLamado = 0

  const mode = 'edit'
  const classes = UseStyles();

  const getFamilyById = async () => {

    console.log('llego aquiiiiiiiiiiiiiiii',family)

    try {
      const resultFamilies = (await AxiosInstance.get(`/representativeStudent/byFam/${famid}`)).data

      if (resultFamilies.ok === true) {
        setFamilyData(resultFamilies.data.family)
        setRepresentativesData(resultFamilies.data.representatives)
        // setStudentsData(resultFamilies.data.students)
        setEstudiantesEstaticos(resultFamilies.data.students)
        setRepStuData(resultFamilies.data.representativeStudent)
        setToShow(toShow + 1)
      }
    } catch {
      console.log('error al consultar familia')
        setMessage('Error al consultar Familia')
        setAlertType('error')
        setAlertModal(true)
    }
  }


  const confirmCancelNewRepresentative =() =>{
    setModalCancel(true)
  }

  const enableButton = () =>{

    console.log('listRepresentative',listRepresentative.length)
    console.log('listStudent',listStudent.length)
    console.log('familyName',familyName)

    if(familyName !== '' && familyName !== null){
      setDisableButtonSave(false)
    }else{
      setDisableButtonSave(true)
    }
  }

  const updateFamily = async () =>{
    setStatusCcircularProgress(true)
    const objData ={
      representatives: listRepresentative,
      students: listStudent,
      family:familyData
    }
    try {
      const result = (await AxiosInstance.put(`/representativeStudent/${family}`,objData)).data

      setTimeout(() => {
        setStatusCcircularProgress(false)
      if(result.ok == true){
        setMessage(result.message)
        setAlertType('success')
        setAlertModal(true) 
        window.location = '/familias';

      }else if(result.ok === false){
        setMessage(result.message)
        setAlertType('error')
        setAlertModal(true) 
      }
      // else{
      //   setMessage('Error al actualizar Familia')
      //   setAlertType('error')
      //   setAlertModal(true) 
      // }
    }, 2000);
    } catch (error) {
        setMessage('Error al actualizar Familia')
        setAlertType('error')
        setAlertModal(true) 
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

    React.useEffect(() => {
      if(conteoLLamado === 0){
        getFamilyById()
      }
    }, [family]);  
  
    // React.useEffect(() => {
    //   getFamilyById()
    // }, [renderStatus]);
  return (
    <>
    <Box >
      <h4 id="child-modal-title">Editar Familia </h4>
      {(toShow > 0) ? 
      <>
        <FamilyData familyName={familyName} setFamilyName={setFamilyName} familyData={familyData} setFamilyData={setFamilyData}/>
        <SearchRepresentative listRepresentative={listRepresentative} setListRepresentative={setListRepresentative} />
        <TableRepresentative renderStatus={renderStatus} setRenderStatus={setRenderStatus} repStuData={repStuData} family={family} mode={mode} listRepresentative={listRepresentative} setListRepresentative={setListRepresentative} representativesData={representativesData} setRepresentativesData={setRepresentativesData}/>
        <SearchStudent mode={mode} estudiantesEstaticos={estudiantesEstaticos} listStudent={listStudent} setListStudent={setListStudent} ></SearchStudent>
        <TableStudent mode={mode} renderStatus={renderStatus} setRenderStatus={setRenderStatus} listStudent={listStudent} setListStudent={setListStudent} studentsData={studentsData} setStudentsData={setStudentsData}></TableStudent>
    
              {
                (statusCcircularProgress)?
                  <Stack className={classes.stack} spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
                      <LoadingButtons message={'Actualizando'} />
                  </Stack>
                  
                  : 
                  <Stack className={classes.stack} spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
                    <NavLink to='/familias' >
                      <Button variant="outlined" onClick={confirmCancelNewRepresentative} color="error">Cancelar</Button>
                    </NavLink>
                    <Button variant="contained" disabled={disableButtonSave} onClick={updateFamily} color="success">Actualizar</Button>
                  </Stack>
                }
      </>
      
      : null}
        
        
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

export default EditFamily