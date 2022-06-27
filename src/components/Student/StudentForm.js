import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AxiosInstance = require("../utils/request").default;

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

  const selectSex = [
    {value:"f",
      label : "Femenino"},
    {value:"m",
      label : "Masculino"}
  ]

  const selectStatus = [
    {value:1,
      label : "Activo"},
    {value:2,
      label : "Inactivo"}
  ] 

  const requiredField = 'Campo Requerido';

const StudentForm = ({setSelectedStudent,editStudent,selectedStudent,orfStuFirstName, orfStuSurname,orfStuDateOfBirth, orfStuSex, orfCouId,orfStatus,orfFamId, clearField,setClearField, defaultValue, setStudentObject, studentObject}) => {
 
    const [Reload, SetReload] = React.useState(0);
    const [listOfFamilies, setListOfFamilies] = React.useState([])
    const [listOfCountries, setListOfCountries] = React.useState([])
    const [listOfFederalEntities, setListOfFederalEntities] = React.useState([])

// console.log('--',studentObject)
    const getFamilies = async () => {
      try{
        const resultFamilies = (await AxiosInstance.get("/families/allFamilies/active")).data
        if(resultFamilies.ok === true){
            setListOfFamilies(resultFamilies.data)
        }
      }catch{
      //   setMessage('Error de Conexion')
      //   setAlertModal(true)        
    }
  }

    const getCountries = async () => {

        try{
          const resultCountries = (await AxiosInstance.get("/countries/")).data
          if(resultCountries.ok === true){
            setListOfCountries(resultCountries.data)
          }
        }catch{
        //   setMessage('Error de Conexion')
        //   setAlertModal(true)
          
      }
    }
    const getFederalEntities = async () => {
        try{
            const resultFederalEntities = (await AxiosInstance.get("/federalEntities/country/"+232)).data
            if(resultFederalEntities.ok === true){
                  setListOfFederalEntities(resultFederalEntities.data)
            }
        }catch{
        //   setMessage('Error de Conexion')
        //   setAlertModal(true)
          
      }
    }

    const labelStatus = (estStatus) =>{

      if(estStatus !== null && estStatus !== undefined && estStatus !== ''){
        const result =  selectStatus.filter(item => {
          return estStatus === item.value
        })
        if(result.length > 0){ return result[0] }else{ return null }
      }else{
        return null
      }
      
        
    }

    const labelSex = (stuSex) =>{

      if(stuSex !== null){
        const result =  selectSex.filter(item => {
          return stuSex === item.value
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

    React.useEffect(() => {  
      if(studentObject.couId !== 232){
          setClearField({...clearField, federalEntity:(clearField.federalEntity + 1)})
        }  
          setStudentObject({...studentObject, federalEntity : null})
        }, [studentObject.couId]);

    React.useEffect(() => {  
        getFederalEntities()
        getCountries()  
        getFamilies()
        if(editStudent){

          setStudentObject(selectedStudent)
        }
        }, [Reload]);

        
      
    const classes = UseStyles();

  return (
    <Box >
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                value={(editStudent) ? selectedStudent.stuFirstName :studentObject.stuFirstName}
                id="stuFirstName"
                label="Primer Nombre"
                variant="standard"
                helperText={(studentObject.stuFirstName === null ||studentObject.stuFirstName === '')? requiredField : '' }
                error={orfStuFirstName}
                onChange={e => {
                  setSelectedStudent({...selectedStudent, stuFirstName: e.target.value ? e.target.value : ''})
                  setStudentObject({...studentObject, stuFirstName : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                value={(editStudent) ? selectedStudent.stuSecondName :studentObject.stuSecondName}
                id="stuSecondName"
                label="Segundo Nombre"
                variant="standard"
                onChange={e => {
                  setSelectedStudent({...selectedStudent, stuSecondName: e.target.value ? e.target.value : ''})
                  setStudentObject({...studentObject, stuSecondName : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                required
                value={(editStudent) ? selectedStudent.stuSurname :studentObject.stuSurname}
                id="stuSurname"
                label="Primer Apellido"
                variant="standard"
                helperText={(studentObject.stuSurname === null ||studentObject.stuSurname === '')? requiredField : '' }
                error={orfStuSurname}
                onChange={e => {
                  setSelectedStudent({...selectedStudent, stuSurname: e.target.value ? e.target.value : ''})
                  setStudentObject({...studentObject, stuSurname : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                id="stuSecondSurname"
                value={(editStudent) ? selectedStudent.stuSecondSurname :studentObject.stuSecondSurname}
                label="Segundo Apellido"
                variant="standard"
                onChange={e => {
                  setSelectedStudent({...selectedStudent, stuSecondSurname: e.target.value ? e.target.value : ''})
                  setStudentObject({...studentObject, stuSecondSurname : e.target.value ? e.target.value : ''})          
                }   }
                />
    </Stack>

    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                
    <TextField
                required
                inputRef={defaultValue}
                type='date'
                id="stuDateOfBirth"
                label="Fecha de Nacimiento"
                variant="standard"
                sx={{ width: '20%' }} 
                value={(editStudent) ? selectedStudent.stuDateOfBirth :studentObject.stuDateOfBirth}
                InputLabelProps={{shrink: true}}
                helperText={(studentObject.stuDateOfBirth === null ||studentObject.stuDateOfBirth === '')? requiredField : '' }
                error={orfStuDateOfBirth}
                onChange={e => {
                    console.log('e.target.value',e.target.value)
                    setStudentObject({...studentObject, stuDateOfBirth : e.target.value ? e.target.value : ''})          
                }   }
                />
                {/* <TextField
                required
                inputRef={defaultValue}
                type='date'
                id="stuDateOfBirth"
                label="Fecha de Nacimiento"
                variant="standard"
                sx={{ width: '20%' }} 
                value={(editStudent) ? selectedStudent.stuDateOfBirth :studentObject.stuDateOfBirth}
                InputLabelProps={{shrink: true}}
                helperText={(studentObject.stuDateOfBirth === null ||studentObject.stuDateOfBirth === '')? requiredField : '' }
                error={orfStuDateOfBirth}
                onChange={e => {
                    setStudentObject({...studentObject, stuDateOfBirth : e.target.value ? e.target.value : ''})          
                }   }
                /> */}
                <Autocomplete 
                options={selectSex}
                renderInput={(params) =>(
                  <TextField {...params}
                      helperText={(studentObject.stuSex === null ||studentObject.stuSex === '')? requiredField : '' }
                      error={orfStuSex} label="Sexo" variant="standard" />
                )}
                value={(editStudent) ? labelSex(selectedStudent.stuSex) : labelSex(studentObject.stuSex) }
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setStudentObject({...studentObject, stuSex : (newValue !== null) ? newValue.value : null})          
                  setSelectedStudent({...selectedStudent, stuSex : (newValue !== null) ? newValue.value : selectedStudent.stuSex})
                }}
                required
                key={clearField.sex}
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }} 
                 id="clear-on-escape"
                />   
                    <Autocomplete
                key={clearField.country}
                noOptionsText={'Sin Opciones'}
                options={listOfCountries}
                value={(editStudent) ? selectedStudent.countries : studentObject.countries }
                onChange={(event, newValue) => {
                  
                  setStudentObject({...studentObject,fedId : null, couId : (newValue !== null) ? newValue.couId : null, countries : (newValue !== null) ? newValue : null})          
                  setSelectedStudent({...selectedStudent, countries : (newValue !== null) ? newValue : selectedStudent.countries})
                  }}
                  getOptionLabel={(option) => option.couName}                
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => (
                   <TextField {...params} 
                   helperText={(studentObject.couId === null ||studentObject.couId === '')? requiredField : '' }
                   error={orfCouId}
                   label="País" variant="standard" />
                 )}/>

              <Autocomplete
                key={clearField.federalEntity}
                disabled={( studentObject.couId !== 232)? true : false}
                noOptionsText={'Sin Opciones'}
                options={listOfFederalEntities}
                value={(editStudent) ? selectedStudent.federalEntity : studentObject.federalEntity }
                onChange={(event, newValue) => {
                  setStudentObject({...studentObject, fedId : (newValue !== null) ? newValue.fedId : null, federalEntity : (newValue !== null) ? newValue : null})
                  setSelectedStudent({...selectedStudent, federalEntity : (newValue !== null) ? newValue : selectedStudent.federalEntity})
                  }}
                  getOptionLabel={(option) => option.fedName}                
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => (
                  <TextField {...params} label="Estado" variant="standard" />
                 )}/>             

    </Stack>

    <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>

      {/* <Autocomplete
                  key={clearField.family}
                  noOptionsText={'Sin Opciones'}
                  options={listOfFamilies}
                  value={(editStudent) ? selectedStudent.families : studentObject.families }
                  onChange={(event, newValue) => {
                      setStudentObject({...studentObject, famId : (newValue !== null) ? newValue.famId : null, families: (newValue !== null) ? newValue : null})          
                      setSelectedStudent({...selectedStudent, families : (newValue !== null) ? newValue : selectedStudent.families})
                    }}
                    getOptionLabel={(option) => option.famName}                
                  sx={{ width: '20%' }} 
                  id="clear-on-escape"
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField {...params} 
                    helperText={(studentObject.famId === null ||studentObject.famId === '')? requiredField : '' }
                    error={orfFamId}
                    label="Familia" variant="standard" />
                  )}/> */}
                  {(editStudent)? 
          <Autocomplete 
          options={selectStatus}
          renderInput={(params) =>(
            <TextField {...params}
                helperText={(studentObject.stuStatus === null ||studentObject.stuStatus === '')? requiredField : '' }
                error={orfStatus} label="Estatus" variant="standard" />
          )}
          value={(editStudent) ? labelStatus(selectedStudent.stuStatus) : labelStatus(studentObject.stuStatus) }
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => {
            setStudentObject({...studentObject, stuStatus : newValue.value ? newValue.value : null})          
            setSelectedStudent({...selectedStudent, stuStatus : newValue.value ? newValue.value : selectedStudent.stuStatus})
          }}
          required
          key={clearField.status}
          noOptionsText={'Sin Opciones'}
          sx={{ width: '20%' }} 
           id="clear-on-escape"
          />
  : null}
              
    </Stack>
    

  </Box>
  )
}

export default StudentForm