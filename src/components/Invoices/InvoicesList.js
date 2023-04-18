import React from 'react'
import { makeStyles } from '@mui/styles';

import MaterialTable from '@material-table/core';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Button from '@mui/material/Button';
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

const InvoicesList = () => {
  const classes = UseStyles();
  const [listPeriods, setListPeriods] = React.useState([])
  const [periodSelected, setPeriodSelected] = React.useState(null)
  const [message, setMessage] = React.useState('')
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false)
  const [filtroSeleccionado, setFiltroSeleccionado] = React.useState(null)
  const [searchButton, setSearchButton] = React.useState(true)
  const [filtrosValue, setFiltrosValue] = React.useState({'period':null, 'mes':null, 'numCompro':null,'rif':null,'razonSocial':null})
  const columns = [
    { title: 'Num Control', field: '' },
    { title: 'Num Fact', field: '' },
    { title: 'CI/RIF', field: '' },
    { title: 'Razón Social', field: '' },
    { title: 'Fecha', field: '' },
    { title: 'Monto Total', field: '' }]

  const Filtro = [
    // { id: 1, title: 'Meses' },
    { id: 2, title: 'Num Comprobante' },
    // { id: 3, title: 'CI/RIF' },
    // { id: 4, title: 'Razón Social' },
  ]

  const Meses = [
    { id: 9, title: 'Septiembre' },
    { id: 10, title: 'Octubre' },
    { id: 11, title: 'Noviembre' },
    { id: 12, title: 'Diciembre' },
    { id: 1, title: 'Enero' },
    { id: 2, title: 'Febrero' },
    { id: 3, title: 'Marzo' },
    { id: 4, title: 'Abril' },
    { id: 5, title: 'Mayo' },
    { id: 6, title: 'Junio' },
    { id: 7, title: 'Julio' },
    { id: 8, title: 'Agosto' },

  ]

  const getAllPeriod = async () => {

    try {
      const resultPeriods = (await AxiosInstance.get(`/periods/`)).data

      console.log('resultPeriods', resultPeriods)
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

  const searchInvoices = async () => {
    // tableColumns(reportTypeSelected)
    // let url = ``
    // let data = {
    //   periodo: periodSelected,
    //   level: null,
    //   section: null
    // }
    // if (reportTypeSelected.id === 1) {

    //   url = `/reports/levelsection`
    //   data.level = levelSelected.level;
    //   if (sectionSelected !== null) {
    //     data.section = sectionSelected.section;
    //   }

    // } else
    //   if (reportTypeSelected.id === 2) {
    //     url = `/reports/statistics`
    //   } else
    //     if (reportTypeSelected.id === 3) {
    //       url = `/reports/familypayroll`
    //     } else
    //       if (reportTypeSelected.id === 4) {
    //         url = `/reports/schoolinsurance`
    //       }

    // const result = (await AxiosInstance.post(url, data)).data

    // if (result.ok === true) {

    //   setDataReport(result.data)
    //   // setSeeTable(true)
    // } else {
    //   setDataReport([])
    //   setMessage(result.message)
    //   setAlertType('error')
    //   setAlertModal(true)
    // }

  } 
  React.useEffect(() => {
    getAllPeriod()
  }, [0]);

  return (
    <>
      <Box >
        <h4 id="child-modal-title">Listado de Facturas </h4>
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
                  // setPeriodSelected(newValue)
                  setFiltrosValue({ ...filtrosValue, 'period': newValue ? newValue : null})
                }}
                required
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }}
                id="clear-on-escape"
              />
              <TextField
                // InputProps={{ readOnly: true }}
                // value={familyData.famCode}
                id="numComprobante"
                label="Numero Comprobante"
                variant="standard"
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'numCompro': e.target.value ? e.target.value : null })
                }}
              />
              {/* <Autocomplete
                options={Filtro}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Buscar por" />
                )}
                value={filtroSeleccionado}
                getOptionLabel={(option) => `${option.title}`}
                onChange={(event, newValue) => {
                  setFiltroSeleccionado(newValue)
                }}
                required

                noOptionsText={'Sin Opciones'}
                sx={{ width: '40%' }}
                id="clear-on-escape"
              /> */}
              <Button variant="outlined" size="small"
                disabled={searchButton}
                onClick={() => searchInvoices()}
              >Buscar</Button>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

              <Autocomplete
                options={Meses}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Meses" />
                )}
                value={periodSelected}
                getOptionLabel={(option) => option.title}
                onChange={(event, newValue) => {
                  setFiltrosValue({ ...filtrosValue, 'mes': newValue ? newValue : null })
                }}
                required
                noOptionsText={'Sin Opciones'}
                sx={{ width: '20%' }}
                id="clear-on-escape"
              />
              <TextField
                // InputProps={{ readOnly: true }}
                // value={familyData.famCode}
                id="rif"
                label="CI/RIF"
                variant="standard"
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'rif': e.target.value ? e.target.value : null })
                }}
              />
              <TextField
                // InputProps={{ readOnly: true }}
                // value={familyData.famCode}
                id="razon"
                label="Razón Social"
                variant="standard"
                sx={{ width: '40%' }}
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'razonSocial': e.target.value ? e.target.value : null })
                }}
              />
            </Stack>
          </>
          : null
        }
      </Box>
    </>
  )
}

export default InvoicesList