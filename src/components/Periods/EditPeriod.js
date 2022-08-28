import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom'
import LoadingButtons from '../commonComponents/LoadingButton';
import { useParams } from 'react-router-dom';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import { makeStyles } from '@mui/styles';
import TableLevels from './TableLevels';
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

const EditPeriod = () => {
  let { perid } = useParams();
  const [period, setPeriod] = React.useState(perid)
  const [periodData, setPeriodData] = React.useState(null)
  const [message, setMessage] = React.useState('')
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false)
  const [levelsMap, setLevelsMap] = React.useState([])
  const [allLevels, setAllLevels] = React.useState([]) //carga el listado de niveles
  const [allSections, setAllSections] = React.useState([])//carga el listado de secciones
  const [periodObject, setPeriodObject] = React.useState({currentInformation:null})
  const [perLevSecList, setPerLevSecList] = React.useState([])
  const mode = 'edit'
  const classes = UseStyles();
  let conteoMapUpdate = 0

  const valueMap = () =>{
    conteoMapUpdate = conteoMapUpdate+1
    console.log('??????????',conteoMapUpdate)
    let perLevSecList2 = perLevSecList.periodLevelSection
    let levelsMap2 = levelsMap   

    for (let index = 0; index < perLevSecList2.length; index++) { //trae el arreglo ya registrado
      
      for (let index2 = 0; index2 < levelsMap2.length; index2++) { //estructra de nuevo arreglo a guardar
        
        if(levelsMap2[index2].levId === perLevSecList2[index].levId){
          if(perLevSecList2[index].section.secName === 'A'){
            levelsMap2[index2].a = true
          }
          if(perLevSecList2[index].section.secName === 'B'){
            levelsMap2[index2].b = true
          }
          if(perLevSecList2[index].section.secName === 'C'){
            levelsMap2[index2].c = true
          }
          if(perLevSecList2[index].section.secName === 'D'){
            levelsMap2[index2].d = true
          }
          if(perLevSecList2[index].section.secName === 'E'){
            levelsMap2[index2].e = true
          }
        } 
      }
    }
    console.log('*-*-*-*-*-*-*',levelsMap2)
    setLevelsMap(levelsMap2)
  }

  const getPeriodById = async () => {

    try {
      const resultPeriod = (await AxiosInstance.get(`/periods/${period}`)).data
      if (resultPeriod.ok === true && resultPeriod.data !== undefined) {
        setPeriodData(resultPeriod.data)
      } else {
        setMessage('Error: Periodo no registrado')
        setAlertType('error')
        setAlertModal(true)
      }
    } catch (error) {
      setMessage('Error al consultar periodo')
      setAlertType('error')
      setAlertModal(true)
    }
  }

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

  const getAllLevels = async () => {

    try {
      const resultLevels = (await AxiosInstance.get("/levels/allLevels/active")).data
      if (resultLevels.ok === true) {
        setAllLevels(resultLevels.data)
      }
    } catch {
      setMessage('Error de Conexion al consultar Niveles')
      setAlertType('error')
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
      setAlertType('error')
      setAlertModal(true)
    }
  }

  const getAllPeriodLevelsSections = async () => {

    try {
      const resultPerLevSec = (await AxiosInstance.get(`/periodLevelSection/period/${period}`)).data
      if (resultPerLevSec.ok === true) {
        setPerLevSecList(resultPerLevSec.data)
        setPeriodObject({...periodObject, currentInformation: resultPerLevSec.data.periodLevelSection})
      }
    } catch {
      setMessage('Error de Conexion al consultar grados y secciones asociadas a un periodo')
      setAlertType('error')
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
    MapSelectionOfLevelsAndSections()
  }, [allLevels]);

  React.useEffect(() => {
    getPeriodById()
    getAllSections()
    getAllLevels()
    getAllPeriodLevelsSections()
  }, [period]);

  React.useEffect(() => {
    conteoMapUpdate = conteoMapUpdate + 1
    console.log('conteoMapUpdate',conteoMapUpdate)
    if(conteoMapUpdate === 1 && levelsMap.length > 0){
      console.log('entro a conteoMapUpdate', conteoMapUpdate)
      valueMap()
    }
  }, [levelsMap]);

  return (
    <>
      <Box>
        <h4 id="child-modal-title">Editar Periodo</h4>
        {(periodData) ?
          <>
            <Stack direction="row" spacing={8} justifyContent="flex-start" className={classes.period}>
              <TextField
              value={`${periodData.perStartYear} - ${periodData.perEndYear}`}
                sx={{ width: '20%' }}
                disabled={true}
                id="period"
                label="Periodo"
                variant="standard"
              />
            </Stack>
              {
                (allLevels.length > 0 && allSections.length > 0) ?
                  <>
                    <TableLevels mode={mode} levelsMap={levelsMap} setLevelsMap={setLevelsMap} periodObject={periodObject} setPeriodObject={setPeriodObject} allLevels={allLevels} setAllLevels={setAllLevels}
                      allSections={allSections} setAllSections={setAllSections} />
                  </>
              : null}
          </> : null
        }
      </Box>
      {(alertModal) ?
        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
        : null}
    </>
  )
}

export default EditPeriod
