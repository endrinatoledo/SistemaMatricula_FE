import React from 'react'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import ModalSelectStudent from './ModalSelectStudent';
const AxiosInstance = require("../utils/request").default;
const UseStyles = makeStyles({
    typography: {
      marginLeft : '3%'
    },
    box:{
        marginTop:'2%'
    },
    TextField:{
        marginBottom : '3%',
        marginTop:'2%',
        marginLeft:'3%'
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

const SearchStudent = ({mode,estudiantesEstaticos,listStudent,setListStudent}) => {
    const classes = UseStyles();
    const [identification, setIdentification] = React.useState({stuIdType:null, stuIdentificationNumber: '', stuFirstName:'',stuSecondName:'',stuSurname:'',stuSecondSurname:''})
    const [buttonI, setButtonI] = React.useState(true)
    const [message  , setMessage] = React.useState('')
    const [alertType, setAlertType] = React.useState('');
    const [alertModal, setAlertModal] = React.useState(false)
    const [selectStudentModal, setSelectStudentModal] = React.useState(false)
    const [selectStudentData, setSelectStudentData] = React.useState([])

    const labelType = (value) =>{
        if(value !== null){
          const result =  IdentificationType.filter(item => {
            return value === item.value
          }) 
          if(result.length > 0){ 
            return result[0]
          }else{
            return null
          }
        }else{
          return null
        }      
      }

    const searchIdentification = async () => {

      if(identification.stuIdentificationNumber !== '' || identification.stuFirstName !== ''
      || identification.stuSecondName !== '' || identification.stuSurname !== '' 
      || identification.stuSecondSurname !== ''){
        
        try{
          const data = (await AxiosInstance.post("/students/byIdentification",identification)).data
  
          if(data.data === 'registrado'){
            if(data.result.length === 1){
              setListStudent(listStudent.concat([data.result[0]]))
              setIdentification({stuIdType:null, stuIdentificationNumber: '', stuFirstName:'',stuSecondName:'',stuSurname:'',stuSecondSurname:''})
            }else{
              setSelectStudentData(data.result)
              setSelectStudentModal(true)
            }
            
          } else{
            setMessage('Estudiante no encontrado')
            setAlertType('error')
            setAlertModal(true)
          }
          
        }catch{
            setMessage('Error al consultar Estudiante')
            setAlertType('error')
            setAlertModal(true)
        }
      }else{
        setMessage('Debe agregar un filtro de búsqueda')
        setAlertType('error')
        setAlertModal(true) 
      }    
      }

    return (
    <>
    <Box className={classes.box}>
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
            Estudiantes
        </Typography> 
        <Divider variant="middle" />
        <div className={classes.TextField}>
        {(mode =='edit') ?
            estudiantesEstaticos.map((element) => (
                <Typography variant="h6" color="text.secondary">
                   {`${element.stuIdType ? element.stuIdType : ''}-${element.stuIdentificationNumber?element.stuIdentificationNumber : ''} ${element.stuFirstName} ${element.stuSecondName ? element.stuSecondName : ''} ${element.stuSurname} ${element.stuSecondSurname ? element.stuSecondSurname : ''}`}
                </Typography>
              ))
                : null}
        </div>
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              
        <Autocomplete 
                options={IdentificationType}
                renderInput={(params) =>(
                  <TextField {...params} label="Tipo Idenfiticación" variant="standard"/>
                )}
                value={labelType(identification.stuIdType)}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setIdentification({...identification, stuIdType : newValue.value ? newValue.value : null})          
                }}
                required
                // key={clearField.status}
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }} 
                 id="clear-on-escape"
                />
            
                <TextField
                sx={{ width: '20%' }} 
                required
                // key={keyIdentification}
                value={identification.stuIdentificationNumber}
                id="stuIdentificationNumber"
                label="Identificación"
                variant="standard"
                onChange={e => {
                    setIdentification({...identification, stuIdentificationNumber : e.target.value ? e.target.value : ''})          
                      if(e.target.value.length < 6 ){setButtonI(true)}else{setButtonI(false)}
                }
                }
                />
                
                <Button variant="outlined" size="small" onClick={() => searchIdentification()}>Buscar</Button>
         </Stack>
         <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
         <TextField
                sx={{ width: '20%' }} 
                value={identification.stuFirstName}
                id="stuFirstName"
                label="Primer Nombre"
                variant="standard"
                onChange={e => {setIdentification({...identification, stuFirstName : e.target.value ? e.target.value : ''})}}
                />
                <TextField
                sx={{ width: '20%' }} 
                value={identification.stuSecondName}
                id="stuSecondName"
                label="Segundo Nombre"
                variant="standard"
                onChange={e => {setIdentification({...identification, stuSecondName : e.target.value ? e.target.value : ''})}}
                />
                <TextField
                sx={{ width: '20%' }} 
                value={identification.stuSurname}
                id="stuSurname"
                label="Primer Apellido"
                variant="standard"
                onChange={e => {setIdentification({...identification, stuSurname : e.target.value ? e.target.value : ''})}}
                />
                <TextField
                sx={{ width: '20%' }} 
                value={identification.stuSecondSurname}
                id="stuSecondSurname"
                label="Segundo Apellido"
                variant="standard"
                onChange={e => {setIdentification({...identification, stuSecondSurname : e.target.value ? e.target.value : ''})}}
                />
         </Stack>
    </Box>
    {(alertModal) 
      ? <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/>  
      : null} 
      {(selectStudentModal)
      ? <ModalSelectStudent setIdentification={setIdentification} listStudent={listStudent} setListStudent={setListStudent} selectStudentModal={selectStudentModal} setSelectStudentModal={setSelectStudentModal} selectStudentData={selectStudentData} /> 
      : null}
    </>
  )
}

export default SearchStudent