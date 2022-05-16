import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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
    {value:"m",
      label : "Mujer"},
    {value:"h",
      label : "Hombre"}
  ]
  const selectMaritalStatus = [
    {value:"Seleccionar",label : "Seleccionar"},
    {value:"casado(a)",label : "Casado(a)"},
    {value:"conviviente",label : "Conviviente"},
    {value:"separado(a)",label : "Separado(a)"},
    {value:"viudo",label : "Viudo(a)"},
    {value:"soltero(a)",label : "Soltero(a)"}
  ]


const RepresentativeForm = ({setRepresentativeObject, representativeObject}) => {

    const [Reload, SetReload] = React.useState(0);
    const [listOfProfessions, setListOfProfessions] = React.useState([])
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
              console.log(resultFederalEntities)
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
        }, [Reload]);
    

    const classes = UseStyles();

    const [valueDate, setValueDate] = React.useState(new Date('2014-08-18T21:11:54'));

      const defaultPropsSex = {
        options: selectSex,
        getOptionLabel: (option) => option.label,
    };

  const handleChange = (newValue) => {
    setValueDate(newValue);
  };

  return (
    <Box  >
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                id="repFirstName"
                label="Primer Nombre"
                variant="standard"
                // helperText={errorMessage}
                // error={errorInput}
                // onChange={e => {
                //   setRepresentativeObject({...representativeObject, repIdentificationNumber : e.target.value ? e.target.value : ''})          
                //   if(e.target.value.length < 6 ){setButtonI(true)}else{setButtonI(false)}
                // }   }
                />
                <TextField
                id="repSecondName"
                label="Segundo Nombre"
                variant="standard"
                />
                <TextField
                required
                id="repSurname"
                label="Primer Apellido"
                variant="standard"
                />
                <TextField
                id="repSecondSurname"
                label="Segundo Apellido"
                variant="standard"
                />
    </Stack>

    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                type='date'
                id="repDateOfBirth"
                label="Fecha de Nacimiento"
                variant="standard"
                sx={{ width: '20%' }} 
                value={valueDate}
                InputLabelProps={{
                    shrink: true,
                  }}
                // helperText={errorMessage}
                // error={errorInput}
                onChange={e => {
                    setValueDate(e.target.value)
                    setRepresentativeObject({...representativeObject, repDateOfBirth : e.target.value ? e.target.value : ''})          
                //   if(e.target.value.length < 6 ){setButtonI(true)}else{setButtonI(false)}
                }   }
                />

                <Autocomplete
                require
                options={selectSex}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, repSex : newValue.label ? newValue.label : null})          
                  }}
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) =>(
                   <TextField {...params} label="Sexo" variant="standard" />
                 )}/>
                 <Autocomplete
                require
                options={selectMaritalStatus}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, repCivilStatus : newValue.label ? newValue.label : null})          
                  }}
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => (
                   <TextField {...params} label="Estado Civil" variant="standard" />
                 )}/>
              <Autocomplete
                options={listOfProfessions}
                onChange={(event, newValue) => {
                    setRepresentativeObject({...representativeObject, proId : newValue.proId ? newValue.proId : null})          
                  }}
                getOptionLabel={(option) => option.proName}
                //  {...selectProfession}
                 sx={{ width: '20%' }} 
                 id="clear-on-escape"
                 clearOnEscape
                 renderInput={(params) => (
                   <TextField {...params} label="Profesión" variant="standard" />
                 )}/>
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
    
            <Autocomplete
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
                   <TextField {...params} label="País" variant="standard" />
                 )}/>

                <Autocomplete
                // value = {federalEntity}
                disabled={(listOfFederalEntities.length === 0)? true : false}
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

                {/* <TextField
                sx={{ width: '20%' }} 
                required
                id="fedId"
                label="Estado"
                variant="standard"
                /> */}

                <TextField
                        sx={{ width: '47%' }}
                            // sx={{ width: 1/2 }} 
                            required
                            id="repAddress"
                            label="Direccion"
                            variant="standard"
                            />

                
    </Stack>

    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                required
                id="repEmail"
                label="Correo"
                variant="standard"
                // helperText={errorMessage}
                // error={errorInput}
                // onChange={e => {
                //   setRepresentativeObject({...representativeObject, repIdentificationNumber : e.target.value ? e.target.value : ''})          
                //   if(e.target.value.length < 6 ){setButtonI(true)}else{setButtonI(false)}
                // }   }
                />
                
                <TextField
                required
                id="repPhones"
                label="Telefono"
                variant="standard"
                />
                <TextField
                required
                id="repPhoto"
                label="Foto"
                variant="standard"
                />
                <TextField
                required
                id="repStatus"
                label="Estatus"
                variant="standard"
                />
                
    </Stack>

    
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>

                <TextField
                
                id="famId"
                label="Familia"
                variant="standard"
                />
                
    </Stack>

  </Box>
  )
}

export default RepresentativeForm