import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
const { standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;

const InvoiceConceptsList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [filtering, setFiltering] = React.useState(false)

  const columns = [
    { title: 'Nombre', field: 'icoName',
    headerStyle:{ paddingLeft:'5%'},
    validate:rowData=>(rowData.icoName === undefined || rowData.icoName === '')?"Requerido":true },
    { title: 'Descripción', field: 'icoDescription',
    headerStyle:{ paddingLeft:'5%'} },
    { title: 'Estatus', field: 'icoStatus', cellStyle:{ textAlign:'center'},
    headerStyle:{paddingLeft:'10%'}, 
    lookup: {1: 'Activo', 2:'Inactivo'}, validate:rowData=>(rowData.icoStatus === undefined)?"Requerido":true }

  ];

  const fillTable = async () => {

    try{
      const resultInvoiceConcepts = (await AxiosInstance.get("/invoiceConcepts/")).data
      if(resultInvoiceConcepts.ok === true){
        setDataSource(resultInvoiceConcepts.data)
      }
    }catch{
      setMessage('Error de Conexion')
      setAlertModal(true)
    
  }
}

React.useEffect(() => {  
    fillTable()    
    }, [Reload]);

  return (
    <>
    <MaterialTable title={'Conceptos de Factura'}
    data={dataSource} 
    columns={columns}
    actions={[
      { icon: () => <FilterList />,
        tooltip: "Activar Filtros",
        onClick : ()=> setFiltering(!filtering),
        isFreeAction: true }
    ]}
    options={{
        width:300,
        actionsCellStyle:{paddingLeft:50,paddingRight:50},
         filtering:filtering,
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

          AxiosInstance.post(`/invoiceConcepts/`,newRow)
          .then(resp=>{
            setTimeout(() => {
              if(resp.data.ok === true){
                setAlertType("success")
                setMessage(resp.data.message)
                setAlertModal(true)
                fillTable()
                resolve()
              }else{
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
              fillTable()
              reject()
            }, 2000);
          });
          }),
         onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{

          AxiosInstance.delete(`/invoiceConcepts/${selectRow.icoId}`)
          .then(resp=>{
            setTimeout(() => {
              if(resp.data.ok === true){
                setAlertType("success")
              }else{
                setAlertType("error")
              }
              setMessage(resp.data.message)
              setAlertModal(true)
              fillTable()
              resolve()
            }, 2000);
            
          }).catch((err) => {
            setTimeout(() => {
              setMessage(standardMessages.connectionError)
              setAlertType("error")
              setAlertModal(true)
              fillTable()
              reject()
            }, 2000);
          });

        }),

         onRowUpdate:(newRow, oldRow)=>new Promise((resolve, reject)=>{
            AxiosInstance.put(`/invoiceConcepts/${newRow.icoId}`,newRow)
            .then(resp=>{
              setTimeout(() => {
                if(resp.data.ok === true){
                  setAlertType("success")
                }else{
                  setAlertType("error")
                }
                setMessage(resp.data.message)
                setAlertModal(true)
                fillTable()
                resolve()
              }, 2000);
              
            }).catch((err) => {
              setTimeout(() => {
                setMessage(standardMessages.connectionError)
                setAlertType("error")
                setAlertModal(true)
                fillTable()
                reject()
              }, 2000);
            });

         })
     }}
    />
    {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
      
    </>
    
  )
}

export default InvoiceConceptsList