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
    stylerepresentatives: {
        marginLeft:'4%',
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

const Estudent = () => {

    const classes = UseStyles();


  return (
    <>
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                Estudiante a inscribir
        </Typography> 
        <Divider variant="middle" className={classes.divider}/>  
        <Autocomplete
            // key={clearField.profession}
            noOptionsText={'Sin Opciones'}
            // options={listOfFamilies}
            onChange={(event, newValue) => {
                // setSelectedFamily(newValue)          
              }}
            // getOptionLabel={(option) => option.famName}                
            sx={{ width: '40%' }} 
            id="clear-on-escape"
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} label="Seleccionar Familia" variant="standard" />
             )}/>
    </>
  )
}

export default Estudent