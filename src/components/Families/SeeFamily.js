import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import SearchRepresentative from './SearchRepresentative'
import TableRepresentative from './TableRepresentative';
import SearchStudent from './SearchStudent';
import TableStudent from './TableStudent';
import TextField from '@mui/material/TextField';
import FamilyData from './FamilyData';
import {NavLink} from 'react-router-dom'
import LoadingButtons from '../commonComponents/LoadingButton';
const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
  stack: {
    marginTop:'5%'
  },

});

const SeeFamily = () => {
 
    let {famid} = useParams();
    console.log('params',famid)
    const [family, setFamily] = React.useState(famid)
    const [listRepresentative, setListRepresentative] = React.useState([])
    const [listStudent, setListStudent] = React.useState([])
    const [familyName, setFamilyName] = React.useState('')

  const classes = UseStyles();

  const getFamilyById = async () => {

    try{
      const resultFamilies = (await AxiosInstance.get(`/representativeStudent/byFam/${famid}`)).data
        console.log('resultFamilies',resultFamilies)
      if(resultFamilies.ok === true){
        // setDataSource(resultFamilies.data)
      }
    }catch{
    //   setMessage('Error de Conexion')
    //   setAlertModal(true)
      
  }
}

  React.useEffect(() => {  
    getFamilyById()    
    }, [family]);

  return (
    <>
    <Box >
      <h4 id="child-modal-title">Detalles de Familia </h4>

        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.TextField}>
              
            <TextField
                required
                sx={{ width: '47%' }}
                // value={(editRepresentative) ? selectedRepresentative.repFirstName :representativeObject.repFirstName}
                id="familyName"
                label="Nombre de Familia"
                variant="standard"
            />
                      
               </Stack>
        {/* <FamilyData familyName={familyName} setFamilyName={setFamilyName} /> */}
        <SearchRepresentative listRepresentative={listRepresentative} setListRepresentative={setListRepresentative}/>
        <TableRepresentative  listRepresentative={listRepresentative} setListRepresentative={setListRepresentative}/>
        <SearchStudent listStudent={listStudent} setListStudent={setListStudent} ></SearchStudent>
        <TableStudent listStudent={listStudent} setListStudent={setListStudent}></TableStudent>
    
                  <Stack className={classes.stack} spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
                    <NavLink to='/familias' >
                        <Button variant="outlined"color="error">Cerrar</Button>
                      {/* <Button variant="outlined" onClick={confirmCancelNewRepresentative} color="error">Cancelar</Button> */}
                    </NavLink>
                  </Stack>
                
    </Box>
                   
    </>
  )
}

export default SeeFamily