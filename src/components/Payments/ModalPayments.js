import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LoadingButtons from '../commonComponents/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import nextId from "react-id-generator";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import MaterialTable from '@material-table/core';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment';
import InvoiceHeader from './InvoiceHeader';
import FormatoComprobante from './FormatoComprobante';
import ComprobantePDF from './ComprobantePDF';
import ComprobanteFiscalPDF from './ComprobanteFiscalPDF';
import GenerarComprobanteFicalFile from './GenerarComprobanteFicalFile';


const ModalAlertCancel = require('../AlertMessages/ModalAlertCancel').default

const AxiosInstance = require("../utils/request").default;

const style = {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '70%',
    // height: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
    }

    // box:{
    //     marginTop:40,
    //     marginBottom:40,
    // }
})

const ModalPayments = ({ dataDetalle, periodoSeleccionado, numLimpiarFactura, setNumLimpiarFactura, pagosRegistrados, setPagosRegistrados, datosPago, setDatosPago, datosCabecera, setDatosCabecera, selectedFamily, getMensualidadesFamily, families, setMesesApagar, mesesApagar, pagoModal, setPagoModal, mensualidades }) => {
    const classes = UseStyles();
    const [layautPagos, setlayautPagos] = React.useState(false)
    const [circularProgress, setCircularProgress] = React.useState(false)
    const [tipoConcepto, setTipoConcepto] = React.useState(null)
    const [userResponse, setUserResponse] = React.useState('')
    const [modalCancel, setModalCancel] = React.useState(false)
    const [valorMensualidad, setValorMensualidad] = React.useState(null)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false)
    const [metodosPago, setMetodosPago] = React.useState([])
    const [bankList, setBankList] = React.useState([])
    const [errorMontoDP, setErrorMontoDP] = React.useState(false)
    const [mensajeErrorMontoDP, setMensajeErrorMontoDP] = React.useState('')
    const [listaMonedas, setListaMonedas] = React.useState(['Dólares', 'Bolívares'])
    const [pagoPorRegistrar, setPagoPorRegistrar] = React.useState({ moneda: null, metodoPago: null, monto: null, observacion: null, banco: null, referencia: null, tarjeta: null })
    const [distribicionPorRegistrar, setDistribicionPorRegistrar] = React.useState({ student: null, descripcion: null, costoNeto: null, pago: null, restante:null })
    const [mensajeErrorCosto, setMensajeErrorCosto] = React.useState('')
    const [errorCosto, setErrorCosto] = React.useState(false)
    const [mensajeErrorPago, setMensajeErrorPago] = React.useState('')
    const [errorPago, setErrorPago] = React.useState(false)
    const [statusBotonAgregarDistribucion, setStatusBotonAgregarDistribucion] = React.useState(false)
    const [statusBotonAgregar, setStatusBotonAgregar] = React.useState(false)
    const [montoTotalDolares, setMontoTotalDolares] = React.useState(0)
    const [montoTotalBolivares, setMontoTotalBolivares] = React.useState(0)
    const [montoTotalDolaresDis, setMontoTotalDolaresDis] = React.useState(0)
    const [montoTotalBolivaresDis, setMontoTotalBolivaresDis] = React.useState(0)
    const [conteo, setConteo] = React.useState(0)
    const [estatusBotonSiguiente, setEstatusBotonSiguiente] = React.useState(true)
    const [tasaDelDia, setTasaDelDia] = React.useState(0)
    const [paginaCabecera, setPaginaCabecera] = React.useState(false)
    const [formatFactura, setFormatFactura] = React.useState(false)
    const [clearField, setClearField] = React.useState({ moneda: 0, metodoPago: 100, monto: 200, observacion: 300, banco: 400, referencia: 500, tarjeta: 600})
    const [clearFieldDistribucion, setClearFieldDistribucion] = React.useState({ student: 0, descripcion: 100, costoNeto: 200, pago: 300, restante: 400, montoRestanteAplicadoBol: 500, montoRestanteAplicadoDol: 600, pagoAplicadoDol: 700, pagoAplicadoBol:800  })
    const [datosCompletos, setDatosCompletos] = React.useState(null)
    const [mostrarComprobante, setMostrarComprobante] = React.useState(false)
    const [voucherType, setVoucherType] = React.useState(null)
    const [listadoEstudiantes, setlistadoEstudiantes] = React.useState([])
    const [listadoConceptosPago, setListadoConceptosPago] = React.useState([])
    const [numControl, setNumControl] = React.useState(null)
    const [numFact, setNumFact] = React.useState(null)
    const [numControlFormatoNum, setNumControlFormatoNum] = React.useState(null)
    const [numFactFormatoNum, setNumFactFormatoNum] = React.useState(null)
    const [montoGeneral, setMontoGeneral] = React.useState(0)
    const [replicaDatosPago, setReplicaDatosPago] = React.useState([])
    const [montoTotalAdistribuir, setMontoTotalAdistribuir] = React.useState(0)
    const [botonAplicarPago, setBotonAplicarPago] = React.useState(false)
    const [statusCostosArray, setStatusCostosArray] = React.useState(false)
    const [statusPagosAplicados, setStatusPagosAplicados] = React.useState(false)
    const [montoSinAsignar, setMontoSinAsignar] = React.useState(0)

    console.log('datosPago', datosPago)
    const fechaActual = moment(new Date()).format("DD-MM-YYYY")
    const columnsPago = [{ title: 'Moneda', field: 'moneda' },
    { title: 'Método pago', field: 'metodoPago', render: (rows) => <>{rows.metodoPago.payName}</> },
    { title: 'Monto', field: 'monto' },
    { title: 'Observacion', field: 'observacion' },
    { title: 'Tarjeta', field: 'tarjeta' },
    { title: 'Banco', field: 'banco', render: (rows) => <>{rows.banco !== null ? rows.banco.banName : ''}</> },
    { title: 'Referencia', field: 'referencia', render: (rows) => <>{rows.referencia !== null ? rows.referencia : ''}</> }]

    const columnsDisPago = [
        { title: 'Estudiante', field: 'student', editable: 'never' },
        { title: 'Descripción Pago', field: 'descripcion', editable: 'never' },
        { title: 'Costo', field: 'costoNeto', type: 'currency' },
        { title: 'Pago', field: 'pago', type: 'currency', validate: rowData => (rowData.pago === undefined || rowData.pago === '' || rowData.pago === null || rowData.pago === 0) ? "Requerido" : rowData.pago > rowData.restante ? 'Monto Excedido' : true },
        { title: 'Monto Restante $', field: 'restante', editable: 'never', type: 'currency' },
        { title: 'Monto Restante Bs', editable: 'never', type: 'currency', render: rowData => (rowData.pago === undefined || rowData.pago === '' || rowData.pago === null || rowData.pago === 0) ? (parseFloat(rowData.restante) * tasaDelDia.excAmount).toFixed(2) : ''}
    ]

    const datosBase = () => {
        setDatosCabecera({
            "razonSocial": `${families[0].representative.repFirstName} ${families[0].representative.repSurname}`,
            "identificacion": `${families[0].representative.repIdType}-${families[0].representative.repIdentificationNumber}`,
            "date": `${fechaActual}`,
            "address": `${families[0].representative.repAddress}`,
            "phones": `${families[0].representative.repPhones}`,
            "voucherType": ""
        })
    }

    const arrayEstudiantes = () => {
        const studentsList = mensualidades.map((item,index) =>{ return {"key": index, "stuId": item.stuId, "student": item.student} })      
        setlistadoEstudiantes(studentsList)
    }

    const arrayConceptosDePago = async () => {
        
        try {
            const conceptosPagoRes = (await AxiosInstance.get(`/invoiceConcepts/allInvoiceConcepts/active`)).data
            if (conceptosPagoRes.ok === true) {
                setListadoConceptosPago(conceptosPagoRes.data)
            } else {
                setMessage(conceptosPagoRes.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch (error) {
            setMessage('Error al consultar conceptos de pago')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    const handleClose = () => {

        if (userResponse === 'yes') {
            setPagosRegistrados([])
            setDatosPago([])
            setMesesApagar([])
            setPagoModal(false)
            setDatosCabecera(null)
        } else
            if (userResponse === 'no') {
                setModalCancel(false)
            }
    };

    const cambiarStatusBotonAgregarPago = () => {

        if (pagoPorRegistrar.moneda === null || pagoPorRegistrar.metodoPago === null || pagoPorRegistrar.monto === 0 || pagoPorRegistrar.monto === null
            || pagoPorRegistrar.monto === '') {
            setStatusBotonAgregar(true)
        } else {
            setStatusBotonAgregar(false)
        }
    };

    const cambiarStatusBotonDistribucionPago = () => {
        if (distribicionPorRegistrar.student === null || distribicionPorRegistrar.student === '' || distribicionPorRegistrar.descripcion === null || distribicionPorRegistrar.descripcion === '' || distribicionPorRegistrar.costoNeto === 0 || distribicionPorRegistrar.costoNeto === '' || distribicionPorRegistrar.pago === null || distribicionPorRegistrar.pago === '') {
            setStatusBotonAgregarDistribucion(true)
        } else {
            setStatusBotonAgregarDistribucion(false)
        }
    };

    const montosTotales = async () => {
        if (Array.isArray(pagosRegistrados) && pagosRegistrados.length){
            setMontoTotalDolares(pagosRegistrados.reduce((accumulator, object) => {
                return object.moneda === 'Dólares' ? Number(accumulator) + Number(object.monto) : Number(accumulator) + 0;
            }, 0))
            setMontoTotalBolivares(pagosRegistrados.reduce((accumulator, object) => {
                return object.moneda === 'Bolívares' ? Number(accumulator) + Number(object.monto) : Number(accumulator) + 0;
            }, 0))
            setConteo(conteo + 1)
        }else{
            setMontoTotalDolares(0)
            setMontoTotalBolivares(0)
            setMontoTotalAdistribuir(0)
            setBotonAplicarPago(false) 
            setStatusPagosAplicados(false)
            setReplicaDatosPago(datosPago)
            setClearFieldDistribucion({
                ...clearFieldDistribucion,
                montoRestanteAplicadoBol: (clearFieldDistribucion.montoRestanteAplicadoBol + 1),
                montoRestanteAplicadoDol: (clearFieldDistribucion.montoRestanteAplicadoDol + 1),
                pagoAplicadoDol: (clearFieldDistribucion.pagoAplicadoDol + 1),
                pagoAplicadoBol: (clearFieldDistribucion.pagoAplicadoBol + 1)
            })
        }
    }

    const trunc = (x, posiciones = 0) => {
        var s = x.toString()
        var l = s.length
        var decimalLength = s.indexOf('.') + 1
        if (decimalLength == 0) {
            return Number(x)
        } else {
            var numStr = s.substr(0, decimalLength + posiciones)
            return Number(numStr)
        }
    }

    const calcularMontoGeneral = () => {
        if (montoTotalBolivares !== 0){
            const division = montoTotalBolivares / tasaDelDia.excAmount
            const buscarDecimal = String(division).indexOf('.')

            if (buscarDecimal !== -1){
                setMontoGeneral((montoTotalBolivares / tasaDelDia.excAmount).toFixed(2) + montoTotalDolares)
            }else{
                setMontoGeneral(division + montoTotalDolares)
            }            
        }else{
            setMontoGeneral(montoTotalDolares)
        }
    }

    const montosDistribuidosTotales = async () => {
        // setMontoTotalDolaresDis((datosPago.reduce((accumulator, object) => {
        //     return Number(accumulator) + Number(object.pago);
        // }, 0)).toFixed(2))

        // setMontoTotalBolivaresDis(((datosPago.reduce((accumulator, object) => {
        //     return Number(accumulator) + Number(object.pago);
        // }, 0)) * tasaDelDia.excAmount).toFixed(2))
        // setConteo(conteo + 1)

        setMontoTotalDolaresDis((replicaDatosPago.reduce((accumulator, object) => {
            return Number(accumulator) + Number(object.restante);
        }, 0)).toFixed(2))

        setMontoTotalBolivaresDis(((replicaDatosPago.reduce((accumulator, object) => {
            return Number(accumulator) + Number(object.restante);
        }, 0)) * tasaDelDia.excAmount).toFixed(2))
        setConteo(conteo + 1)

    }
    const agregarPago = () => {

        const numeroConvertido = Number(pagoPorRegistrar.monto) + 0
        if (String(numeroConvertido) == 'NaN') {
            setErrorMontoDP(true)
            setMensajeErrorMontoDP('Monto en números')
        } else {
            setErrorMontoDP(false)
            setMensajeErrorMontoDP('')

            pagoPorRegistrar.id = nextId()

            let data = pagosRegistrados
            data.push(pagoPorRegistrar)
            setPagosRegistrados(data)
            limpiarFormularioAgregarPago()
            montosTotales()
            validarCostosArray()
            // validarCostosArray()
            
        }
    };

    const agregarDistribucion = () => {

        const pagoConvertido = Number(distribicionPorRegistrar.pago) + 0
        const costoConvertido = Number(distribicionPorRegistrar.costoNeto) + 0
        if (String(costoConvertido) == 'NaN' ) {
            setErrorCosto(true)
            setMensajeErrorCosto('Monto en números')
        } else if (String(pagoConvertido) == 'NaN') {

            setErrorCosto(false)
            setMensajeErrorCosto('')
            setErrorPago(true)
            setMensajeErrorPago('Monto en números')
        } 
        else {
            setErrorCosto(false)
            setMensajeErrorCosto('')
            setErrorPago(false)
            setMensajeErrorPago('')
            distribicionPorRegistrar.key = nextId()
            distribicionPorRegistrar.costoNeto = parseFloat(distribicionPorRegistrar.costoNeto)
            distribicionPorRegistrar.pago = parseFloat(distribicionPorRegistrar.pago)

            console.log('datosPago', datosPago)
            let data = datosPago
            data.push(distribicionPorRegistrar)
            setDatosPago(data)
            limpiarFormularioAgregarDistribucion()
            // montosTotales()
        }
    };

    const limpiarFormularioAgregarDistribucion = () => {

        setDistribicionPorRegistrar({ student: null, descripcion: null, costoNeto: null, pago: null })
        setClearFieldDistribucion(
            {
                student: (clearFieldDistribucion.student + 1),
                descripcion: (clearFieldDistribucion.descripcion + 1),
                costoNeto: (clearFieldDistribucion.costoNeto + 1),
                pago: (clearFieldDistribucion.pago + 1),
                montoRestanteAplicadoBol: (clearFieldDistribucion.montoRestanteAplicadoBol + 1),
                montoRestanteAplicadoDol: (clearFieldDistribucion.montoRestanteAplicadoDol + 1),
                pagoAplicadoDol: (clearFieldDistribucion.pagoAplicadoDol + 1),
                pagoAplicadoBol: (clearFieldDistribucion.pagoAplicadoBol + 1)
            })
    }

    const limpiarFormularioAgregarPago = () => {

        setPagoPorRegistrar({ moneda: null, metodoPago: null, monto: null, observacion: null, banco: null, referencia: null })
        setClearField(
            {
                moneda: (clearField.moneda + 1),
                metodoPago: (clearField.metodoPago + 1),
                monto: (clearField.monto + 1),
                observacion: (clearField.observacion + 1),
                banco: (clearField.banco + 1),
                referencia: (clearField.referencia + 1),
                tarjeta: (clearField.tarjeta + 1)
            })
    }
    const consultarTasaDelDia = async () => {
        try {
            const tasaDelDiaRes = (await AxiosInstance.get(`/exchangeRate/lastest/exchangeRates`)).data
            if (tasaDelDiaRes.ok === true) {
                setTasaDelDia(tasaDelDiaRes.data)
            } else {
                setMessage(tasaDelDiaRes.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch (error) {
            setMessage('Error al consultar tasa del día')
            setAlertType("error")
            setAlertModal(true)
        }
    }
    const consultarMetodosDePago = async () => {
        try {
            const metodosPagoRes = (await AxiosInstance.get(`/paymentmethod/`)).data
            if (metodosPagoRes.ok === true) {
                setMetodosPago(metodosPagoRes.data)
            } else {
                setMessage(metodosPagoRes.message)
                setAlertType("error")
                setAlertModal(true)
            }

        } catch (error) {
            setMessage('Error al consultar métodos de pago')
            setAlertType("error")
            setAlertModal(true)
        }
    }
    const consultarBancos = async () => {
        try {
            const bancosRes = (await AxiosInstance.get(`/banks/allBanks/active/`)).data
            if (bancosRes.ok === true) {
                setBankList(bancosRes.data)
            } else {
                setMessage(bancosRes.message)
                setAlertType("error")
                setAlertModal(true)
            }

        } catch (error) {
            setMessage('Error al consultar bancos')
            setAlertType("error")
            setAlertModal(true)
        }
    }
    const consultarValorMensualidad = async () => {

        try {
            const mensualidadRes = (await AxiosInstance.get(`/costoMensualidades/latest/item`)).data
            if (mensualidadRes.ok === true) {
                setValorMensualidad(mensualidadRes.data)
            } else {
                setMessage(mensualidadRes.message)
                setAlertType("error")
                setAlertModal(true)
            }

        } catch (error) {
            setMessage('Error al consultar el valor de la mensualdiad')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    const rellenarConCeros = (number) => {
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
    const consultarNumControl = async () => {

        try {
            const numControlRes = (await AxiosInstance.get(`/controlNumber/lastest`)).data
            if (numControlRes.ok === true) {
                setNumControlFormatoNum(Number(numControlRes.data.nucValue))
                setNumControl(`00-${rellenarConCeros(numControlRes.data.nucValue)}`)
            } else {
                setMessage(numControlRes.message)
                setAlertType("error")
                setAlertModal(true)
            }

        } catch (error) {
            setMessage('Error al consultar número de control')
            setAlertType("error")
            setAlertModal(true)
        }
    }
    const consultarNumFact = async () => {

        try {
            const numFactRes = (await AxiosInstance.get(`/invoiceNumber/lastest`)).data
            if (numFactRes.ok === true) {
                setNumFactFormatoNum(Number(numFactRes.data.nuiValue))
                setNumFact(`${rellenarConCeros(numFactRes.data.nuiValue)}`)
            } else {
                setMessage(numFactRes.message)
                setAlertType("error")
                setAlertModal(true)
            }

        } catch (error) {
            setMessage('Error al consultar número de factura')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    const ordenarDatosPago = () => {

        if (mesesApagar.length > 0) {
            const data = mesesApagar.map(item => {

                console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',item)

                return {
                    "key": nextId(),
                    "mopId": item.mopId,
                    "mes": item.mes,
                    "student": `${item.student} -> ${item.detallePago.level.levName} `,
                    "descripcion": `Mensualidad ${item.nombreMes}`,
                    // "nivel": item.detallePago.level.levName,
                    "costo": item.detallePago.mopAmountPaid != 0 ? item.detallePago.mopAmount : 0,
                    "costoNeto": item.detallePago.mopAmountPaid != 0 ? item.detallePago.mopAmount : 0,
                    "moneda": null,
                    "metodoPago": null,
                    "pago": item.mopAmountPaid,
                    "montoPagado": Number(item.detallePago.mopAmountPaid),
                    "restante": item.detallePago.mopAmountPaid != 0 ? Number(item.detallePago.mopAmount) - item.detallePago.mopAmountPaid : 0,
                    "descripcionPago": ""
                }
            })
            setDatosPago(data)
        }


    }

    const validarTarjeta = () => {
        if (pagoPorRegistrar.metodoPago !== null) {
            if (pagoPorRegistrar.metodoPago.payName == 'PTO. DE VENTA') {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    const validarMetodoDePago = () => {
        if (pagoPorRegistrar.metodoPago !== null) {
            if (pagoPorRegistrar.metodoPago.payName != 'EFECTIVO') {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }
    const cabecera = () => {
        setlayautPagos(false)
        setPaginaCabecera(true)
    }

    const validarCabecera = () => {
        if (datosCabecera.razonSocial === '' || datosCabecera.razonSocial === null || datosCabecera.razonSocial === undefined ||
            datosCabecera.identificacion === '' || datosCabecera.identificacion === null || datosCabecera.identificacion === undefined ||
            datosCabecera.address === '' || datosCabecera.address === null || datosCabecera.address === undefined ||
            datosCabecera.phones === '' || datosCabecera.phones === null || datosCabecera.phones === undefined ||
            datosCabecera.voucherType === '' || datosCabecera.voucherType === null || datosCabecera.voucherType === undefined) {
            return true
        } else {
            return false
        }

    }

    const confirmarCabecera = () => {
        setPaginaCabecera(false)
        setFormatFactura(true)
    }

    const validarGuardar = () => {
        //LOGICA NUEVA
        if (pagosRegistrados.length === 0 || replicaDatosPago.length === 0 || !statusPagosAplicados) {
            return true

        } else {
            const found = replicaDatosPago.find(element => element.pagoAplicadoDol === 0);
            if (found !== '' && found !== null && found !== undefined) {
                return true
            } else {
                return false
            }
        }


        //LOGICA VIEJA
        // if (pagosRegistrados.length === 0 || datosPago.length === 0) {
        //     return true

        // } else {
        //     const found = datosPago.find(element => element.pago === 0);
        //     if (found !== '' && found !== null && found !== undefined) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }
    }

    const confirmarCancelarRegistroDePago = () => {
        setModalCancel(true)
    }

    const cerrarModal = () => {
        setUserResponse('yes')
    }

    const validarBotonAnterior = () => {
        if (formatFactura) {

            setFormatFactura(false)
            setPaginaCabecera(true)
        }
        if (paginaCabecera) {
            setFormatFactura(false)
            setPaginaCabecera(false)
            setlayautPagos(true)
        }
    }

    const guardarRegistro = async () => {

        setCircularProgress(true)
        const data = {
            numControl:numControlFormatoNum,
            numFact:numFactFormatoNum,
            cabecera: datosCabecera,
            cuerpo: replicaDatosPago,
            // cuerpo: datosPago, //logica vieja
            familia: families,
            detallePagos: pagosRegistrados,
            periodo: periodoSeleccionado,
            tasa: tasaDelDia,
        }
        try {

            const guardarFacturaRes = (await AxiosInstance.post(`/invoiceHeader`, data)).data

            // console.log('guardarFacturaRes...................................', guardarFacturaRes)

            if (guardarFacturaRes.ok) {
                setDatosCompletos({
                    cabecera: datosCabecera,
                    cuerpo: replicaDatosPago,
                    // cuerpo: datosPago,
                    familia: families,
                    detallePagos: pagosRegistrados
                })
                setCircularProgress(false)
                // setMessage(guardarFacturaRes.message)
                // setAlertType("success")
                // setAlertModal(true)
                setMostrarComprobante(true)
                setFormatFactura(false)
                // setMostrarComprobante(true)
                setNumLimpiarFactura(numLimpiarFactura + 1)
                // setPagoModal(false)
            } else {
                setCircularProgress(false)
                setMessage(guardarFacturaRes.message)
                setAlertType("error")
                setAlertModal(true)
            }

        } catch (error) {
            console.log('Error al guardar registro factura ', error)
            // setMessage('Error al guardar factura')
            // setAlertType("error")
            // setAlertModal(true)
        }

    }

    const validarDiferencias = () => {
        if(montoGeneral !== montoTotalDolaresDis){
            const montoDiferencia = montoGeneral - montoTotalDolaresDis
            const filtrarMensualidadesPagadas = dataDetalle.filter(item => item.mopStatus != 1)
            const filtrarDatosPago = filtrarMensualidadesPagadas.filter(item => {
                // item.mopStatus != 1
                if (datosPago.length > 0){
                    for (let index = 0; index < datosPago.length; index++) {
                        const element = datosPago[index];
                        if (item.mopId != element.mopId) return item
                    }
                    // datosPago.foreach(element => {
                        
                    // })
                }
                
            })
            console.log('filtrarMensualidadesPagadas', filtrarMensualidadesPagadas.length)
            console.log('filtrarDatosPago', filtrarDatosPago.length)

        }
    }

    const validarCostosArray = () => {
        console.log('entro a validar validarCostosArray', replicaDatosPago)
        if (replicaDatosPago.length > 0){
            const response = replicaDatosPago.filter(item => item.costoNeto == 0);
            console.log('esta respuesta', response)
            if (response.length > 0) { 
                setStatusCostosArray(false) 
                setStatusPagosAplicados(false) 
            } else {
                 setStatusCostosArray(true)
                 
                 } 
        }
                   
    }

    const calcularMontoTotalAdistribuir = () => {      
        setMontoTotalAdistribuir((montoTotalDolares * tasaDelDia.excAmount.toFixed(2) + montoTotalBolivares))
    }

    const aplicarPago = () =>{
        let copiaMontoTotalAdistribuir = 0
        copiaMontoTotalAdistribuir = montoTotalAdistribuir
        let copiaReplicaDatosPago = []
        copiaReplicaDatosPago = replicaDatosPago
        replicaDatosPago.map((element,index) => {

            const montoRestante = element.restante * tasaDelDia.excAmount
            if (copiaMontoTotalAdistribuir >= montoRestante ){
                copiaMontoTotalAdistribuir = copiaMontoTotalAdistribuir - montoRestante
                copiaReplicaDatosPago[index].montoRestanteAplicadoBol = 0
                copiaReplicaDatosPago[index].montoRestanteAplicadoDol = 0
                copiaReplicaDatosPago[index].pagoAplicadoDol = element.restante
                copiaReplicaDatosPago[index].pagoAplicadoBol = montoRestante
                copiaReplicaDatosPago[index].descripcion = (element.descripcion).replace('Abono ','')

            }else{
                copiaReplicaDatosPago[index].descripcion = `Abono ${(element.descripcion).replace('Abono ', '') }`
                copiaReplicaDatosPago[index].montoRestanteAplicadoBol = montoRestante - copiaMontoTotalAdistribuir
                copiaReplicaDatosPago[index].montoRestanteAplicadoDol = (montoRestante - copiaMontoTotalAdistribuir) / tasaDelDia.excAmount
                copiaReplicaDatosPago[index].pagoAplicadoDol = copiaMontoTotalAdistribuir / tasaDelDia.excAmount
                copiaReplicaDatosPago[index].pagoAplicadoBol =  copiaMontoTotalAdistribuir
                copiaMontoTotalAdistribuir = 0

                return false 
            }    
        })
        setMontoSinAsignar(copiaMontoTotalAdistribuir)
        
        setReplicaDatosPago(copiaReplicaDatosPago)
        setClearFieldDistribucion({
            ...clearFieldDistribucion,
            montoRestanteAplicadoBol: (clearFieldDistribucion.montoRestanteAplicadoBol + 1),
            montoRestanteAplicadoDol: (clearFieldDistribucion.montoRestanteAplicadoDol + 1),
            pagoAplicadoDol: (clearFieldDistribucion.pagoAplicadoDol + 1),
            pagoAplicadoBol: (clearFieldDistribucion.pagoAplicadoBol + 1)
            })
        
        setStatusPagosAplicados(true)
        
    }

    React.useEffect(() => {
        if (montoTotalDolares || montoTotalBolivares){
             calcularMontoTotalAdistribuir()
            }
    }, [montoTotalDolares, montoTotalBolivares]);

    React.useEffect(() => {
        if (montoTotalAdistribuir && statusCostosArray) { setBotonAplicarPago(true) } else { setBotonAplicarPago(false) } 
    }, [montoTotalAdistribuir, statusCostosArray]);

    React.useEffect(() => {
        handleClose()
    }, [userResponse]);

    React.useEffect(() => {
    }, [montoTotalBolivares]);
    React.useEffect(() => {

    }, [montoTotalDolares]);
    React.useEffect(() => {
        consultarValorMensualidad()
        consultarMetodosDePago()
        consultarBancos()
        consultarTasaDelDia()
        datosBase()
        setlayautPagos(true)
        arrayEstudiantes()
        arrayConceptosDePago()
        consultarNumControl()
        consultarNumFact()
    }, [1])

    React.useEffect(() => {
        setReplicaDatosPago(datosPago)
    }, [datosPago])
    React.useEffect(() => {
        setClearFieldDistribucion({
                costoNeto: (clearFieldDistribucion.costoNeto + 1),
                pago: (clearFieldDistribucion.pago + 1),
                restante: (clearFieldDistribucion.restante + 1),
                montoRestanteAplicadoBol: (clearFieldDistribucion.montoRestanteAplicadoBol + 1),
                montoRestanteAplicadoDol: (clearFieldDistribucion.montoRestanteAplicadoDol + 1),
                pagoAplicadoDol: (clearFieldDistribucion.pagoAplicadoDol + 1),
                pagoAplicadoBol: (clearFieldDistribucion.pagoAplicadoBol + 1)
            })
    }, [replicaDatosPago])

    React.useEffect(() => {
        if (valorMensualidad) { ordenarDatosPago() }

    }, [valorMensualidad])

    React.useEffect(() => {
        cambiarStatusBotonAgregarPago()
    }, [pagoPorRegistrar])

    React.useEffect(() => {
        cambiarStatusBotonDistribucionPago()
    }, [distribicionPorRegistrar])

    React.useEffect(() => {
        console.log('entro a ver aqui')
        montosTotales()
        validarCostosArray()
    }, [pagosRegistrados])

    React.useEffect(() => {
        if (paginaCabecera){
             calcularMontoGeneral()
            }
    }, [paginaCabecera])

    React.useEffect(() => {
        // console.log('uuuuuuuuuuu', montoGeneral)
        if (montoGeneral !== 0) validarDiferencias()
    }, [montoGeneral])
    

    return (
        <>
            <Modal
                hideBackdrop open={pagoModal}
                onClose={handleClose}
                aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
                <Box sx={{ ...style, width: '95%', height: '87%' }}>
                    <h4 className={classes.title}> Agregar Pago</h4>

                    {
                        (paginaCabecera)
                            ? <InvoiceHeader setVoucherType={setVoucherType} datosBase={datosBase} setDatosCabecera={setDatosCabecera} datosCabecera={datosCabecera} Item2={Item2} pagosRegistrados={pagosRegistrados} datosPago={datosPago} />
                            : (formatFactura)
                                ? <FormatoComprobante replicaDatosPago={replicaDatosPago} numControl={numControl} numFact={numFact} datosPago={datosPago} tasaDelDia={tasaDelDia} datosCabecera={datosCabecera} pagosRegistrados={pagosRegistrados} />
                                : (mostrarComprobante) 
                                    ? (voucherType === 'COMPROBANTE')
                                        ? <ComprobantePDF replicaDatosPago={replicaDatosPago} numControl={numControl} numFact={numFact} datosCompletos={datosCompletos} datosPago={datosPago} tasaDelDia={tasaDelDia} datosCabecera={datosCabecera} pagosRegistrados={pagosRegistrados} />
                                        // : <GenerarComprobanteFicalFile numFact={numFact} datosCompletos={datosCompletos} datosPago={datosPago} tasaDelDia={tasaDelDia} datosCabecera={datosCabecera} pagosRegistrados={pagosRegistrados} />
                                        : <ComprobanteFiscalPDF replicaDatosPago={replicaDatosPago} numFact={numFact} datosCompletos={datosCompletos} datosPago={datosPago} tasaDelDia={tasaDelDia} datosCabecera={datosCabecera} pagosRegistrados={pagosRegistrados} />
                                    :
                                    (layautPagos) ?
                                        <div>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Item2>
                                                        <h5 className={classes.title}>Detalle de Pago</h5>
                                                        <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                            <Autocomplete
                                                                key={clearField.moneda}
                                                                sx={{ width: '23%' }}
                                                                options={listaMonedas}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} label="Moneda" variant="standard"
                                                                    />
                                                                )}
                                                                // value={item.moneda}
                                                                getOptionLabel={(option) => option}
                                                                onChange={(event, newValue) => {
                                                                    setPagoPorRegistrar({ ...pagoPorRegistrar, moneda: newValue })
                                                                }}
                                                                required
                                                                id="clear-on-escape"
                                                            />
                                                            <Autocomplete
                                                                key={clearField.metodoPago}
                                                                sx={{ width: '28%' }}
                                                                options={metodosPago}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} label="Método de Pago" variant="standard"
                                                                    />
                                                                )}
                                                                getOptionLabel={(option) => option.payName}
                                                                onChange={(event, newValue) => {
                                                                    setPagoPorRegistrar({ ...pagoPorRegistrar, metodoPago: newValue })
                                                                }}
                                                                required
                                                                id="clear-on-escape"
                                                            />
                                                            <TextField
                                                                error={errorMontoDP}
                                                                helperText={mensajeErrorMontoDP}
                                                                key={clearField.monto}
                                                                sx={{ width: '18%' }}
                                                                required
                                                                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                                id="monto"
                                                                label="Monto"
                                                                variant="standard"
                                                                onChange={e => {
                                                                    setPagoPorRegistrar({ ...pagoPorRegistrar, monto: e.target.value })
                                                                }}
                                                            />

                                                            <Button variant="contained" color="info"
                                                                disabled={statusBotonAgregar} onClick={() => agregarPago()}
                                                            >Agregar</Button>
                                                        </Stack>
                                                        <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                            <TextField
                                                                disabled={validarTarjeta()}
                                                                sx={{ width: '23%' }}
                                                                required
                                                                key={clearField.tarjeta}
                                                                // value={}
                                                                id="student"
                                                                label="Num Tarjeta"
                                                                variant="standard"
                                                                onChange={e => {
                                                                    setPagoPorRegistrar({ ...pagoPorRegistrar, tarjeta: e.target.value })
                                                                }}
                                                            />
                                                            <Autocomplete
                                                                disabled={validarMetodoDePago()}
                                                                key={clearField.banco}
                                                                sx={{ width: '28%' }}
                                                                options={bankList}
                                                                renderInput={(params) => (
                                                                    <TextField {...params} label="Banco" variant="standard"
                                                                    />
                                                                )}
                                                                getOptionLabel={(option) => option.banName}
                                                                onChange={(event, newValue) => {
                                                                    setPagoPorRegistrar({ ...pagoPorRegistrar, banco: newValue })
                                                                }}
                                                                id="clear-on-escape"
                                                            />
                                                            <TextField
                                                                disabled={validarMetodoDePago()}
                                                                key={clearField.referencia}
                                                                sx={{ width: '18%' }}
                                                                required
                                                                // value={item.pago}
                                                                id="referencia"
                                                                label="Referencia"
                                                                variant="standard"
                                                                onChange={e => {
                                                                    setPagoPorRegistrar({ ...pagoPorRegistrar, referencia: e.target.value })
                                                                }}
                                                            />


                                                        </Stack>
                                                        <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                            <TextField
                                                                sx={{ width: '53%' }}
                                                                required
                                                                key={clearField.observacion}
                                                                // value={item.descripcionPago}
                                                                id="student"
                                                                label="Observaciones del pago"
                                                                variant="standard"
                                                                onChange={e => {
                                                                    setPagoPorRegistrar({ ...pagoPorRegistrar, observacion: e.target.value })
                                                                }}
                                                            />
                                                        </Stack>

                                                        <MaterialTable title={'Pagos'}
                                                            data={pagosRegistrados}
                                                            columns={columnsPago}
                                                            options={{
                                                                search: false,
                                                                paging: false,
                                                                maxBodyHeight: 190,
                                                                actionsColumnIndex: -1,
                                                                addRowPosition: 'first'
                                                            }}
                                                            actions={[
                                                                {
                                                                    icon: () => <DeleteOutlineOutlinedIcon />,
                                                                    tooltip: 'Eliminar Pago',
                                                                    onClick: (event, rowData) => {
                                                                        let array = pagosRegistrados
                                                                        const newArray = array.filter((item) => item.id !== rowData.id)
                                                                        setPagosRegistrados(newArray)
                                                                        setClearFieldDistribucion({
                                                                            ...clearFieldDistribucion,
                                                                            montoRestanteAplicadoBol: (clearFieldDistribucion.montoRestanteAplicadoBol + 1),
                                                                            montoRestanteAplicadoDol: (clearFieldDistribucion.montoRestanteAplicadoDol + 1),
                                                                            pagoAplicadoDol: (clearFieldDistribucion.pagoAplicadoDol + 1),
                                                                            pagoAplicadoBol: (clearFieldDistribucion.pagoAplicadoBol + 1)
                                                                        })
                                                                        // setTimeout(() => {
                                                                        //     montosTotales()
                                                                        // }, 2000);
                                                                    }
                                                                }
                                                            ]}
                                                        />
                                                        <Stack className={classes.stack} direction="column"
                                                            justifyContent="flex-end"
                                                            alignItems="flex-end"
                                                            spacing={2} >
                                                            <br />
                                                            <div> Monto Total $: {(montoTotalDolares).toFixed(2)} </div>
                                                            <div> Monto Total Bs: {montoTotalBolivares.toFixed(2)} </div>
                                                        </Stack>
                                                    </Item2>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Item2>
                                                        <h5 className={classes.title}>Distribución de Pago</h5>

                                                        <>
                                                            {/* <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                                <Autocomplete
                                                                    key={clearFieldDistribucion.student}
                                                                    sx={{ width: '33%' }}
                                                                    options={listadoEstudiantes}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} label="Estudiantes" variant="standard"
                                                                        />
                                                                    )}
                                                                    getOptionLabel={(option) => option.student}
                                                                    onChange={(event, newValue) => {
                                                                        setDistribicionPorRegistrar({ ...distribicionPorRegistrar, student: newValue ? newValue.student : '' })
                                                                    }}
                                                                    required
                                                                    id="clear-on-escape"
                                                                />
                                                                <Autocomplete
                                                                    key={clearFieldDistribucion.descripcion}
                                                                    sx={{ width: '33%' }}
                                                                    options={listadoConceptosPago}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} label="Concepto de Pago" variant="standard"
                                                                        />
                                                                    )}
                                                                    getOptionLabel={(option) => option.icoName}
                                                                    onChange={(event, newValue) => {
                                                                        setDistribicionPorRegistrar({ ...distribicionPorRegistrar, descripcion: newValue ? newValue.icoName : '' })
                                                                    }}
                                                                    required
                                                                    id="clear-on-escape"
                                                                />
                                                                

                                                                <Button variant="contained" color="info"
                                                                    disabled={statusBotonAgregarDistribucion} onClick={() => agregarDistribucion()}
                                                                >Agregar</Button>
                                                            </Stack>
                                                            
                                                            <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                                <TextField
                                                                    error={errorCosto}
                                                                    helperText={mensajeErrorCosto}
                                                                    key={clearFieldDistribucion.costoNeto}
                                                                    sx={{ width: '21%' }}
                                                                    required
                                                                    id="costoF"
                                                                    label="Costo"
                                                                    variant="standard"
                                                                    onChange={e => {
                                                                        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', parseInt(e.target.value))
                                                                        setDistribicionPorRegistrar({ ...distribicionPorRegistrar, costoNeto: e.target.value })
                                                                    }}
                                                                />
                                                                <TextField
                                                                    error={errorPago}
                                                                    helperText={mensajeErrorPago}                                                                    
                                                                    sx={{ width: '21%' }}
                                                                    required
                                                                    key={clearFieldDistribucion.pago}
                                                                    // value={}
                                                                    type="number"
                                                                    // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                                    id="pagoF"
                                                                    label="Pago"
                                                                    variant="standard"
                                                                    onChange={e => {
                                                                        console.log('e.target.value', e.target.value)
                                                                        setDistribicionPorRegistrar({ ...distribicionPorRegistrar, pago: e.target.value })
                                                                    }}
                                                                />
                                                                
                                                            </Stack> */}
                                                            
                                                            {/* <MaterialTable title={'Distribución de Pagos'}
                                                                data={datosPago}
                                                                columns={columnsDisPago}
                                                                options={{
                                                                    search: false,
                                                                    paging: false,
                                                                    maxBodyHeight: 330,
                                                                    actionsColumnIndex: -1,
                                                                    addRowPosition: 'first'
                                                                }}
                                                                editable={{
                                                                    onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {

                                                                        if (newRow.pago > newRow.costo.cmeAmount) {
                                                                            reject()
                                                                        } else {
                                                                            const obtenerPosicion = datosPago.map(element => element.key).indexOf(newRow.key)
                                                                            let newArray = datosPago
                                                                            newArray[obtenerPosicion].pago = newRow.pago

                                                                            if (newRow.restante - newRow.pago !== 0) {
                                                                                newArray[obtenerPosicion].descripcion = `Abo ${newArray[obtenerPosicion].descripcion}`
                                                                            } else {
                                                                                newArray[obtenerPosicion].descripcion = (newArray[obtenerPosicion].descripcion).replace('Abo ', '')
                                                                            }
                                                                            setDatosPago(newArray)
                                                                            setTimeout(() => {
                                                                                montosDistribuidosTotales()
                                                                                resolve(setDatosPago(newArray))
                                                                            }, 1000);


                                                                        }
                                                                        setConteo(conteo + 1)
                                                                    }),
                                                                    onRowAdd: (newRow) => new Promise((resolve, reject) => {

                                                                    })
                                                                }}

                                                            /> */}
                                                            <Stack className={classes.stack} direction="column"
                                                                justifyContent="flex-end"
                                                                alignItems="flex-end"
                                                                spacing={2} >
                                                                <div> Tasa del día : {tasaDelDia !== 0 ? <> {(tasaDelDia.excAmount).toFixed(2)} Bs. {moment(tasaDelDia.excDate).format("DD/MM/YYYY")} </> : ''}  </div>
                                                                <div> Monto Restante a Pagar $: {montoTotalDolaresDis} </div>
                                                                <div> Monto Restante a Pagar Bs: {montoTotalBolivaresDis} </div>
                                                                <Button disabled={!botonAplicarPago} variant="contained" onClick={() => aplicarPago()}
                                                                    color="info">Aplicar Pago</Button>
                                                                { montoSinAsignar != 0 ? <div> <b><font COLOR="red">Monto sin distribuir : bs. {montoSinAsignar.toFixed(2)} / $ {(montoSinAsignar / tasaDelDia.excAmount).toFixed(2)}</font></b> </div> : null}
                                                            </Stack>
                                                            {/* <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                                
                                                            </Stack> */}
                                                            
                                                            {(Array.isArray(replicaDatosPago) && replicaDatosPago.length )  
                                                                ? replicaDatosPago.map((item, index)=>(
                                                                    <>
                                                                        <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                                            <TextField
                                                                                sx={{ width: '50%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={item.student}
                                                                                id="student"
                                                                                label="Estudiante"
                                                                                variant="standard"
                                                                            />
                                                                            <TextField
                                                                                sx={{ width: '40%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={item.descripcion}
                                                                                id="description"
                                                                                label="Descripcion"
                                                                                variant="standard"
                                                                            />
                                                                        </Stack>
                                                                        <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                                            {console.log()}
                                                                             {item.montoPagado != 0
                                                                                ? <TextField
                                                                                    sx={{ width: '20%' }}
                                                                                    InputProps={{ readOnly: true }}
                                                                                    value={item.costoNeto}
                                                                                    id="costo"
                                                                                    label="Costo $"
                                                                                    variant="standard"
                                                                                />
                                                                                :  
                                                                                <TextField
                                                                                    sx={{ width: '20%' }}
                                                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                                                    type="number"
                                                                                    id="costo"
                                                                                    label="Costo $"
                                                                                    variant="standard"
                                                                                onChange={e => {
                                                                                        let arrayDataPago = replicaDatosPago
                                                                                        arrayDataPago[index].costoNeto = Number(e.target.value)
                                                                                        arrayDataPago[index].restante = Number(e.target.value) - item.montoPagado
                                                                                        setReplicaDatosPago(arrayDataPago)
                                                                                        setClearFieldDistribucion(
                                                                                            {
                                                                                                restante: (clearFieldDistribucion.restante + 1)
                                                                                            })
                                                                                        validarCostosArray()
                                                                                        montosDistribuidosTotales()
                                                                                        // console.log('replicapagosssssss', replicaDatosPago)
                                                                                    }}
                                                                                />     
                                                                            }                                                                       
                                                                            
                                                                            <TextField
                                                                                sx={{ width: '20%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={item.montoPagado}
                                                                                id="montoPagado"
                                                                                label="Monto Pagado $"
                                                                                variant="standard"
                                                                            />
                                                                            {item.montoPagado != 0
                                                                                ? <TextField
                                                                                    sx={{ width: '20%' }}
                                                                                    InputProps={{ readOnly: true }}
                                                                                    value={item.restante}
                                                                                    id="montorestanteDol"
                                                                                    label="Monto Restante $"
                                                                                    variant="standard"
                                                                                >
                                                                                    {/* {item.restante} */}
                                                                                </TextField>
                                                                                : <TextField
                                                                                    key={clearFieldDistribucion.restante}
                                                                                    sx={{ width: '20%' }}
                                                                                    InputProps={{ readOnly: true }}
                                                                                    value={item.restante}
                                                                                    id="montorestanteDol"
                                                                                    label="Monto Restante $"
                                                                                    variant="standard"
                                                                                />
                                                                                }
                                                                            
                                                                            <TextField
                                                                                sx={{ width: '20%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={(item.restante * tasaDelDia.excAmount).toFixed(2)}
                                                                                id="montorestanteDol"
                                                                                label="Monto Restante Bs"
                                                                                variant="standard"
                                                                            />
                                                                            
                                                                        </Stack>
                                                                        <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                                                            <TextField
                                                                                key={clearFieldDistribucion.pagoAplicadoDol}
                                                                                sx={{ width: '20%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={(item.pagoAplicadoDol ? Number(item.pagoAplicadoDol).toFixed(2): 0)}
                                                                                id="pagoAplicadoDol"
                                                                                label="Pago aplicado $"
                                                                                variant="standard"
                                                                            />
                                                                            <TextField
                                                                                key={clearFieldDistribucion.pagoAplicadoBol}
                                                                                sx={{ width: '20%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={(item.pagoAplicadoBol ? Number(item.pagoAplicadoBol).toFixed(2) : 0)}
                                                                                id="pagoAplicadoBol"
                                                                                label="Pago aplicado Bs"
                                                                                variant="standard"
                                                                            />
                                                                            <TextField
                                                                                key={clearFieldDistribucion.montoRestanteAplicadoDol}
                                                                                sx={{ width: '20%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={(item.montoRestanteAplicadoDol ? Number(item.montoRestanteAplicadoDol).toFixed(2) : 0)}
                                                                                id="montoRestanteAplicadoDol"
                                                                                label="Monto restante aplicado $"
                                                                                variant="standard"
                                                                            />
                                                                            <TextField
                                                                                key={clearFieldDistribucion.montoRestanteAplicadoBol}
                                                                                sx={{ width: '20%' }}
                                                                                InputProps={{ readOnly: true }}
                                                                                value={(item.montoRestanteAplicadoBol ? Number(item.montoRestanteAplicadoBol).toFixed(2): 0)}
                                                                                id="montoRestanteAplicadoBol"
                                                                                label="Monto restante aplicado Bs"
                                                                                variant="standard"
                                                                            />
                                                                        </Stack>
                                                                    </>
                                                                ))
                                                                :<></>

                                                            }
                                                            

                                                            {/* <Stack className={classes.stack} direction="column"
                                                                justifyContent="flex-end"
                                                                alignItems="flex-end"
                                                                spacing={2} >
                                                                <div> Tasa del día : {tasaDelDia !== 0 ? <> {(tasaDelDia.excAmount).toFixed(2)} Bs. {moment(tasaDelDia.excDate).format("DD/MM/YYYY")} </>: ''}  </div>
                                                                <div> Monto Restante a Pagar $: {montoTotalDolaresDis} </div>
                                                                <div> Monto Restante a Pagar Bs: {montoTotalBolivaresDis} </div>
                                                            </Stack> */}

                                                        </>

                                                    </Item2>
                                                </Grid>
                                            </Grid>

                                        </div>
                                        : null
                    }


                    <Box >
                        <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-end" className={classes.stack}>
                            {
                                <>
                                    {
                                        (circularProgress) ?
                                            <LoadingButtons message={'Guardando'} />
                                            :
                                            <>
                                                {
                                                    (paginaCabecera || formatFactura) ?
                                                        <Button variant="contained" onClick={() => validarBotonAnterior()}
                                                            color="info">Anterior</Button>
                                                        : null
                                                }
                                                {
                                                    (mostrarComprobante)
                                                        ? <Button variant="outlined" onClick={() => cerrarModal()}
                                                            color="error">Cerrar</Button>
                                                        : <Button variant="outlined" onClick={() => confirmarCancelarRegistroDePago()}
                                                            color="error">Cancelar</Button>
                                                }

                                                {
                                                    (formatFactura)
                                                        ? <> <Button variant="contained" onClick={() => guardarRegistro()}
                                                            color="success">Guardar</Button>
                                                            {/* <Button variant="contained" color="success"><a target={'_blank'} href='http://localhost:3000/comprobantepdf'> Imprimir </a></Button>  */}
                                                        </>
                                                        : <Button variant="contained" disabled={!paginaCabecera ? validarGuardar() : validarCabecera()} onClick={() => !paginaCabecera ? cabecera() : confirmarCabecera()}
                                                            color="success">Siguiente</Button>
                                                }


                                            </>
                                    }
                                </>
                            }
                        </Stack>
                    </Box>
                </Box>
            </Modal>
            {(modalCancel) ?
                <ModalAlertCancel modalCancel={modalCancel} setModalCancel={setModalCancel} message={'¿ Desea cancelar el registro ?'} setUserResponse={setUserResponse} />
                : null}
            {(alertModal) ?
                <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                : null}
        </>

    )
}

export default ModalPayments
// YY02W2DQ