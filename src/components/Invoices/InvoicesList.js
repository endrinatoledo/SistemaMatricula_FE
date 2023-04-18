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
  const [message, setMessage] = React.useState('')
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false)
  const [filtroSeleccionado, setFiltroSeleccionado] = React.useState(null)
  const [searchButton, setSearchButton] = React.useState(true)
  const [filtrosValue, setFiltrosValue] = React.useState({ 'period': null, 'numCompro': null, 'rif': null, 'razonSocial': null, 'fechaI': null, 'fechaF': null })
  const [filtrosForm, setFiltrosForm] = React.useState({ 'period': 0, 'numCompro': 2000, 'rif': 3000, 'razonSocial': 4000, 'fechaI': 5000, 'fechaF': 1000 })
  const [dataSource, setDataSource] = React.useState([])

  const columns = [
    { title: 'Num Control', field: 'numControl' },
    { title: 'Num Fact', field: 'numFact' },
    { title: 'CI/RIF', field: 'ciRif' },
    { title: 'Razón Social', field: 'razon' },
    { title: 'Fecha', field: 'fecha' }]

  console.log('filtrosValue', filtrosValue)

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

    const result = (await AxiosInstance.post('/invoice/filtro', filtrosValue)).data
    console.log('entro con esto', result)

    if (result.ok === true) {
      setDataSource(result.data)
    }

    //   setDataReport(result.data)
    //   // setSeeTable(true)
    // } else {
    //   setDataReport([])
    //   setMessage(result.message)
    //   setAlertType('error')
    //   setAlertModal(true)
    // }

  } 

  const limpiarForm = () =>{
    setFiltrosValue({ 'numCompro': null, 'rif': null, 'razonSocial': null, 'fechaI': null, 'fechaF': null })
    setFiltrosForm({ 'numCompro': filtrosForm.numCompro + 1, 'rif': filtrosForm.rif + 1, 'razonSocial': filtrosForm.razonSocial + 1, 'fechaI': filtrosForm.fechaI + 1, 'fechaF': filtrosForm.fechaF + 1 })

  }
  React.useEffect(() => {
    getAllPeriod()
  }, [0]);

  React.useEffect(() => {
    if (filtrosValue.period == null){
      setSearchButton(true)
    }else{
      if (filtrosValue.fechaF == null && filtrosValue.fechaI == null && filtrosValue.numCompro == null && filtrosValue.rif == null && filtrosValue.razonSocial == null) {
        setSearchButton(true)
      } else {
        setSearchButton(false)
      }
    }
    
  }, [filtrosValue]);



  return (
    <>
      <Box >
        <h4 id="child-modal-title">Listado de Facturas </h4>
        {(listPeriods)
          ? <>
            <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

              <Autocomplete
                key={filtrosForm.period}
                options={listPeriods}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label="Periodo" />
                )}
                value={filtrosValue.period}
                getOptionLabel={(option) => `${option.perStartYear} - ${option.perEndYear}`}
                onChange={(event, newValue) => {
                  setFiltrosValue({ ...filtrosValue, 'period': newValue ? newValue : null })
                }}
                required
                noOptionsText={'Sin Opciones'}
                sx={{ width: '15%' }}
                id="clear-on-escape"
              />
              <TextField
                key={filtrosForm.numCompro}
                id="numComprobante"
                label="Numero Comprobante"
                variant="standard"
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'numCompro': e.target.value && (e.target.value).trim() != ''  ? e.target.value : null })
                }}
                sx={{ width: '15%' }}

              />
              <TextField
                key={filtrosForm.fechaI}
                type='date'
                id="fechaI"
                label="Fecha Inicio"
                variant="standard"
                sx={{ width: '15%' }}
                InputLabelProps={{ shrink: true }}
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'fechaI': e.target.value && (e.target.value).trim() != ''  ? e.target.value : null })
                }}
              />
              <TextField
                key={filtrosForm.fechaF}                
                type='date'
                id="fechaF"
                label="Fecha Fin"
                variant="standard"
                sx={{ width: '15%' }}
                InputLabelProps={{ shrink: true }}
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'fechaF': e.target.value && (e.target.value).trim() != ''  ? e.target.value : null })
                }}
              />
              <Button variant="outlined" size="small"
                disabled={searchButton}
                onClick={() => searchInvoices()}
              >Buscar</Button>
              <Button variant="outlined" size="small"
                onClick={() => limpiarForm()}
              >Limpiar</Button>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
              <TextField
                key={filtrosForm.rif}
                id="rif"
                label="CI/RIF"
                variant="standard"
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'rif': e.target.value && (e.target.value).trim() != ''  ? e.target.value : null })
                }}
                sx={{ width: '15%' }}
              />
              <TextField
                key={filtrosForm.razonSocial}
                id="razon"
                label="Razón Social"
                variant="standard"
                sx={{ width: '31%' }}
                onChange={e => {
                  setFiltrosValue({ ...filtrosValue, 'razonSocial': e.target.value && (e.target.value).trim() != ''  ? e.target.value : null })
                }}
              />
            </Stack>
          </>
          : null
        }
        {(dataSource.length > 0)
        ? <>
            <MaterialTable title={'Métodos de Pago'}
              data={dataSource}
              columns={columns}
              // actions={[
              //   {
              //     icon: () => <FilterList />,
              //     tooltip: "Activar Filtros",
              //     onClick: () => setFiltering(!filtering),
              //     isFreeAction: true
              //   }
              // ]}
              options={{
                width: 300,
                actionsCellStyle: { paddingLeft: 50, paddingRight: 50 },
                // filtering: filtering,
                actionsColumnIndex: -1,
                addRowPosition: 'first',
                headerStyle: {
                  backgroundColor: "#007bff",
                  color: "#FFF",
                  fontWeight: 'normal',
                  fontSize: 18,
                  textAlign: "center",
                },
                filterCellStyle: {

                }
              }}
              // editable={{
              //   onRowAdd: (newRow) => new Promise((resolve, reject) => {

              //     AxiosInstance.post(`/paymentmethod/`, newRow)
              //       .then(resp => {
              //         setTimeout(() => {
              //           if (resp.data.ok === true) {
              //             setAlertType("success")
              //             setMessage(resp.data.message)
              //             setAlertModal(true)
              //             fillTable()
              //             resolve()
              //           } else {
              //             setMessage(resp.data.message)
              //             setAlertType("error")
              //             setAlertModal(true)
              //             reject()
              //           }

              //         }, 2000);

              //       })
              //       .catch((err) => {
              //         setTimeout(() => {
              //           setMessage(standardMessages.connectionError)
              //           setAlertType("error")
              //           setAlertModal(true)
              //           fillTable()
              //           reject()
              //         }, 2000);
              //       });
              //   }),
              // }}
            />
            {(alertModal) ?
              <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
              : null}
        </>
        :null}
      </Box>
    </>
  )
}

export default InvoicesList