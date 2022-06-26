import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';

const UseStyles = makeStyles({
    selectFamily: {
      marginTop:'2%'
    },
    styleStudent: {
        marginLeft:'4%',
        marginRight:'4%',
        marginTop:'2%'
    },
    typography: {
        marginTop:'2%',
        marginLeft : '2%'
    },
    divider: {
        marginBottom:'2%'
    }
  });

const Estudent = ({endDate, setEndDate,perLevelSec,nonEnrolledStudents}) => {

  const [levelSelect, setLevelSelect] = React.useState(null)
  const [listOfSecctions, setListOfSecctions]= React.useState([])
    // 
  

  const getListOfSecctions =  (levId) => {

    if(levId !== null && levId !== undefined){
      perLevelSec.forEach(item =>{
        if(item.level.levId === levId){
          setListOfSecctions(item.sections)
        }
      })

    }
}

  React.useEffect(() => {  
    if(levelSelect !== '') {
      getListOfSecctions(levelSelect)
    }
}, [levelSelect])

    const classes = UseStyles();

  return (
    <>
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                Estudiante a Inscribir
        </Typography> 
        <Divider variant="middle" className={classes.divider}/>  
        <Stack direction="row" spacing={2}  justifyContent="flex-start" className={classes.styleStudent}>
            <Autocomplete
                // key={clearField.profession}
                noOptionsText={'Sin Opciones'}
                options={nonEnrolledStudents}
                onChange={(event, newValue) => {
                  setEndDate({...endDate, stuId : (newValue !== null)? newValue.stuId : ''})        
                  }}
                getOptionLabel={(option) => `${option.stuIdType}-${option.stuIdentificationNumber} - ${option.stuFirstName} ${option.stuSurname}`}                
                sx={{ width: '40%' }} 
                id="clear-on-escape"
                clearOnEscape
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar Estudiante" variant="standard" />
                )}/>
                <Autocomplete
                // key={clearField.profession}
                noOptionsText={'Sin Opciones'}
                options={perLevelSec}
                onChange={(event, newValue) => {
                  setLevelSelect((newValue !== null)? newValue.level.levId : '')          
                  }}
                getOptionLabel={(option) => option.level.levName}  
                sx={{ width: '25%' }} 
                id="clear-on-escape"
                clearOnEscape
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar Nivel" variant="standard" />
                )}/>

                {(levelSelect !== '' && levelSelect !== null && levelSelect !== undefined )? 
                  <Autocomplete
                  // key={clearField.profession}
                  noOptionsText={'Sin Opciones'}
                  options={listOfSecctions}
                  onChange={(event, newValue) => {
                    setEndDate({...endDate, plsId : (newValue !== null)? newValue.pls : ''})
                      // setSelectedFamily(newValue)           
                    }}
                  getOptionLabel={(option) => `Sección "${option.section.secName}" `}               
                  sx={{ width: '20%' }} 
                  id="clear-on-escape"
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccionar Sección" variant="standard" />
                  )}/>
                : null}
                
        </Stack>
        
    </>
  )
}

export default Estudent