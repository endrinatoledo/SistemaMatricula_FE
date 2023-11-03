import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';

const DownloadExcel = require('../commonComponents/DownloadExcel').default 

const TableReport = ({ nombreArchivo, periodSelected, reportTypeSelected, columns, dataReporte, excelStructure, mes, clasifiReportSelectd }) => {

  const nameTable = nombreArchivo.replaceAll('_', ' ')
  const columnsTable = [
    { title: 'Nombre', field: 'nombre'},
    { title: 'Estatus', field: 'estatus' },

  ]
  React.useEffect(() => {
}, [0]);

  return (
    <>
      <MaterialTable 
      title={nameTable}
        data={dataReporte[0].arrayEstudiantesEstatusPago} 
        columns={columnsTable}
    options={{ 
      search: false,
      paging: false,
       width:300,
       actionsCellStyle:{paddingLeft:50,paddingRight:50},
       headerStyle: {
         backgroundColor: "#007bff",
         color: "#FFF",
         fontWeight:'normal',
         fontSize:18,
       },
        actionsColumnIndex:-1,
        addRowPosition:'first'
    }}
   />
        
    </>
  )
}

export default TableReport
