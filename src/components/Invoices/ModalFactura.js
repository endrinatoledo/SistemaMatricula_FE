import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LoadingButtons from '../commonComponents/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import MaterialTable from '@material-table/core';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import moment from 'moment';
import FormatoComprobante from '../Payments/FormatoComprobante';
import ComprobantePDF from '../Payments/ComprobantePDF';
import ComprobanteFiscalPDF from '../Payments/ComprobanteFiscalPDF';

const AxiosInstance = require("../utils/request").default;
const style = {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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
    distribPago: {
        marginLeft: '3%',
        marginBottom: '3%',
    },

    div: {
        marginTop: 5,
        // marginBottom:40,
    }
})
const ModalFactura = ({ paginaCabecera, setPaginaCabecera, formatFactura, setFormatFactura, tipoAccion, setTipoAccion, facturaSeleccionada, setFacturaSeleccionada, modalFacturaValue, setModalFacturaValue }) => {
    const classes = UseStyles();
    const [botonSiguiente, setBotonSiguiente] = React.useState(null)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [companiaSeleccionada, setCompaniaSeleccionada] = React.useState();
    const [companiesList, setCompaniesList] = React.useState([])
    const [busquedaSeleccionada, setBusquedaSeleccionada] = React.useState({ id: 1, title: 'Representante'})
    const [keyValue, setKeyValue] = React.useState({ 'fecha': 0, 'cirif': 2000, 'razonSocial': 3000, 'telefonos': 4000, 'direccion': 5000 })
    const [pagosRegistrados, setPagosRegistrados] = React.useState();
    const [datosPago, setDatosPago] = React.useState();
    const tasaDelDia = { excAmount: parseFloat(facturaSeleccionada.cuerpo[0].indtasa) };
    const [datosCabecera, setDatosCabecera] = React.useState();
    const [formatoImpresion, setFormatoImpresion] = React.useState(null);
    const [datosCompletos, setDatosCompletos] = React.useState(null);
    const [numControl, setNumControl] = React.useState(null);
    const [numFact, setNumFact] = React.useState(null);

    const [nuevaCabecera, setNuevaCabecera] = React.useState({ 
        'fecha': facturaSeleccionada.fecha, 
        'cirif': facturaSeleccionada.cabecera.inhRifCed, 
        'razonSocial': facturaSeleccionada.cabecera.inhBusinessName ,
        'telefonos': facturaSeleccionada.cabecera.inhPhone, 
        'direccion': facturaSeleccionada.cabecera.inhAddress, 
    });
    const tipoBusqueda = [
        { id: 1, title: 'Representante' },
        { id: 2, title: 'Compañía' }
    ]
    const [voucherType, setVoucherType] = React.useState(null);
    console.log('companiaSeleccionada', companiaSeleccionada);
    console.log('facturaSeleccionada', facturaSeleccionada);

    const rellenarConCeros = (number) => {
        console.log('--------*****', typeof number)
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */
        var zero = "0"; /* String de cero */

        if (8 <= length) {
            if (number < 0) {
                return ("-" + numberOutput.toString());
            } else {
                return numberOutput.toString();
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(8 - length)) + numberOutput.toString());
            } else {
                return ((zero.repeat(8 - length)) + numberOutput.toString());
            }
        }
    }

    const handleClose = () => {
        setModalFacturaValue(false)
        setFacturaSeleccionada(null)
        setTipoAccion(null)
        setVoucherType(null)
        setPaginaCabecera(true)
    }

    console.log('-----------------', typeof facturaSeleccionada.numControl)

