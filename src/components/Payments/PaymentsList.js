import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {NavLink} from 'react-router-dom'
const AxiosInstance = require("../utils/request").default;
const PaymentsList = () => {

  const [dataSource, setDataSource] = React.useState([])
  const [filtering, setFiltering] = React.useState(false)
  const [alertModal, setAlertModal] = React.useState(false)
  const [message, setMessage] = React.useState()
  const [alertType, setAlertType] = React.useState('');
  const columns = [
    { title: 'Fecha', field: 'families.famCode', editable:false, width: 150,headerStyle:{paddingLeft:'4%'},cellStyle:{paddingLeft:'5%'},},
    { title: 'Familia', field: 'families.famName' },
    { title: 'Monto', field: 'families.famName' },
  ];

  return (
    <>
      <NavLink to='/registrarpago' ></NavLink>
    {/* <MaterialTable title={'Lista de Pagos'}
     data={dataSource} 
     columns={columns}
     actions={[
      { icon: () => <FilterList />,
        tooltip: "Activar Filtros",
        onClick : ()=> setFiltering(!filtering),
        isFreeAction: true },
      {
          icon: () => <NavLink to='/registrarpago' ><AddBoxRoundedIcon /></NavLink>,
          tooltip: 'Registrar nuevo pago',
          isFreeAction: true,
          onClick: (event, rowData) => {
          }
      }
      ,{
        icon: () => <VisibilityRoundedIcon />,
        tooltip: 'Ver Detalles de pago',
        onClick: (event, rowData) => {
          window.location = `detallepago/${rowData.famId}`;
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
      : null} */}
    </>
    

  )
}

export default PaymentsList