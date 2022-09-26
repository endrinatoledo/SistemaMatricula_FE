import * as React from 'react';
import Box from '@mui/material/Box';
import MaterialTable from '@material-table/core';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { makeStyles } from '@mui/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { NavLink } from 'react-router-dom'
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

const meses = (rows) => {
    if (rows === 1) {
        return <CheckCircleOutlineIcon />
    } else {
        return <HighlightOffIcon />
    }
}

const TablaMensualidades = ({ mensualidades }) => {

    const [pagoModal, setPagoModal] = React.useState(false)
    const [statusCcircularProgress  , setStatusCcircularProgress] = React.useState(false)
    const columns = [
        { title: 'Estudiante', field: 'student' },
        { title: 'Enero', field: 'ene', render: (rows) => meses(rows.ene) },
        { title: 'Febrero', field: 'feb', render: (rows) => meses(rows.feb) },
        { title: 'Marzo', field: 'mar', render: (rows) => meses(rows.mar) },
        { title: 'Abril', field: 'abr', render: (rows) => meses(rows.abr) },
        { title: 'Mayo', field: 'may', render: (rows) => meses(rows.may) },
        { title: 'Junio', field: 'jun', render: (rows) => meses(rows.abr) },
        { title: 'Julio', field: 'jul', render: (rows) => meses(rows.jul) },
        { title: 'Agosto', field: 'ago', render: (rows) => meses(rows.ago) },
        { title: 'Septiembre', field: 'sep', render: (rows) => meses(rows.sep) },
        { title: 'Octubre', field: 'oct', render: (rows) => meses(rows.oct) },
        { title: 'Noviembre', field: 'nov', render: (rows) => meses(rows.nov) },
        { title: 'Diciembre', field: 'dic', render: (rows) => meses(rows.dic) },
    ];

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
            ?  <ModalPayments pagoModal={pagoModal} setPagoModal={setPagoModal} mensualidades={mensualidades}/>
            :null
            }
        </>
    )
}

export default TablaMensualidades