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
import Observation from './Observation';

const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({

    styleStudent: {
      marginLeft:'4%',
      marginTop:'2%'
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
    const [dataStudent, setDataStudent] = React.useState(null)
    const [family, setFamily] = React.useState(null)
    const [listOfRepresentatives, setListOfRepresentatives] = React.useState([]);
    const [listOfStudents, setListOfStudents] = React.useState([]);
    const [levelSecc, setLevelSecc] = React.useState(null)
    const [insObservation, setInsObservation] = React.useState(null)
    const mode = 'see'

  const classes = UseStyles();

  const getInscriptionById = async () => {

    try {
      const resultInscrption = (await AxiosInstance.get(`/inscriptions/${insid}`)).data

      if (resultInscrption.ok === true) {
        setFamily(resultInscrption.data.family)
        setDataStudent(resultInscrption.data.student)
        setLevelSecc({ level: resultInscrption.data.periodLevelSectionI.level.levName,
                      section: resultInscrption.data.periodLevelSectionI.section.secName})
        setInsObservation(resultInscrption.data.insObservation)
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
    {(family !== null && dataStudent !== null && levelSecc !== null && insObservation !== null )?
        <>
        <Stack direction="row" spacing={4} justifyContent="flex-start" className={classes.styleStudent}>
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
        <SeeEstudent levelSecc={levelSecc}  listOfStudents={listOfStudents} dataStudent={dataStudent}/>
        <Observation mode={mode} insObservation={insObservation}/>
        </>
        
    : null
    }
     
     <Stack className={classes.stack} spacing={2} alignItems="flex-end" direction="row" justifyContent="center">
          <NavLink to='/inscriptions' >
            <Button variant="outlined" color="error">Cerrar</Button>
          </NavLink>
        </Stack> 


  </Box>
  )
}

export default SeeInscription