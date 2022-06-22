import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import TableRepresentative from './TableRepresentative';
import SearchStudent from './SearchStudent';
import TableStudent from './TableStudent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom'
import Divider from '@mui/material/Divider';

const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
  stack: {
    marginTop: '5%'

  },
  typography: {
    marginLeft: '3%'
  },
  box: {
    marginTop: '2%'
  },
  TextField: {
    marginBottom: '2%',
    marginTop: '1%',
    marginLeft: '2%',
    marginRight: '2%'
  }

});

const SeeFamily = () => {

  let { famid } = useParams();
  const [family, setFamily] = React.useState(famid)
  const [listRepresentative, setListRepresentative] = React.useState([])
  const [listStudent, setListStudent] = React.useState([])
  const [toShow, setToShow] = React.useState(0)
  const [familyData, setFamilyData] = React.useState({})
  const [representativesData, setRepresentativesData] = React.useState([])
  const [studentsData, setStudentsData] = React.useState([])

  const classes = UseStyles();

  const getFamilyById = async () => {

    try {
      const resultFamilies = (await AxiosInstance.get(`/representativeStudent/byFam/${famid}`)).data

      if (resultFamilies.ok === true) {
        setFamilyData(resultFamilies.data.family)
        setRepresentativesData(resultFamilies.data.representatives)
        setStudentsData(resultFamilies.data.students)
        setToShow(toShow + 1)
      }
    } catch {
      console.log('error al consutlar')
      //   setMessage('Error de Conexion')
      //   setAlertModal(true)

    }
  }

  React.useEffect(() => {
    getFamilyById()
  }, [family]);

  React.useEffect(() => {
    // getFamilyById()    
  }, [toShow]);

  return (
    <>
    <Box>
      <h4 id="child-modal-title">Detalles de Familia </h4>
    </Box>
    {(toShow > 0) ?
      <>
        <Stack direction="row" spacing={8} justifyContent="flex-start" className={classes.TextField}>
          <TextField
            sx={{ width: '47%' }}
            InputProps={{ readOnly: true }}
            value={familyData.famName}
            id="familyName"
            label="Nombre de Familia"
            variant="standard"
          />
          <TextField
            InputProps={{ readOnly: true }}
            value={familyData.famCode}
            id="familyCode"
            label="Código de Familia"
            variant="standard"
          />
        </Stack>
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
          Representantes
        </Typography>
        <Divider variant="middle" />
        
        {
          representativesData.map(representative =><>
            <Stack direction="row" spacing={9} justifyContent="flex-start" className={classes.TextField}>
              <TextField
                  sx={{ width: '20%' }}
                  value={representative.repBond}
                  id="repIdType"
                  label="Vínculo"
                  variant="standard"
                  InputProps={{ readOnly: true }}
                /> 
              <TextField
                sx={{ width: '20%' }}
                value={representative.repIdType}
                id="repIdType"
                label="Tipo de Identificación"
                variant="standard"
                InputProps={{ readOnly: true }}
              /> 
              <TextField
                sx={{ width: '20%' }}
                value={representative.repIdentificationNumber}
                id="repIdentificationNumber"
                label="Identificación"
                variant="standard"
                InputProps={{ readOnly: true }}
              />               
            </Stack>
            <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
             <TextField
                sx={{ width: '20%' }}
                value={representative.repFirstName}
                id="repFirstName"
                label="Primer Nombre"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField
                sx={{ width: '20%' }}
                value={representative.repSecondName}
                id="repSecondName"
                label="Segundo Nombre"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField       
                sx={{ width: '20%' }}     
                value={representative.repSurname}
                id="repSurname"
                label="Primer Apellido"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField       
                sx={{ width: '20%' }}     
                value={representative.repSecondSurname}
                id="repSecondSurname"
                label="Segundo Apellido"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                
            </Stack>
            <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
              <TextField
                sx={{ width: '20%' }}
                id="repDateOfBirth"
                value={representative.repDateOfBirth}
                label="Fecha de Nacimiento"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField
                value={representative.repEmail}
                sx={{ width: '20%' }}
                id="repEmail"
                label="Correo"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField            
                sx={{ width: '47%' }}
                value={representative.repPhones}
                id="repSurname"
                label="Télefonos"
                variant="standard"
                InputProps={{ readOnly: true }}
                />             
            </Stack>
          </>)

        }
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
          Estudiantes
        </Typography>
        <Divider variant="middle" />

        {
          studentsData.map(student =><>
            <Stack direction="row" spacing={9} justifyContent="flex-start" className={classes.TextField}> 
              <TextField
                sx={{ width: '20%' }}
                value={student.stuIdType}
                id="repIdType"
                label="Tipo de Identificación"
                variant="standard"
                InputProps={{ readOnly: true }}
              /> 
              <TextField
                sx={{ width: '20%' }}
                value={student.stuIdentificationNumber}
                id="repIdentificationNumber"
                label="Identificación"
                variant="standard"
                InputProps={{ readOnly: true }}
              />               
            </Stack>
            <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.TextField}>
             <TextField
                sx={{ width: '20%' }}
                value={student.stuFirstName}
                id="repFirstName"
                label="Primer Nombre"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField
                sx={{ width: '20%' }}
                value={student.stuSecondName}
                id="repSecondName"
                label="Segundo Nombre"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField       
                sx={{ width: '20%' }}     
                value={student.stuSurname}
                id="repSurname"
                label="Primer Apellido"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField       
                sx={{ width: '20%' }}     
                value={student.stuSecondSurname}
                id="repSecondSurname"
                label="Segundo Apellido"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                
            </Stack>
            <Stack direction="row" spacing={9}  justifyContent="flex-start" className={classes.TextField}>
              <TextField
                sx={{ width: '20%' }}
                id="repDateOfBirth"
                value={student.stuDateOfBirth}
                label="Fecha de Nacimiento"
                variant="standard"
                InputProps={{ readOnly: true }}
                />
                <TextField
                value={(student.stuSex === 'f')?'Femenina': 'Masculino'}
                sx={{ width: '20%' }}
                id="repEmail"
                label="Sexo"
                variant="standard"
                InputProps={{ readOnly: true }}
                />             
            </Stack>
          </>)

        }
      </>
    
    : null}
    <Stack className={classes.stack} spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
        <NavLink to='/familias' >
            <Button variant="outlined"color="error">Cerrar</Button>
        </NavLink>
    </Stack>
    </>
   )
}

        export default SeeFamily