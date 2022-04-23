import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Layout/Title';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import PeriodModal from './PeriodModal';
import PeriodOptions from './PeriodOptions';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import DeletePeriod from './DeletePeriod';
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



export default function PeriodsList() {
  const [dataSource, setDataSource] = React.useState([])
  const [Reload, SetReload] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [periodObject, setPeriodObject] = React.useState({idPeriod:'',startYear:'',endYear:'',status: 0, modalPeriodDelete:false, editPeriod:false, newPeriod:false});
  const [message, setMessage] = React.useState('');
  const defaultMessages = {update:'Período Actualizado',success : 'Período Guardado', connectionError: 'Error de Conexión', removePeriod:'¿Desea eliminar Período ',periodDelete:'El Período ha sido Eliminado' }
  const [alertType, setAlertType] = React.useState('');
  const [alertModal, setAlertModal] = React.useState(false);

  const name = 'Período'
  const classes = useStyles();
  const fillTable = async () => {
    try{
      const resultPeriods = (await AxiosInstance.get("/periods/")).data
      if(resultPeriods.ok === true){
        setDataSource(resultPeriods.data)
      }
    }catch{
      console.log('no Period')
      // setConnErr(true)
  }
}
React.useEffect(() => {  
  fillTable()
  }, [Reload]);

  return (
    <React.Fragment>
      <Stack direction="row"  justifyContent="space-between" className={classes.moduleHeader}>
        <Title>Listado de Períodos</Title>
        <AddButton name={name} setOpenModal={setOpenModal} />
      </Stack>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="left">Año Inicio</TableCell>
            <TableCell align="left">Año Fin</TableCell>
            <TableCell align="left">Estatus</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item) => (
           
            <TableRow key={item.periodId}>
              <TableCell>{item.perStartYear}</TableCell>
              <TableCell>{item.perEndYear}</TableCell>
              <TableCell> <StatusInTable status={item.perStatus}/> </TableCell>
              <TableCell ><PeriodOptions periodObject={periodObject} setPeriodObject={setPeriodObject} value={item} setOpenModal={setOpenModal}/>  </TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
      <Pagination  dataSource={dataSource} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      {(openModal)? 
      <PeriodModal message={message} setAlertModal={setAlertModal} setAlertType={setAlertType} fillTable={fillTable}defaultMessages={defaultMessages} setMessage={setMessage} periodObject={periodObject} openModal={openModal} setOpenModal={setOpenModal} setPeriodObject={setPeriodObject}name={name} />
      : null }
      {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
      {(periodObject.modalPeriodDelete)?
        <DeletePeriod 
        fillTable={fillTable} setMessage={setMessage} setAlertType={setAlertType}
        periodObject={periodObject} setPeriodObject={setPeriodObject} defaultMessages={defaultMessages} setAlertModal={setAlertModal} />
        : null}
    </React.Fragment>
  );
}