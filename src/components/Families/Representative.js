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
  const IdentificationType = [
    {value:"v",
      label : "Venezolano"},
    {value:"e",
      label : "Extranjero"},
    {value:"p",
      label : "Pasaporte"}
  ]

const Representative = () => {
    const classes = UseStyles();
    const [identification, setIdentification] = React.useState({repIdType:null, repIdentificationNumber: ''})
    const [buttonI, setButtonI] = React.useState(true)
    const [dataRepresentatives, setDataRepresentatives] = React.useState([])

    console.log('*********',dataRepresentatives)

    const labelType = (value) =>{
        if(value !== null){
          const result =  IdentificationType.filter(item => {
            return value === item.value
          })
          if(result.length > 0){
            return result[0]
          }else{
            return null
          }
        }else{
          return null
        }      
      }

    const searchIdentification = async () => {
        try{
          const data = (await AxiosInstance.post("/representatives/byIdentification",identification)).data

          let array = dataRepresentatives
          console.log('data',data)
          if(data.data === 'registrado'){
            array.push(data.result)
            setDataRepresentatives(array)
            // setKeyIdentification(keyIdentification + 1)
            setIdentification({repIdType:null, repIdentificationNumber: ''})
          }
          
        }catch{
          console.log('***no')
          // setConnErr(true)
        }
    
      }

  console.log('identification',identification)
    return (
    <>
    <Box className={classes.box}>
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
            Representantes
        </Typography> 
        <Divider variant="middle" />
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
            
        <Autocomplete 
                options={IdentificationType}
                renderInput={(params) =>(
                  <TextField {...params} label="Tipo Idenfiticación" variant="standard"/>
                )}
                value={labelType(identification.repIdType)}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  setIdentification({...identification, repIdType : newValue.value ? newValue.value : null})          
                //   setSelectedRepresentative({...selectedRepresentative, repStatus : newValue.value ? newValue.value : selectedRepresentative.repStatus})
                }}
                required
                // key={clearField.status}
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }} 
                 id="clear-on-escape"
                />
            
                <TextField
                // disabled={(identificationValidation || editRepresentative)? true :  false}
                sx={{ width: '20%' }} 
                required
                // key={keyIdentification}
                value={identification.repIdentificationNumber}
                id="repIdentificationNumber"
                label="Identificación"
                variant="standard"
                // helperText={errorMessage}
                // error={orfRepIdentificationNumber}
                onChange={e => {
                    setIdentification({...identification, repIdentificationNumber : e.target.value ? e.target.value : ''})          
                      if(e.target.value.length < 6 ){setButtonI(true)}else{setButtonI(false)}
                }
                
                }
                />
                
                <Button variant="outlined" size="small" disabled={buttonI} onClick={() => searchIdentification()}>Buscar</Button>
         </Stack>
    </Box>
        
    </>
  )
}

export default Representative