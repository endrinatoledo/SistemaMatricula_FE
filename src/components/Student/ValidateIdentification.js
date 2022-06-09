import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
const AxiosInstance = require("../utils/request").default;

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

  const IdentificationType = [
    {value:"v",
      label : "Venezolano"},
    {value:"e",
      label : "Extranjero"},
    {value:"p",
      label : "Pasaporte"}
  ]




const ValidateIdentification = ({editStudent,setOrfStuIdentificationNumber,setIdentificationValidation, identificationValidation, orfStuIdentificationNumber, setStudentObject, studentObject}) => {

    const [buttonI, setButtonI] = React.useState(true)
    const [errorMessage, setErrorMessage] = React.useState('')
    const classes = UseStyles();

    const validate_Identification = async () => {
        try{
          const data = (await AxiosInstance.post("/students/byIdentification",studentObject)).data

          
          if(data.data === 'registrado'){
            setOrfStuIdentificationNumber(true)
            setErrorMessage(data.message)
          }else{
            setOrfStuIdentificationNumber(false)
            setIdentificationValidation(true)
            setErrorMessage('')

          }
        }catch{
          console.log('no')
          // setConnErr(true)
        }
    
      }

  return (
    <div>
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              <TextField 
              disabled={(identificationValidation || editStudent)? true :  false}
              sx={{ width: '20%' }} 
              id="stuIdType"
              select
              label="Tipo Idenfiticación"
              onChange={e => {
                setStudentObject({...studentObject, stuIdType : e.target.value ? e.target.value : 'v'})
              }}
              SelectProps={{
                native: true,
              }}
              
              variant="standard"
            >
              {IdentificationType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
                </TextField>
                <TextField
                disabled={(identificationValidation || editStudent)? true :  false}
                sx={{ width: '20%' }} 
                required
                value={studentObject.stuIdentificationNumber}
                id="stuIdentificationNumber"
                label="Identificación"
                variant="standard"
                helperText={errorMessage}
                error={orfStuIdentificationNumber}
                onChange={e => {
                  setStudentObject({...studentObject, stuIdentificationNumber : e.target.value ? e.target.value : ''})          
                  if(e.target.value.length < 6 ){setButtonI(true)}else{setButtonI(false)}
                }
                
                }
                />
                <Button variant="outlined" disabled={(buttonI || editStudent || identificationValidation? true :  false)} size="small" onClick={() => validate_Identification()}>Validar</Button>
         </Stack>
        
        </div>
  )
}

export default ValidateIdentification