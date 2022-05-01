import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
const { standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;


const ExchangeRatesList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');

  const columns = [
    { title: 'Fecha', field: 'excDate',type:'date', headerStyle:{paddingLeft:'15%'},cellStyle:{paddingLeft:'14%'}, validate:rowData=>(rowData.excDate === undefined || rowData.excDate === '')?"Requerido":true},
    { title: 'Monto en Bolívares',type:'float', field: 'excAmount', width: 400,cellStyle:{paddingRight:0},validate:rowData=>(rowData.excAmount === undefined || rowData.excAmount === '')?"Requerido":true },
    { title: 'Turno', field: 'excShift',cellStyle:{paddingLeft:'5%'},headerStyle:{paddingLeft:'5%',}, width: 200,  lookup: {'Mañana': 'Mañana', 'Tarde':'Tarde'}, validate:rowData=>(rowData.excShift === undefined)?"Requerido":true }

  ];

  const fillTable = async () => {

    try{
      const resultExchangeR = (await AxiosInstance.get("/exchangeRate/")).data
      if(resultExchangeR.ok === true){
        setDataSource(resultExchangeR.data)
      }
    }catch{
      setMessage('Error de Conexion')
      setAlertModal(true)
      
  }
}

React.useEffect(() => {  
    fillTable()
        // const statusTag={}
        // StatusTag.map(row=>statusTag[row.id]=row.title)
        // setStatus(statusTag)
    
    }, [Reload]);

  return (
    <>
    <MaterialTable title={'Tasas de Cambio'}
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
        headerStyle: {
          backgroundColor: "#007bff",
          color: "#FFF",
          fontWeight:'normal',
          fontSize:18,
        },
         filtering:filtering,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}
     editable={{
         onRowAdd: (newRow) => new Promise((resolve, reject)=>{

          AxiosInstance.post(`/exchangeRate/`,newRow)
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
          AxiosInstance.delete(`/exchangeRate/${selectRow.excId}`)
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
            AxiosInstance.put(`/exchangeRate/${newRow.excId}`,newRow)
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

export default ExchangeRatesList