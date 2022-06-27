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
    }
  });
const SeeEstudent = ({listOfStudents}) => {

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
                //    value={family.famCode}
                   id="styIdentification"
                   label="Identificación"
                   variant="standard"
                   sx={{ width: '10%' }} 
           />
           <TextField
                   className={classes.textfield}
                   InputProps={{ readOnly: true }}
                //    value={family.famName}
                   id="stuName"
                   label="Nombre de Estudiante"
                   variant="standard"
                   sx={{ width: '30%' }} 
           />
           <TextField
                   className={classes.textfield}
                   InputProps={{ readOnly: true }}
                //    value={family.famName}
                   id="insLevel"
                   label="Nivel"
                   variant="standard"
                   sx={{ width: '20%' }} 
           />
           <TextField
                   className={classes.textfield}
                   InputProps={{ readOnly: true }}
                //    value={family.famName}
                   id="insSection"
                   label="Sección"
                   variant="standard"
                   sx={{ width: '10%' }} 
           />
   
        </Stack>
    </>
  )
}

export default SeeEstudent