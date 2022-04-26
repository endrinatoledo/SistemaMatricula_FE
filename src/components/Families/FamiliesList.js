import * as React from 'react';
import MaterialTable from 'material-table'; 
const {StatusTag} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default

const FamiliesList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [status, setStatus] = React.useState({})
    const [familyObject, setFamilyObject] = React.useState({idFamily:'',name:'', code:'',status:''});

    
  const columns = [
    { title: 'Código', field: 'famCode', editable:false},
    { title: 'Nombre', field: 'famName',  },
    // { title: 'Estatus', field: 'famStatus',filtering:false, render:(row)=> <StatusInTable status={row.famStatus} /> }
    { title: 'Estatus', field: 'famStatus', lookup: {1: 'Activo', 2:'Inactivo'} }

  ];
  
  const saveNewFamily = async (newRow) =>{
    try{
      const resultFamilies = (await AxiosInstance.post("/families/",{name:newRow.famName, status:newRow.famStatus})).data
      console.log('result',resultFamilies)
      if(resultFamilies.ok === true){
        fillTable()
        console.log('guardo')
        // setDataSource(resultFamilies.data)
      }else{
        //definir mensaje de error
      }
    }catch{
      console.log('no family')
      // setConnErr(true)
    }
  }
  const deleteFamily = async (item) =>{
    try{
      const eliminatedFamily = (await AxiosInstance.delete(`/families/${item.famId}`)).data
      console.log('result',eliminatedFamily)
      if(eliminatedFamily.ok === true){
        fillTable()
        // console.log('borro')
        // setDataSource(resultFamilies.data)
      }else{
        //definir mensaje de error
      }
    }catch{
      console.log('no family')
      // setConnErr(true)
    }
  }

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
         onRowAdd: async (newRow) => {
         
            //  setTimeout(()=>{    
              saveNewFamily(newRow);   
            //  },3000)
    
          },
         onRowDelete:(selectRow)=>{
            deleteFamily(selectRow); 

         },
         onRowUpdate:(newRow, oldRow)=>{},

     }}
    />

  )
}

export default FamiliesList


// "browser": {
//   "[module-name]": false
// }