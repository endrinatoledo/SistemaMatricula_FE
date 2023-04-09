import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MaterialTable from '@material-table/core';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModalPayments from './ModalPayments';
import ModalVerPagos from './ModalVerPagos';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ModalExoneracionMeses from './ModalExoneracionMeses';


const TablaMensualidades = ({ periodoSeleccionado, selectedFamily, getMensualidadesFamily, families, mensualidades, dataDetalle }) => {

    const [pagoModal, setPagoModal] = React.useState(false) 
    const [numLimpiarFactura, setNumLimpiarFactura] = React.useState(0) 
    const [datosCabecera, setDatosCabecera] = React.useState(null)
    const [datosPago, setDatosPago] = React.useState([])
    const [mesesApagar, setMesesApagar] = React.useState([])
    const [pagosRegistrados, setPagosRegistrados] = React.useState([])
    const [statusModalVerPagos, setStatusModalVerPagos] = React.useState(false)
    const [modalExoneracion, setModalExoneracion] = React.useState(false)

    const columns = [
        { title: 'Estudiante', field: 'student' },
        { title: 'Septiembre', field: 'sep', render: (rows) => meses(rows.sep, 'sep', 'Septiembre', rows) },
        { title: 'Octubre', field: 'oct', render: (rows) => meses(rows.oct, 'oct', 'Octubre', rows) },
        { title: 'Noviembre', field: 'nov', render: (rows) => meses(rows.nov, 'nov', 'Noviembre', rows) },
        { title: 'Diciembre', field: 'dic', render: (rows) => meses(rows.dic, 'dic', 'Diciembre', rows) },
        { title: 'Enero', field: 'ene', render: (rows) => meses(rows.ene, 'ene','Enero', rows) },
        { title: 'Febrero', field: 'feb', render: (rows) => meses(rows.feb, 'feb', 'Febrero', rows) },
        { title: 'Marzo', field: 'mar', render: (rows) => meses(rows.mar, 'mar', 'Marzo', rows) },
        { title: 'Abril', field: 'abr', render: (rows) => meses(rows.abr, 'abr', 'Abril', rows) },
        { title: 'Mayo', field: 'may', render: (rows) => meses(rows.may, 'may', 'Mayo', rows) },
        { title: 'Junio', field: 'jun', render: (rows) => meses(rows.abr, 'abr', 'Junio', rows) },
        { title: 'Julio', field: 'jul', render: (rows) => meses(rows.jul, 'jul', 'Julio', rows) },
        { title: 'Agosto', field: 'ago', render: (rows) => meses(rows.ago, 'ago', 'Agosto', rows) },
    ];

    const buscarDetalleDePago = (mopId) =>{
        const itemDetalle = dataDetalle.find( element => element.mopId === mopId)
        return itemDetalle
    }

    const limpiarFormularioFactura = () => {
        console.log('vino aqui', selectedFamily)
        setPagosRegistrados([])
        setDatosPago([])
        setMesesApagar([])
        setDatosCabecera(null)
        getMensualidadesFamily(selectedFamily)
        setNumLimpiarFactura(0)

    }

    const meses = (mesValue, mes, nombreMes, rows) => {

    let arr = mesesApagar
        if (mesValue.mopStatus === 1) {
        return <CheckCircleOutlineIcon color="success"/>
    } else {
        return    <> 
            <Checkbox 
                name={`${mesValue.mopId}-${mes}`} 
                value={`${mesValue.mopId}-${mes}`} 
                id={`${mesValue.mopId}-${mes}`} 
            onChange={e => {
                
                if (e.target.checked === true) {
                    arr.push({ 
                        "id": `${mesValue.mopId}-${mes}`, 
                        "mes": mes, 
                        "nombreMes":nombreMes,
                        "mopId": mesValue.mopId,
                        "student": rows.student,
                        "level":"",
                        "detallePago": buscarDetalleDePago(mesValue.mopId)
                    })
                }else{
                    arr = arr.filter((item) => item.id !== `${mesValue.mopId}-${mes}` )
                }
                setMesesApagar(arr)
                }}/>
            </>
    }
}

    React.useEffect(() => {
        console.log('----------******------------', mesesApagar)
    }, [mesesApagar])

    React.useEffect(() => {
        if (numLimpiarFactura > 0) limpiarFormularioFactura()
    }, [numLimpiarFactura])

    

    return (
        <>
            <MaterialTable title={'Resumen de mensualidades de alumnos'}
                data={mensualidades}
                columns={columns}
                options={{
                    search: false,
                    paging: false,
                    width: 300,
                    actionsCellStyle: { paddingLeft: 50, paddingRight: 50 },
                    headerStyle: {
                        backgroundColor: "#007bff",
                        color: "#FFF",
                        fontWeight: 'normal',
                        fontSize: 18,
                    },
                    actionsColumnIndex: -1,
                    addRowPosition: 'first'
                }}
                actions={[
                    {
                        icon: () => <AddBoxRoundedIcon />,
                        tooltip: 'Registrar Pago',
                        isFreeAction: true,
                        onClick: () => {
                            setPagoModal(true)
                        }
                    },
                    {
                        icon: () => <VisibilityIcon />,
                        tooltip: 'Ver Pagos',
                        isFreeAction: true,
                        onClick: () => {
                            setStatusModalVerPagos(true)
                        }
                    },
                    {
                        icon: () => <RemoveCircleIcon />,
                        tooltip: 'Exonerar Mensualidad',
                        isFreeAction: true,
                        onClick: () => {
                            setModalExoneracion(true)
                        }
                    },
                ]}
            />
            {(pagoModal)
                ? <ModalPayments dataDetalle={dataDetalle} periodoSeleccionado={periodoSeleccionado} numLimpiarFactura={numLimpiarFactura} setNumLimpiarFactura={setNumLimpiarFactura} pagosRegistrados={pagosRegistrados} setPagosRegistrados={setPagosRegistrados} datosPago={datosPago} setDatosPago = { setDatosPago } datosCabecera={datosCabecera} setDatosCabecera={setDatosCabecera} selectedFamily={selectedFamily} getMensualidadesFamily={getMensualidadesFamily} families={families} setMesesApagar={setMesesApagar} mesesApagar={mesesApagar} pagoModal={pagoModal} setPagoModal={setPagoModal} mensualidades={mensualidades} />
            :null
            }
            {(statusModalVerPagos) ?
                <ModalVerPagos periodoSeleccionado={periodoSeleccionado} selectedFamily={selectedFamily} statusModalVerPagos={statusModalVerPagos} setStatusModalVerPagos={setStatusModalVerPagos} />
                : null}   
            {/* {(statusModalVerPagos) ?
                <ModalVerPagos periodoSeleccionado={periodoSeleccionado} selectedFamily={selectedFamily} statusModalVerPagos={statusModalVerPagos} setStatusModalVerPagos={setStatusModalVerPagos} />
                : null}  */}
            {(modalExoneracion)
                ? <ModalExoneracionMeses limpiarFormularioFactura={limpiarFormularioFactura} mesesApagar={mesesApagar} modalExoneracion={modalExoneracion} setModalExoneracion={setModalExoneracion} dataDetalle={dataDetalle} periodoSeleccionado={periodoSeleccionado} numLimpiarFactura={numLimpiarFactura} setNumLimpiarFactura={setNumLimpiarFactura} pagosRegistrados={pagosRegistrados} setPagosRegistrados={setPagosRegistrados} datosPago={datosPago} setDatosPago={setDatosPago} datosCabecera={datosCabecera} setDatosCabecera={setDatosCabecera} selectedFamily={selectedFamily} getMensualidadesFamily={getMensualidadesFamily} families={families} setMesesApagar={setMesesApagar} pagoModal={pagoModal} setPagoModal={setPagoModal} mensualidades={mensualidades} />
                : null} 
        </>
    )
}

export default TablaMensualidades