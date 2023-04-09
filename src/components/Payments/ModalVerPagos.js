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
    },

    div:{
        marginTop:5,
        // marginBottom:40,
    }
})

const ModalVerPagos = ({ periodoSeleccionado, selectedFamily, statusModalVerPagos, setStatusModalVerPagos }) => {

    const classes = UseStyles();
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [resultadoPagos, setResultadoPagos] = React.useState([]);
    const [dataClasificada, setDataClasificada] = React.useState([]);

    console.log('dataClasificada--------------------', dataClasificada)

    const consultarPagos = async () => {

        try {
            const monthlyPaymentFamily = (await AxiosInstance.get(`/invoiceHeader/invoice/family/${selectedFamily.famId}/periodo/${periodoSeleccionado.perId}`)).data
            // console.log('monthlyPaymentFamilyyyyyyyyyyyyyyyyyyyyyy', monthlyPaymentFamily)
            console.log('monthlyPaymentFamily', monthlyPaymentFamily)

            // const result = JSON.parse(monthlyPaymentFamily)
            // console.log('result.data > 0', result.data > 0)

            if (monthlyPaymentFamily.ok === true && monthlyPaymentFamily.data.length > 0) {
                setResultadoPagos(monthlyPaymentFamily.data)
            }

        } catch (error) {
            setMessage('Error al consultar Pagos')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    const clasificarData = () => {

        // console.log('entro aquiiiiiiiiiiiiiiiiiiiiiiiiiiii')
        let dataFinal = [
            { mes: 'Enero', data: [] }, // posicion 0
            { mes: 'Febrero', data: [] },// posicion 1
            { mes: 'Marzo', data: [] },// posicion 2
            { mes: 'Abril', data: [] },// posicion 3
            { mes: 'Mayo', data: [] },// posicion 4
            { mes: 'Junio', data: [] },// posicion 5
            { mes: 'Julio', data: [] },// posicion 6
            { mes: 'Agosto', data: [] },// posicion 7
            { mes: 'Septiembre', data: [] },// posicion 8
            { mes: 'Octubre', data: [] },// posicion 9
            { mes: 'Noviembre', data: [] },// posicion 10
            { mes: 'Diciembre', data: [] },// posicion 11
        ]

        // const data = 
        resultadoPagos.map(item => {
            // console.log('itemmmmmmmmmmmmmmm', item)
            const fechaC = (item.fecha).split('/')

            if (fechaC[1] === '1' || fechaC[1] === '01') {
                dataFinal[0].data.push(item)
            }
            if (fechaC[1] === '2' || fechaC[1] === '02') {
                dataFinal[1].data.push(item)
            }
            if (fechaC[1] === '3' || fechaC[1] === '03') {
                dataFinal[2].data.push(item)
            }
            if (fechaC[1] === '4' || fechaC[1] === '04') {
                dataFinal[3].data.push(item)
            }
            if (fechaC[1] === '5' || fechaC[1] === '05') {
                dataFinal[4].data.push(item)
            }
            if (fechaC[1] === '6' || fechaC[1] === '06') {
                dataFinal[5].data.push(item)
            }
            if (fechaC[1] === '7' || fechaC[1] === '07') {
                dataFinal[6].data.push(item)
            }
            if (fechaC[1] === '8' || fechaC[1] === '08') {
                dataFinal[7].data.push(item)
            }
            if (fechaC[1] === '9' || fechaC[1] === '09') {
                dataFinal[8].data.push(item)
            }
            if (fechaC[1] === '10' || fechaC[1] === '10') {
                dataFinal[9].data.push(item)
            }
            if (fechaC[1] === '11' || fechaC[1] === '11') {
                dataFinal[10].data.push(item)
            }
            if (fechaC[1] === '12' || fechaC[1] === '12') {
                dataFinal[11].data.push(item)
            }
        })

        setDataClasificada(dataFinal)
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

    const componenteDetallePago = (data) => {
        return (
            <>
                {data.map((item,index) => {
                    return <div key={index}>
                        <Stack spacing={2} direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start">
                            <Box>
                                <Stack className={classes.div} spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-start">
                                    <div><b>Fecha:</b> {item.fecha} </div>
                                    <div><b>Nro Control:</b> {item.cabecera.inhControlNumber}</div>
                                    <div><b>Nro Factura:</b> {item.cabecera.inhInvoiceNumber}</div>
                                </Stack>
                                <Stack className={classes.div} spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-start">
                                    <div><b>RIF/CI:</b> {item.cabecera.inhRifCed}</div>
                                    <div><b>Razón Social:</b> {item.cabecera.inhBusinessName}</div>
                                </Stack>
                                <Stack className={classes.div} spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-start">
                                    <div><b>Teléfonos:</b> {item.cabecera.inhPhone}</div>
                                    <div><b>Dirección:</b>  {item.cabecera.inhAddress}</div>
                                </Stack>
                                <Stack className={classes.div} spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-start">
                                    <div><b>Detalle de pago:</b> {ordenarDetalleDePago(item.pago)} </div>
                                    <div> </div>
                                </Stack>
                                <Stack className={classes.div} spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-start">
                                    <div><b>Observaciones:</b> {ordenarObservaciones(item.pago)} </div>
                                    <div> </div>
                                </Stack>
                            </Box>
                            <Box>
                                <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-start">
                                    <Stack spacing={0.5} alignItems="flex-end" direction="column" justifyContent="flex-start">
                                        <div><b>Conceptos de pago y montos:</b> </div>
                                        {/* {item.cuerpo.map((element, index) => <div> {`${element.indDescripcion} ${element.indStuName} : Bs. ${(parseFloat(element.indpagado) * parseFloat(element.indtasa)).toFixed(2) }`}</div>)} */}
                                        {item.cuerpo.map((element, index) => <div> {`${element.indDescripcion} ${element.indStuName} : Bs. ${element.indMontoAgregadoBol != null ? (parseFloat(element.indMontoAgregadoBol)).toFixed(2) : 0}`}</div>)}

                                        <div><b>Formas de pago:</b> </div>
                                        {item.pago.map((element, index) => <div> {`${element.paymentMethodsPay.payName} : Bs. ${element.depCurrency === 'Dólares' ? (parseFloat(element.depAmount) * parseFloat(element.deptasa)).toFixed(2) : (element.depAmount).toFixed(2) } `}</div>)}
                                    </Stack>                                
                                </Stack>                            
                            </Box>
                        </Stack>
                        <Divider className={classes.div} />
                    </div>
                })}

            </>
        )
    }

    React.useEffect(() => {
        consultarPagos()
    }, [0]);

    React.useEffect(() => {
        if (resultadoPagos.length > 0) clasificarData()

    }, [resultadoPagos]);

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setStatusModalVerPagos(true);
    const handleClose = () => setStatusModalVerPagos(false);

    return (

        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal 
            hideBackdrop
                open={statusModalVerPagos}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: '95%', height: '87%' }}>
                    {
                         dataClasificada.length > 0 ? 
                            <div>
                                <Accordion disabled={dataClasificada[8].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Septiembre</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[8].data.length > 0
                                                ? componenteDetallePago(dataClasificada[8].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[9].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Octubre</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[9].data.length > 0
                                                ? componenteDetallePago(dataClasificada[9].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[10].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Noviembre</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[10].data.length > 0
                                                ? componenteDetallePago(dataClasificada[10].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[11].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Dicembre</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[11].data.length > 0
                                                ? componenteDetallePago(dataClasificada[11].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[0].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography><b>Enero</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[0].data.length > 0
                                                ? componenteDetallePago(dataClasificada[0].data)
                                                : null
                                        }

                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[1].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Febrero</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[1].data.length > 0
                                                ? componenteDetallePago(dataClasificada[1].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[2].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Marzo</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[2].data.length > 0
                                                ? componenteDetallePago(dataClasificada[2].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[3].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Abril</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[3].data.length > 0
                                                ? componenteDetallePago(dataClasificada[3].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[4].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Mayo</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[4].data.length > 0
                                                ? componenteDetallePago(dataClasificada[4].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[5].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Junio</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[5].data.length > 0
                                                ? componenteDetallePago(dataClasificada[5].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[6].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Julio</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[6].data.length > 0
                                                ? componenteDetallePago(dataClasificada[6].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion disabled={dataClasificada[7].data.length > 0 ? false : true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography><b>Agosto</b></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            dataClasificada[7].data.length > 0
                                                ? componenteDetallePago(dataClasificada[7].data)
                                                : null
                                        }
                                    </AccordionDetails>
                                </Accordion>

                            </div>
                         : <div> Sin datos para mostrar</div>

                    }
                    <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-end" className={classes.stack}>
                        <Button variant="outlined" onClick={handleClose}
                            color="error">Cerrar</Button>
                    </Stack>
                    {(alertModal) ?
                        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                        : null}
                </Box>

            </Modal>
        </div>

    )
}

export default ModalVerPagos