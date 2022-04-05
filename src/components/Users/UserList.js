import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Layout/Title';
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default
const Pagination = require('../commonComponents/Pagination').default

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function UserList() {
  const [dataSource, setDataSource] = React.useState([])
  const [Reload, SetReload] = React.useState(0);

  const fillTable = async () => {
    try{
      const resultUsers = (await AxiosInstance.get("/users/")).data
      if(resultUsers.ok === true){
        setDataSource(resultUsers.data)
      }
      console.log('si',resultUsers)
      // if( resultUsers){ setDataSource(resultReports) }else{ setConnErr(true) }

    }catch{
      console.log('no')
      // setConnErr(true)
  }
}
React.useEffect(() => {  
  fillTable()
  }, [Reload]);

  return (
    <React.Fragment>
      <Title>Listado de Usuarios</Title>
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
          {dataSource.map((item) => (
            <TableRow key={item.usuId}>
              <TableCell>{item.usuName}</TableCell>
              <TableCell>{item.usuLastName}</TableCell>
              <TableCell>{item.usuEmail}</TableCell>
              <TableCell >{item.roles.rolName}</TableCell>
              <TableCell> <StatusInTable status={item.usuStatus}/> </TableCell>
              <TableCell >ACCIONES</TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
      <Pagination  dataSource={dataSource}/>
    </React.Fragment>
  );
}