import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MaterialTable from '@material-table/core';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { makeStyles } from '@mui/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ModalPayments from './ModalPayments';

const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
    typography: {
        marginLeft: '3%'
    },
    box: {
        marginTop: '3%'
    },
    TextField: {
        marginBottom: '3%',
        marginTop: '2%',
        marginLeft: '3%'
    },
});



const TablaMensualidades = ({ mensualidades }) => {



    const [pagoModal, setPagoModal] = React.useState(false)
    const [mesesApagar, setMesesApagar] = React.useState([])
    const [statusCcircularProgress  , setStatusCcircularProgress] = React.useState(false)
    const columns = [
        { title: 'Estudiante', field: 'student' },
        { title: 'Enero', field: 'ene', render: (rows) => meses(rows.ene, 'ene','Enero', rows) },
        { title: 'Febrero', field: 'feb', render: (rows) => meses(rows.feb, 'feb', 'Febrero', rows) },
        { title: 'Marzo', field: 'mar', render: (rows) => meses(rows.mar, 'mar', 'Marzo', rows) },
        { title: 'Abril', field: 'abr', render: (rows) => meses(rows.abr, 'abr', 'Abril', rows) },
        { title: 'Mayo', field: 'may', render: (rows) => meses(rows.may, 'may', 'Mayo', rows) },
        { title: 'Junio', field: 'jun', render: (rows) => meses(rows.abr, 'abr', 'Junio', rows) },
        { title: 'Julio', field: 'jul', render: (rows) => meses(rows.jul, 'jul', 'Julio', rows) },
        { title: 'Agosto', field: 'ago', render: (rows) => meses(rows.ago, 'ago', 'Agosto', rows) },
        { title: 'Septiembre', field: 'sep', render: (rows) => meses(rows.sep, 'sep', 'Septiembre', rows) },
        { title: 'Octubre', field: 'oct', render: (rows) => meses(rows.oct, 'oct', 'Octubre', rows) },
        { title: 'Noviembre', field: 'nov', render: (rows) => meses(rows.nov, 'nov', 'Noviembre', rows) },
        { title: 'Diciembre', field: 'dic', render: (rows) => meses(rows.dic, 'dic', 'Diciembre', rows) },
    ];


    const meses = (mesValue, mes, nombreMes, rows) => {
        
    let arr = mesesApagar
        console.log('.......', mes)
        console.log('...........*/////**************////******', rows.mopId)
    if (mesValue === 1) {
        console.log('pagado')
        return <CheckCircleOutlineIcon color="success"/>
    } else {
        // console.log('no pagado')
        return    <> 
            <Checkbox 
            name={`${rows.mopId}-${mes}`} 
            value={`${rows.mopId}-${mes}`} 
            id={`${rows.mopId}-${mes}`} 
            onChange={e => {
                
                if (e.target.checked === true) {
                    arr.push({ 
                        "id": `${rows.mopId}-${mes}`, 
                        "mes": mes, 
                        "nombreMes":nombreMes,
                        "mopId": rows.mopId,
                        "student": rows.student,
                        "level":""
                    })
                }else{
                    arr = arr.filter((item) => item.id !== `${rows.mopId}-${mes}` )
                }
                console.log('----------******------------', mesesApagar)
                setMesesApagar(arr)
                }}/>
            </>
    }
}

    React.useEffect(() => {
        console.log('----------******------------', mesesApagar)
    }, [mesesApagar])

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
                ]}
            />
            {(pagoModal)
                ? <ModalPayments mesesApagar={mesesApagar} pagoModal={pagoModal} setPagoModal={setPagoModal} mensualidades={mensualidades}/>
            :null
            }
        </>
    )
}

export default TablaMensualidades