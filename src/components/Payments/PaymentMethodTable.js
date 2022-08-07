import React from 'react'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MaterialTable from '@material-table/core'; 
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const AxiosInstance = require("../utils/request").default;

const PaymentMethodTable = () => {

    const [payMetLookup, setPayMetLookup] = React.useState([])
    const [payments, setPayments] = React.useState([])
    const [reload, setReload] = React.useState(0)

    const columns = [
        { title: 'Forma de Pago', field: 'payName',lookup: payMetLookup, width: 400,headerStyle:{paddingLeft:'5%'},cellStyle:{paddingLeft:'5%'}, validate:rowData=>(rowData.payName === undefined || rowData.payName === '')?"Requerido":true },
        { title: 'Monto',type: "currency", field: 'payAmount',width: 400, headerStyle:{paddingRight:'35%'}, validate:rowData=>(rowData.payAmount === undefined || rowData.payAmount === '' )? 'Requerido':true },    
      ];

    const allPaymentMehodActives = async () => {

        try{
          const allPaymentMehodActivesRes = (await AxiosInstance.get("/paymentmethod/allpaymentMethods/active")).data

          if(allPaymentMehodActivesRes.ok === true){
              setPayMetLookup(allPaymentMehodActivesRes.lookup)
          }
        }catch{
    //       setMessage('Error de Conexion al consultar roles')
    //       setAlertModal(true)
          
      }
    }

    React.useEffect(() => {  
            allPaymentMehodActives()
    }, [reload]);



  return (
    <MaterialTable title={'Agregar método de pago'}
    data={payments} 
    columns={columns}
    actions={[
    ]}
    options={{
      search: false,
            paging: false,
        width:300,
        actionsCellStyle:{paddingLeft:50,paddingRight:50},
         actionsColumnIndex:-1,
         addRowPosition:'first',
         headerStyle: {
          backgroundColor: "#007bff",
          color: "#FFF",
          fontWeight:'normal',
          fontSize:18,
          textAlign:"center",
        },
        filterCellStyle:{

        }
     }}
     editable={{
         onRowAdd: (newRow) => new Promise((resolve, reject)=>{

            if (newRow){
                let pay = payments        
                pay.push({...newRow, id:payments.length + 1})    
                setPayments(pay)
                setReload(reload+1)
                resolve()
            }else{
                reject()
            }
            
          }),
         onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{

        })
        }}
        />
  )
}

export default PaymentMethodTable