import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';

const DownloadExcel = require('../commonComponents/DownloadExcel').default 

const TableReport = ({ periodSelected, reportTypeSelected, columns, dataReporte, excelStructure, mes, clasifiReportSelectd }) => {

  const [reportName, setReportName] = React.useState('')
  console.log('--------------dataReporte-----------------', dataReporte)

  const reportNameF = () => {
    if(reportTypeSelected.id === 1 ){
      setReportName('Reporte de Estudiantes')
      return `U.E. Colegio Lourdes, Reporte de Estudiantes - Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear}`
    }else if(reportTypeSelected.id === 2 ){
      setReportName('Reporte de Estadísticas')
      return `U.E. Colegio Lourdes, Reporte de Estadísticas - Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear}`
    }else if(reportTypeSelected.id === 3 ){
      // setReportName('Reporte de Nómina de Asistencia de Familia')
      // return `U.E. COLEGIO LOURDES \n
      // Dpto. de Administración\n
      // Nómina de Asistencia de Familias\n
      // Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear}\n
      // `
      setReportName('Reporte de Nómina de Asistencia de Familia')
      return `U.E. Colegio Lourdes, Nómina de Asistencia de Familias - Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear}`
    }else if(reportTypeSelected.id === 4 ){
      setReportName('Reporte de Seguro Escolar')
      return `U.E. Colegio Lourdes, Seguro Escolar - Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear}`

    }else if(reportTypeSelected.id === 10 ){
      setReportName('Reporte de resumen mensualidades')
      return `U.E. Colegio Lourdes, Reporte de resumen mensualidades - Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear}`

    } else if (reportTypeSelected.id === 13 && clasifiReportSelectd.id == 2) {
      setReportName('Reporte de morosos')
      return `U.E. Colegio Lourdes, Reporte de morosos por estudiantes - Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear} (${mes})`

    } else if (reportTypeSelected.id === 13 && clasifiReportSelectd.id == 1) {
      setReportName('Reporte de morosos')
      return `U.E. Colegio Lourdes, Reporte de morosos por familias - Año Escolar ${periodSelected.perStartYear}/${periodSelected.perEndYear} (${mes})`

    }
  }

  React.useEffect(() => {
}, [0]);

  return (
    <>
    <MaterialTable title={reportName}
    
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
         exportFunc: (cols, datas) => ExportPdf(cols, datas, reportNameF())
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
