import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { makeStyles } from '@mui/styles';
import ListRepresentative from './ListRepresentative';
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
    const [Reload, SetReload] = React.useState(0);
    const [toShow, setToShow] = React.useState(0)

    const classes = UseStyles();

    
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
        //   setMessage('Error de Conexion')
        //   setAlertModal(true)
          
      }
    }

    const getFamilyById = async () => {

        try {
            
           const resultFamilies = (await AxiosInstance.get(`/representativeStudent/byFam/${selectedFamily.famId}`)).data
           console.log('resultFamilies',resultFamilies)
          if (resultFamilies.ok === true) {
    
            setListOfRepresentatives(resultFamilies.data.representatives)
            setListOfStudents(resultFamilies.data.students)

        //     // setToShow(toShow + 1)
          }
        } catch {
          console.log('error al consutlar')
          //   setMessage('Error de Conexion')
          //   setAlertModal(true)
        }
      }

    React.useEffect(() => {  
        getFamilies()  
    }, [Reload])

    React.useEffect(() => {  
        getFamilyById()   //buscar representantes por familia
    }, [selectedFamily])

  return (
    <Box>
        <h4 id="child-modal-title">Nueva Inscripción</h4>
        <Stack direction="row" spacing={2}  justifyContent="space-between" className={classes.selectFamily}>
        <Autocomplete
            // key={clearField.profession}
            noOptionsText={'Sin Opciones'}
            options={listOfFamilies}
            onChange={(event, newValue) => {
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
            <ListRepresentative listOfRepresentatives={listOfRepresentatives}/>
         : null}
    </Box>
  )
}

export default AddInscription