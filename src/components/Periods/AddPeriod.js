import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import LoadingButtons from '../commonComponents/LoadingButton';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import TableLevels from './TableLevels';
const AxiosInstance = require("../utils/request").default;


const UseStyles = makeStyles({
    period: {
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

const AddPeriod = () => {

    const [Reload, SetReload] = React.useState(0);
    const [buttonI, setButtonI] = React.useState(true)
    const [periodObject, setPeriodObject] = React.useState(
      {startYear : 0, inputStartYear : false, 
        selectedPeriods:[], selectedSecctions:[]}
      )
    const [message  , setMessage] = React.useState('')
    const [alertType, setAlertType] = React.useState('');
    const [alertModal, setAlertModal] = React.useState(false)
    const [allLevels, setAllLevels] = React.useState([]) //carga el listado de niveles
    const [allSections, setAllSections] = React.useState([])//carga el listado de secciones
    const [levelsMap, setLevelsMap] = React.useState([]) //descartado: DE NIVELES MAPEADOS
    const mode = 'add'
    const classes = UseStyles();



    console.log('levelsMap',levelsMap) 
    const searchPeriod = async () => {
        try{
          const data = (await AxiosInstance.get(`/periods/startYear/${periodObject.startYear}`)).data

          
          if(data.message === 'Periodo registrado'){
            console.log('llegoooooo',data.message)
            setMessage(data.message)
            setAlertType('error')
            setAlertModal(true)
            setPeriodObject({...periodObject, inputStartYear : false})
          } else
          if(data.message === 'Periodo no registrado'){
            console.log('llego',data.message)
            setPeriodObject({...periodObject, inputStartYear : true})
          }
          
        }catch{
          console.log('***no')
          // setConnErr(true)
        }
    
      }
      const getAllLevels = async () => {

        try{
          const resultLevels = (await AxiosInstance.get("/levels/allLevels/active")).data
          if(resultLevels.ok === true){
            setAllLevels(resultLevels.data)
          }
        }catch{
          setMessage('Error de Conexion al consultar Niveles')
          setAlertModal(true)
          
      }
    }
    const getAllSections = async () => {

        try{
          const resultSections = (await AxiosInstance.get("/sections/allSections/active")).data
          if(resultSections.ok === true){
            setAllSections(resultSections.data)
          }
        }catch{
          setMessage('Error de Conexion al consultar Secciones')
          setAlertModal(true)
          
      }
    }

    const MapSelectionOfLevelsAndSections = () => {
      //se activa solo si el arreglos de niveles esta lleno puede ser luego de llamar los niveles

      let result = []
      allLevels.map(level =>{
        // console.log('aqui el nivel', level)
        let objetct = {
          levId: level.levId,
          levName : level.levName
        }

        allSections.map((section) =>{

          Object.defineProperty(objetct, section.secName, {
            // get: function() { return section.secName; },
            value: 'hola',
            writable: true,
            enumerable:true, //permite que se agregue a las columnas
            configurable: false,
          });
        })

        result.push(objetct)
        
      })

      // console.log('result.........',result)
      setLevelsMap(result)
  }

    React.useEffect(() => {  
        getAllSections()
        getAllLevels()
        }, [Reload]);

    React.useEffect(() => {  
      MapSelectionOfLevelsAndSections()
    }, [allLevels]);

  return (
    <Box>
        <h4 id="child-modal-title">Nuevo Periodo</h4>
        <Stack direction="row" spacing={8}  justifyContent="flex-start" className={classes.period}>
            <TextField
                sx={{ width: '20%' }} 
                required
                type={'number'}
                disabled={periodObject.inputStartYear}
                // InputProps={{ readOnly: periodObject.inputStartYear }}
                // key={keyIdentification}
                id="period"
                label="Agregar Año Inicio"
                variant="standard"
                // helperText={errorMessage}
                // error={orfRepIdentificationNumber}
                onChange={e => {
                    console.log('e.target.value',e.target.value)
                    setPeriodObject({...periodObject,startYear : e.target.value ? e.target.value : 0})
                    if(e.target.value.length < 4 ){setButtonI(true)}else{setButtonI(false)}
                }
                }
            />
            <Button variant="outlined" size="small" 
                disabled={buttonI} 
                onClick={() => searchPeriod()}
            >Validar Periodo</Button>

        </Stack>

        {
            (buttonI && allLevels.length > 0 && allSections.length > 0)?
                <>
                    <TableLevels levelsMap={levelsMap} setLevelsMap={setLevelsMap} periodObject={periodObject} setPeriodObject={setPeriodObject} allLevels={allLevels} setAllLevels={setAllLevels} 
                    allSections={allSections} setAllSections={setAllSections}/>
                </>
            : null
        }
        {(alertModal) ? 
            <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
        : null}   

    </Box>
  )
}

export default AddPeriod