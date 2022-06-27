import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';

const UseStyles = makeStyles({

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
    },
    textfield:{
      marginRight:'2%',
    }
  });

const ListRepresentative = ({endDate, setEndDate,listOfRepresentatives}) => {
    const classes = UseStyles();

  return (
    <>
                <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                    Representantes
                </Typography> 
                <Divider variant="middle" className={classes.divider}/>  
                    {listOfRepresentatives.map(representative =><>
                        <Stack key={representative.repId} direction="row" spacing={2}  justifyContent="flex-start" className={classes.stylerepresentatives}>
                            <TextField
                                className={classes.textfield}
                                InputProps={{ readOnly: true }}
                                value={representative.repBond}
                                id="repBond"
                                label="Vínculo"
                                variant="standard"
                                sx={{ width: '20%' }} 
                            />
                            <TextField
                                className={classes.textfield}
                                InputProps={{ readOnly: true }}
                                value={`${representative.repIdType}-${representative.repIdentificationNumber}`}
                                id="repIdentification"
                                label="Identificación"
                                variant="standard"
                                sx={{ width: '20%' }} 
                            />
                            <TextField
                                InputProps={{ readOnly: true }}
                                value={`${representative.repFirstName} ${representative.repSurname}`}
                                id="repName"
                                label="Nombre Completo"
                                variant="standard"
                                sx={{ width: '50%' }}
                            />
                        </Stack>
                        </>
                        

                    )
                    }
    </>

  )
}

export default ListRepresentative