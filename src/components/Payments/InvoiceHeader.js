import * as React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButtons from '../commonComponents/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';

const AxiosInstance = require("../utils/request").default;
const UseStyles = makeStyles({
    stack: {
        marginTop: 40
    },
    TextField: {
        marginBottom: '3%',
    }, 
    title: {
        marginBottom: 40
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

    },
    distribPago:{
        marginLeft:'3%',
        marginBottom: '3%',
    } 

    // box:{
    //     marginTop:40,
    //     marginBottom:40,
    // }
})
const InvoiceHeader = ({ setVoucherType, datosBase, setDatosCabecera, datosCabecera, Item2, pagosRegistrados, datosPago}) => {

    const classes = UseStyles();
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false)

    const tipoBusqueda = [
        { id: 1, title: 'Representante' },
        { id: 2, title: 'Compañía' }
    ]

    const [busquedaSeleccionada, setBusquedaSeleccionada] = React.useState({ id: 1, title: 'Representante' })
    const [companiaSeleccionada, setCompaniaSeleccionada] = React.useState()
    const [datosRepresentante, setDatosRepresentante] = React.useState(datosCabecera)
    const [companiesList, setCompaniesList] = React.useState([])

    const getCompanies= async () => {
        try {
            const resultCompanies = (await AxiosInstance.get(`/companies/allCompanies/active`)).data
            console.log('resultCompanies', resultCompanies)

            if (resultCompanies.ok === true) {
                setCompaniesList(resultCompanies.data)
                setOpenModal(true)
            } else {
                setMessage(resultCompanies.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch {
            setMessage('Error consultando compañias')
            setAlertType("error")
            setAlertModal(true)
        }
    }
    React.useEffect(() => {
        if (busquedaSeleccionada.id === 1) {
            setDatosCabecera(datosRepresentante)
            setCompaniaSeleccionada()
        }else{
            setDatosCabecera({
                ...datosCabecera,
                address: '',
                identificacion: '',
                phones: '',
                razonSocial: '',
            })
        }
    }, [busquedaSeleccionada.id])

    React.useEffect(() => {
        getCompanies()
    }, [])

    React.useEffect(() => {
        if (companiaSeleccionada){
            setDatosCabecera({
                ...datosCabecera,
                address: companiaSeleccionada.comDirection,
                identificacion: companiaSeleccionada.comRif,
                phones: companiaSeleccionada.comPhone,
                razonSocial: companiaSeleccionada.comName,
            })
        }
    }, companiaSeleccionada)

    

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
                  {datosCabecera ? 
                      <Item2>
                          <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                              <Autocomplete
                              options={tipoBusqueda}
                              renderInput={(params) => (
                                  <TextField {...params} variant="standard" label="Tipo de Búsqueda" />
                              )}
                              value={busquedaSeleccionada}
                              getOptionLabel={(option) => option.title}
                              onChange={(event, newValue) => {
                                  setBusquedaSeleccionada(newValue)
                              }}
                              required
                              noOptionsText={'Sin Opciones'}
                              sx={{ width: '15%' }}
                              id="clear-on-escape"
                          />
                          {
                            (busquedaSeleccionada.id == 2)
                                      ? <Autocomplete
                                          options={companiesList}
                                          renderInput={(params) => (
                                              <TextField {...params} variant="standard" label="Seleccionar Compañía" />
                                          )}
                                          value={companiaSeleccionada}
                                          getOptionLabel={(option) => option.comName}
                                          onChange={(event, newValue) => {
                                              setCompaniaSeleccionada(newValue)
                                          }}
                                          required
                                          noOptionsText={'Sin Opciones'}
                                          sx={{ width: '35%' }}
                                          id="clear-on-escape"
                                      />
                            : null
                          }
                          </Stack>

                          

                          <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                              <TextField
                                  sx={{ width: '38%' }}
                                  required
                                  // key={clearField.observacion}
                                  value={datosCabecera.razonSocial}
                                  id="razonSocial"
                                  label="Razón Social"
                                  variant="standard"
                                  onChange={e => {
                                      setDatosCabecera({ ...datosCabecera, razonSocial: e.target.value })
                                  }}
                              />
                              <TextField
                                  sx={{ width: '20%' }}
                                  required
                                  // key={clearField.observacion}
                                  value={datosCabecera.identificacion}
                                  id="identificacion"
                                  label="Rif / Identificación"
                                  variant="standard"
                                  onChange={e => {
                                      setDatosCabecera({ ...datosCabecera, identificacion: e.target.value })
                                  }}
                              />
                              <TextField
                                  sx={{ width: '15%' }}
                                  disabled={true}
                                  value={datosCabecera.date}
                                  // key={clearField.observacion}
                                  id="date"
                                  label="Fecha"
                                  variant="standard"
                              />



                              {/* <TextField
                                                // error={errorMontoDP}
                                                // helperText={mensajeErrorMontoDP}
                                                // key={clearField.monto}
                                                sx={{ width: '18%' }}
                                                required            
                                                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                id="monto"
                                                label="Monto"
                                                variant="standard"
                                                onChange={e => {
                                                    // setPagoPorRegistrar({ ...pagoPorRegistrar, monto: e.target.value })                      
                                                }}
                                            /> */}


                          </Stack>
                          <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                              <TextField
                                  sx={{ width: '38%' }}
                                  required
                                  // key={clearField.observacion}
                                  value={datosCabecera.address}
                                  id="address"
                                  label="Dirección"
                                  variant="standard"
                                  onChange={e => {
                                      setDatosCabecera({ ...datosCabecera, address: e.target.value })
                                  }}
                              />
                              <TextField
                                  sx={{ width: '20%' }}
                                  required
                                  // key={clearField.observacion}
                                  value={datosCabecera.phones}
                                  id="phones"
                                  label="Teléfonos"
                                  variant="standard"
                                  onChange={e => {
                                      setDatosCabecera({ ...datosCabecera, phones: e.target.value })
                                  }}
                              />
                              <Autocomplete
                                  // key={clearField.moneda}
                                  sx={{ width: '15%' }}
                                  options={['COMPROBANTE','FACTURA FISCAL']}
                                  renderInput={(params) => (
                                      <TextField {...params} label="Tipo de comprobante" variant="standard"
                                      />
                                  )}
                                  value={datosCabecera.voucherType}
                                  getOptionLabel={(option) => option}
                                  onChange={(event, newValue) => {
                                      setVoucherType(newValue)
                                      setDatosCabecera({ ...datosCabecera, voucherType: newValue })
                                  }}
                                  required
                                  id="clear-on-escape"
                              />
                              {/* <TextField
                                                // error={errorMontoDP}
                                                // helperText={mensajeErrorMontoDP}
                                                // key={clearField.monto}
                                                sx={{ width: '18%' }}
                                                required            
                                                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                id="monto"
                                                label="Monto"
                                                variant="standard"
                                                onChange={e => {
                                                    // setPagoPorRegistrar({ ...pagoPorRegistrar, monto: e.target.value })                      
                                                }}
                                            /> */}
                          </Stack>
                          {(alertModal) ?
                              <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                              : null} 
                      </Item2>
                : null}   
        </Grid>
      </Grid>
    </div>
  )
}

export default InvoiceHeader
