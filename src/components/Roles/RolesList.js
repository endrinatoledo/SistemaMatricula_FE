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

export default function RolesList() {
  const [dataSource, setDataSource] = React.useState([])
  const [Reload, SetReload] = React.useState(0);

  const fillTable = async () => {
    try{
      const resultRoles = (await AxiosInstance.get("/roles/")).data
      if(resultRoles.ok === true){
        console.log('entro aqui')
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
      <Title>Listado de Roles</Title>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((item) => (
            <TableRow key={item.rolId}>
              <TableCell>{item.rolName}</TableCell>
              <TableCell> <StatusInTable status={item.rolStatus}/> </TableCell>
              <TableCell >ACCIONES</TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
      <Pagination  dataSource={dataSource}/>
    </React.Fragment>
  );
}