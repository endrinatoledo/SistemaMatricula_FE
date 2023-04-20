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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

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
const ModalFactura = ({ tipoAccion, setTipoAccion, facturaSeleccionada, setFacturaSeleccionada, modalFacturaValue, setModalFacturaValue }) => {
    const classes = UseStyles();
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [nuevaCabecera, setNuevaCabecera] = React.useState({ 
        'fecha': facturaSeleccionada.fecha, 
        'cirif': facturaSeleccionada.cabecera.inhRifCed, 
        'razonSocial': facturaSeleccionada.cabecera.inhBusinessName ,
        'telefonos': facturaSeleccionada.cabecera.inhPhone, 
        'direccion': facturaSeleccionada.cabecera.inhAddress, 
    });
    const [voucherType, setVoucherType] = React.useState(null);
    // const [dataClasificada, setDataClasificada] = React.useState([]);

    console.log('modalFacturaValue', modalFacturaValue);
    console.log('facturaSeleccionada', facturaSeleccionada);

    const handleClose = () => {
        setModalFacturaValue(false)
        setFacturaSeleccionada(null)
        setTipoAccion(null)
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
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={modalFacturaValue}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h5' component='h1' className={classes.title}>
                        Datos de factura
                    </Typography>
                     <div >
                        <Stack spacing={2} direction="row"
                            justifyContent="flex-start"
                            alignfacturaSeleccionadas="flex-start" className={classes.title}>
                            <Autocomplete
                                // key={clearField.moneda}
                                sx={{ width: '15%' }}
                                options={['COMPROBANTE', 'FACTURA FISCAL']}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tipo de comprobante" variant="standard"
                                    />
                                )}
                                value={voucherType}
                                getOptionLabel={(option) => option}
                                onChange={(event, newValue) => {
                                    setVoucherType(newValue)
                                }}
                                required
                                id="clear-on-escape"
                            />
                            <TextField
                                // key={filtrosForm.rif}
                                value={nuevaCabecera.fecha}
                                id="rif"
                                label="Fecha"
                                variant="standard"
                                onChange={e => {
                                    setNuevaCabecera({ ...nuevaCabecera, fecha: e.target.value && (e.target.value).trim() != '' ? e.target.value : null })
                                    // setFiltrosValue({ ...filtrosValue, 'rif': e.target.value && (e.target.value).trim() != '' ? e.target.value : null })
                                }}
                                sx={{ width: '10%' }}
                            />
                            <TextField
                                // key={filtrosForm.rif}
                                value={nuevaCabecera.cirif}
                                id="rif"
                                label="CI/RIF"
                                variant="standard"
                                onChange={e => {
                                    setNuevaCabecera({ ...nuevaCabecera, cirif: e.target.value && (e.target.value).trim() != '' ? e.target.value : null })

                                    // setFiltrosValue({ ...filtrosValue, 'rif': e.target.value && (e.target.value).trim() != '' ? e.target.value : null })
                                }}
                                sx={{ width: '15%' }}
                            />
                            <TextField
                                // key={filtrosForm.rif}
                                value={nuevaCabecera.telefonos}
                                id="rif"
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
                                // key={filtrosForm.rif}
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
                                // key={filtrosForm.rif}
                                value={nuevaCabecera.direccion}
                                id="rif"
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
                    
                </Box>
            </Modal>
        </div>
    )
}

export default ModalFactura