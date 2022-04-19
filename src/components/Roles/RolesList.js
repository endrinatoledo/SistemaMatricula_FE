import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Layout/Title';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import RolModal from './RolModal';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default
const Pagination = require('../commonComponents/Pagination').default
const AddButton = require('../commonComponents/AddButton').default

const useStyles = makeStyles({
  moduleHeader:{
    marginBottom:20,
    marginTop:10
  }
});



export default function RolesList() {
  const [dataSource, setDataSource] = React.useState([])
  const [Reload, SetReload] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rolObject, setRolObject] = React.useState({idRol:'',name:'',status: 0, modalRolDelete:false, editRol:false, newRol:false});
  const [message, setMessage] = React.useState('');
  const defaultMessages = {update:'Rol Actualizado',success : 'Rol Guardado', connectionError: 'Error de Conexión', removeRol:'¿Desea eliminar Rol ',rolDelete:'El rol ha sido Eliminado' }
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false);

  const name = 'Rol'
  const classes = useStyles();
  const fillTable = async () => {
    try{
      const resultRoles = (await AxiosInstance.get("/roles/")).data
      if(resultRoles.ok === true){
        setDataSource(resultRoles.data)
      }
    }catch{
      console.log('no rol')
      // setConnErr(true)
  }
}
React.useEffect(() => {  
  fillTable()
  }, [Reload]);

  return (
    <React.Fragment>
      <Stack direction="row"  justifyContent="space-between" className={classes.moduleHeader}>
        <Title>Listado de Roles</Title>
        <AddButton name={name} setOpenModal={setOpenModal} />
      </Stack>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            
            <TableRow key={item.rolId}>
              <TableCell>{item.rolName}</TableCell>
              <TableCell> <StatusInTable status={item.rolStatus}/> </TableCell>
              <TableCell >ACCIONES</TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
      <Pagination  dataSource={dataSource} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      {(openModal)? 
      <RolModal message={message} setAlertModal={setAlertModal} setAlertType={setAlertType} fillTable={fillTable}defaultMessages={defaultMessages} setMessage={setMessage} rolObject={rolObject} openModal={openModal} setOpenModal={setOpenModal} setRolObject={setRolObject}name={name} />
      : null }
      {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
    </React.Fragment>
  );
}