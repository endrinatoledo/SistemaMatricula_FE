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
    {value:"f",
      label : "Femenino"},
    {value:"m",
      label : "Masculino"}
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

const RepresentativeForm = ({setSelectedRepresentative,editRepresentative,selectedRepresentative,orfRepFirstName, orfRepSurname,orfRepDateOfBirth, orfRepSex,orfRepAddresse, orfRepCivilStatus,orfProId, orfRepPhones,orfRepEmail, orfCouId,orfStatus,orfRepBond,orfFamId, clearField, defaultValue, setRepresentativeObject, representativeObject}) => {

    const [Reload, SetReload] = React.useState(0);
    const [listOfProfessions, setListOfProfessions] = React.useState([])
    const [listOfFamilies, setListOfFamilies] = React.useState([])
    const [listOfCountries, setListOfCountries] = React.useState([])
    const [listOfFederalEntities, setListOfFederalEntities] = React.useState([])
    const [federalEntity, setFederalEntity] = React.useState()
    const [valueSex, setValueSex] = React.useState(null)
    const [editRepre, setEditRepre] = React.useState({
      repFirstName           : '', 
      repSecondName          : '',
      repSurname             : '' ,
      repSecondSurname       : '',
      repIdType              : 'v',
      repIdentificationNumber: '',
      repDateOfBirth         : '',
      repSex                 : '',
      repAddress             : '',
      repCivilStatus         : '',
      profession             : null,
      repPhones              : '',
      repEmail               : '',
      couId                  : '',
      fedId                  : '',
      repPhoto               : '',
      repStatus              : '',
      repBond                : '',
      famId                  : '',
    })

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
    const labelSex = (repSex) =>{
      
      const result =  selectSex.filter(item => {
        return repSex === item.value
      })
        return result[0]
    }
    const labelBond = (repBond) =>{
      
      const result =  selectBond.filter(item => {
        return repBond === item.value
      })
        return result[0]
    }

    const labelMaritalStatus = (maritalStatus) =>{

      const result = selectMaritalStatus.filter((item) =>{ 
          return maritalStatus.toLowerCase() === item.value  
      })
        return result[0]
    }

    React.useEffect(() => {  
        getProfessions()  
        getCountries()  
        getFamilies()
        }, [Reload]);

    const classes = UseStyles();

  return (
    <Box >
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                value={(editRepresentative) ? selectedRepresentative.repFirstName :representativeObject.repFirstName}
                id="repFirstName"
                label="Primer Nombre"
                variant="standard"
                helperText={(representativeObject.repFirstName === null ||representativeObject.repFirstName === '')? requiredField : '' }
                error={orfRepFirstName}
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repFirstName : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                value={(editRepresentative) ? selectedRepresentative.repSecondName :representativeObject.repSecondName}
                id="repSecondName"
                label="Segundo Nombre"
                variant="standard"
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repSecondName : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                required
                value={(editRepresentative) ? selectedRepresentative.repSurname :representativeObject.repSurname}
                id="repSurname"
                label="Primer Apellido"
                variant="standard"
                helperText={(representativeObject.repSurname === null ||representativeObject.repSurname === '')? requiredField : '' }
                error={orfRepSurname}
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repSurname : e.target.value ? e.target.value : ''})          
                }   }
                />
                <TextField
                id="repSecondSurname"
                value={(editRepresentative) ? selectedRepresentative.repSecondSurname :representativeObject.repSecondSurname}
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
                value={(editRepresentative) ? selectedRepresentative.repDateOfBirth :representativeObject.repDateOfBirth}
                InputLabelProps={{shrink: true}}
                helperText={(representativeObject.repDateOfBirth === null ||representativeObject.repDateOfBirth === '')? requiredField : '' }
                error={orfRepDateOfBirth}
                onChange={e => {
                    setRepresentativeObject({...representativeObject, repDateOfBirth : e.target.value ? e.target.value : ''})          
                }   }
                />
                <Autocomplete 
                options={selectSex}
                renderInput={(params) =>(
                  <TextField {...params}
                      helperText={(representativeObject.repSex === null ||representativeObject.repSex === '')? requiredField : '' }
                      error={orfRepSex} label="Sexo" variant="standard" />
                )}
                value={(editRepresentative) ? labelSex(selectedRepresentative.repSex) : null }
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setRepresentativeObject({...representativeObject, repSex : newValue.value ? newValue.value : null})          
                  setSelectedRepresentative({...selectedRepresentative, repSex : newValue.value ? newValue.value : selectedRepresentative.repSex})
                }}
                required
                key={clearField.sex}
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }} 
                 id="clear-on-escape"
                />
                <Autocomplete 
                options={selectMaritalStatus}
                renderInput={(params) =>(
                  <TextField {...params}
                      helperText={(representativeObject.repCivilStatus === null ||representativeObject.repCivilStatus === '')? requiredField : '' }
                      error={orfRepCivilStatus} label="Estado Civil" variant="standard" />
                )}
                value={(editRepresentative) ? labelMaritalStatus(selectedRepresentative.repCivilStatus) : null }
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setRepresentativeObject({...representativeObject, repSex : newValue.value ? newValue.value : null})          
                  setSelectedRepresentative({...selectedRepresentative, repCivilStatus : newValue.value ? newValue.value : selectedRepresentative.repCivilStatus})
                }}
                required
                key={clearField.civil}
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }} 
                 id="clear-on-escape"
                />
                

              <Autocomplete
                key={clearField.profession}
                noOptionsText={'Sin Opciones'}
                options={listOfProfessions}
                value={(editRepresentative) ? selectedRepresentative.professions : null }
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, proId : newValue.proId ? newValue.proId : null})          
                    setSelectedRepresentative({...selectedRepresentative, professions : newValue.value ? newValue.value : selectedRepresentative.professions})
                  }}
                  getOptionLabel={(option) => option.proName}                
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => (
                   <TextField {...params} 
                   helperText={(representativeObject.proId === null ||representativeObject.proId === '')? requiredField : '' }
                   error={orfProId}
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
                   error={orfCouId}
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
                  value={(editRepresentative) ? selectedRepresentative.repAddress :representativeObject.repAddress}
                  id="repAddress"
                  label="Direccion"
                  variant="standard"
                  helperText={(representativeObject.repAddress === null ||representativeObject.repAddress === '')? requiredField : '' }
                  error={orfRepAddresse}
                  onChange={e => {
                    setRepresentativeObject({...representativeObject, repAddress : e.target.value ? e.target.value : ''}) 
                  }   }
                />   
    </Stack>

    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                value={(editRepresentative) ? selectedRepresentative.repEmail :representativeObject.repEmail}
                id="repEmail"
                label="Correo"
                variant="standard"
                helperText={(representativeObject.repEmail === null)? requiredField :(ValidateEmail(representativeObject.repEmail) === false)? 'Error en formato' : '' }
                error={orfRepEmail}
                onChange={e => {
                  setRepresentativeObject({...representativeObject, repEmail : e.target.value ? e.target.value : ''}) 
                }   }
                />
                
                <TextField
                required
                value={(editRepresentative) ? selectedRepresentative.repPhones :representativeObject.repPhones}
                id="repPhones"
                label="Telefono"
                variant="standard"
                helperText={(representativeObject.repPhones === null ||representativeObject.repPhones === '')? requiredField : '' }
                  error={orfRepPhones}
                  onChange={e => {
                    setRepresentativeObject({...representativeObject, repPhones : e.target.value ? e.target.value : ''}) 
                  }   }
                />
                <Autocomplete 
                options={selectBond}
                renderInput={(params) =>(
                  <TextField {...params}
                      helperText={(representativeObject.repBond === null ||representativeObject.repBond === '')? requiredField : '' }
                      error={orfRepBond} label="Vínculo" variant="standard" />
                )}
                value={(editRepresentative) ? labelBond(selectedRepresentative.repBond) : null }
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setRepresentativeObject({...representativeObject, repBond : newValue.value ? newValue.value : null})          
                  setSelectedRepresentative({...selectedRepresentative, repBond : newValue.value ? newValue.value : selectedRepresentative.repBond})
                }}
                required
                key={clearField.bond}
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }} 
                 id="clear-on-escape"
                />


              <Autocomplete
                key={clearField.family}
                noOptionsText={'Sin Opciones'}
                options={listOfFamilies}
                value={(editRepresentative) ? selectedRepresentative.families : null }
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, famId : newValue.famId ? newValue.famId : null})          
                    setSelectedRepresentative({...selectedRepresentative, families : newValue.value ? newValue.value : selectedRepresentative.families})
                  }}
                  getOptionLabel={(option) => option.famName}                
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => (
                   <TextField {...params} 
                   helperText={(representativeObject.famId === null ||representativeObject.famId === '')? requiredField : '' }
                   error={orfFamId}
                   label="Familia" variant="standard" />
                 )}/>

                {/* <Autocomplete
                required
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
                   <TextField {...params} label="Familia" variant="standard"
                   helperText={(representativeObject.famId === null ||representativeObject.famId === '')? requiredField : '' }

                   error={orfFamId} />
                 )} 
              /> */}
                               
    </Stack>

    {(editRepresentative)? 
         <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
      
                <Autocomplete
                  required
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
                    <TextField {...params} label="Estatus" variant="standard"
                    helperText={(representativeObject.repStatus === null ||representativeObject.repStatus === '')? requiredField : '' }
                    error={orfStatus}  />
                  )}/> 

    </Stack> 
  : null}
    {/* <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              
                <Autocomplete
                  required
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
                    <TextField {...params} label="Estatus" variant="standard"
                    helperText={(representativeObject.repStatus === null ||representativeObject.repStatus === '')? requiredField : '' }
                    error={orfStatus}  />
                  )}/> 

                
    </Stack> */}

  </Box>
  )
}

export default RepresentativeForm