import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const UseStyles = makeStyles({
    styleObservation: {
        marginLeft:'4%',
        marginRight:'4%',
        marginTop:'4%'
    }
  });

const Observation = ({endDate, setEndDate}) => {

    
    const classes = UseStyles();


  return (
    <Stack direction="row"  justifyContent="flex-start" className={classes.styleObservation}>
        <TextField
            sx={{ width: '100%' }} 
            id="observation"
            label="Observación"
            variant="outlined"
            onChange={e => {
                setEndDate({...endDate, insObservation : (e.target.value) ? e.target.value : ''}) 
            }   }
        /> 

    </Stack>
    
  )
}

export default Observation