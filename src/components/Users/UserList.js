import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Stack from '@mui/material/Stack';
import Title from '../Layout/Title';
import { makeStyles } from '@mui/styles';
import UserModal from './UserModal';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import DeleteUser from './DeleteUser';
import UserOptions from './UserOptions';
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default
const Pagination = require('../commonComponents/Pagination').default
const AddButton = require('../commonComponents/AddButton').default



// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles({
  moduleHeader:{
    marginBottom:20,
    marginTop:10
  }
});

export default function UserList() {
  const [dataSource, setDataSource] = React.useState([])
  const [Reload, SetReload] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [alertModal, setAlertModal] = React.useState(false);
  const [alertType, setAlertType] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [userObject, setUserObject] = React.useState({idUser:'',name:'', lastName:'',email:'', password:'',status: 0, rol: '', rolName:'',modalUserDelete:false, editUser:false, newUser:false,seePassword:false});



  const name = 'Usuario'
  const defaultMessages = {update:'Usuario Actualizado',success : 'Usuario Guardado', connectionError: 'Error de Conexión', mailError: 'Formato de correo erróneo', removeUser:'¿Desea eliminar usuario ',userDelete:'El usuario ha sido Eliminado' }
  const classes = useStyles();

  const fillTable = async () => {
    try{
      const resultUsers = (await AxiosInstance.get("/users/")).data
      if(resultUsers.ok === true){
        setDataSource(resultUsers.data)
      }


    }catch{
      setMessage(defaultMessages.connectionError)
      setAlertType('error')
      setAlertModal(true)
      setTimeout(() => {
        setAlertModal(false);
    }, 3000)
  }
}
React.useEffect(() => {  
  fillTable()
  }, [Reload]);

  return (
    <React.Fragment>
      <Stack direction="row"  justifyContent="space-between" className={classes.moduleHeader}>
        <Title>Listado de Usuarios</Title>
        <AddButton name={name} setOpenModal={setOpenModal} />
      </Stack>
      <TableContainer >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Apellido</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Rol</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
            <TableRow key={item.usuId}>
              <TableCell>{item.usuName}</TableCell>
              <TableCell>{item.usuLastName}</TableCell>
              <TableCell>{item.usuEmail}</TableCell>
              <TableCell >{item.roles.rolName}</TableCell>
              <TableCell> <StatusInTable status={item.usuStatus}/> </TableCell>
              <TableCell > <UserOptions userObject={userObject} setUserObject={setUserObject} value={item} setOpenModal={setOpenModal} /> </TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Pagination  dataSource={dataSource} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      {(openModal) ? 
      <UserModal 
        userObject={userObject} setUserObject={setUserObject}
        defaultMessages={defaultMessages} 
        message={message} setMessage={setMessage}
        setAlertType={setAlertType} name={name} 
        openModal={openModal} setOpenModal={setOpenModal} 
        fillTable={fillTable} setAlertModal={setAlertModal} 
      /> : null}
      {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
      {(userObject.modalUserDelete)?
        <DeleteUser 
        fillTable={fillTable} setMessage={setMessage} setAlertType={setAlertType}
        userObject={userObject} setUserObject={setUserObject} defaultMessages={defaultMessages} setAlertModal={setAlertModal} />
        : null}
      </React.Fragment>
  );
}