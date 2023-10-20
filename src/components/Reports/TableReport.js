import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';

const DownloadExcel = require('../commonComponents/DownloadExcel').default 

const TableReport = ({ nombreArchivo, periodSelected, reportTypeSelected, columns, dataReporte, excelStructure, mes, clasifiReportSelectd }) => {
  console.log('dataReporte', dataReporte)
  console.log('nombreArchivo', nombreArchivo)

  const nameTable = nombreArchivo.replaceAll('_', ' ')

  React.useEffect(() => {
}, [0]);

  return (
    <>
      <MaterialTable 
      title={nameTable}
    
    data={dataReporte} 
    columns={columns}
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
       exportMenu: [{
         label: 'Exportar PDF',
         exportFunc: (cols, datas) => ExportPdf(cols, datas, nameTable)
      }, 
       {
         label: 'Exportar EXCEL',
         exportFunc: (cols, datas) => DownloadExcel(cols, datas,excelStructure)
       }
     ],
        actionsColumnIndex:-1,
        addRowPosition:'first'
    }}
   />
        
    </>
  )
}

export default TableReport
