import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
const { standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;

const CompaniesList = () => {
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [filtering, setFiltering] = React.useState(false)

  const columns = [
    { title: 'RIF', field: 'comRif', validate: rowData => (rowData.comRif === undefined || rowData.comRif === '') ? "Requerido" : true },
    { title: 'Razón Social', field: 'comName', validate: rowData => (rowData.comName === undefined || rowData.comName === '') ? "Requerido" : true },
    { title: 'Dirección', field: 'comDirection'},
    { title: 'Telefono', field: 'comPhone'},
    { title: 'Email', field: 'comEmail' },
    { title: 'Estatus', field: 'comStatus', cellStyle: { paddingLeft: '5%' }, headerStyle: { paddingLeft: '5%' }, width: 200, lookup: { 1: 'Activo', 2: 'Inactivo' }, validate: rowData => (rowData.comStatus === undefined) ? "Requerido" : true },
  ];


      const fillTable = async () => {

        try{
          const resultCompanies = (await AxiosInstance.get("/companies/")).data
          if (resultCompanies.ok === true){
            setDataSource(resultCompanies.data)
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
    <MaterialTable title={'Compañías'}
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

           AxiosInstance.post(`/companies/`,newRow)
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

           AxiosInstance.delete(`/companies/${selectRow.comId}`)
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
           AxiosInstance.put(`/companies/${newRow.comId}`,newRow)
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

export default CompaniesList
