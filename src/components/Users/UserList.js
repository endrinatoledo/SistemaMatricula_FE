import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Layout/Title';
const AxiosInstance = require("../utils/request").default;

function createData(usuId, usuName, usuLastName, usuEmail, usuStatus, rolId) {
  return { usuId, usuName, usuLastName, usuEmail, usuStatus, rolId };
}

function preventDefault(event) {
  event.preventDefault();
}

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
      <Title>UserList</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apelido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell align="right">Rol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((item) => (
            <TableRow key={item.usuId}>
              <TableCell>{item.usuName}</TableCell>
              <TableCell>{item.usuLastName}</TableCell>
              <TableCell>{item.usuEmail}</TableCell>
              <TableCell>{item.usuStatus}</TableCell>
              <TableCell align="right">{item.roles.rolName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more UserList
      </Link>
    </React.Fragment>
  );
}