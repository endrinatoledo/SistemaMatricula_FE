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

const PaymentMethodTable = ({exchangeRate}) => {
  const classes = UseStyles();
  const [payMetLookup, setPayMetLookup] = React.useState([])
  const [payments, setPayments] = React.useState([])
  const [reload, setReload] = React.useState(0)
  const [totalAmount, setTotalAmount] = React.useState(0)

  const columns = [
    { title: 'Forma de Pago', aling: 'center',field: 'payName', lookup: payMetLookup, headerStyle: { paddingLeft: '5%' }, cellStyle: { paddingLeft: '5%' }, validate: rowData => (rowData.payName === undefined || rowData.payName === '') ? "Requerido" : true },
    { title: 'Monto $', type: "currency", field: 'payAmount', aling: 'center', validate: rowData => (rowData.payAmount === undefined || rowData.payAmount === '') ? 'Requerido' : true },
    { title: 'Monto Bs', field: 'payConvertedAmount', editable: false, aling: 'center', render: rowData => (`Bs.${rowData.payConvertedAmount}`) },
    { title: 'Referencia', field: 'payReference' },
    { title: 'Observación', field: 'payDescription', width: 400 },

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


  function trunc (x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    if (l - decimalLength <= posiciones){
      return x
    }
    var isNeg  = x < 0
    var decimal =  x % 1
    var entera  = isNeg ? Math.ceil(x) : Math.floor(x)
    var decimalFormated = Math.floor(
      Math.abs(decimal) * Math.pow(10, posiciones)
    )
    var finalNum = entera + 
      ((decimalFormated / Math.pow(10, posiciones))*(isNeg ? -1 : 1))
    
    return finalNum
  }

  const addAmounts = async () => {

    let reduce = payments.reduce((acumulador, item) => acumulador + item.payAmount, 0);
    setTotalAmount(reduce)
  }

  React.useEffect(() => {
    allPaymentMehodActives()
  }, [reload]);

  React.useEffect(() => {
    addAmounts()
  }, [payments.length]);

  return (
    <>
      <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h7" component="div">
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
              pay.push({ ...newRow, id: payments.length + 1, payConvertedAmount:trunc((newRow.payAmount * exchangeRate.excAmount),2)})
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