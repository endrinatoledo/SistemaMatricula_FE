import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Title from '../Layout/Title';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MaterialTable from '@material-table/core';
import Divider from '@mui/material/Divider';
import nextId from "react-id-generator";

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
        width: '80%',
        height: '70%',
        background: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        // '& .MuiTextField-root': { m: 1, width: '25ch' }

    },
    distribPago: {
        marginLeft: '3%',
        marginBottom: '3%',
    }
})
// conceptosAdicionales

const ModalConceptoPagos = ({ setAplicarConceptosAdicionales, setModalConceptoPago, conceptosAdicionalesArray, setConceptosAdicionalesArray, periodoSeleccionado, selectedFamily, estudianteFamilia, listadoConceptosPago, tasaDelDia, replicaConceptosAdicionales, setReplicaConceptosAdicionales, modalConceptoPago, conceptosAdicionales, setConceptosAdicionales, cancelarPagosAdicionales }) => {
    const classes = UseStyles();
    const [clearFieldConceptos, setClearFieldConceptos] = React.useState({ costoBol: 0, costoDol: 100, montoPagadoBol: 200, montoPagadoDol: 300, montoRestanteDol: 400, montoRestanteBol: 500, montoApagarDol: 600, montoApagarBol: 700 })
    const [conceptosInput, setConceptosInput] = React.useState({validado:null, description: null, famId: null, famName: null, stuId: null, student: null, icoId: null, icoName: null, costoBol: 0, costoDol: 0, montoApagarBol: 0, montoApagarDol: 0 })
    const [keyConceptosInput, setKeyConceptosInput] = React.useState({ costoInputBol: 1000, costoInputDol: 2000, montoApagarInputBol: 3000, montoApagarInputDol: 4000, icoId:5000, famId:6000, stuId:7000, description:8000 })
    const [conceptosAdicionalesBD, setConceptosAdicionalesBD] = React.useState([])
    const [buttonAdd, setButtonAdd] = React.useState(true)
    // const [conceptosAdicionalesArray, setConceptosAdicionalesArray] = React.useState([])
    // const [columnas, setColumnas] = React.useState([])
    const columnas = [
        { title: 'Concepto', field: 'icoName' },
        { title: 'Familia', field: 'famName' },
        { title: 'Estudiante', field: 'student' },
        { title: 'Descripción', field: 'description' },
        { title: 'Costo $', field: 'costoDol' },
        { title: 'Pago $', field: 'montoApagarDol' },

    ]
    // console.log('llegaronnnnnn conceptosInput', conceptosInput)

    const parseDecimal = (value) => {
        const decimalSeparator = (1.1).toLocaleString().substring(1, 2);
        const stringValue = String(value).replace(',', decimalSeparator);
        return parseFloat(stringValue);
    };

    const limpiarValores = (index) => {

        let arrayData = replicaConceptosAdicionales
        arrayData[index] = conceptosAdicionales[index]
        setReplicaConceptosAdicionales(arrayData)

        setClearFieldConceptos((prev) => ({
            ...prev,
            [`costoBol-${index}`]: prev[`costoBol-${index}`] + 1,
            [`costoDol-${index}`]: prev[`costoDol-${index}`] + 1,
            [`montoPagadoDol-${index}`]: prev[`montoPagadoDol-${index}`] + 1,
            [`montoPagadoBol-${index}`]: prev[`montoPagadoBol-${index}`] + 1,
        }));
    }

    const getConceptosAdicionalesByPerIdFamId = async (perId, famId) => {
        try {
            const { data } = await AxiosInstance.get(`/conceptosAdicionales/periodo/${perId}/familia/${famId}`);
            // console.log('dataaaaaa', data)
            setConceptosAdicionalesBD(data)
            // setReplicaConceptosAdicionales(data)
        } catch (error) {
            console.log(error)
        }
    }

    const limpiarFormulario = () => {
        setConceptosInput({ description: null, famId: null, famName: null, stuId: null, student: null, icoId: null, icoName: null, costoBol: 0, costoDol: 0, montoApagarBol: 0, montoApagarDol: 0 })
        setKeyConceptosInput({ 
            costoInputBol: keyConceptosInput.costoInputBol + 1,
            costoInputDol: keyConceptosInput.costoInputDol + 1,
            montoApagarInputBol: keyConceptosInput.montoApagarInputBol + 1,
            montoApagarInputDol: keyConceptosInput.montoApagarInputDol + 1,
            icoId: keyConceptosInput.icoId + 1,
            famId: keyConceptosInput.famId + 1,
            stuId: keyConceptosInput.stuId + 1,
            description: keyConceptosInput.description + 1
            });
        
    }
    const addItemConceptosAdicionales = () => {

        let item = { ...conceptosInput, id: nextId(), validado:'sinValidar' }
        const array = [...conceptosAdicionalesArray, item]
        setConceptosAdicionalesArray(array)
        limpiarFormulario()
        // try {
        //     const { data } = await AxiosInstance.post(`/conceptosAdicionales`, conceptosInput);
        //     console.log('guardooooo', data)
        //     // getConceptosAdicionalesByPerIdFamId(periodoSeleccionado.perId, selectedFamily.famId)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    const guardarConceptosAdicionales = () => {
        setAplicarConceptosAdicionales(true)
        setModalConceptoPago(false)
    }

    //crea un useefeect para que se ejecute cuando se abra el modal
    React.useEffect(() => {
        if (selectedFamily) {
            getConceptosAdicionalesByPerIdFamId(periodoSeleccionado.perId, selectedFamily.famId)
        }
    }, [])

    React.useEffect(() => {
        if (!conceptosInput.icoId || conceptosInput.costoBol == 0 || conceptosInput.costoDol == 0 || conceptosInput.montoApagarBol == 0 || conceptosInput.montoApagarDol == 0) {
            setButtonAdd(true)
        }else{
            setButtonAdd(false)
        }
    }, [conceptosInput])


    return (
        <>
            <Modal
                open={modalConceptoPago}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" className={classes.box} >
                    <h4 className={classes.title}> Conceptos Adicionales</h4>
                    <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                        <Autocomplete
                            key={keyConceptosInput.icoId}
                            disableClearable
                            sx={{ width: '32%' }}
                            options={listadoConceptosPago}
                            renderInput={(params) => (
                                <TextField {...params} label="Concepto" variant="standard"
                                />
                            )}
                            getOptionLabel={(option) => option.icoName}
                            onChange={(event, newValue) => {
                                setConceptosInput({ ...conceptosInput, icoId: newValue.icoId, icoName: newValue.icoName })
                            }}
                            required
                            id="clear-on-escape"
                        />
                        <Autocomplete
                            key={keyConceptosInput.famId}
                            sx={{ width: '32%' }}
                            options={[selectedFamily.families]}
                            renderInput={(params) => (
                                <TextField {...params} label="Familia" variant="standard"
                                />
                            )}
                            getOptionLabel={(option) => option.famName}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setConceptosInput({ ...conceptosInput, famId: newValue.famId, famName: newValue.famName })
                                } else {
                                    setConceptosInput({ ...conceptosInput, famId: null, famName: null })
                                }
                            }}
                            required
                            id="clear-on-escape"
                        />
                        <Autocomplete
                        key={keyConceptosInput.stuId}
                            sx={{ width: '32%' }}
                            options={estudianteFamilia}
                            renderInput={(params) => (
                                <TextField {...params} label="Estudiantes" variant="standard"
                                />
                            )}
                            getOptionLabel={(option) => option.student}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                setConceptosInput({ ...conceptosInput, stuId: newValue.stuId, student: newValue.student })
                                } else {
                                    setConceptosInput({ ...conceptosInput, stuId: null, student: null })
                                }
                            }}
                            required
                            id="clear-on-escape"
                        />

                    </Stack>
                    <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                        <TextField
                            key={keyConceptosInput.description}
                            sx={{ width: '50%' }}
                            id="DescripcionInput"
                            label="Descripcion"
                            variant="standard"
                            onChange={(e) => {
                                setConceptosInput({ ...conceptosInput, description: e.target.value })
                            }}
                        />
                        <TextField
                            key={`costoInputDol`}
                            sx={{ width: '10%' }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                            type="number"
                            value={conceptosInput.costoDol}
                            id={`costoInputDol`}
                            label="Costo $"
                            variant="standard"
                            onChange={(e) => {
                                const dolares = parseDecimal(e.target.value);
                                const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                setConceptosInput({ ...conceptosInput, costoDol: dolares, costoBol: bolivares });
                                setKeyConceptosInput({ ...keyConceptosInput, costoInputDol: keyConceptosInput.costoInputDol + 1, costoInputBol: keyConceptosInput.costoInputBol + 1 })

                            }}
                        />

                        <TextField
                            key={`costoInputBol`}
                            sx={{ width: '10%' }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                            type="number"
                            value={conceptosInput.costoBol}
                            id={`costoInputBol`}
                            label="Costo Bs"
                            variant="standard"
                            onChange={(e) => {
                                const bolivares = parseDecimal(e.target.value);
                                const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                setConceptosInput({ ...conceptosInput, costoDol: dolares, costoBol: bolivares });
                                setKeyConceptosInput({ ...keyConceptosInput, costoInputDol: keyConceptosInput.costoInputDol + 1, costoInputBol: keyConceptosInput.costoInputBol + 1 })
                            }}
                        />
                        <TextField
                            key={`montoApagarDol`}
                            sx={{ width: '10%' }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                            type="number"
                            value={conceptosInput.montoApagarDol}
                            id={`montoApagarDol`}
                            label="Monto a pagar $"
                            variant="standard"
                            onChange={(e) => {
                                const dolares = parseDecimal(e.target.value);
                                const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                setConceptosInput({ ...conceptosInput, montoApagarDol: dolares, montoApagarBol: bolivares });
                                setKeyConceptosInput({ ...keyConceptosInput, montoApagarInputDol: keyConceptosInput.montoApagarInputDol + 1, montoApagarInputBol: keyConceptosInput.montoApagarInputBol + 1 })

                            }}
                        />

                        <TextField
                            key={`montoApagarInputBol`}
                            sx={{ width: '10%' }}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                            type="number"
                            value={conceptosInput.montoApagarBol}
                            id={`montoApagarInputBol`}
                            label="Monto a pagar Bs"
                            variant="standard"
                            onChange={(e) => {
                                const bolivares = parseDecimal(e.target.value);
                                const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                setConceptosInput({ ...conceptosInput, montoApagarDol: dolares, montoApagarBol: bolivares });
                                setKeyConceptosInput({ ...keyConceptosInput, montoApagarInputDol: keyConceptosInput.montoApagarInputDol + 1, montoApagarInputBol: keyConceptosInput.montoApagarInputBol + 1 })
                            }}
                        />
                        <Button variant="contained" color="info" disabled={buttonAdd}
                            onClick={() => addItemConceptosAdicionales()}
                        >Agregar </Button>
                    </Stack>

<br />
                    <br />

                    <MaterialTable title={'Conceptos Adicionales'}
                        data={conceptosAdicionalesArray}
                        columns={columnas}
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
                                tooltip: 'Eliminar Conceptooo',
                                onClick: (event, rowData) => {
                                    let array = conceptosAdicionalesArray
                                    const newArray = array.filter((item) => item.id != rowData.id)
                                    setConceptosAdicionalesArray(newArray)
                                }
                            }
                        ]}
                    />
{
                        console.log('conceptosAdicionalesArray...', conceptosAdicionalesArray)
}
                    {/* {
                        (Array.isArray(conceptosAdicionales) && conceptosAdicionales.length)
                            ? conceptosAdicionales.map((concepto, index) => (
                                <>
                                    <Stack key={index} className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >
                                        <TextField
                                            sx={{ width: '30%' }}
                                            InputProps={{ readOnly: true }}
                                            value={concepto.icoName}
                                            id="concepto"
                                            label="Concepto"
                                            variant="standard"
                                        />
                                        {concepto.costoDol !== 0
                                            ?
                                            <>
                                                <TextField
                                                    key={clearFieldConceptos.costoDol}
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={concepto.costoDol}
                                                    id="costoDol"
                                                    label="Costo $"
                                                    variant="standard"
                                                />
                                                <TextField
                                                    key={clearFieldConceptos.costoBol}
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={concepto.costoBol}
                                                    id="costoBs"
                                                    label="Costo Bs"
                                                    variant="standard"
                                                />
                                                <Divider orientation="vertical" flexItem />
                                                <TextField
                                                    InputProps={{ readOnly: true }}
                                                    sx={{ width: '7%' }}
                                                    value={concepto.montoPagadoDol}
                                                    id={`montoPagadoDol-${index}`}
                                                    label="Pagado $"
                                                    variant="standard"
                                                />

                                                <TextField
                                                    InputProps={{ readOnly: true }}
                                                    sx={{ width: '7%' }}
                                                    type="number"
                                                    value={concepto.montoPagadoBol}
                                                    id={`montoPagadoBol-${index}`}
                                                    label="Pagado Bs"
                                                    variant="standard"
                                                />
                                                <Divider orientation="vertical" flexItem />
                                                <TextField
                                                    // key={clearFieldConceptos.montoRestanteDol}
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={concepto.montoRestanteDol}
                                                    id={`montoRestanteDol-${index}`}
                                                    label="Restante $"
                                                    variant="standard"
                                                />
                                                <TextField
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={concepto.montoRestanteBol}
                                                    id={`montoRestanteBol-${index}`}
                                                    label="Restante Bs"
                                                    variant="standard"
                                                />
                                                <TextField
                                                    key={clearFieldConceptos.montoApagarDol}
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={replicaConceptosAdicionales[index].montoApagarDol}
                                                    id={`montoApagarDol-${index}`}
                                                    label="A Pagar $"
                                                    variant="standard"
                                                    onChange={(e) => {
                                                        const dolares = parseDecimal(e.target.value);
                                                        const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                                        setReplicaConceptosAdicionales((prev) => {
                                                            const newDataPago = [...prev];
                                                            newDataPago[index] = {
                                                                ...newDataPago[index],
                                                                montoApagarDol: dolares,
                                                                montoApagarBol: bolivares,
                                                                // montoRestanteDol: dolares,
                                                                // montoRestanteBol: bolivares,
                                                            };
                                                            return newDataPago;
                                                        });
                                                        setClearFieldConceptos((prev) => ({
                                                            ...prev,
                                                            // [`costoDol-${index}`]: prev[`costoDol-${index}`] + 1,
                                                            [`montoApagarDol-${index}`]: prev[`montoApagarDol-${index}`] + 1,
                                                            [`montoApagarBol-${index}`]: prev[`montoApagarBol-${index}`] + 1,
                                                        }));
                                                    }}
                                                />
                                                <TextField
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={replicaConceptosAdicionales[index].montoApagarBol}
                                                    id={`montoApagarBol-${index}`}
                                                    label="A Pagar Bs"
                                                    variant="standard"
                                                    onChange={(e) => {
                                                        const bolivares = parseDecimal(e.target.value);
                                                        const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                                        setReplicaConceptosAdicionales((prev) => {
                                                            const newDataPago = [...prev];
                                                            newDataPago[index] = {
                                                                ...newDataPago[index],
                                                                montoApagarDol: dolares,
                                                                montoApagarBol: bolivares,
                                                            };
                                                            return newDataPago;
                                                        });
                                                        setClearFieldConceptos((prev) => ({
                                                            ...prev,
                                                            [`montoApagarDol-${index}`]: prev[`montoApagarDol-${index}`] + 1,
                                                            [`montoApagarBol-${index}`]: prev[`montoApagarBol-${index}`] + 1,
                                                        }));
                                                    }}
                                                />
                                            </>

                                            :
                                            <>
                                                <TextField
                                                    key={`costoDol-${index}`}
                                                    sx={{ width: '7%' }}
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                                                    type="number"
                                                    value={replicaConceptosAdicionales[index].costoDol}
                                                    id={`costoDol-${index}`}
                                                    label="Costo $"
                                                    variant="standard"
                                                    onChange={(e) => {
                                                        const dolares = parseDecimal(e.target.value);
                                                        const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                                        setReplicaConceptosAdicionales((prev) => {
                                                            const newDataPago = [...prev];
                                                            newDataPago[index] = {
                                                                ...newDataPago[index],
                                                                costoDol: dolares,
                                                                costoBol: bolivares,
                                                                montoRestanteDol: dolares,
                                                                montoRestanteBol: bolivares,
                                                            };
                                                            return newDataPago;
                                                        });
                                                        setClearFieldConceptos((prev) => ({
                                                            ...prev,
                                                            [`costoDol-${index}`]: prev[`costoDol-${index}`] + 1,
                                                            [`costoBol-${index}`]: prev[`costoBol-${index}`] + 1,
                                                            [`montoRestanteDol-${index}`]: prev[`montoRestanteDol-${index}`] + 1,
                                                            [`montoRestanteBol-${index}`]: prev[`montoRestanteBol-${index}`] + 1,
                                                        }));
                                                    }}
                                                />


                                                <TextField
                                                    key={`costoBol-${index}`}
                                                    sx={{ width: '7%' }}
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                                                    type="number"
                                                    value={replicaConceptosAdicionales[index].costoBol}
                                                    id={`costoBol-${index}`}
                                                    label="Costo bs"
                                                    variant="standard"
                                                    onChange={(e) => {
                                                        const bolivares = parseDecimal(e.target.value);
                                                        const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                                        setReplicaConceptosAdicionales((prev) => {
                                                            const newDataPago = [...prev];
                                                            newDataPago[index] = {
                                                                ...newDataPago[index],
                                                                costoDol: dolares,
                                                                costoBol: bolivares,
                                                                montoRestanteDol: dolares,
                                                                montoRestanteBol: bolivares,
                                                            };
                                                            return newDataPago;
                                                        });
                                                        setClearFieldConceptos((prev) => ({
                                                            ...prev,
                                                            [`costoBol-${index}`]: prev[`costoBol-${index}`] + 1,
                                                        }));
                                                    }}
                                                />
                                                <Divider orientation="vertical" flexItem />
                                                <TextField
                                                    key={`montoPagadoDol-${index}`}
                                                    sx={{ width: '7%' }}
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                                                    type="number"
                                                    value={concepto.montoPagadoDol}
                                                    id={`montoPagadoDol-${index}`}
                                                    label="Pagado $"
                                                    variant="standard"
                                                // onChange={(e) => {
                                                //     const dolares = parseDecimal(e.target.value);
                                                //     const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                                //     const nuevoMontoPagadoDol = dolares;
                                                //     const nuevoMontoPagadoBol = bolivares;
                                                //     const nuevoSaldoDol = concepto.costoDol - nuevoMontoPagadoDol;
                                                //     const nuevoSaldoBol = concepto.costoBol - nuevoMontoPagadoBol;

                                                //     if (nuevoSaldoDol < 0) {
                                                //         alert("El monto a pagar es mayor que el costo en este ítem");
                                                //         return;
                                                //     }

                                                //     setReplicaConceptosAdicionales((prev) => {
                                                //         const newDataPago = [...prev];
                                                //         newDataPago[index] = {
                                                //             ...newDataPago[index],
                                                //             montoPagadoDol: nuevoMontoPagadoDol,
                                                //             montoPagadoBol: nuevoMontoPagadoBol,
                                                //             saldoDol: nuevoSaldoDol,
                                                //             saldoBol: nuevoSaldoBol,
                                                //         };
                                                //         return newDataPago;
                                                //     });
                                                //     setClearFieldConceptos((prev) => ({
                                                //         ...prev,
                                                //         [`montoPagadoDol-${index}`]: prev[`montoPagadoDol-${index}`] + 1,
                                                //     }));
                                                // }}
                                                />

                                                <TextField
                                                    key={`montoPagadoBol-${index}`}
                                                    sx={{ width: '7%' }}
                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                                                    type="number"
                                                    value={concepto.montoPagadoBol}
                                                    id={`montoPagadoBol-${index}`}
                                                    label="Pagado bs"
                                                    variant="standard"
                                                // onChange={(e) => {
                                                //     const bolivares = parseDecimal(e.target.value);
                                                //     const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                                //     const nuevoMontoPagadoDol = dolares;
                                                //     const nuevoMontoPagadoBol = bolivares;
                                                //     const nuevoSaldoDol = concepto.costoDol - nuevoMontoPagadoDol;
                                                //     const nuevoSaldoBol = concepto.costoBol - nuevoMontoPagadoBol;

                                                //     if (nuevoSaldoBol < 0) {
                                                //         alert("El monto a pagar es mayor que el costo en este ítem");
                                                //         return;
                                                //     }

                                                //     setReplicaConceptosAdicionales((prev) => {
                                                //         const newDataPago = [...prev];
                                                //         newDataPago[index] = {
                                                //             ...newDataPago[index],
                                                //             montoPagadoDol: nuevoMontoPagadoDol,
                                                //             montoPagadoBol: nuevoMontoPagadoBol,
                                                //             saldoDol: nuevoSaldoDol,
                                                //             saldoBol: nuevoSaldoBol,
                                                //         };
                                                //         return newDataPago;
                                                //     });
                                                //     setClearFieldConceptos((prev) => ({
                                                //         ...prev,
                                                //         [`montoPagadoBol-${index}`]: prev[`montoPagadoBol-${index}`] + 1,
                                                //     }));
                                                // }}
                                                />
                                                <Divider orientation="vertical" flexItem />
                                                <TextField
                                                    InputProps={{ readOnly: true }}
                                                    key={`montoRestanteDol-${index}`}
                                                    sx={{ width: '7%' }}
                                                    value={replicaConceptosAdicionales[index].montoRestanteDol}
                                                    id={`montoRestanteDol-${index}`}
                                                    label="Restante $"
                                                    variant="standard"
                                                // onChange={(e) => {
                                                //     const dolares = parseDecimal(e.target.value);
                                                //     const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                                //     const nuevomontoRestanteDol = dolares;
                                                //     const nuevoMontoRestanteBol = bolivares;
                                                //     const nuevoSaldoRestanteDol = concepto.costoDol - nuevomontoRestanteDol;
                                                //     const nuevoSaldoBol = concepto.costoBol - nuevoMontoRestanteBol;

                                                //     if (nuevoSaldoRestanteDol < 0) {
                                                //         alert("El monto a pagar es mayor que el costo en este ítem");
                                                //         return;
                                                //     }

                                                //     setReplicaConceptosAdicionales((prev) => {
                                                //         const newDataPago = [...prev];
                                                //         newDataPago[index] = {
                                                //             ...newDataPago[index],
                                                //             montoRestanteDol: nuevomontoRestanteDol,
                                                //             montoRestanteBol: nuevoMontoRestanteBol,
                                                //             saldoDol: nuevoSaldoRestanteDol,
                                                //             saldoBol: nuevoSaldoBol,
                                                //         };
                                                //         return newDataPago;
                                                //     });
                                                //     setClearFieldConceptos((prev) => ({
                                                //         ...prev,
                                                //         [`montoRestanteDol-${index}`]: prev[`montoRestanteDol-${index}`] + 1,
                                                //     }));
                                                // }}
                                                />
                                                <TextField
                                                    InputProps={{ readOnly: true }}
                                                    key={`montoRestanteBol-${index}`}
                                                    sx={{ width: '7%' }}
                                                    value={replicaConceptosAdicionales[index].montoRestanteBol}
                                                    id={`montoRestanteBol-${index}`}
                                                    label="Restante bs"
                                                    variant="standard"
                                                // onChange={(e) => {
                                                //     const bolivares = parseDecimal(e.target.value);
                                                //     const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                                //     const nuevoMontoRestanteDol = dolares;
                                                //     const nuevoMontoRestanteBol = bolivares;
                                                //     const nuevoSaldoDol = concepto.costoDol - nuevoMontoRestanteDol;
                                                //     const nuevoSaldoBol = concepto.costoBol - nuevoMontoRestanteBol;

                                                //     if (nuevoSaldoBol < 0) {
                                                //         alert("El monto a pagar es mayor que el costo en este ítem");
                                                //         return;
                                                //     }

                                                //     setReplicaConceptosAdicionales((prev) => {
                                                //         const newDataPago = [...prev];
                                                //         newDataPago[index] = {
                                                //             ...newDataPago[index],
                                                //             montoRestanteDol: nuevoMontoRestanteDol,
                                                //             montoRestanteBol: nuevoMontoRestanteBol,
                                                //             saldoDol: nuevoSaldoDol,
                                                //             saldoBol: nuevoSaldoBol,
                                                //         };
                                                //         return newDataPago;
                                                //     });
                                                //     setClearFieldConceptos((prev) => ({
                                                //         ...prev,
                                                //         [`montoRestanteBol-${index}`]: prev[`montoRestanteBol-${index}`] + 1,
                                                //     }));
                                                // }}
                                                />
                                                <Divider orientation="vertical" flexItem />
                                                <TextField
                                                    key={clearFieldConceptos.montoApagarDol}
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={replicaConceptosAdicionales[index].montoApagarDol}
                                                    id={`montoApagarDol-${index}`}
                                                    label="A Pagar $"
                                                    variant="standard"
                                                    onChange={(e) => {
                                                        const dolares = parseDecimal(e.target.value);
                                                        const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                                        setReplicaConceptosAdicionales((prev) => {
                                                            const newDataPago = [...prev];
                                                            newDataPago[index] = {
                                                                ...newDataPago[index],
                                                                montoApagarDol: dolares,
                                                                montoApagarBol: bolivares,
                                                                // montoRestanteDol: dolares,
                                                                // montoRestanteBol: bolivares,
                                                            };
                                                            return newDataPago;
                                                        });
                                                        setClearFieldConceptos((prev) => ({
                                                            ...prev,
                                                            // [`costoDol-${index}`]: prev[`costoDol-${index}`] + 1,
                                                            [`montoApagarDol-${index}`]: prev[`montoApagarDol-${index}`] + 1,
                                                            [`montoApagarBol-${index}`]: prev[`montoApagarBol-${index}`] + 1,
                                                        }));
                                                    }}
                                                />
                                                <TextField
                                                    sx={{ width: '7%' }}
                                                    InputProps={{ readOnly: true }}
                                                    value={replicaConceptosAdicionales[index].montoApagarBol}
                                                    id={`montoApagarBol-${index}`}
                                                    label="A Pagar Bs"
                                                    variant="standard"
                                                    onChange={(e) => {
                                                        const bolivares = parseDecimal(e.target.value);
                                                        const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                                        setReplicaConceptosAdicionales((prev) => {
                                                            const newDataPago = [...prev];
                                                            newDataPago[index] = {
                                                                ...newDataPago[index],
                                                                montoApagarDol: dolares,
                                                                montoApagarBol: bolivares,
                                                            };
                                                            return newDataPago;
                                                        });
                                                        setClearFieldConceptos((prev) => ({
                                                            ...prev,
                                                            [`montoApagarDol-${index}`]: prev[`montoApagarDol-${index}`] + 1,
                                                            [`montoApagarBol-${index}`]: prev[`montoApagarBol-${index}`] + 1,
                                                        }));
                                                    }}
                                                />

                                            </>

                                        }


                                        {/* <TextField
                                            key={`montoPagadoDol-${index}`}
                                            sx={{ width: '10%' }}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                                            type="number"
                                            value={concepto.montoPagadoDol}
                                            id={`montoPagadoDol-${index}`}
                                            label="Monto Pagado $"
                                            variant="standard"
                                            onChange={(e) => {
                                                const dolares = parseDecimal(e.target.value);
                                                const bolivares = (dolares * tasaDelDia.excAmount).toFixed(2);
                                                const nuevoMontoPagadoDol = dolares;
                                                const nuevoMontoPagadoBol = bolivares;
                                                const nuevoSaldoDol = concepto.costoDol - nuevoMontoPagadoDol;
                                                const nuevoSaldoBol = concepto.costoBol - nuevoMontoPagadoBol;
                                                setReplicaConceptosAdicionales((prev) => {
                                                    const newDataPago = [...prev];
                                                    newDataPago[index] = {
                                                        ...newDataPago[index],
                                                        montoPagadoDol: nuevoMontoPagadoDol,
                                                        montoPagadoBol: nuevoMontoPagadoBol,
                                                        saldoDol: nuevoSaldoDol,
                                                        saldoBol: nuevoSaldoBol,
                                                    };
                                                    return newDataPago;
                                                });
                                                setClearFieldConceptos((prev) => ({
                                                    ...prev,
                                                    [`montoPagadoDol-${index}`]: prev[`montoPagadoDol-${index}`] + 1,
                                                }));
                                            }}
                                        />

                                        <TextField
                                            key={`montoPagadoBol-${index}`}
                                            sx={{ width: '10%' }}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', step: 'any' }}
                                            type="number"
                                            value={concepto.montoPagadoBol}
                                            id={`montoPagadoBol-${index}`}
                                            label="Monto Pagado bs"
                                            variant="standard"
                                            onChange={(e) => {
                                                const bolivares = parseDecimal(e.target.value);
                                                const dolares = (bolivares / tasaDelDia.excAmount).toFixed(2);
                                                const nuevoMontoPagadoDol = dolares;
                                                const nuevoMontoPagadoBol = bolivares;
                                                const nuevoSaldoDol = concepto.costoDol - nuevoMontoPagadoDol;
                                                const nuevoSaldoBol = concepto.costoBol - nuevoMontoPagadoBol;
                                                setReplicaConceptosAdicionales((prev) => {
                                                    const newDataPago = [...prev];
                                                    newDataPago[index] = {
                                                        ...newDataPago[index],
                                                        montoPagadoDol: nuevoMontoPagadoDol,
                                                        montoPagadoBol: nuevoMontoPagadoBol,
                                                        saldoDol: nuevoSaldoDol,
                                                        saldoBol: nuevoSaldoBol,
                                                    };
                                                    return newDataPago;
                                                });
                                                setClearFieldConceptos((prev) => ({
                                                    ...prev,
                                                    [`montoPagadoBol-${index}`]: prev[`montoPagadoBol-${index}`] + 1,
                                                }));
                                            }}
                                        /> 

                                        <IconButton color="primary" aria-label="Limpiar valores"
                                            onClick={() => limpiarValores(index)}
                                        >
                                            <CleaningServicesIcon />
                                        </IconButton>

                                        {/* <TextField
                                        sx={{ width: '10%' }}
                                        InputProps={{ readOnly: true }}
                                        value={concepto.montoRestanteDol}
                                        id="montoRestanteDol"
                                        label="Monto Restante $"
                                        variant="standard"
                                    />
                                    <TextField
                                        sx={{ width: '10%' }}
                                        InputProps={{ readOnly: true }}
                                        value={concepto.montoRestanteBol}
                                        id="montoRestanteBol"
                                        label="Monto Restante Bs"
                                        variant="standard"
                                    /> 
                                    </Stack>
                                </>

                            )) : <> </>
                    } */}

                    

                    <Stack className={classes.TextField} spacing={2} justifyContent="flex-start" alignItems="center" direction="row" >

                    </Stack>
                    <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-end" className={classes.stack}>

                        <Button variant="outlined" onClick={() => cancelarPagosAdicionales()}
                            color="error">Cancelar</Button>
                        <Button variant="contained" color="success" disabled={conceptosAdicionalesArray.length ? false : true}
                            onClick={() => guardarConceptosAdicionales()}
                        >Guardar </Button>
                    </Stack>
                </Box>
            </Modal>
        </>

    )
}


export default ModalConceptoPagos