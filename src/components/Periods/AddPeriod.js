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
        marginLeft: '4%',
        marginBottom : '2%'
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
    
    const [message  , setMessage] = React.useState('')
    const [alertType, setAlertType] = React.useState('');
    const [alertModal, setAlertModal] = React.useState(false)
    const [showTable, setShowTable] = React.useState(false)
    const [allLevels, setAllLevels] = React.useState([]) //carga el listado de niveles
    const [allSections, setAllSections] = React.useState([])//carga el listado de secciones
    const [levelsMap, setLevelsMap] = React.useState([]) //descartado: DE NIVELES MAPEADOS
    const [statusCcircularProgress, setStatusCcircularProgress] = React.useState(false)
    const [periodObject, setPeriodObject] = React.useState(
      {startYear : 0, inputStartYear : false, 
        selectedPeriods:[], selectedSecctions:[], data:levelsMap}
      )
    const mode = 'add'
    const classes = UseStyles();

    console.log('levelsMapppppppp',levelsMap) 

  
    const saveNewPeriod = async () => {
      setStatusCcircularProgress(true)
  
      console.log('esto llegoooooooooooooo',periodObject)

      try {
        const result = (await AxiosInstance.post("/periods",periodObject))
  
        console.log('result',result)
        setTimeout(() => {
          setStatusCcircularProgress(false)
        if(result.data.message === 'Periodo creado con éxito'){
          setMessage(result.data.message)
          setAlertType('success')
          setAlertModal(true) 
          window.location = '/inscriptions';
  
        }else if(result.message === 'Error al crear Periodo'){
            setMessage(result.message)
            setAlertType('error')
            setAlertModal(true) 
        }else{
          setMessage(result.message)
          setAlertType('error')
          setAlertModal(true)
        }
      }, 1000);
      } catch (error) {
  
    }
  
  }

    const searchPeriod = async () => {
        try{
          const data = (await AxiosInstance.get(`/periods/startYear/${periodObject.startYear}`)).data

          
          if(data.message === 'Periodo registrado'){
            console.log('llegoooooo',data.message)
            setMessage(data.message)
            setAlertType('error')
            setAlertModal(true)
            setPeriodObject({...periodObject, inputStartYear : false})
            setShowTable(false)
          } else
          if(data.message === 'Periodo no registrado'){
            setShowTable(true)
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
        let objetct = {
          levId: level.levId,
          levName : level.levName
        }

        allSections.map((section) =>{

          Object.defineProperty(objetct, (section.secName).toLowerCase(), {
            // get: function() { return section.secName; },
            value: false,
            writable: true,
            enumerable:true, //permite que se agregue a las columnas
            configurable: true,
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
            (showTable && allLevels.length > 0 && allSections.length > 0)?
                <>
                    <TableLevels levelsMap={levelsMap} setLevelsMap={setLevelsMap} periodObject={periodObject} setPeriodObject={setPeriodObject} allLevels={allLevels} setAllLevels={setAllLevels} 
                    allSections={allSections} setAllSections={setAllSections}/>
                </>
            : null
        }
        {(alertModal) ? 
            <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
        : null} 
        {
          (statusCcircularProgress) ?
           <Stack spacing={2} className={classes.stack} alignItems="flex-end" direction="row" justifyContent="center">
              <LoadingButtons message={'Guardando'} />
           </Stack>
           : 
           <Stack spacing={2} className={classes.stack} alignItems="flex-end" direction="row" justifyContent="center">
              <NavLink to='/periodos' >
                <Button variant="outlined" 
                color="error">Cancelar</Button>
              </NavLink>
              <Button variant="contained" 
              // disabled={disableButtonSave} 
              onClick={saveNewPeriod} 
              color="success">Guardar</Button>
            
           </Stack>
        }  

    </Box>
  )
}

export default AddPeriod