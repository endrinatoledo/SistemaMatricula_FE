import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ValidateEmail from '../commonComponents/ValidateEmail';

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
    {value:"m",
      label : "Mujer"},
    {value:"h",
      label : "Hombre"}
  ]
  const selectBond = [
    {value:"Madre",
      label : "Madre"},
    {value:"Padre",
      label : "Padre"}
  ]
  const selectMaritalStatus = [
    // {value:"Seleccionar",label : "Seleccionar"},
    {value:"casado(a)",label : "Casado(a)"},
    {value:"divorciado(a)",label : "Divorciado(a)"},
    {value:"conviviente",label : "Conviviente"},
    {value:"separado(a)",label : "Separado(a)"},
    {value:"viudo(a)",label : "Viudo(a)"},
    {value:"soltero(a)",label : "Soltero(a)"}
  ]
  const selectStatus = [
    {value:1,
      label : "Activo"},
    {value:2,
      label : "Inactivo"}
  ]

  const requiredField = 'Campo Requerido';

const RepresentativeForm = ({valueForm, setValueForm,clearField, setClearField,defaultValue, setRepresentativeObject, representativeObject}) => {

    const [Reload, SetReload] = React.useState(0);
    const [listOfProfessions, setListOfProfessions] = React.useState([])
    const [listOfFamilies, setListOfFamilies] = React.useState([])
    const [listOfCountries, setListOfCountries] = React.useState([])
    const [listOfFederalEntities, setListOfFederalEntities] = React.useState([])
    const [federalEntity, setFederalEntity] = React.useState()
    

    const getProfessions = async () => {

        try{
          const resultProfessions = (await AxiosInstance.get("/professions/")).data
          if(resultProfessions.ok === true){
                setListOfProfessions(resultProfessions.data)
          }
        }catch{
        //   setMessage('Error de Conexion')
        //   setAlertModal(true)
          
      }
    }

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
    const getFederalEntities = async (couId) => {

        try{
          const resultFederalEntities = (await AxiosInstance.get("/federalEntities/country/"+couId)).data
          if(resultFederalEntities.ok === true){
                setListOfFederalEntities(resultFederalEntities.data)
          }
        }catch{
        //   setMessage('Error de Conexion')
        //   setAlertModal(true)
          
      }
    }

    React.useEffect(() => {  
        getProfessions()  
        getCountries()  
        getFamilies()
        }, [Reload]);

    const classes = UseStyles();

  return (
    <Box  >
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                value={representativeObject.repFirstName}
                id="repFirstName"
                label="Primer Nombre"
                variant="standard"
                helperText={(representativeObject.repFirstName === null ||representativeObject.repFirstName === '')? requiredField : '' }
                error={(representativeObject.repFirstName === null ||representativeObject.repFirstName === '' )? true : false }
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repFirstName : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                value={representativeObject.repSecondName}
                id="repSecondName"
                label="Segundo Nombre"
                variant="standard"
                // helperText={(representativeObject.repSecondName === null ||representativeObject.repSecondName === '')? requiredField : '' }
                // error={(representativeObject.repSecondName === null ||representativeObject.repSecondName === '' )? true : false }
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repSecondName : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                required
                value={representativeObject.repSurname}
                id="repSurname"
                label="Primer Apellido"
                variant="standard"
                helperText={(representativeObject.repSurname === null ||representativeObject.repSurname === '')? requiredField : '' }
                error={(representativeObject.repSurname === null ||representativeObject.repSurname === '' )? true : false }
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repSurname : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                id="repSecondSurname"
                value={representativeObject.repSecondSurname}
                label="Segundo Apellido"
                variant="standard"
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repSecondSurname : e.target.value ? e.target.value : ''})          
                }   }
                />
    </Stack>

    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                inputRef={defaultValue}
                type='date'
                id="repDateOfBirth"
                label="Fecha de Nacimiento"
                variant="standard"
                sx={{ width: '20%' }} 
                value={representativeObject.repDateOfBirth}
                InputLabelProps={{shrink: true}}
                helperText={(representativeObject.repDateOfBirth === null ||representativeObject.repDateOfBirth === '')? requiredField : '' }
                error={(representativeObject.repDateOfBirth === null ||representativeObject.repDateOfBirth === '' )? true : false }
                onChange={e => {
                    setRepresentativeObject({...representativeObject, repDateOfBirth : e.target.value ? e.target.value : ''})          
                }   }
                />

                <Autocomplete
                require
                key={clearField.sex}
                noOptionsText={'Sin Opciones'}
                options={selectSex}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, repSex : newValue.label ? newValue.label : null})          
                  }}
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 renderInput={(params) =>(
                   <TextField
                   helperText={(representativeObject.repSex === null ||representativeObject.repSex === '')? requiredField : '' }
                   error={(representativeObject.repSex === null ||representativeObject.repSex === '' )? true : false }
                   {...params} label="Sexo" variant="standard" />
                 )}/>
                 <Autocomplete
                    require
                    key={clearField.civil}
                    noOptionsText={'Sin Opciones'}
                    options={selectMaritalStatus}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) => {
                        setRepresentativeObject({...representativeObject, repCivilStatus : newValue.label ? newValue.label : null})          
                      }}
                    sx={{ width: '20%' }} 
                    id="clear-on-escape"
                    clearOnEscape
                    renderInput={(params) => (
                      <TextField {...params}
                      helperText={(representativeObject.repCivilStatus === null ||representativeObject.repCivilStatus === '')? requiredField : '' }
                      error={(representativeObject.repCivilStatus === null ||representativeObject.repCivilStatus === '' )? true : false }
                      label="Estado Civil" variant="standard" />
                    )}/>
              <Autocomplete
                key={clearField.profession}
                noOptionsText={'Sin Opciones'}
                options={listOfProfessions}
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, proId : newValue.proId ? newValue.proId : null})          
                  }}
                getOptionLabel={(option) => option.proName}
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => (
                   <TextField {...params} 
                   helperText={(representativeObject.proId === null ||representativeObject.proId === '')? requiredField : '' }
                   error={(representativeObject.proId === null ||representativeObject.proId === '' )? true : false }
                   label="Profesión" variant="standard" />
                 )}/>
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
    
            <Autocomplete
                key={clearField.country}
                noOptionsText={'Sin Opciones'}
                options={listOfCountries}
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject,fedId : null, couId : newValue.couId ? newValue.couId : null})          
                    getFederalEntities(newValue.couId)
                    setFederalEntity()
                }}
                getOptionLabel={(option) => option.couName}
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => ( 
                   <TextField {...params}
                   helperText={(representativeObject.couId === null ||representativeObject.couId === '')? requiredField : '' }
                   error={(representativeObject.couId === null ||representativeObject.couId === '' )? true : false }
                   label="País" variant="standard" />
                 )}/>

                <Autocomplete
                  key={clearField.federalEntity}
                  noOptionsText={'Sin Opciones'}
                  disabled={(listOfFederalEntities.length === 0 || representativeObject.couId != 232)? true : false}
                  options={listOfFederalEntities}
                  onChange={(event, newValue) => {
                      setRepresentativeObject({...representativeObject, fedId : newValue.fedId ? newValue.fedId : null})          
                    }}
                  getOptionLabel={ (option) => option.fedName }
                  sx={{ width: '20%' }} 
                  id="clear-on-escape"
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField {...params} label="Estado" variant="standard" />
                  )}/>

                <TextField
                  sx={{ width: '47%' }}
                  required
                  value={representativeObject.repAddress}
                  id="repAddress"
                  label="Direccion"
                  variant="standard"
                  helperText={(representativeObject.repAddress === null ||representativeObject.repAddress === '')? requiredField : '' }
                  error={(representativeObject.repAddress === null ||representativeObject.repAddress === '' )? true : false }
                  onChange={e => {
                    setRepresentativeObject({...representativeObject, repAddress : e.target.value ? e.target.value : ''}) 
                  }   }
                />   
    </Stack>

    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                value={representativeObject.repEmail}
                id="repEmail"
                label="Correo"
                variant="standard"
                helperText={(representativeObject.repEmail === null)? requiredField :(ValidateEmail(representativeObject.repEmail) === false)? 'Error en formato' : '' }
                error={(representativeObject.repEmail === null ||representativeObject.repEmail === '' )? true : false }
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repEmail : e.target.value ? e.target.value : ''}) 
                }   }
                />
                
                <TextField
                required
                value={representativeObject.repPhones}
                id="repPhones"
                label="Telefono"
                variant="standard"
                helperText={(representativeObject.repPhones === null ||representativeObject.repPhones === '')? requiredField : '' }
                  error={(representativeObject.repPhones === null ||representativeObject.repPhones === '' )? true : false }
                  onChange={e => {
                    setRepresentativeObject({...representativeObject, repPhones : e.target.value ? e.target.value : ''}) 
                  }   }
                />
                {/* <TextField
                value={representativeObject.repPhoto}
                id="repPhoto"
                label="Foto"
                variant="standard"
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repPhoto : e.target.value ? e.target.value : ''}) 
                }   }
 
                /> */}
                <Autocomplete
                  require
                  key={clearField.bond}
                  noOptionsText={'Sin Opciones'}
                  options={selectBond}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, newValue) => {
                      setRepresentativeObject({...representativeObject, repBond : newValue.value ? newValue.value : null})          
                    }}
                  sx={{ width: '20%' }} 
                  id="clear-on-escape"
                  clearOnEscape
                  renderInput={(params) =>(
                    <TextField {...params} label="Vínculo" variant="standard" />
                  )}/> 
                  <Autocomplete
                require
                key={clearField.family}
                noOptionsText={'Sin Opciones'}
                options={listOfFamilies}
                getOptionLabel={(option) => option.famName}
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, famId : newValue.famId ? newValue.famId : null})          
                  }}
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) =>(
                   <TextField {...params} label="Familia" variant="standard" />
                 )}
              /> 
                               
    </Stack>

    
    <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              

                <Autocomplete
                  require
                  key={clearField.status}
                  noOptionsText={'Sin Opciones'}
                  options={selectStatus}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, newValue) => {
                      setRepresentativeObject({...representativeObject, repStatus : newValue.value ? newValue.value : null})          
                    }}
                  sx={{ width: '20%' }} 
                  id="clear-on-escape"
                  clearOnEscape
                  renderInput={(params) =>(
                    <TextField {...params} label="Estatus" variant="standard" />
                  )}/> 

                
    </Stack>

  </Box>
  )
}

export default RepresentativeForm