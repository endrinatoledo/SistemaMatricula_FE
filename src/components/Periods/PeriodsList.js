import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import {NavLink} from 'react-router-dom'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
const { standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;

const PeriodsList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');

    let today = new Date();
    let year = today.getFullYear();

  const columns = [
    { title: 'Año Inicio', field: 'period.perStartYear',cellStyle:{paddingRight:'14%'},headerStyle:{paddingRight:'12%'}, 
     type: "numeric"},
    { title: 'Año Fin', field: 'period.perEndYear',cellStyle:{paddingRight:'14%'},headerStyle:{paddingRight:'12%'}, editable:false, type: "numeric"},
    { title: 'Estatus', field: 'period.perStatus',cellStyle:{paddingLeft:'5%'},headerStyle:{paddingLeft:'5%'}, width: 200,  lookup: {1: 'Activo', 2:'Inactivo'}, validate:rowData=>(rowData.perStatus === undefined)?"Requerido":true }

  ];

  const fillTable = async () => {

    try{
      const resultPeriods = (await AxiosInstance.get("/periodLevelSection")).data
      if(resultPeriods.ok === true){
        setDataSource(resultPeriods.data)
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
    <MaterialTable title={'Periodos'}
     data={dataSource} 
     columns={columns}
     actions={[
      { icon: () => <FilterList />,
        tooltip: "Activar Filtros",
        onClick : ()=> setFiltering(!filtering),
        isFreeAction: true },
        {
          icon: () => <NavLink to='/agregarperiodo' ><AddBoxRoundedIcon /></NavLink>,
          tooltip: 'Nuevo Periodo',
          isFreeAction: true,
          onClick: (event, rowData) => {
            }
        },{
          icon: () =><VisibilityRoundedIcon />,
          tooltip: 'Ver Detalles',
          onClick: (event, rowData) => {
            console.log('&&&&&&verrrrrr&&&&&&&&&&',rowData)
            window.location = `verperiodo/${rowData.perId}`;
          }
        },{
          icon: () =><EditRoundedIcon />,
          tooltip: 'Editar Periodo',
          onClick: (event, rowData) => {
            console.log('&&&&&&&&editar&&&&&&&&',rowData)
            window.location = `editarperiodo/${rowData.perId}`;

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
         filtering:filtering,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}

    />
    {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
    </>
    

  )
}

export default PeriodsList