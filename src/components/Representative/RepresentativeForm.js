import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

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

const RepresentativeForm = ({setRepresentativeObject, representativeObject}) => {


    const classes = UseStyles();

    const [valueDate, setValueDate] = React.useState(new Date('2014-08-18T21:11:54'));

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
                
                <TextField
                required
                id="repSex"
                label="Sexo"
                variant="standard"
                />
                <TextField
                required
                id="repCivilStatus"
                label="Estado Civil"
                variant="standard"
                />
                <TextField
                required
                id="proId"
                label="Profesión"
                variant="standard"
                />
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>

            <TextField
                sx={{ width: '20%' }} 
                required
                id="couId"
                label="Pais"
                variant="standard"
                />
                <TextField
                sx={{ width: '20%' }} 
                required
                id="fedId"
                label="Estado"
                variant="standard"
                // helperText={errorMessage}
                // error={errorInput}
                // onChange={e => {
                //   setRepresentativeObject({...representativeObject, repIdentificationNumber : e.target.value ? e.target.value : ''})          
                //   if(e.target.value.length < 6 ){setButtonI(true)}else{setButtonI(false)}
                // }   }
                />

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