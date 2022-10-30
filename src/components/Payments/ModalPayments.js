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
import MaterialTable from '@material-table/core';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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

    } 
    // box:{
    //     marginTop:40,
    //     marginBottom:40,
    // }
})

const ModalPayments = ({ mesesApagar, pagoModal, setPagoModal, mensualidades,statusCcircularProgress }) => {
    const classes = UseStyles();
    const [tipoConcepto, setTipoConcepto] = React.useState(null)
    const [userResponse, setUserResponse] = React.useState('')
    const [modalCancel, setModalCancel] = React.useState(false)
    const [valorMensualidad, setValorMensualidad] = React.useState(null)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false)
    const [datosPago, setDatosPago] = React.useState([])
    const [metodosPago, setMetodosPago] = React.useState([])
    const [bankList, setBankList] = React.useState([])
    const [listaMonedas, setListaMonedas] = React.useState(['Dólares','Bolívares'])
    const [pagosRegistrados, setPagosRegistrados] = React.useState([])
    const [pagoPorRegistrar, setPagoPorRegistrar] = React.useState({moneda:null, metodoPago:null, monto:null, observacion:null,banco:null,referencia:null})
    const [statusBotonAgregar, setStatusBotonAgregar] = React.useState(false)
    const [montoTotalDolares, setMontoTotalDolares] = React.useState(0)
    const [montoTotalBolivares, setMontoTotalBolivares] = React.useState(0)
    const [clearField, setClearField] = React.useState({ moneda: 0, metodoPago: 100, monto: 200, observacion: 300, banco: 400, referencia: 500 })
    console.log('pagoPorRegistrar : -----..-----***************', pagoPorRegistrar)
    const columnsPago = [{ title: 'Moneda', field: 'moneda' },
        { title: 'Método pago', field: 'metodoPago', render: (rows) => <>{rows.metodoPago.payName}</>},
        { title: 'Monto', field: 'monto' },
        { title: 'Observacion', field: 'observacion' },
        { title: 'Banco', field: 'banco', render: (rows) => <>{rows.banco !== null ? rows.banco.banName : ''}</>  },
        { title: 'Referencia', field: 'referencia', render: (rows) => <>{rows.referencia !== null ? rows.referencia : ''}</> }]

    const handleClose = () => {

        if (userResponse === 'yes') {
            //   cleanStudentObject()
            setModalCancel(false)
            // setOpenModal(false);
            setPagoModal(false);
        } else
            if (userResponse === 'no') {
                setModalCancel(false)
            }
    };

    const cambiarStatusBotonAgregarPago = () => {

        if (pagoPorRegistrar.moneda === null || pagoPorRegistrar.metodoPago === null || pagoPorRegistrar.monto === 0 || pagoPorRegistrar.monto === null
            || pagoPorRegistrar.monto === '') {
            setStatusBotonAgregar(true)
        }else{
            setStatusBotonAgregar(false)
        } 
    };

    const agregarPago = () => {

        const numeroConvertido = Number(pagoPorRegistrar.monto) + 0

        if(String(numeroConvertido) == 'NaN'){

        }else{
            pagoPorRegistrar.id = nextId()
            if (pagoPorRegistrar.moneda === 'Dólares'){
                setMontoTotalDolares(Number(montoTotalDolares) + Number(pagoPorRegistrar.monto))
            }else{
                setMontoTotalBolivares(Number(montoTotalBolivares) + Number(pagoPorRegistrar.monto))
            }
    
            let data = pagosRegistrados
            data.push(pagoPorRegistrar)
            setPagosRegistrados(data)
    
            limpiarFormularioAgregarPago()
            console.log('pagosRegistrados', pagosRegistrados)

        }   
    };

    const limpiarFormularioAgregarPago = () => {
        setPagoPorRegistrar({ moneda: null, metodoPago: null, monto: null, observacion: null, banco: null, referencia: null })
        setClearField(
            {
                moneda: (clearField.moneda + 1),
                metodoPago: (clearField.metodoPago + 1),
                monto: (clearField.monto + 1),
                observacion: (clearField.observacion + 1),
                banco: (clearField.banco + 1),
                referencia: (clearField.referencia + 1)
            })
    }

    const consultarMetodosDePago = async () => {
        try {
            const metodosPagoRes = (await AxiosInstance.get(`/paymentmethod/`)).data

            console.log('$$$$$$$$.........****************.............', metodosPagoRes)
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

            console.log('......................................', bancosRes)
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

    const ordenarDatosPago = () => {

        if (mesesApagar.length > 0){
            const data = mesesApagar.map(item => {
                console.log('***----/****----****-----', item)
                return {
                    "mopId": item.mopId,
                    "mes": item.mes,
                    "student": `${item.student}`,
                    "descripcion": `Mensualidad ${item.nombreMes}`,
                    "costo": valorMensualidad,
                    "moneda":null,
                    "metodoPago": null,
                    "pago":0,
                    "restante":0,
                    "descripcionPago":"" 
                }
        })
            setDatosPago(data)
        }


    }

    const validarMetodoDePago = () =>{
        if(pagoPorRegistrar.metodoPago !== null){
           if(pagoPorRegistrar.metodoPago.payName != 'EFECTIVO'){
            return false
           }else{
            return true
           }
        }else{
            return true
        }
    }
    React.useEffect(() => {
        consultarValorMensualidad()
        consultarMetodosDePago()
        consultarBancos()
    }, [1])

    React.useEffect(() => {
        console.log('..............................', datosPago)
    }, [datosPago])

    React.useEffect(() => {
        ordenarDatosPago()
    }, [valorMensualidad])

    React.useEffect(() => {
        cambiarStatusBotonAgregarPago()
    }, [pagoPorRegistrar])

    React.useEffect(() => {
        // if(!statusBotonAgregar) {agregarPago()}
        
    }, [pagosRegistrados])
    
    
    return (
        <>
            <Modal
                hideBackdrop open={pagoModal}
                onClose={handleClose}
                aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
                <Box sx={{ ...style, width: '95%', height:'87%' }}>
                    <h4 className={classes.title}> Agregar Pago</h4>

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
                                                console.log('moneda-----------------------------------', newValue)
                                                setPagoPorRegistrar({ ...pagoPorRegistrar, moneda: newValue })                                            }}
                                            required
                                            id="clear-on-escape"
                                        />
                                        <Autocomplete
                                            key={clearField.metodoPago}
                                            sx={{ width: '23%' }}
                                            options={metodosPago}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Método de Pago" variant="standard"
                                                />
                                            )}
                                            getOptionLabel={(option) => option.payName}
                                            onChange={(event, newValue) => {
                                                console.log('"Método de Pago-----------------------------------', newValue)
                                                setPagoPorRegistrar({ ...pagoPorRegistrar, metodoPago: newValue })
                                            }}
                                            required
                                            id="clear-on-escape"
                                        />
                                        <TextField
                                            key={clearField.monto}
                                            sx={{ width: '15%' }}
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
                                            sx={{ width: '48%' }}
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
                                            sx={{ width: '16%' }}
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

                                    <MaterialTable title={'Pagos'}
                                        data={pagosRegistrados}
                                        columns={columnsPago}
                                        options={{
                                            search: false,
                                            paging: false,
                                            maxBodyHeight:190,
                                            // width: 300,
                                            // actionsCellStyle: { paddingLeft: 50, paddingRight: 50 },
                                            // headerStyle: {
                                            //     backgroundColor: "#007bff",
                                            //     color: "#FFF",
                                            //     fontWeight: 'normal',
                                            //     fontSize: 18,
                                            // },
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
                                                }
                                            }
                                        ]}
                                    />
                                    <Stack className={classes.stack} direction="column"
                                        justifyContent="flex-end"
                                        alignItems="flex-end"
                                        spacing={2} >
                                        <div> Monto Total $: {montoTotalDolares} </div>
                                        <div> Monto Total Bs: {montoTotalBolivares} </div>
                                    </Stack>
                                </Item2>
                            </Grid>
                            <Grid item xs={6}>
                                <Item2>
                                    <h5 className={classes.title}>Distribución de Pago</h5>
                                    {
                                        datosPago.length > 0 ?
                                            datosPago.map(item => <>
                                                <Stack
                                                    key={`${item.mes}-${item.modId}`}
                                                    className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >

                                                    <TextField
                                                        sx={{ width: '30%' }}
                                                        required
                                                        value={item.student}
                                                        id="student"
                                                        label="Estudiante"
                                                        variant="standard"
                                                        onChange={e => {
                                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                                        }}
                                                    />
                                                    <TextField
                                                        required
                                                        value={item.descripcion}
                                                        id="description"
                                                        label="Descripción de pago"
                                                        variant="standard"
                                                        // helperText={(representativeObject.repFirstName === null || representativeObject.repFirstName === '') ? requiredField : ''}
                                                        // error={orfRepFirstName}
                                                        onChange={e => {
                                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                                        }}
                                                    />
                                                    <TextField
                                                        sx={{ width: '10%' }}
                                                        required
                                                        value={item.costo?.cmeAmount}
                                                        id="costo"
                                                        label="Costo $"
                                                        variant="standard"
                                                        onChange={e => {
                                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                                        }}
                                                    />
                                                    <TextField
                                                        sx={{ width: '10%' }}
                                                        required
                                                        value={item.pago}
                                                        id="pago"
                                                        label="Pago"
                                                        variant="standard"
                                                        onChange={e => {
                                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                                        }}
                                                    />
                                                    <TextField
                                                        type={'number'}
                                                        sx={{ width: '10%' }}
                                                        aria-readonly
                                                        value={item.restante}
                                                        id="MontoRestante"
                                                        label="Monto Restante"
                                                        variant="standard"
                                                        onChange={e => {
                                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                                        }}
                                                    />
                                                </Stack>
                                                {/* <Stack
                                                    key={`${item.mes}-${item.modId}`}
                                                    className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >                                               
                                                    


                                                </Stack> */}
                                                {/* <Divider variant="middle" /> */}
                                                <br />
                                            </>)

                                            :
                                            null
                                    } 
                                </Item2>
                            </Grid>
                        </Grid>
                        
                    </div>

                    <Box >
                    <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-end" className={classes.stack}>
                            {
                                <>
                                    {
                                        (statusCcircularProgress) ?
                                            <LoadingButtons message={'Guardando'} />
                                            :
                                            <>
                                                <Button variant="outlined" onClick={() => setPagoModal(false)}
                                                    color="error">Cancelar</Button>
                                                <Button variant="contained" disabled={pagosRegistrados.length === 0 || datosPago.length === 0 ? true : false}
                                                    color="success">Guardar</Button>
                                            </> 
                                    }
                                </>
                            }
                    </Stack>
                    </Box>
           
           
          {/* </Stack> */}
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
