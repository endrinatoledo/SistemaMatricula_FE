import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import {NavLink} from 'react-router-dom'
const {StatusTag, standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default
const DownloadExcel = require('../commonComponents/DownloadExcel').default 
const ModalConfigureFamily = require('./ModalConfigureFamily').default 

const FamiliesList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [selectedFamily, setSelectedFamily] = React.useState()
    const [openModal, setOpenModal] = React.useState(false)

    const excelStructure ={
      fileName : 'ReporteDeFamilias.xlsx',
      columns:[["Códigos", "Familias", "Estatus"]],
      sheetName: "Familias"
    }
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');

  const columns = [
    { title: 'Código', field: 'families.famCode', editable:false, width: 150,headerStyle:{paddingLeft:'4%'},cellStyle:{paddingLeft:'5%'},},
    { title: 'Nombre', field: 'families.famName' },
    // { title: 'Estatus', field: 'famStatus',filtering:false, render:(row)=> <StatusInTable status={row.famStatus} /> }
    { title: 'Estatus', field: 'families.famStatus',cellStyle:{paddingLeft:'5%'},headerStyle:{paddingLeft:'5%',}, width: 200,  lookup: {1: 'Activo', 2:'Inactivo'}, validate:rowData=>(rowData.famStatus === undefined)?"Requerido":true }

  ];

  const fillTable = async () => {

    try{
      const resultFamilies = (await AxiosInstance.get("/representativeStudent/byRepresentative/")).data

      if(resultFamilies.ok === true){
        setDataSource(resultFamilies.data)
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
    <MaterialTable title={'Familias'}
     data={dataSource} 
     columns={columns}
     actions={[
      { icon: () => <FilterList />,
        tooltip: "Activar Filtros",
        onClick : ()=> setFiltering(!filtering),
        isFreeAction: true },
        {
          icon: () => <NavLink to='/configurarfamilia' ><AddBoxRoundedIcon /></NavLink>,
          tooltip: 'Configurar Periodo',
          isFreeAction: true,
          onClick: (event, rowData) => {
            
            setSelectedFamily(rowData)
            // setOpenModal(true)
            // console.log(event)
            // console.log(rowData)
          }
        }
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
        exportMenu: [{
          label: 'Export PDF',
          exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Reporte de Familias')
        }, 
        {
          label: 'Export EXCEL',
          exportFunc: (cols, datas) => DownloadExcel(cols, datas,excelStructure)
        }
      ],
         filtering:filtering,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}
     editable={{
        //  onRowAdd: (newRow) => new Promise((resolve, reject)=>{

        //   AxiosInstance.post(`/families/`,newRow)
        //   .then(resp=>{
        //     setTimeout(() => {
        //       if(resp.data.ok === true){
        //         setAlertType("success")
        //       }else{
        //         setAlertType("error")
        //       }
        //       setMessage(resp.data.message)
        //       setAlertModal(true)
        //       fillTable()
        //       resolve()
        //     }, 2000);
            
        //   })
        //   .catch((err) => {
        //     setTimeout(() => {
        //       setMessage(standardMessages.connectionError)
        //       setAlertType("error")
        //       setAlertModal(true)
        //       fillTable()
        //       reject()
        //     }, 2000);
        //   });
        //   }),
        //  onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{
        //   AxiosInstance.delete(`/families/${selectRow.famId}`)
        //   .then(resp=>{
        //     setTimeout(() => {
        //       if(resp.data.ok === true){
        //         setAlertType("success")
        //       }else{
        //         setAlertType("error")
        //       }
        //       setMessage(resp.data.message)
        //       setAlertModal(true)
        //       fillTable()
        //       resolve()
        //     }, 2000);
            
        //   }).catch((err) => {
        //     setTimeout(() => {
        //       setMessage(standardMessages.connectionError)
        //       setAlertType("error")
        //       setAlertModal(true)
        //       fillTable()
        //       reject()
        //     }, 2000);
        //   });

        // }),

         onRowUpdate:(newRow, oldRow)=>new Promise((resolve, reject)=>{
            AxiosInstance.put(`/families/${newRow.famId}`,newRow)
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
    {(openModal) ?
      <ModalConfigureFamily selectedFamily={selectedFamily} openModal={openModal} setOpenModal={setOpenModal}/> 
      : null}  

      
    </>
    

  )
}

export default FamiliesList