import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';


const UseStyles = makeStyles({

    styleStudent: {
        marginLeft:'4%',
        marginTop:'2%'
    },
    typography: {
        marginTop:'2%',
        marginLeft : '2%'
    },
    divider: {
        marginBottom:'2%'
    },
    textfield:{
      marginRight:'2%',
    },
    selectFamily: {
      marginTop: '2%',
      marginLeft: '4%'
    },
  });
const SeeEstudent = ({levelSelect2, setLevelSelect2,sectionSelect, setSectionSelect,clearFieldSection, setClearFieldSection,endDate, setEndDate,listOfSecctions, setListOfSecctions,levelSelect, setLevelSelect,perLevelSec,mode, levelSecc, listOfStudents, dataStudent}) => {

    const classes = UseStyles();

  return (
    <>
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                Estudiante Inscrito
        </Typography> 
        <Divider variant="middle" className={classes.divider}/>  
        <Stack direction="row" spacing={4} justifyContent="flex-start" className={classes.selectFamily}>

           <TextField 
                   className={classes.textfield}
                   InputProps={{ readOnly: true }}
                   value={`${dataStudent.stuIdType ? dataStudent.stuIdType : ''}-${(dataStudent.stuIdentificationNumber) ? dataStudent.stuIdentificationNumber : ''}  ${dataStudent.stuFirstName} ${dataStudent.stuSurname}`}
                   id="stuName"
                   label="Nombre de Estudiante"
                   variant="standard"
                   sx={{ width: '40%' }} 
           />
           {(mode === 'see') ? 
            <>
              <TextField
                   className={classes.textfield}
                   InputProps={{ readOnly: true }}
                   value={levelSecc.level}
                   id="insLevel"
                   label="Nivel"
                   variant="standard"
                   sx={{ width: '25%' }} 
                   
              />
              <TextField
              
                      className={classes.textfield}
                      InputProps={{ readOnly: true }}
                      value={`Sección "${levelSecc.section}"`}
                      id="insSection"
                      label="Sección"
                      variant="standard"
                      sx={{ width: '20%' }} 
              />
            </>
           : 
           <>
                <Autocomplete
                value={ levelSelect2 }
                className={classes.textfield}
                noOptionsText={'Sin Opciones'}
                options={perLevelSec}
                onChange={(event, newValue) => {
                  setLevelSelect((newValue !== null)? newValue.level.levId : '')
                  setEndDate({...endDate, plsId :'', levId : (newValue !== null)? newValue.level.levId : ''})
                  setClearFieldSection(clearFieldSection + 1) 
                  setSectionSelect(null)
                  }}
                getOptionLabel={(option) => option.level.levName }   
                sx={{ width: '25%' }} 
                id="clear-on-escape"
                clearOnEscape
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar Nivel" variant="standard" />
                )}/>

                {(endDate.periodLevelSectionI.levId !== '' && endDate.periodLevelSectionI.levId !== null && endDate.periodLevelSectionI.levId !== undefined )? 
                  <Autocomplete
                  key={clearFieldSection}
                  value={ sectionSelect }
                  noOptionsText={'Sin Opciones'}
                  options={listOfSecctions}
                  onChange={(event, newValue) => {
                    setSectionSelect(newValue)
                    setEndDate({...endDate, plsId : (newValue !== null)? newValue.pls : ''})                              
                    }}
                  getOptionLabel={(option) => (option !== null)? `Sección "${option.section.secName}"` : null}               
                  sx={{ width: '25%' }} 
                  id="clear-on-escape"
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField {...params} label="Seleccionar Sección" variant="standard" />
                  )}/>
                : null
                }
           </>
           
           }
           
   
        </Stack>
        
    </>
  )
}

export default SeeEstudent