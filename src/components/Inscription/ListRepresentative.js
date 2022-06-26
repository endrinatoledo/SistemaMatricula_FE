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
    representatives: {
        marginLeft:'4%'
    },
    typography: {
        marginTop:'2%',
        marginLeft : '2%'
    },
    divider: {
        marginBottom:'2%'
    }
  });

const ListRepresentative = ({listOfRepresentatives}) => {
    const classes = UseStyles();

  return (
    
    <>
                <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                    Representantes
                </Typography> 
                <Divider variant="middle" className={classes.divider}/>
                <>
                    {listOfRepresentatives.forEach(representative =>{
                        // console.log('entro aqui',representative)
                        <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.representatives}>
                            <TextField
                                InputProps={{ readOnly: true }}
                                value={representative.repBond}
                                id="familyCode"
                                label="Vínculo"
                                variant="standard"
                                sx={{ width: '20%' }} 
                            />
                            <TextField
                                InputProps={{ readOnly: true }}
                                value={representative.repIdentification}
                                id="familyCode"
                                label="Identificación"
                                variant="standard"
                                sx={{ width: '20%' }} 
                            />
                            <TextField
                                InputProps={{ readOnly: true }}
                                value={representative.repName}
                                id="familyCode"
                                label="Nombre Completo"
                                variant="standard"
                                sx={{ width: '50%' }}
                            />
                        </Stack>

                    })
                    }
                </>
   
            </>

  )
}

export default ListRepresentative