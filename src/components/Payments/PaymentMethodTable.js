import React from 'react'

import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import MaterialTable from '@material-table/core';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
  typography: {
    marginLeft: '3%'
  },
  box: {
    marginTop: '2%'
  },
  TextField: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '3%'
  },
  TextField2: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '1%'
  }
});

const PaymentMethodTable = () => {
  const classes = UseStyles();
  const [payMetLookup, setPayMetLookup] = React.useState([])
  const [payments, setPayments] = React.useState([])
  const [reload, setReload] = React.useState(0)
  const [exchangeRate, setExchangeRate] = React.useState({})
  const [totalAmount, setTotalAmount] = React.useState(0)

  const columns = [
    { title: 'Forma de Pago', field: 'payName', lookup: payMetLookup, width: 400, headerStyle: { paddingLeft: '5%' }, cellStyle: { paddingLeft: '5%' }, validate: rowData => (rowData.payName === undefined || rowData.payName === '') ? "Requerido" : true },
    { title: 'Monto $', type: "currency", field: 'payAmount', width: 200, aling: 'center', validate: rowData => (rowData.payAmount === undefined || rowData.payAmount === '') ? 'Requerido' : true },
    { title: 'Monto Bs', field: 'payConvertedAmount', width: 200, editable: false, aling: 'center', render: rowData => (`Bs.${rowData.payConvertedAmount}`) },

  ];

  const allPaymentMehodActives = async () => {

    try {
      const allPaymentMehodActivesRes = (await AxiosInstance.get("/paymentmethod/allpaymentMethods/active")).data

      if (allPaymentMehodActivesRes.ok === true) {
        setPayMetLookup(allPaymentMehodActivesRes.lookup)
      }
    } catch {
      //       setMessage('Error de Conexion al consultar roles')
      //       setAlertModal(true)

    }
  }

  const latestExchangeRate = async () => {

    try {
      const response = (await AxiosInstance.get("/exchangeRate/lastest/exchangeRates")).data
      if (response.ok === true) {
        setExchangeRate(response.data)
      }
    } catch {
      //       setMessage('Error de Conexion al consultar roles')
      //       setAlertModal(true)

    }
  }

  const addAmounts = async () => {

    let reduce = payments.reduce((acumulador, item) => acumulador + item.payAmount, 0);
    setTotalAmount(reduce)
  }

  React.useEffect(() => {
    allPaymentMehodActives()
    latestExchangeRate()
  }, [reload]);

  React.useEffect(() => {
    addAmounts()
  }, [payments.length]);



  return (
    <>
      <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h7" component="div">
        Tasa US$: {`${exchangeRate.excDate} / Bs.${Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(exchangeRate.excAmount)}`}
      </Typography>
      <MaterialTable title={`Monto Total: $${totalAmount}`}
        data={payments}
        columns={columns}
        actions={[
        ]}
        options={{
          search: false,
          paging: false,
          width: 300,
          actionsCellStyle: { paddingLeft: 50, paddingRight: 50 },
          actionsColumnIndex: -1,
          addRowPosition: 'first',
          headerStyle: {
            backgroundColor: "#007bff",
            color: "#FFF",
            fontWeight: 'normal',
            fontSize: 18,
            textAlign: "center",
          },
        }}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            if (newRow) {
              let pay = payments
              pay.push({ ...newRow, id: payments.length + 1, payConvertedAmount: newRow.payAmount * exchangeRate.excAmount })
              setPayments(pay)
              setReload(reload + 1)
              resolve()
            } else {
              reject()
            }

          }),
          onRowDelete: (selectRow) => new Promise((resolve, reject) => {

            if (selectRow) {
              const newArray = payments.filter(element => element.id !== selectRow.id)
              setPayments(newArray)
              setReload(reload + 1)
              resolve()
            } else {
              reject()
            }
          })
        }}
      />
    </>

  )
}

export default PaymentMethodTable