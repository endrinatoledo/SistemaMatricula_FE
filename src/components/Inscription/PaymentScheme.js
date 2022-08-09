import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MaterialTable from '@material-table/core';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const { standardMessages } = require('../commonComponents/MessagesAndLabels')


const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({

  h4: {
    marginBottom: '2%',
    marginLeft: '1%'

  },
  stack: {
    marginTop: '5%'
  },


});
const PaymentScheme = () => {

  let { insid } = useParams();
  const [insId, setInsId] = React.useState(insid)
  const [student, setStudent] = React.useState({
    stuIdType: null, stuIdentificationNumber: null,
    stuFirstName: null, stuSurname: null
  })
  const [invoicesConcepts, setInvoicesConcepts] = React.useState([])
  const [message, setMessage] = React.useState()
  const [alertModal, setAlertModal] = React.useState(false)
  const [alertType, setAlertType] = React.useState('');
  const [paySchConData, setPaySchConData] = React.useState([]);
  const [plsId, setPlsId] = React.useState(null)
  
  const classes = UseStyles();

  const columns = [
    {
      title: 'Nombre de Concepto', field: 'icoId',lookup:invoicesConcepts,
      cellStyle:{paddingLeft:'5%', width: 200}, headerStyle:{paddingLeft:'5%'},
      validate:rowData=>(rowData.icoId === undefined || rowData.icoId === ''|| rowData.icoId === null)?"Requerido":true 
    }
  ];

  const getInscriptionById = async () => {

    try {
      const resultInscrption = (await AxiosInstance.get(`/inscriptions/${insid}`)).data

      if (resultInscrption.ok === true) {
        setStudent(resultInscrption.data.student)
        setPlsId(resultInscrption.data.plsId)
      }
    } catch {
      console.log('error al consultar inscripcion por Id')
      setMessage('Error de Conexion')
      setAlertModal(true)
    }
  }

  const listInvoicesConcepts = async () => {

    try {
      const resultInvoiceConcepts = (await AxiosInstance.get("/invoiceConcepts/")).data
      
      if (resultInvoiceConcepts.ok === true) {
        setInvoicesConcepts(resultInvoiceConcepts.lookup)
      }
    } catch {
      setMessage('Error de Conexion')
      setAlertModal(true)

    }
  }

  const studentPaymentSchemeByIdInscription = async () => {

    try {
      const result = (await AxiosInstance.get(`/studentPaymentScheme/inscription/${insid}`)).data

      if (result.ok === true) {
        setPaySchConData(result.data)
      }
    } catch {
      setMessage('Error de Conexion')
      setAlertModal(true)

    }
  }

  React.useEffect(() => {
    getInscriptionById()
    listInvoicesConcepts()
    studentPaymentSchemeByIdInscription()
  }, [insId]);

  return (
    <Box >
      <h4 id="child-modal-title" className={classes.h4}>
        {
          (student !== null) ? ` ${student.stuIdType}-${student.stuIdentificationNumber}  
            ${student.stuFirstName} ${student.stuSurname}` : null
        }
      </h4>


      <MaterialTable title={'Plan de Pago de Estudiante'}
        data={paySchConData}
        columns={columns}
        // actions={[
        //   { icon: () => <FilterList />,
        //     tooltip: "Activar Filtros",
        //     onClick : ()=> setFiltering(!filtering),
        //     isFreeAction: true }
        // ]}
        options={{
          width:300,
          actionsCellStyle:{paddingLeft:50,paddingRight:50},
          //  filtering:filtering,
          actionsColumnIndex: -1,
          addRowPosition: 'first',
          headerStyle: {
            backgroundColor: "#007bff",
            color: "#FFF",
            fontWeight: 'normal',
            fontSize: 18,
            textAlign: "center",
          },
          filterCellStyle: {

          }
        }}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            AxiosInstance.post(`/studentPaymentScheme/`, {insId: insid, icoId: newRow.icoId, plsId:plsId})
              .then(resp => {
                setTimeout(() => {
                  if (resp.data.ok === true) {
                    setAlertType("success")
                    setMessage(resp.data.message)
                    setAlertModal(true)
                    studentPaymentSchemeByIdInscription()
                    resolve()
                  } else {
                    setMessage(resp.data.message)
                    setAlertType("error")
                    setAlertModal(true)
                    reject()
                  }

                }, 2000);

              })
              .catch((err) => {
                setTimeout(() => {
                  setMessage(standardMessages.connectionError)
                  setAlertType("error")
                  setAlertModal(true)
                  studentPaymentSchemeByIdInscription()
                  reject()
                }, 2000);
              });
          }),
          onRowDelete: (selectRow) => new Promise((resolve, reject) => {

            AxiosInstance.delete(`/studentPaymentScheme/inscription/${selectRow.spsId}`)
              .then(resp => {
                setTimeout(() => {
                  if (resp.data.ok === true) {
                    setAlertType("success")
                  } else {
                    setAlertType("error")
                  }
                  setMessage(resp.data.message)
                  setAlertModal(true)
                  studentPaymentSchemeByIdInscription()
                  resolve()
                }, 2000);

              }).catch((err) => {
                setTimeout(() => {
                  setMessage(standardMessages.connectionError)
                  setAlertType("error")
                  setAlertModal(true)
                  studentPaymentSchemeByIdInscription()
                  reject()
                }, 2000);
              });

          }),

        }}
      />
      {(alertModal) ?
        <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
        : null}


    </Box>
  )
}

export default PaymentScheme