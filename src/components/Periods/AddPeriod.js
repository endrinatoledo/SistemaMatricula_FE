import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButtons from '../commonComponents/LoadingButton';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import TableLevels from './TableLevels';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
const AxiosInstance = require("../utils/request").default;


const UseStyles = makeStyles({
  period: {
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '2%'
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
const style = {
  width: '100%',
  bgcolor: 'background.paper',
};
const AddPeriod = () => {

  const [Reload, SetReload] = React.useState(0);
  const [buttonI, setButtonI] = React.useState(true)

  const [message, setMessage] = React.useState('')
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false)
  const [showTable, setShowTable] = React.useState(false)
  const [allLevels, setAllLevels] = React.useState([]) //carga el listado de niveles
  const [allSections, setAllSections] = React.useState([])//carga el listado de secciones
  const [levelsMap, setLevelsMap] = React.useState([]) //descartado: DE NIVELES MAPEADOS
  const [statusCcircularProgress, setStatusCcircularProgress] = React.useState(false)
  const [emptyPeriod, setEmptyPeriod] = React.useState(false)
  const [mostrarRespuesta, setMostrarRespuesta] = React.useState(false)
  const [resultGuardar, setResultGuardar] = React.useState([])
  const [periodObject, setPeriodObject] = React.useState(
    { startYear: 0, inputStartYear: false }
  )
  const today = new Date();
  const anoActual = today.getFullYear();
  const mode = 'add'
  const classes = UseStyles();

  const validar = async (levelsMap) => {

    const result = new Promise((resolve, reject) => {
      let res = false

      levelsMap.forEach(element => {
        if (element.a === true) {
          res = true
        } else if (element.b === true) {
          res = true
        } else if (element.c === true) {
          res = true
        } else if (element.d === true) {
          res = true
        } else if (element.e === true) {
          res = true
        }
      });

      (res === true) ? resolve(true) : reject(false)
    })
    return result
  }

  const saveNewPeriod = async () => {

    try {
      await validar(levelsMap)
      setStatusCcircularProgress(true)
      const result = await AxiosInstance.post("/periodLevelSection", periodObject)

      setTimeout(() => {
        setStatusCcircularProgress(false)
        if (result.data.message === 'Periodo creado con éxito') {
          setMessage(result.data.message)
          setAlertType('success')
          setAlertModal(true)
          window.location = '/periodos';

        } else if (result.message === 'Error al crear Periodo') {
          setMessage(result.message)
          setAlertType('error')
          setAlertModal(true)
        } else {
          setMessage(result.message)
          setAlertType('error')
          setAlertModal(true)
        }
      }, 1000);

    } catch (error) {
      console.log('Error al guardar periodo', error)
      setMessage('Error al guardar periodo')
      setAlertType('error')
      setAlertModal(true)
    }

  }

  const guardarNuevo= async () => {
    try {
      setStatusCcircularProgress(true)
      const result = await (await AxiosInstance.post("/periods", periodObject)).data
      console.log('result de crear periodo', result)
      setTimeout(() => {
        setStatusCcircularProgress(false)
        if (result.ok) {
          setResultGuardar(result.data)
          setMostrarRespuesta(true)
          setShowTable(false)
          setButtonI(true)
        }else{
          setMessage('Error al guardar periodo')
          setAlertType('error')
          setAlertModal(true)
        }
        //   setMessage(result.data.message)
        //   setAlertType('success')
        //   setAlertModal(true)
        //   window.location = '/periodos';

        // } else if (result.message === 'Error al crear Periodo') {
        //   setMessage(result.message)
        //   setAlertType('error')
        //   setAlertModal(true)
        // } else {
        //   setMessage(result.message)
        //   setAlertType('error')
        //   setAlertModal(true)
        // }
      }, 1000);

    } catch (error) {
      console.log('Error al guardar periodo', error)
      setMessage('Debe seleccionar al menos una sección')
      setAlertType('error')
      setAlertModal(true)
    }
  }

  const MostrarDetallePeriodo = () => {

    return(
      <List sx={style} component="nav" aria-label="mailbox folders">
        {
          resultGuardar.length > 0
          ? resultGuardar.map(item => (
            <>
              <ListItem>
                <ListItemText primary={item} />
              </ListItem>
              <Divider light />
            </>
            )
          )
            : <>
              <ListItem>
                <ListItemText primary='Sin detalle para mostrar' />
              </ListItem>
              <Divider light />
            </>
        }
      </List>

    )
  }

  const searchPeriod = async () => {
    if (Number(periodObject.startYear) !== anoActual){
      setMessage('Debe agregar el año actual')
      setAlertType('error')
      setAlertModal(true)
    }else{
      try {
        const data = (await AxiosInstance.get(`/periods/startYear/${periodObject.startYear}`)).data
        if (data.message === 'Periodo registrado') {

          setMessage(data.message)
          setAlertType('error')
          setAlertModal(true)
          setPeriodObject({ ...periodObject, inputStartYear: false })
          setShowTable(false)
        } else
          if (data.message === 'Periodo no registrado') {
            setShowTable(true)

            setPeriodObject({ ...periodObject, inputStartYear: true })
          }

      } catch {
        console.log('***no')
        setMessage('Error de conexión al validar periodo')
        setAlertType('error')
        setAlertModal(true)
      }
    }

  }
  const getAllLevels = async () => {

    try {
      const resultLevels = (await AxiosInstance.get("/levels/allLevels/active")).data
      if (resultLevels.ok === true) {
        setAllLevels(resultLevels.data)
      }
    } catch {
      setMessage('Error de Conexion al consultar Niveles')
      setAlertModal(true)

    }
  }
  const getAllSections = async () => {

    try {
      const resultSections = (await AxiosInstance.get("/sections/allSections/active")).data
      if (resultSections.ok === true) {
        setAllSections(resultSections.data)
      }
    } catch {
      setMessage('Error de Conexion al consultar Secciones')
      setAlertModal(true)

    }
  }

  const MapSelectionOfLevelsAndSections = () => {
    //se activa solo si el arreglos de niveles esta lleno puede ser luego de llamar los niveles

    let result = []
    allLevels.map(level => {
      let objetct = {
        levId: level.levId,
        levName: level.levName
      }

      allSections.map((section) => {

        Object.defineProperty(objetct, (section.secName).toLowerCase(), {
          // get: function() { return section.secName; },
          value: false,
          writable: true,
          enumerable: true, //permite que se agregue a las columnas
          configurable: true,
        });
      })
      result.push(objetct)
    })
    setLevelsMap(result)
  }

  React.useEffect(() => {
    // getAllSections()
    // getAllLevels()
  }, [Reload]);

  React.useEffect(() => {
    MapSelectionOfLevelsAndSections()
  }, [allLevels]);

  React.useEffect(() => {
    setPeriodObject({ ...periodObject, data: levelsMap })
  }, [levelsMap])

  return (
    <Box>
      <h4 id="child-modal-title">Nuevo Periodo</h4>
      <Stack direction="row" spacing={8} justifyContent="flex-start" className={classes.period}>
        <TextField
          sx={{ width: '20%' }}
          required
          type={'number'}
          disabled={periodObject.inputStartYear}
          id="period"
          label="Agregar Año Inicio"
          variant="standard"
          onChange={e => {
            setPeriodObject({ ...periodObject, startYear: e.target.value ? e.target.value : 0 })
            if (e.target.value.length < 4) { setButtonI(true) } else { setButtonI(false) }
          }
          }
        />
        <Button variant="outlined" size="small"
          disabled={buttonI} onClick={() => searchPeriod()}
        >Validar Periodo</Button>
        {
          (showTable) ?
            <Button variant="contained"
              onClick={guardarNuevo}
              color="success">Guardar</Button>
            : null
        }
      </Stack>

      
      {/* {
        (showTable && allLevels.length > 0 && allSections.length > 0) ?
          <>
            <TableLevels mode={mode} levelsMap={levelsMap} setLevelsMap={setLevelsMap} periodObject={periodObject} setPeriodObject={setPeriodObject} allLevels={allLevels} setAllLevels={setAllLevels}
              allSections={allSections} setAllSections={setAllSections} />
          </>
          : null
      } */}
      {(mostrarRespuesta)
      ? <MostrarDetallePeriodo />
      :null}
      {(alertModal) ?
        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
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
                color="error">Salir</Button>
            </NavLink>
            {/* <Button variant="contained"
              // disabled={disableButtonSave} 
              // onClick={saveNewPeriod}
              onClick={guardarNuevo}
              color="success">Guardar</Button> */}

          </Stack>
      }

    </Box>
  )
}

export default AddPeriod