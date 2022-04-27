import * as React from 'react';
import MaterialTable from 'material-table'; 
const {StatusTag} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default

const FamiliesList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [familyObject, setFamilyObject] = React.useState({idFamily:'',name:'', code:'',status:''});

    
  const columns = [
    { title: 'Código', field: 'famCode', editable:false},
    { title: 'Nombre', field: 'famName', validate:rowData=>(rowData.famName === undefined || rowData.famName === '')?"Required":true },
    // { title: 'Estatus', field: 'famStatus',filtering:false, render:(row)=> <StatusInTable status={row.famStatus} /> }
    { title: 'Estatus', field: 'famStatus', lookup: {1: 'Activo', 2:'Inactivo'}, validate:rowData=>(rowData.famStatus === undefined)?"Required":true }

  ];

  const fillTable = async () => {

    try{
      const resultFamilies = (await AxiosInstance.get("/families/")).data
      if(resultFamilies.ok === true){
        setDataSource(resultFamilies.data)
      }
    }catch{
    //   console.log('no Period')
      // setConnErr(true)
  }
}
React.useEffect(() => {  
    fillTable()
        // const statusTag={}
        // StatusTag.map(row=>statusTag[row.id]=row.title)
        // setStatus(statusTag)
    
    }, [Reload]);

  return (
    <MaterialTable title={'tabla ejemplo'}
     data={dataSource} 
     columns={columns}
     options={{
         exportButton:true,
         filtering:true,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}
     editable={{
         onRowAdd: (newRow) => new Promise((resolve, reject)=>{

          AxiosInstance.post(`/families/`,newRow)
          .then(resp=>{
            fillTable()
            resolve()
          })
          }),
         onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{
          AxiosInstance.delete(`/families/${selectRow.famId}`)
          .then(resp=>{
            fillTable()
            resolve()
          })

        }),

         onRowUpdate:(newRow, oldRow)=>new Promise((resolve, reject)=>{
            AxiosInstance.put(`/families/${newRow.famId}`,newRow)
            .then(resp=>{
              fillTable()
              resolve()
            })
         })
     }}
    />

  )
}

export default FamiliesList