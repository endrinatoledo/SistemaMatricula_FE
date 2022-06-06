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

const SeeRepresentative = ({selectedRepresentative}) => {

  console.log('este componente',selectedRepresentative)
  const classes = UseStyles();
  return (
    <Box >
      <div>
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              <TextField 
              sx={{ width: '20%' }} 
              id="repIdType"
              label="Tipo Idenfiticación"
              variant="standard"
              value={(selectedRepresentative.repIdType === "v")?'Venezolano'
              : (selectedRepresentative.repIdType === "e")? 'Extranjero' : 'Pasaporte'}
             />
                <TextField
                InputProps={{
                  readOnly: true,
                }}
                sx={{ width: '20%' }} 
                required
                value={selectedRepresentative.repIdentificationNumber}
                id="repIdentificationNumber"
                label="Identificación"
                variant="standard"
                />
         </Stack>
        
        </div>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                value={selectedRepresentative.repFirstName}
                id="repFirstName"
                label="Primer Nombre"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={selectedRepresentative.repSecondName}
                id="repSecondName"
                label="Segundo Nombre"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                
                value={selectedRepresentative.repSurname}
                id="repSurname"
                label="Primer Apellido"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                id="repSecondSurname"
                value={selectedRepresentative.repSecondSurname}
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
                id="repDateOfBirth"
                label="Fecha de Nacimiento"
                variant="standard"
                sx={{ width: '20%' }}  
                value={selectedRepresentative.repDateOfBirth}
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={(selectedRepresentative.repSex === 'm')? 'Masculino' : 'Femenino'}
                id="repSex"
                label="Sexo"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                
                value={selectedRepresentative.repCivilStatus}
                id="repCivilStatus"
                label="Estado Civil"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                id="professions"
                value={selectedRepresentative.professions.proName}
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
                value={selectedRepresentative.countries.couName}
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={selectedRepresentative.federalEntity.fedName}
                id="federalEntity"
                label="Estado"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                
                value={selectedRepresentative.repAddress}
                id="repAddress"
                label="Dirección"
                variant="standard"
                sx={{ width: '47%' }}
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                id="repEmail"
                label="Correo"
                variant="standard"
                sx={{ width: '20%' }}  
                value={selectedRepresentative.repEmail}
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={selectedRepresentative.repPhones}
                id="repPhones"
                label="Teléfono"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                value={selectedRepresentative.repBond}
                id="repBond"
                label="Vínculo"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
                <TextField
                id="families"
                value={selectedRepresentative.families.famName}
                label="Familia"
                variant="standard"
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
    <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
                <TextField
                id="repStatus"
                label="Estatus"
                variant="standard"
                sx={{ width: '20%' }}  
                value={(selectedRepresentative.repStatus === 1)?'Activo' : 'Inactivo'}
                InputProps={{
                  readOnly: true,
                }}
                />
    </Stack>
  </Box>
  )
}

export default SeeRepresentative