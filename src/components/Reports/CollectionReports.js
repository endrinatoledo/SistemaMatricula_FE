import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Button from '@mui/material/Button';
import TableReport from './TableReport';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
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
  const [listLevelsOriginal, setListLevelsOriginal] = React.useState([])

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
  const [nombreNivel, setNombreNivel] = React.useState(null)
  const [nombreSeccion, setNombreSeccion] = React.useState(null)
  const [nombreArchivo, setNombreArchivo] = React.useState(null)
  const [nombreReporte, setNombreReporte] = React.useState(null)
  const [clasifiReportSelectd, setClasifiReportSelectd] = React.useState(null)
  const [etapaReportSelectd, setEtapaReportSelectd] = React.useState(null)
  const [labelLevelSection, setLabelLevelSection] = React.useState({level : 0, section:100})
  const [rangoFechas, setRangoFechas] = React.useState({fechaI:null, fechaF:null})
  const reportType = [
    { id: 10, title: 'Resumen mensualidades' },
    // { id: 11, title: 'Resumen morosos' },
    { id: 12, title: 'Clasificación de pagos' },
    { id: 13, title: 'Nuevo Resumen morosos' },
  ]
  const clasificacionReporte = [
    { id: 1, title: 'Por Familias' },
    { id: 2, title: 'Por Estudiantes' },
  ]
  const etapasReporte = [
    { id: 1, title: 'Todas' },
    { id: 2, title: 'Preescolar' },
    { id: 3, title: 'Primaria' },
    { id: 4, title: 'Bachillerato' },
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

    if (reportTypeSelected.id === 11) {
      setNombreArchivo(`Reporte_morosos_${nombreNivel}_${nombreSeccion}.xlsx`)

      // setNombreArchivo(`Reporte_morosos_${periodSelected.perStartYear}-${periodSelected.perEndYear}_${nombreNivel}_${nombreSeccion}.xlsx`)
      setColumns([
        { title: 'Estudiante', field: 'nombre' },        
        { title: 'Sep', field: 'mopSep', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Oct', field: 'mopOct', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Nov', field: 'mopNov', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Dic', field: 'mopDic', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Ene', field: 'mopEne', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Feb', field: 'mopFeb', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Mar', field: 'mopMar', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Abr', field: 'mopAbr', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'May', field: 'mopMay', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Jun', field: 'mopJun', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Jul', field: 'mopJul', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
        { title: 'Ago', field: 'mopAgo', render: (rows) => rows.mopEne !== 'X' ? ' ' : <ClearIcon color="error" /> },
      ])
      setExcelStructure({
        fileName: `Reporte_morosos_${nombreNivel}-${nombreSeccion}.xlsx`,
        // columns: [["Nombre", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"
        // , "Sep", "Oct", "Nov", "Dic"]],
        columns: [["Estudiante", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"
          ]],
        sheetName: "Estudiantes"
      })
    }
    if (reportTypeSelected.id === 12) {
      setNombreArchivo(`Reporte_clasificacion_pagos}.xlsx`)

      setColumns([
        { title: 'Fecha', field: 'fecha' },
        { title: '$ Efectivo', field: 'dolEfect', type: 'currency' },
        // { title: '$ Trans', field: 'dolTran'},
        // { title: '$ Pto V.', field: 'dolPun' },
        { title: 'Bol Efectivo', field: 'bolEfect', type: 'currency' },
        { title: 'Bol Transferencia', field: 'bolTran', type: 'currency' },
        { title: 'Bol Pto Venta', field: 'bolPun', type: 'currency' },
      ])

      setExcelStructure({
        fileName: `Reporte_clasificacion_pagos.xlsx`,
        columns: [["Fecha", "$ Efectivo",
          //  "$ Transferencia", "$ Pto Venta", 
          "Bol Efectivo", "Bol Transferencia", "Bol Pto Venta"]],
        sheetName: "Clasificacion de pagos"
      })
    }
    
  }

  const searchReport = async () => {
    tableColumns(reportTypeSelected)
    let url = ``
    let data = {
      periodo: periodSelected,
      level: null,
      section: null,
      fechas:null,
      clasificacion:null,
      etapa:null
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
    if (reportTypeSelected.id === 12) {

      url = `/reports/clasificacion/pagos`
      data.fechas = rangoFechas;
    }
    if (reportTypeSelected.id === 13) {

      url = `/reports/morosos/filtros`
      data.level = levelSelected != null ? levelSelected.level : null;
      data.section = sectionSelected != null ? sectionSelected.section : null;
      data.etapa = etapaReportSelectd != null ? etapaReportSelectd.id : null;
      data.clasificacion = clasifiReportSelectd != null ? clasifiReportSelectd.id : null;

    }

    const result = (await AxiosInstance.post(url, data)).data
    console.log('resultttttttttttttttttttt', result)
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
          setListLevelsOriginal(resultPeriodLevelSection.data.levels)
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

  const filtrarNivelesPorEtapa = () =>{

    console.log('listado de niveles originales', listLevelsOriginal)
    if (etapaReportSelectd.title == 'Preescolar'){
      
      const result = listLevelsOriginal.filter(item => item.level.levId < 4 )
      setListLevels(result)
    } else
      if (etapaReportSelectd.title == 'Primaria') {
        const result = listLevelsOriginal.filter(item => item.level.levId > 3 && item.level.levId < 10)
        setListLevels(result)

      } else 
        if (etapaReportSelectd.title == 'Bachillerato') {
          const result = listLevelsOriginal.filter(item => item.level.levId > 9 && item.level.levId < 15)
          setListLevels(result)
      }

  }

  React.useEffect(() => {
    getAllPeriod()
  }, [0]);
  React.useEffect(() => {
    if (dataReporte.length > 0) { setSeeTable(true) }
  }, [dataReporte]);
  // React.useEffect(() => {
  //   if (periodSelected !== null) {
  //     getPeriodLevelSectionByPerId()
  //   }
  // }, [periodSelected]);

  React.useEffect(() => {
    if (periodSelected === null) {
      setSearchButton(true)
    } else {
      getPeriodLevelSectionByPerId()
      setSearchButton(false)
    }
  }, [periodSelected]);

  React.useEffect(() => {
    setLabelLevelSection({ level: labelLevelSection.level + 1, section: labelLevelSection.section + 1 })
    setLevelSelected(null)
    setSectionSelected(null)
    setSeeTable(false)
    setDataReport([])
    setColumns([])
    if (reportTypeSelected !== null ) { // Si existe un reporte seleccionado
      console.log('entro a validacion de reporte lleno')
      if (reportTypeSelected.id == 11 || reportTypeSelected.id == 10) {
        console.log('entro a validacion de reporte 10 u 11')

        setRangoFechas({ fechaI: null, fechaF: null })
        setEtapaReportSelectd(null)
        setClasifiReportSelectd(null)
        if (periodSelected === null || levelSelected === null || sectionSelected === null) {
          setSearchButton(true)
        } else {
          setSearchButton(false)
        }
      }

      if (reportTypeSelected.id == 12) {
        console.log('entro a validacion de reporte 12')

        setLevelSelected(null)
        setSectionSelected(null)
        setEtapaReportSelectd(null)
        setClasifiReportSelectd(null)
        if (rangoFechas.fechaI === null || rangoFechas.fechaF === null) {
          setSearchButton(true)
        } else {
          setSearchButton(false)
        }
      }
      if (reportTypeSelected.id == 13) {
        console.log('entro a validacion de reporte 13')

        setRangoFechas({ fechaI: null, fechaF: null })
        if ( etapaReportSelectd == null || clasifiReportSelectd == null ) {
          setSearchButton(true)
        } else {
          console.log('entro acaaaaa')
          setSearchButton(false)
        }
       }
    }    
    else{ // si no hay reporte seleccionado
      // console.log('entro por reporte no seleccionado')
      setRangoFechas({ fechaI: null, fechaF: null })
      setLevelSelected(null)
      setSectionSelected(null)
      setEtapaReportSelectd(null)
      setClasifiReportSelectd(null)
    }
  }, [reportTypeSelected]);

  React.useEffect(() => {
    if (reportTypeSelected !== null) {
      if (reportTypeSelected.id == 13 && etapaReportSelectd != null && clasifiReportSelectd != null) {
        console.log('entro a validacion de etapas y clasificacion ')
        setSearchButton(false)
      } else {
        setSearchButton(true)
      }
    }
  }, [etapaReportSelectd, clasifiReportSelectd]);


  React.useEffect(() => {
    if (reportTypeSelected !== null) {
      if (reportTypeSelected.id == 13 && etapaReportSelectd != null) {
        if (etapaReportSelectd.id !== 1){
          filtrarNivelesPorEtapa()
        }else{
          setListLevels(listLevelsOriginal)
          setLevelSelected(null)
          setSectionSelected(null)
        }
      } else {
        setListLevels(listLevelsOriginal)
      }
    }


  }, [etapaReportSelectd]);


  React.useEffect(() => {
    if (reportTypeSelected !== null ){
      if (reportTypeSelected.id == 10 || reportTypeSelected.id == 11) {
        console.log('entro a validacion de niveles y secciones de reporte ')

        if (levelSelected === null || sectionSelected === null) {
          setSearchButton(true)
        } else {
          setSearchButton(false)
        }
      }
    }
    
    
  }, [levelSelected, sectionSelected]);

  React.useEffect(() => {
    if (reportTypeSelected !== null && reportTypeSelected?.id == 12) { // Si existe un reporte seleccionado
      console.log('entro a validacion de rango de fecha ')

      if ( rangoFechas.fechaI !== null && rangoFechas.fechaF !== null) {
        
        setSearchButton(false)
      } else {
        setSearchButton(true)
      }
    }
  }, [rangoFechas]);

  const FiltrosNivelesSecciones = () => {

    return(
      <>
        {/* <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}> */}
          <Autocomplete
          key={labelLevelSection.level}
            options={listLevels}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Grados" />
            )}
            value={levelSelected}
            getOptionLabel={(option) => `${option.level.levName}`}
            onChange={(event, newValue) => {
              setLevelSelected(newValue)
              setListSections(newValue.sections)
              setNombreNivel((newValue.level.levName).replaceAll(' ', '_'))

            }}
            required
            noOptionsText={'Sin Opciones'}
            sx={{ width: '20%' }}
            id="clear-on-escape"
          />
          <Autocomplete
          key={labelLevelSection.section}
            options={listSections}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Secciones" />
            )}
            value={sectionSelected}
            getOptionLabel={(option) => `${option.section.secName}`}
            onChange={(event, newValue) => {
              setSectionSelected(newValue)
              setNombreSeccion(newValue.section.secName)
            }}
            required
            noOptionsText={'Sin Opciones'}
            sx={{ width: '20%' }}
            id="clear-on-escape"
          />
        {/* </Stack> */}
      </>
    )
  }

  return (
    <>
      <Box >
        <h4 id="child-modal-title">Reportes de Cobranza </h4>
        {(listPeriods)
          ? <>
            <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

              <Autocomplete
                disableClearable
                options={listPeriods}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Periodo" />
                )}
                value={periodSelected}
                getOptionLabel={(option) => `${option.perStartYear} - ${option.perEndYear}`}
                onChange={(event, newValue) => {
                  setPeriodSelected(newValue)
                }}
                // required
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }}
                id="clear-on-escape"
              />
              <Autocomplete
                disableClearable
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

            
            {(reportTypeSelected?.id === 12)
              ? <>
                <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
                  
                  <TextField
                    required
                    // inputRef={defaultValue}
                    type='date'
                    id="repDateOfBirth"
                    label="Fecha Inicio"
                    variant="standard"
                    sx={{ width: '20%' }}
                    // value={(editRepresentative) ? selectedRepresentative.repDateOfBirth : representativeObject.repDateOfBirth}
                    InputLabelProps={{ shrink: true }}
                    // helperText={(representativeObject.repDateOfBirth === null || representativeObject.repDateOfBirth === '') ? requiredField : ''}
                    // error={orfRepDateOfBirth}
                    onChange={e => {
                      setRangoFechas({ ...rangoFechas, fechaI: e.target.value ? e.target.value : null })
                    }}
                  />
                  <TextField
                    required
                    // inputRef={defaultValue}
                    type='date'
                    id="repDateOfBirth"
                    label="Fecha Fin"
                    variant="standard"
                    sx={{ width: '20%' }}
                    // value={(editRepresentative) ? selectedRepresentative.repDateOfBirth : representativeObject.repDateOfBirth}
                    InputLabelProps={{ shrink: true }}
                    // helperText={(representativeObject.repDateOfBirth === null || representativeObject.repDateOfBirth === '') ? requiredField : ''}
                    // error={orfRepDateOfBirth}
                    onChange={e => {
                      setRangoFechas({ ...rangoFechas, fechaF: e.target.value ? e.target.value : null })
                    }}
                  />
                </Stack>
              </>
              : null
            }
            {(reportTypeSelected?.id === 13 )
              ? <>
                <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

                  <Autocomplete
                    disableClearable
                    // key={filtrosForm.period}
                    options={clasificacionReporte}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" label="Clasificación" />
                    )}
                    value={clasifiReportSelectd}
                    getOptionLabel={(option) => `${option.title}`}
                    onChange={(event, newValue) => {
                      setClasifiReportSelectd(newValue)
                    }}
                    // required
                    noOptionsText={'Sin Opciones'}
                    sx={{ width: '15%' }}
                    id="clear-on-escape"
                  />
                  
                  <Autocomplete
                    disableClearable
                    value={etapaReportSelectd}
                    // key={filtrosForm.period}
                    options={etapasReporte}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" label="Etapa" />
                    )}
                    // value={etapaReportSelectd}
                    getOptionLabel={(option) => `${option.title}`}
                    onChange={(event, newValue) => {
                      setEtapaReportSelectd(newValue)
                    }}
                    noOptionsText={'Sin Opciones'}
                    sx={{ width: '15%' }}
                    id="clear-on-escape"
                  />
                  {etapaReportSelectd !== null && etapaReportSelectd.id != 1
                  ? <FiltrosNivelesSecciones />
                  : null}
                </Stack>
              </>
              : null
            }
            {(reportTypeSelected?.id === 10 
              // || reportTypeSelected?.id === 11
              
            )
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
                      setNombreNivel((newValue.level.levName).replaceAll(' ', '_'))

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
                      setNombreSeccion(newValue.section.secName)
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
