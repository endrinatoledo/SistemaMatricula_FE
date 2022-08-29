import React from 'react'
import {NavLink} from 'react-router-dom'
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import FilterList from '@material-ui/icons/FilterList';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
const AxiosInstance = require("../utils/request").default;
const InscriptionList = () => {

    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [Reload, SetReload] = React.useState(0);
    


    const columns = [
        { title: 'Identificaciónn', aling: 'center', field: 'identification',filtering:true},
        { title: 'Nombres', field: 'names',filtering:true},
        { title: 'Apellidos', field: 'lastNames',filtering:true},
        { title: 'Periodo', field: 'period',filtering:true},
        { title: 'Nivel', field: 'level',filtering:true },
        { title: 'Sección', field: 'secction',filtering:true }
      ];

      const fillTable = async () => {

        try{
          const resultInscripcion = (await AxiosInstance.get("/inscriptions/")).data
          console.log('resultInscripcion',resultInscripcion)
          if(resultInscripcion.data.length > 0){
            const data = resultInscripcion.data
            let result = []
            data.forEach( item => {
                result.push({
                    id : item.insId,
                    identification : `${(item.student.stuIdType)?item.student.stuIdType:''}-${(item.student.stuIdentificationNumber)?item.student.stuIdentificationNumber:''}`,
                    names : `${item.student.stuFirstName} ${item.student.stuSecondSurname}`,
                    lastNames : `${item.student.stuSurname} ${item.student.stuSecondSurname}`,
                    period : `${item.period.perStartYear}-${item.period.perEndYear}`,
                    level : `${item.periodLevelSectionI.level.levName}`,
                    secction : `${item.periodLevelSectionI.section.secName}`,
                })
                // console.log('este es mi item',item)
            })
            setDataSource(result)
          }
        }catch{
        //   setMessage('Error de Conexion')
        //   setAlertModal(true)          
      }
    }

    React.useEffect(() => {  
        fillTable()    
        }, [Reload]);
  return (
    <>
    <MaterialTable title={'Listadado de Estudiantes Inscritos'}
    
     data={dataSource} 
     columns={columns}
     actions={[
      { icon: () => <FilterList />,
        tooltip: "Activar Filtros",
        onClick : ()=> setFiltering(!filtering),
        isFreeAction: true },

        {
          icon: () => <EditRoundedIcon />,
          tooltip: 'Editar Inscripción',
          onClick: (event, rowData) => {
            window.location = `editarinscripcion/${rowData.id}`;
          }
        },{
          icon: () => <VisibilityRoundedIcon />,
          tooltip: 'Ver Detalles',
          onClick: (event, rowData) => {
            window.location = `verinscripcion/${rowData.id}`;
          }
        },{
          icon: () => <AssignmentRoundedIcon />,
          tooltip: 'Plan de pago',
          onClick: (event, rowData) => {
            window.location = `plandepago/${rowData.id}`;
          }
        },
        {
            icon: () => <NavLink to='/addinscription' ><AddBoxRoundedIcon /></NavLink>,
            tooltip: 'Nueva Inscripción',
            isFreeAction: true,
            onClick: (event, rowData) => {
              }
        },
        
    ]}
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
          exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Reporte de Representantes')
        }, 
        {
          label: 'Export EXCEL',
        //   exportFunc: (cols, datas) => DownloadExcel(cols, datas,excelStructure)
        }
      ],
        filtering:filtering,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}

    /> 
    </>
  )
}

export default InscriptionList