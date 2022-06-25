import React from 'react'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
const AxiosInstance = require("../utils/request").default;
const UseStyles = makeStyles({
    typography: {
      marginLeft : '3%'
    },
    box:{
        marginTop:'2%'
    },
    TextField:{
        marginBottom : '3%',
        marginTop:'2%',
        marginLeft:'3%'
      }
  });


const FamilyData = ({familyName, setFamilyName, familyData,setFamilyData}) => {
    const classes = UseStyles();

    // console.log('este es family fata', familyData)

    if(familyData !== null){
      setFamilyName(familyData.famName)
    } 

    return (
    <>
    <Box className={classes.box}>
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              
        <TextField
                required
                sx={{ width: '47%' }}
                value={(familyData !== null)?familyData.famName:familyName}
                id="familyName"
                label="Nombre de Familia"
                variant="standard"
                onChange={e => {
                  setFamilyName(e.target.value ? e.target.value : '')
                  setFamilyData({...familyData, famName : e.target.value ? e.target.value : ''})
                }   }
                />
          {
            (familyData !== null)?
              <TextField
                InputProps={{ readOnly: true }}
                value={familyData.famCode}
                id="familyCode"
                label="Código de Familia"
                variant="standard"
              />
            :
            null
          }      
                
         </Stack>
    </Box>
        
    </>
  )
}

export default FamilyData