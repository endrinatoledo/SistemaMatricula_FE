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
    const [listaMonedas, setListaMonedas] = React.useState(['dolares','bolívares'])

    // console.log('valorMensualidad : -----..-----***************', valorMensualidad)
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
                    "student": `${item.student} --> ${item.level}`,
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

    React.useEffect(() => {
        consultarValorMensualidad()
        consultarMetodosDePago()
    }, [1])

    React.useEffect(() => {
        console.log('..............................', datosPago)
    }, [datosPago])

    React.useEffect(() => {
        ordenarDatosPago()
    }, [valorMensualidad])
    return (
        <>
            <Modal
                hideBackdrop open={pagoModal}
                onClose={handleClose}
                aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
                <Box sx={{ ...style, width: '95%' }}>
                    <h4 className={classes.title}> Agregar Pago</h4>
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
                                        sx={{ width: '5%' }}
                                        required
                                        value={item.costo?.cmeAmount}
                                        id="costo"
                                        label="Costo $"
                                        variant="standard"
                                        onChange={e => {
                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                        }}
                                    />
                                </Stack>
                                <Stack 
                                key={`${item.mes}-${item.modId}`} 
                                    className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >

                                    <Autocomplete
                                        sx={{ width: '9%' }}
                                        options={listaMonedas}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Moneda" variant="standard"
                                            />
                                        )}
                                        value={item.moneda}
                                        getOptionLabel={(option) => option}
                                        onChange={(event, newValue) => {
                                            console.log('newValue-----------------------------------', newValue)
                                            //   setSelectedStudent({...selectedStudent, stuSex : (newValue !== null) ? newValue.value : selectedStudent.stuSex})
                                        }}
                                        required
                                        id="clear-on-escape"
                                    />
                                    <Autocomplete
                                        sx={{ width: '15%' }}
                                        options={metodosPago}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Método de Pago" variant="standard"
                                            />
                                        )}
                                        value={item.metodoPago}
                                        getOptionLabel={(option) => option.payName}
                                        onChange={(event, newValue) => {
                                            console.log('newValue-----------------------------------', newValue)
                                            //   setSelectedStudent({...selectedStudent, stuSex : (newValue !== null) ? newValue.value : selectedStudent.stuSex})
                                        }}
                                        required
                                        id="clear-on-escape"
                                    />
                                    <TextField
                                        sx={{ width: '5%' }}
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
                                        sx={{ width: '7%' }}
                                        aria-readonly
                                        value={item.restante}
                                        id="MontoRestante"
                                        label="Monto Restante"
                                        variant="standard"
                                        onChange={e => {
                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                        }}
                                    />
                                    <TextField
                                        sx={{ width: '30%' }}
                                        required
                                        value={item.descripcionPago}
                                        id="student"
                                        label="Observaciones del pago"
                                        variant="standard"
                                        onChange={e => {
                                            // setSelectedRepresentative({ ...selectedRepresentative, repFirstName: e.target.value ? e.target.value : '' })
                                        }}
                                    />

                                </Stack>
                                <Divider variant="middle" />
                                <br />
                            </>)

                            :
                            null
                    } 
                    
                    <Stack spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
                    <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="center">
                            {
                                <>
                                    {
                                        (statusCcircularProgress) ?
                                            <LoadingButtons message={'Guardando'} />
                                            :
                                            <>
                                                <Button variant="outlined" onClick={() => setPagoModal(false)}
                                                    color="error">Cancelar</Button>
                                                <Button variant="contained"
                                                    color="success">Guardar</Button>
                                            </>
                                    }
                                </>
                            }
                    </Stack>

           
           
          </Stack>
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
