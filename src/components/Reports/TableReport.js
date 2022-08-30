import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
const DownloadExcel = require('../commonComponents/DownloadExcel').default 

const TableReport = ({columns,dataReporte,excelStructure}) => {
  return (
    <>
      <MaterialTable title={'Estudiantes'}
    
    data={dataReporte} 
    columns={columns}
//     actions={[
//      { icon: () => <FilterList />,
//        tooltip: "Activar Filtros",
//        onClick : ()=> setFiltering(!filtering),
//        isFreeAction: true },

//        {
//          icon: () => <EditRoundedIcon />,
//          tooltip: 'Editar Estudiante',
//          onClick: (event, rowData) => {
//            setTitleModalHeader('Editar Estudiante')
//            setSelectedStudent(rowData)
//            setEditStudent(true)
//            setOpenModal(true)
//          }
//        },{
//          icon: () => <VisibilityRoundedIcon />,
//          tooltip: 'Ver Detalles',
//          onClick: (event, rowData) => {
//            console.log(rowData)
//            setTitleModalHeader('Detalles del Estudiante ' + rowData.stuFirstName + ' ' + rowData.stuSurname)
//            setSelectedStudent(rowData)
//            setSeeStudentDetails(true)
//            setOpenModal(true)
//          }
//        },
//        {
//            icon: () => <PersonAddAltRoundedIcon />,
//            tooltip: 'Agregar Estudiante',
//            isFreeAction: true,
//            onClick: (event, rowData) => {
//                setTitleModalHeader('Nuevo Estudiante')
//                setSelectedStudent(rowData)
//                setOpenModal(true)
//              }
//        },
       
//    ]}
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
         exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Reporte de Estudiantes')
       }, 
       {
         label: 'Export EXCEL',
         exportFunc: (cols, datas) => DownloadExcel(cols, datas,excelStructure)
       }
     ],
        // filtering:filtering,
        actionsColumnIndex:-1,
        addRowPosition:'first'
    }}

   />
    </>
  )
}

export default TableReport
