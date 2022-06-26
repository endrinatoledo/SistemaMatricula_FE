import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { makeStyles } from '@mui/styles';
import ListRepresentative from './ListRepresentative';
import Estudent from './Estudent';
const AxiosInstance = require("../utils/request").default;

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
    },

  
  });

const AddInscription = () => {

    const [listOfFamilies, setListOfFamilies] = React.useState([]);
    const [listOfRepresentatives, setListOfRepresentatives] = React.useState([]);
    const [listOfStudents, setListOfStudents] = React.useState([]);
    const [selectedFamily, setSelectedFamily] = React.useState();
    const [activePeriod, setActivePeriod] = React.useState();
    const [nonEnrolledStudents, setNonEnrolledStudents] = React.useState([]);
    const [perLevelSec, setPerLevelSec] = React.useState([])
    const [endDate, setEndDate] = React.useState({plsId:'', famId:'',insObservation:'',stuId:'',perId:''})
    const [Reload, SetReload] = React.useState(0);
    const [toShow, setToShow] = React.useState(0)
    const [levelSelect, setLevelSelect] = React.useState(null)
    const [listOfSecctions, setListOfSecctions]= React.useState([])
    const [clearField, setClearField] = React.useState(0)


    console.log('endDate',endDate)

    const classes = UseStyles();

    const getActivePeriod = async () => {

      try{
        const resultPeriod = (await AxiosInstance.get("/periods/onePeriod/active/")).data
        if(resultPeriod.ok === true){
          setActivePeriod(resultPeriod.data)

          setEndDate({...endDate, perId: resultPeriod.data.perId}) 

          const resultPLS = (await AxiosInstance.get(`/periodLevelSection/period/${resultPeriod.data.perId}`)).data

          setPerLevelSec(resultPLS.data.levels)
        }
      }catch{
          console.log('error al consultar periodo activo')
        
    }
  }
    
    const getFamilies = async () => {

        try{
          const resultFamilies = (await AxiosInstance.get("/representativeStudent/groupedByFamily/")).data
          if(resultFamilies.ok === true){
            const data = resultFamilies.data
            let resultFam = []

            data.forEach(item =>{
                resultFam.push({
                    famId : item.famId,
                    famName : `${item.families.famCode} - ${item.families.famName}`,
                    family : item.families,
                })
            })
            
            setListOfFamilies(resultFam)

          }
        }catch{
            console.log('error al consultar listado de familias')          
      }
    }

    const getFamilyById = async () => {
        try {
           const resultFamilies = (await AxiosInstance.get(`/representativeStudent/byFam/${selectedFamily.famId}`)).data
          if (resultFamilies.ok === true) {
            
            setListOfRepresentatives(resultFamilies.data.representatives)
            setListOfStudents(resultFamilies.data.students)
          }
        } catch {
          console.log('error al consutlar')
        }
      }

      const getNonEnrolledStudents = async () => {

        const values = {
          students : listOfStudents,
          period : activePeriod
        }
        try {
           const resultStudent = (await AxiosInstance.post(`/inscriptions/student/period/`,values)).data
          if (resultStudent.ok === true) {
            setNonEnrolledStudents(resultStudent.data)
          }
        } catch {
          console.log('error al consutlar estudiantes inscritos en periodo actual')
        }
      }

    React.useEffect(() => {  
        getFamilies()  
        getActivePeriod()
    }, [Reload])

    React.useEffect(() => {  
        getFamilyById()   //buscar representantes por familia
    }, [selectedFamily])

    React.useEffect(() => {  
      getNonEnrolledStudents()   //buscar estudiantes no inscritos en periodo actual
  }, [listOfStudents])
    

  return (
    <Box>
        <h4 id="child-modal-title">Nueva Inscripción</h4>
        <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.selectFamily}>
        <Autocomplete
            // key={clearField.profession}
            noOptionsText={'Sin Opciones'}
            options={listOfFamilies}
            onChange={(event, newValue) => {
                setListOfRepresentatives([])
                setClearField(clearField + 1)
                setEndDate({...endDate, stuId :'', famId: (newValue !== null)? newValue.famId : ''})      
                setSelectedFamily(newValue)
              }}
            getOptionLabel={(option) => option.famName}                
            sx={{ width: '40%' }} 
            id="clear-on-escape"
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} label="Seleccionar Familia" variant="standard" />
             )}/>
        </Stack> 

        {(selectedFamily)? 
            <>
              <ListRepresentative endDate={endDate} setEndDate={setEndDate} listOfRepresentatives={listOfRepresentatives}/>
              <Estudent clearField={clearField} listOfSecctions={listOfSecctions} setListOfSecctions={setListOfSecctions} levelSelect={levelSelect} setLevelSelect={setLevelSelect} endDate={endDate} setEndDate={setEndDate} perLevelSec={perLevelSec} nonEnrolledStudents={nonEnrolledStudents}/>
            </>
            
         : null}
    </Box>
  )
}

export default AddInscription