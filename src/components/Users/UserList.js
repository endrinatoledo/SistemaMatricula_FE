import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
const { standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;

const UserList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [filtering, setFiltering] = React.useState(false)
    const [roles, setRoles] = React.useState([])
    const [rolLookup, setRolLookup] = React.useState([])


  const columns = [
    { title: 'Nombre', field: 'usuName',headerStyle:{},validate:rowData=>(rowData.usuName === undefined || rowData.usuName === '')?"Requerido":true },
    { title: 'Apellido', field: 'usuLastName',headerStyle:{ },validate:rowData=>(rowData.usuLastName === undefined || rowData.usuLastName === '')?"Requerido":true },

    { title: 'Correo', field: 'usuEmail', type:'email',headerStyle:{ },validate:rowData=>(rowData.usuEmail === undefined || rowData.usuEmail === '')?"Requerido":true },
    // { title: 'usuPassword', field: 'usuPassword',headerStyle:{ paddingLeft:'30%'},validate:rowData=>(rowData.usuPassword === undefined || rowData.usuPassword === '')?"Requerido":true },
    { title: 'Rol', field: 'rolId',lookup:rolLookup,
    validate:rowData=>(rowData.rolId === undefined || rowData.rolId === '')?"Requerido":true },


    { title: 'Estatus', field: 'usuStatus', cellStyle:{paddingLeft:'5%'}, headerStyle:{paddingLeft:'5%'}, width: 200, 
    lookup: {1: 'Activo', 2:'Inactivo'}, validate:rowData=>(rowData.usuStatus === undefined)?"Requerido":true }

  ];
  const allRolesActives = async () => {

    try{
      const resultRoles = (await AxiosInstance.get("/roles/allRoles/active")).data
      if(resultRoles.ok === true){
          setRolLookup(resultRoles.lookup)
          setRoles(resultRoles.data) 
      }
    }catch{
      setMessage('Error de Conexion al consultar roles')
      setAlertModal(true)
      
  }
}

  const fillTable = async () => {

    try{
      const resultUsers = (await AxiosInstance.get("/users/")).data
      if(resultUsers.ok === true){
        //   console.log(resultUsers)
        setDataSource(resultUsers.data)
      }
    }catch{
      setMessage('Error de Conexion al consultar usuarios')
      setAlertModal(true)
      
  }
}


React.useEffect(() => {  
    allRolesActives()
    fillTable()
    }, []);

  return (
    <>
    <MaterialTable title={'Usuarios'}
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

            AxiosInstance.post(`/users/`,newRow)
            .then(resp=>{
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

            AxiosInstance.delete(`/users/${selectRow.usuId}`)
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
              AxiosInstance.put(`/users/${newRow.usuId}`,newRow)
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

export default UserList