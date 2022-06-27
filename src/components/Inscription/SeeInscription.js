import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import ListRepresentative from './ListRepresentative';
import SeeEstudent from './SeeEstudent';

const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
    selectFamily: {
      marginTop: '2%',
      marginLeft: '4%'
    },
    representatives: {
      marginLeft: '4%',
    },
    typography: {
      marginTop: '2%',
      marginLeft: '2%'
    },
    divider: {
      marginBottom: '2%'
    },
    stack: {
      marginTop: '5%'
    },
  
  
  });

const SeeInscription = () => {

    let { insid } = useParams();
    const [insId, setInsId] = React.useState(insid)
    const [family, setFamily] = React.useState(null)
    const [listOfRepresentatives, setListOfRepresentatives] = React.useState([]);
    const [listOfStudents, setListOfStudents] = React.useState([]);

  const classes = UseStyles();

  const getInscriptionById = async () => {

    try {
      const resultInscrption = (await AxiosInstance.get(`/inscriptions/${insid}`)).data

        console.log('****visualizar datos de la inscripcion****', resultInscrption)

      if (resultInscrption.ok === true) {
        setFamily(resultInscrption.data.family)
      }
    } catch {
      console.log('error al consutlar')
    }
  }

  const getFamilyById = async () => {
    try {
      const resultFamilies = (await AxiosInstance.get(`/representativeStudent/byFam/${family.famId}`)).data
      if (resultFamilies.ok === true) {
        console.log('resultFamilies',resultFamilies.data)
        setListOfRepresentatives(resultFamilies.data.representatives)
        setListOfStudents(resultFamilies.data.students)
      }
    } catch {
      console.log('error al consutlar')
    }
  }

  React.useEffect(() => {
    getInscriptionById() 
  }, [insId]);  
  React.useEffect(() => {
    getFamilyById()   
  }, [family]);
  return (
    <Box>
    <h4 id="child-modal-title">Ver Inscripción</h4>
    {(family !== null)?
        <>
        <Stack direction="row" spacing={4} justifyContent="flex-start" className={classes.selectFamily}>
        <TextField
                   className={classes.textfield}
                   InputProps={{ readOnly: true }}
                   value={family.famCode}
                   id="famCode"
                   label="Código de Familia"
                   variant="standard"
                   sx={{ width: '15%' }} 
           />
           <TextField
                   className={classes.textfield}
                   InputProps={{ readOnly: true }}
                   value={family.famName}
                   id="famName"
                   label="Nombre de Familia"
                   variant="standard"
                   sx={{ width: '40%' }} 
           />
   
        </Stack>
        <ListRepresentative listOfRepresentatives={listOfRepresentatives} />
        <SeeEstudent listOfStudents={listOfStudents}/>
        </>
        
    : null
    }
     
      
        
 {/*     <Autocomplete
        // key={clearField.profession}
        noOptionsText={'Sin Opciones'}
        options={listOfFamilies}
        onChange={(event, newValue) => {
          setListOfRepresentatives([])
          setClearField(clearField + 1)
          setEndDate({ ...endDate, stuId: '', famId: (newValue !== null) ? newValue.famId : '' })
          setSelectedFamily(newValue)
        }}
        getOptionLabel={(option) => option.famName}
        sx={{ width: '40%' }}
        id="clear-on-escape"
        clearOnEscape
        renderInput={(params) => (
          <TextField {...params} label="Seleccionar Familia" variant="standard" />
        )} />
    </Stack>

    {(selectedFamily) ?
      <>
        <ListRepresentative endDate={endDate} setEndDate={setEndDate} listOfRepresentatives={listOfRepresentatives} />
        <Estudent clearField={clearField} listOfSecctions={listOfSecctions} setListOfSecctions={setListOfSecctions} levelSelect={levelSelect} setLevelSelect={setLevelSelect} endDate={endDate} setEndDate={setEndDate} perLevelSec={perLevelSec} nonEnrolledStudents={nonEnrolledStudents} />
        <Observation endDate={endDate} setEndDate={setEndDate} />
      </>

      : null}

    {
      (statusCcircularProgress) ?
        <Stack className={classes.stack} spacing={2} alignItems="flex-end" direction="row" justifyContent="center">
          <LoadingButtons message={'Guardando'} />
        </Stack>

        :
        <Stack className={classes.stack} spacing={2} alignItems="flex-end" direction="row" justifyContent="center">
          <NavLink to='/inscriptions' >
            <Button variant="outlined" onClick={confirmCancelInscrip} color="error">Cancelar</Button>
          </NavLink>
          <Button variant="contained" disabled={disableButtonSave} onClick={saveInscription} color="success">Guardar</Button>
        </Stack>
    }
  {(alertModal) ? 
        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null} 
 */}


  </Box>
  )
}

export default SeeInscription