import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
    // height : '50%',
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

const SeeStudent = ({selectedStudent}) => {

  console.log('este componente',selectedStudent)
  const classes = UseStyles();
  return (
    <Box >
      <div>
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              <TextField 
              sx={{ width: '20%' }} 
              id="stuIdType"
              label="Tipo Idenfiticación"
              variant="standard"
              value={(selectedStudent.stuIdType === "v")?'Venezolano'
              : (selectedStudent.stuIdType === "e")? 'Extranjero' : 'Pasaporte'}
             />
                <TextField
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: '20%' }} 
                required
                value={selectedStudent.stuIdentificationNumber}
                id="stuIdentificationNumber"
                label="Identificación"
                variant="standard"
                />
         </Stack>
        
        </div>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                value={selectedStudent.stuFirstName}
                id="stuFirstName"
                label="Primer Nombre"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={selectedStudent.stuSecondName}
                id="stuSecondName"
                label="Segundo Nombre"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                
                value={selectedStudent.stuSurname}
                id="stuSurname"
                label="Primer Apellido"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                id="stuSecondSurname"
                value={selectedStudent.stuSecondSurname}
                label="Segundo Apellido"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                type='date'
                id="stuDateOfBirth"
                label="Fecha de Nacimiento"
                variant="standard"
                sx={{ width: '20%' }}  
                value={selectedStudent.stuDateOfBirth}
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={(selectedStudent.stuSex === 'm')? 'Masculino' : 'Femenino'}
                id="stuSex"
                label="Sexo"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                
                value={selectedStudent.stuCivilStatus}
                id="stuCivilStatus"
                label="Estado Civil"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                id="professions"
                value={selectedStudent.professions.proName}
                label="Profesión"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                id="countries"
                label="País"
                variant="standard"
                sx={{ width: '20%' }}  
                value={selectedStudent.countries.couName}
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={selectedStudent.federalEntity.fedName}
                id="federalEntity"
                label="Estado"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>

                <TextField
                id="families"
                value={selectedStudent.families.famName}
                label="Familia"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                id="stuStatus"
                label="Estatus"
                variant="standard"
                sx={{ width: '20%' }}  
                value={(selectedStudent.stuStatus === 1)?'Activo' : 'Inactivo'}
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
  </Box>
  )
}

export default SeeStudent