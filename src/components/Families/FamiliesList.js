import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ModeRoundedIcon from '@mui/icons-material/ModeRounded';
import {NavLink} from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const { standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default
const DownloadExcel = require('../commonComponents/DownloadExcel').default 
const ModalConfigureFamily = require('./ModalConfigureFamily').default 
const ModalAlertCancel = require('../AlertMessages/ModalAlertCancel').default 

const FamiliesList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [selectedFamily, setSelectedFamily] = React.useState()
    const [openModal, setOpenModal] = React.useState(false)
    const [modalCancel  , setModalCancel] = React.useState(false)
    const [userResponse  , setUserResponse] = React.useState('')
    const [famId  , setFamId] = React.useState('')

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
      const resultFamilies = (await AxiosInstance.get("/representativeStudent/groupedByFamily/")).data

      if(resultFamilies.ok === true){
        setDataSource(resultFamilies.data)
      }
    }catch{
      setAlertType('error')
      setMessage('Error de Conexión al consultar listado de familia')
      setAlertModal(true)
      
  }
}
const confirmCancelNewRepresentative =() =>{
  setModalCancel(true)
}
const handleClose = () => {
  if(userResponse === 'yes'){
    validarFamiliaConInscripcion()
  }else 
  if(userResponse === 'no'){
    setModalCancel(false)
  }
};

const validarFamiliaConInscripcion = async () => {
  try{
    const resultFamilies = (await AxiosInstance.get("/inscriptions/family/"+Number(famId))).data
    if(resultFamilies.data.length > 0){
      setModalCancel(false)
      setAlertType('error')
      setMessage('ERROR: familia asociada a inscripción')
      setAlertModal(true)
    }else{
      const eliminarFamilia = (await AxiosInstance.delete("/families/"+famId)).data
      if(resultFamilies.ok === true){
        setModalCancel(false)
        setAlertType('success')
        setMessage('Familia eliminada satisfactoriamente')
        setAlertModal(true)
        fillTable()
      }else{
        setModalCancel(false)
        setAlertType('error')
        setMessage('Error al eliminar familia')
        setAlertModal(true)
      }   
    }
  }catch{
    setAlertType('error')
    setMessage('Error de Conexión al eliminar registro de familia')
    setAlertModal(true)
}
}


React.useEffect(() => {  
    fillTable()
        // const statusTag={}
        // StatusTag.map(row=>statusTag[row.id]=row.title)
        // setStatus(statusTag)
    
    }, [Reload]);

    React.useEffect(() => {  
      handleClose()
  }, [userResponse]);

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
          tooltip: 'Agregar Familia',
          isFreeAction: true,
          onClick: (event, rowData) => {
            setSelectedFamily(rowData)
          }
      },{
        icon: () => <ModeRoundedIcon />,
        tooltip: 'Editar Familia',
        onClick: (event, rowData) => {
          setSelectedFamily(rowData)
          window.location = `editarfamilia/${rowData.famId}`;
        }
      }
      ,{
        icon: () => <VisibilityRoundedIcon />,
        tooltip: 'Ver Detalles',
        onClick: (event, rowData) => {
          setSelectedFamily(rowData)
          window.location = `detallefamilia/${rowData.famId}`;
        }
      },{
        icon: () => <DeleteOutlineIcon />,
        tooltip: 'Eliminar Familia',
        onClick: (event, rowData) => {
          setFamId(rowData.famId)
          confirmCancelNewRepresentative()
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

    />
    {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
    {(openModal) ?
      <ModalConfigureFamily selectedFamily={selectedFamily} openModal={openModal} setOpenModal={setOpenModal}/> 
      : null}  

      {(modalCancel) ? 
              <ModalAlertCancel  modalCancel={modalCancel} setModalCancel={setModalCancel} message={'¿ Desea eliminar familia ?'} setUserResponse={setUserResponse} /> 
       : null}
    </>
    

  )
}

export default FamiliesList