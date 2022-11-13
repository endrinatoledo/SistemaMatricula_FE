import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Button from '@mui/material/Button';
import TableReport from './TableReport';
const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
  stack: {
    marginTop: 40
  },
  TextField: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '3%'
  },
  box: {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '50%',
    background: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    paddingTop: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
    '& .MuiTextField-root': { m: 1, width: '25ch' }

  }
});

const CollectionReports = () => {

  const classes = UseStyles();
  const [listPeriods, setListPeriods] = React.useState([])
  const [listLevels, setListLevels] = React.useState([])
  const [listSections, setListSections] = React.useState([])
  const [message, setMessage] = React.useState('')
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false)
  const [periodSelected, setPeriodSelected] = React.useState(null)
  const [levelSelected, setLevelSelected] = React.useState(null)
  const [sectionSelected, setSectionSelected] = React.useState(null)
  const [reportTypeSelected, setReportTypeSelected] = React.useState(null)
  const [searchButton, setSearchButton] = React.useState(true)
  const [dataReporte, setDataReport] = React.useState([])
  const [columns, setColumns] = React.useState([])
  const [seeTable, setSeeTable] = React.useState(false)
  const [excelStructure, setExcelStructure] = React.useState({})

  const reportType = [
    { id: 10, title: 'Resumen mensualidades' },
    { id: 11, title: 'Resumen morosos' },
  ]

  const getAllPeriod = async () => {

    try {
      const resultPeriods = (await AxiosInstance.get(`/periods/`)).data

      if (resultPeriods.ok === true && resultPeriods.data) {
        setListPeriods(resultPeriods.data)
      }
      else {
        setMessage('Error al consultar Periodos')
        setAlertType('error')
        setAlertModal(true)
      }
    } catch {
      setMessage('Error al consultar Periodos')
      setAlertType('error')
      setAlertModal(true)
    }
  }

  const tableColumns = (reportTypeSelected) => {

    if (reportTypeSelected.id === 10) {
      setColumns([
        { title: 'Grado', field: 'level' },
        { title: 'Sección', field: 'section' },
        { title: 'Tipo identificación', field: 'stuIdType' },
        { title: 'Identificación', field: 'stuIdentificationNumber' },
        { title: 'Primer Nombre', field: 'stuFirstName' },
        { title: 'Segundo Nombre', field: 'stuSecondName' },
        { title: 'Primer Apellido', field: 'stuSurname' },
        { title: 'Segundo Apellido', field: 'stuSecondSurname' },
        { title: 'Enero', field: 'mopEne' },
        { title: 'Febrero', field: 'mopFeb' },
        { title: 'Marzo', field: 'mopMar' },
        { title: 'Abril', field: 'mopAbr' },
        { title: 'Mayo', field: 'mopMay' },
        { title: 'Junio', field: 'mopJun' },
        { title: 'Julio', field: 'mopJul' },
        { title: 'Agosto', field: 'mopAgo' },
        { title: 'Septiembre', field: 'mopSep' },
        { title: 'Octubre', field: 'mopOct' },
        { title: 'Noviembre', field: 'mopNov' },
        { title: 'Diciembre', field: 'mopDic' },
      ])
      setExcelStructure({
        fileName: 'ReporteDeMorosos.xlsx',
        columns: [["Grado", "Sección", "Tipo identificación", "Identificación", "Primer Nombre", "Segundo Nombre", 
        "Primer Apellido", "Segundo Apellido", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"
        , "Septiembre", "Octubre", "Noviembre", "Diciembre"]],
        sheetName: "Estudiantes"
      })
    }

  }

  const searchReport = async () => {
    tableColumns(reportTypeSelected)
    let url = ``
    let data = {
      periodo: periodSelected,
      level: null,
      section: null
    }
    if (reportTypeSelected.id === 11) {

      url = `/reports/morosos`
      data.level = levelSelected.level;
      if (sectionSelected !== null) {
        data.section = sectionSelected.section;
      }

    }
    if (reportTypeSelected.id === 10) {

      url = `/reports/mensualidades/cobranza`
      data.level = levelSelected.level;
      if (sectionSelected !== null) {
        data.section = sectionSelected.section;
      }

    }

    const result = (await AxiosInstance.post(url, data)).data

    if (result.ok === true) {

      setDataReport(result.data)
      // setSeeTable(true)
    } else {
      setDataReport([])
      setMessage(result.message)
      setAlertType('error')
      setAlertModal(true)
    }

  }

  const getPeriodLevelSectionByPerId = async () => {

    try {
      const resultPeriodLevelSection = (await AxiosInstance.get(`/periodLevelSection/period/${periodSelected.perId}`)).data

      if (resultPeriodLevelSection.ok === true) {
        if (resultPeriodLevelSection.data !== undefined) {
          setListLevels(resultPeriodLevelSection.data.levels)
        } else {
          setMessage('No hay grados ni secciones asociados a un periodo')
          setAlertType('error')
          setAlertModal(true)
        }
      } else {
        setMessage('Error al consultar grados y secciones asociados a un periodo')
        setAlertType('error')
        setAlertModal(true)
      }
    } catch {
      setMessage('Error al consultar grados y secciones asociados a un periodo')
      setAlertType('error')
      setAlertModal(true)
    }
  }

  React.useEffect(() => {
    getAllPeriod()
  }, [0]);
  React.useEffect(() => {
    if (dataReporte.length > 0) { setSeeTable(true) }
  }, [dataReporte]);
  React.useEffect(() => {
    if (periodSelected !== null) {
      getPeriodLevelSectionByPerId()
    }
  }, [periodSelected]);
  React.useEffect(() => {
    if (reportTypeSelected?.id === 10 || reportTypeSelected === null) {
      setSearchButton(true)
    } else {
      setLevelSelected(null)
      setSectionSelected(null)
      setSearchButton(false)
    }
  }, [reportTypeSelected]);

  React.useEffect(() => {
    if (reportTypeSelected?.id === 10 && levelSelected === null) {
      setSearchButton(true)
    } else {
      setSearchButton(false)
    }
  }, [levelSelected]);

  return (
    <>

      <Box >
        <h4 id="child-modal-title">Reportes de Cobranza </h4>
        {(listPeriods)
          ? <>
            <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

              <Autocomplete
                options={listPeriods}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Periodo" />
                )}
                value={periodSelected}
                getOptionLabel={(option) => `${option.perStartYear} - ${option.perEndYear}`}
                onChange={(event, newValue) => {
                  setPeriodSelected(newValue)
                }}
                required
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }}
                id="clear-on-escape"
              />
              <Autocomplete
                options={reportType}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Tipo de Reporte" />
                )}
                value={reportTypeSelected}
                getOptionLabel={(option) => `${option.title}`}
                onChange={(event, newValue) => {
                  setReportTypeSelected(newValue)
                }}
                required

                noOptionsText={'Sin Opciones'}
                sx={{ width: '40%' }}
                id="clear-on-escape"
              />
              <Button variant="outlined" size="small"
                disabled={searchButton}
                onClick={() => searchReport()}
              >Buscar</Button>
            </Stack>

            {(reportTypeSelected?.id === 10 || reportTypeSelected?.id === 11 )
              ? <>
                <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
                  <Autocomplete
                    options={listLevels}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" label="Grados" />
                    )}
                    value={levelSelected}
                    getOptionLabel={(option) => `${option.level.levName}`}
                    onChange={(event, newValue) => {
                      setLevelSelected(newValue)
                      setListSections(newValue.sections)
                    }}
                    required
                    noOptionsText={'Sin Opciones'}
                    sx={{ width: '20%' }}
                    id="clear-on-escape"
                  />
                  <Autocomplete
                    options={listSections}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" label="Secciones" />
                    )}
                    value={sectionSelected}
                    getOptionLabel={(option) => `${option.section.secName}`}
                    onChange={(event, newValue) => {
                      setSectionSelected(newValue)
                    }}
                    required
                    noOptionsText={'Sin Opciones'}
                    sx={{ width: '20%' }}
                    id="clear-on-escape"
                  />
                </Stack>
              </>
              : null
            }
          </>
          : <h5 id="child-modal-title">Sin periodo registrado </h5>
        }


      </Box>
      {(alertModal) ?
        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
        : null}
      {(seeTable)
        ? <TableReport periodSelected={periodSelected} reportTypeSelected={reportTypeSelected} columns={columns} dataReporte={dataReporte} excelStructure={excelStructure} />
        : null}
    </>
  )
}

export default CollectionReports