const mapearPagosRegistrados = () =>{
    const result = facturaSeleccionada.pago.map((item,index) =>{
        return {
                "moneda": item.depCurrency,
                "metodoPago": item.paymentMethodsPay,
                "monto": item.depAmount,
                "observacion": item.depObservatio,
                "banco": item.banksPay,
                "referencia": item.depApprovalNumber,
                "tarjeta": item.depCardNumber,
                "id": `id${index}`
            }
        
    });

    return result;
}

    const getCompanies = async () => {
        try {
            const resultCompanies = (await AxiosInstance.get(`/companies/allCompanies/active`)).data
            console.log('resultCompanies', resultCompanies)

            if (resultCompanies.ok === true) {
                setCompaniesList(resultCompanies.data)
                // setOpenModal(true)
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
    const ordenarDetalleDePago = (pago) => {
        let descripcion = ''

        pago.forEach(element => {
            // console.log('element', element)
            if (element.paymentMethodsPay.payName != 'EFECTIVO') {
                if (element.banksPay !== null) descripcion = `${descripcion} Banco: ${element.banksPay.banName}, `
                if (element.depApprovalNumber !== null) descripcion = `${descripcion} Referencia: ${element.depApprovalNumber}, `
                if (element.depCardNumber !== null && element.depCardNumber !== undefined) descripcion = `${descripcion} Tarjeta: ${element.depCardNumber}, `
                descripcion = `${descripcion} - `
            }

        });
        return descripcion.substring(0, descripcion.length - 2)
        // setDestallesDePagos(descripcion.substring(0, descripcion.length - 2))
    }
    const ordenarObservaciones = (pago) => {
        let descripcion = ''

        pago.forEach(element => {
            // console.log('element', element)
            if (element.depObservation != '' && element.depObservation != null) {
                descripcion = `${descripcion} ${element.depObservation} - `
            }

        });
        return descripcion.substring(0, descripcion.length - 2)
    }

    const mapeoDataCabecera = () => {
        // setDatosCabecera

    }

    const mapearCuerpo = () => {
        const result = facturaSeleccionada.cuerpo.map((item,index) =>
            {
            return {
                "key": index,
                "student": item.indStuNam,
                "descripcion": item.indDescripcion,
                "costo": item.indcosto,
                "pagoAplicadoBol": item.indMontoAgregadoBol
            }
            })
        return result
    }



    const mapearDatosPago = () => {
        const result = facturaSeleccionada.cuerpo.map((item,index) =>{
            return  {
                "key": `id${index}`,
                    // "mopId": 2501,
                    // "mes": "feb",
                    // "student": "Victoria  Montilla Diaz -> 4TO. AÑO ",
                    // "descripcion": "Mensualidad Febrero",
                    // "costo": 20,
                    // "costoNeto": 20,
                    // "moneda": null,
                    // "metodoPago": null,
                    // "montoPagado": 5,
                    // "restante": 15,
                    // "descripcionPago": "",
                    // "montoRestanteAplicadoBol": 289.68,
                    // "montoRestanteAplicadoDol": 11.8769987699877,
                    // "pagoAplicadoDol": 3.1230012300123002,
                    // "pagoAplicadoBol": 76.17
                }
            
            
        })
        return result
    }
    const formatoAimprimir = () => {


        setPaginaCabecera(false)
        setDatosCompletos(
            {
                "cabecera": {
                    "razonSocial": nuevaCabecera.razonSocial,
                    "identificacion": nuevaCabecera.cirif,
                    "date": nuevaCabecera.fecha,
                    "address": nuevaCabecera.direccion,
                    "phones": nuevaCabecera.telefonos,
                    "voucherType": voucherType
                },
                "cuerpo": mapearCuerpo()
            }
        )
        setPagosRegistrados(mapearPagosRegistrados())
        setDatosPago(mapearDatosPago())
        setNumFact(rellenarConCeros(Number(facturaSeleccionada.numFact)))
        setNumControl(`00-${rellenarConCeros(Number(facturaSeleccionada.numControl))}`)
        setTimeout(() => {
            setFormatoImpresion(voucherType);
        }, 2000);
    }

    const validarCabecera = () => {

        if (nuevaCabecera.fecha === '' || nuevaCabecera.fecha === null || nuevaCabecera.cirif === '' || nuevaCabecera.cirif === null
            || nuevaCabecera.razonSocial === '' || nuevaCabecera.razonSocial === null || nuevaCabecera.telefonos === '' || nuevaCabecera.telefonos === null
            || nuevaCabecera.direccion === '' || nuevaCabecera.direccion === null || voucherType === null || voucherType === ''){
            setBotonSiguiente(true)
        }else{
            setBotonSiguiente(false)
        }
    }

    React.useEffect(() => {

        if (busquedaSeleccionada!==null){
            setKeyValue({ 'fecha': keyValue.fecha + 1, 'cirif': keyValue.cirif + 1, 'razonSocial': keyValue.razonSocial + 1, 'telefonos': keyValue.telefonos + 1, 'direccion': keyValue.direccion + 1 })

            if (busquedaSeleccionada.id === 1) {
                setCompaniaSeleccionada()
                setNuevaCabecera({
                    'fecha': facturaSeleccionada.fecha,
                    'cirif': facturaSeleccionada.cabecera.inhRifCed,
                    'razonSocial': facturaSeleccionada.cabecera.inhBusinessName,
                    'telefonos': facturaSeleccionada.cabecera.inhPhone,
                    'direccion': facturaSeleccionada.cabecera.inhAddress,
                })
            }
            else {
                setKeyValue({ 'fecha': keyValue.fecha + 1, 'cirif': keyValue.cirif + 1, 'razonSocial': keyValue.razonSocial + 1, 'telefonos': keyValue.telefonos + 1, 'direccion': keyValue.direccion + 1 })
                setNuevaCabecera({
                    address: '',
                    identificacion: '',
                    phones: '',
                    razonSocial: '',
                })
            }
        }
    }, [busquedaSeleccionada])


    React.useEffect(() => {
        validarCabecera()
    }, [nuevaCabecera])
    React.useEffect(() => {
        getCompanies()
        validarCabecera()
    }, [])
    React.useEffect(() => {
        validarCabecera()
    }, [voucherType])

    React.useEffect(() => {
        if(!botonSiguiente){
            mapeoDataCabecera()
        }
    }, [botonSiguiente])

    React.useEffect(() => {

        if (companiaSeleccionada) {
            setKeyValue({ 'fecha': keyValue.fecha + 1, 'cirif': keyValue.cirif + 1, 'razonSocial': keyValue.razonSocial + 1, 'telefonos': keyValue.telefonos + 1, 'direccion': keyValue.direccion + 1 })
                setNuevaCabecera({
            'fecha': facturaSeleccionada.fecha,
            'cirif': companiaSeleccionada.comRif,
            'razonSocial': companiaSeleccionada.comName,
            'telefonos': companiaSeleccionada.comPhone,
            'direccion': companiaSeleccionada.comDirection,

        })
        }
    }, companiaSeleccionada)

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={modalFacturaValue}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: '95%', height: '87%' }}>
                    {(paginaCabecera)
                    ? <>
                            <Typography variant='h5' component='h1' className={classes.title}>
                                Datos de factura
                            </Typography>
                            <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                <Autocomplete
                                    // key={clearField.moneda}
                                    disableClearable
                                    sx={{ width: '15%' }}
                                    options={['COMPROBANTE', 'FACTURA FISCAL']}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Tipo de comprobante" variant="standard"
                                        />
                                    )}
                                    value={voucherType}
                                    getOptionSelected={(option, value) => option === value}
                                    getOptionLabel={(option) => option}
                                    onChange={(event, newValue) => {
                                        console.log('este compro', newValue)
                                        setVoucherType(newValue)
                                    }}
                                    required
                                    id="clear-on-escape"
                                />
                                <Autocomplete
                                    disableClearable
                                    options={tipoBusqueda}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="standard" label="Tipo de Búsqueda" />
                                    )}
                                    value={busquedaSeleccionada ? busquedaSeleccionada : null}
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
                                    (busquedaSeleccionada !== null && busquedaSeleccionada.id === 2)
                                        ? <Autocomplete
                                            disableClearable
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
                            <div >
                                <Stack spacing={2} direction="row"
                                    justifyContent="flex-start"
                                    alignfacturaSeleccionadas="flex-start" className={classes.title}>

                                    <TextField
                                        key={keyValue.fecha}
                                        value={nuevaCabecera.fecha}
                                        id="fecha"
                                        label="Fecha"
                                        variant="standard"
                                        onChange={e => {
                                            setNuevaCabecera({ ...nuevaCabecera, fecha: e.target.value && (e.target.value).trim() != '' ? e.target.value : null })
                                        }}
                                        sx={{ width: '10%' }}
                                    />
                                    <TextField
                                        key={keyValue.cirif}
                                        value={nuevaCabecera.cirif}
                                        id="rif"
                                        label="CI/RIF"
                                        variant="standard"
                                        onChange={e => {
                                            setNuevaCabecera({ ...nuevaCabecera, cirif: e.target.value && (e.target.value).trim() != '' ? e.target.value : null })
                                        }}
                                        sx={{ width: '15%' }}
                                    />
                                    <TextField
                                        key={keyValue.telefonos}
                                        value={nuevaCabecera.telefonos}
                                        id="tlf"
                                        label="Teléfonos"
                                        variant="standard"
                                        onChange={e => {
                                            setNuevaCabecera({ ...nuevaCabecera, telefonos: e.target.value && (e.target.value).trim() != '' ? e.target.value : null })
                                        }}
                                        sx={{ width: '25%' }}
                                    />

                                </Stack>
                                <Stack spacing={2} direction="row"
                                    justifyContent="flex-start"
                                    alignfacturaSeleccionadas="flex-start" className={classes.title}>
                                    <TextField
                                        key={keyValue.razonSocial}
                                        value={nuevaCabecera.razonSocial}
                                        id="razonSocial"
                                        label="Razón Social"
                                        variant="standard"
                                        onChange={e => {
                                            setNuevaCabecera({ ...nuevaCabecera, razonSocial: e.target.value && (e.target.value).trim() != '' ? e.target.value : null })

                                        }}
                                        sx={{ width: '31%' }}
                                    />

                                    <TextField
                                        key={keyValue.direccion}
                                        value={nuevaCabecera.direccion}
                                        id="dir"
                                        label="Dirección"
                                        variant="standard"
                                        onChange={e => {
                                            setNuevaCabecera({ ...nuevaCabecera, direccion: e.target.value && (e.target.value).trim() != '' ? e.target.value : null })
                                        }}
                                        sx={{ width: '31%' }}
                                    />

                                </Stack>
                                <Stack spacing={2} direction="row"
                                    justifyContent="space-between"
                                    alignfacturaSeleccionadas="flex-start">
                                    <Box>
                                        <Stack className={classes.div} spacing={2} alignfacturaSeleccionadas="flex-end" direction="row" justifyContent="flex-start">
                                            <div><b>Fecha:</b> {facturaSeleccionada.fecha} </div>
                                            <div><b>Nro Control:</b> {facturaSeleccionada.cabecera.inhControlNumber}</div>
                                            <div><b>Nro Factura:</b> {facturaSeleccionada.cabecera.inhInvoiceNumber}</div>
                                        </Stack>
                                        <Stack className={classes.div} spacing={2} alignfacturaSeleccionadas="flex-end" direction="row" justifyContent="flex-start">
                                            <div><b>RIF/CI:</b> {facturaSeleccionada.cabecera.inhRifCed}</div>
                                            <div><b>Razón Social:</b> {facturaSeleccionada.cabecera.inhBusinessName}</div>
                                        </Stack>
                                        <Stack className={classes.div} spacing={2} alignfacturaSeleccionadas="flex-end" direction="row" justifyContent="flex-start">
                                            <div><b>Teléfonos:</b> {facturaSeleccionada.cabecera.inhPhone}</div>
                                            <div><b>Dirección:</b>  {facturaSeleccionada.cabecera.inhAddress}</div>
                                        </Stack>
                                        <Stack className={classes.div} spacing={2} alignfacturaSeleccionadas="flex-end" direction="row" justifyContent="flex-start">
                                            <div><b>Detalle de pago:</b>
                                                {ordenarDetalleDePago(facturaSeleccionada.pago)}
                                            </div>
                                            <div> </div>
                                        </Stack>
                                        <Stack className={classes.div} spacing={2} alignfacturaSeleccionadas="flex-end" direction="row" justifyContent="flex-start">
                                            <div><b>Observaciones:</b>
                                                {ordenarObservaciones(facturaSeleccionada.pago)}
                                            </div>
                                            <div> </div>
                                        </Stack>
                                    </Box>
                                    <Box>
                                        <Stack spacing={2} alignfacturaSeleccionadas="flex-end" direction="row" justifyContent="flex-start">
                                            <Stack spacing={0.5} alignfacturaSeleccionadas="flex-end" direction="column" justifyContent="flex-start">
                                                <div><b>Conceptos de pago y montos:</b> </div>
                                                {facturaSeleccionada.cuerpo.map((element, index) => <div> {`${element.indDescripcion} ${element.indStuName} : Bs. ${element.indMontoAgregadoBol != null ? (parseFloat(element.indMontoAgregadoBol)).toFixed(2) : 0}`}</div>)}

                                                <div><b>Formas de pago:</b> </div>
                                                {facturaSeleccionada.pago.map((element, index) => <div> {`${element.paymentMethodsPay.payName} : Bs. ${element.depCurrency === 'Dólares' ? (parseFloat(element.depAmount) * parseFloat(element.deptasa)).toFixed(2) : (element.depAmount).toFixed(2)} `}</div>)}
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                                <Divider className={classes.div} />
                            </div>
                    </>

                        : (formatoImpresion != null) 
                            ? (formatoImpresion === 'COMPROBANTE')
                            //  datosPago
                                ? <ComprobantePDF replicaDatosPago={[]} numControl={numControl} numFact={numFact} datosCompletos={datosCompletos} datosPago={datosPago} tasaDelDia={tasaDelDia} pagosRegistrados={pagosRegistrados}/>
                                : (formatoImpresion === 'FACTURA FISCAL')
                                ?
                                <ComprobanteFiscalPDF />
                            : null
                        : null}
                    
                        <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-end" className={classes.stack}>
                            <Button variant="outlined" onClick={handleClose}
                                color="error">Cerrar</Button>
                            <Button variant="contained" 
                            disabled={botonSiguiente}
                            onClick={() => formatoAimprimir()}
                                color="success">Siguiente</Button>
                        </Stack>
                        
                    
                </Box>
            </Modal>
        </div>
    )
}

export default ModalFactura