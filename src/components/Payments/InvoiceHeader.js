import * as React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButtons from '../commonComponents/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import moment from 'moment';
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
const InvoiceHeader = ({families, Item2, pagosRegistrados, datosPago}) => {

    const classes = UseStyles();
    const fechaActual= moment(new Date()).format("DD/MM/YYYY")
    const [datosCabecera, setDatosCabecera] = React.useState(null)

    const datosBase = () => {
        setDatosCabecera({
            "razonSocial": `${families[0].representative.repFirstName} ${families[0].representative.repSurname}`,
            "identificacion": `${families[0].representative.repIdType}-${families[0].representative.repIdentificationNumber}`,
            "date": `${fechaActual}`,
            "address": `${families[0].representative.repAddress}`,
            "phones": `${families[0].representative.repPhones}`,
        })
    }

    React.useEffect(() => {
        datosBase()
    }, [1])

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
                  {datosCabecera ? 
                      <Item2>
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
                              {/* <Autocomplete
                                  // key={clearField.moneda}
                                  sx={{ width: '23%' }}
                                  options={['DE CONTADO']}
                                  renderInput={(params) => (
                                      <TextField {...params} label="Forma de Pago" variant="standard"
                                      />
                                  )}
                                  // value={item.moneda}
                                  getOptionLabel={(option) => option}
                                  onChange={(event, newValue) => {
                                      // setPagoPorRegistrar({ ...pagoPorRegistrar, moneda: newValue })   
                                  }}
                                  required
                                  id="clear-on-escape"
                              /> */}



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
                      </Item2>
                : null}
            
        </Grid>
      </Grid>
    </div>
  )
}

export default InvoiceHeader
