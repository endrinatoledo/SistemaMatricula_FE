import React from 'react'
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import FilterList from '@material-ui/icons/FilterList';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
const AxiosInstance = require("../utils/request").default;
const InscriptionList = () => {

    const [dataSource, setDataSource] = React.useState([])
    // const [processedData, setProcessedData] = React.useState([])
    const [Reload, SetReload] = React.useState(0);
    


    const columns = [
        
        { title: 'Identificación', field: 'identification',filtering:true},
        { title: 'Nombres', field: 'names',filtering:true},
        { title: 'Apellidos', field: 'lastNames',filtering:true},
        { title: 'Periodo', field: 'period',filtering:true},
        { title: 'Nivel', field: 'level',filtering:true },
        { title: 'Sección', field: 'secction',filtering:true }
      ];

      const fillTable = async () => {

        try{
          const resultInscripcion = (await AxiosInstance.get("/inscriptions/")).data

          if(resultInscripcion.data.length > 0){
            const data = resultInscripcion.data
            let result = []
            data.forEach( item => {
                result.push({
                    id : item.insId,
                    identification : `${item.student.stuIdType}-${item.student.stuIdentificationNumber}`,
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
        // onClick : ()=> setFiltering(!filtering),
        isFreeAction: true },

        {
          icon: () => <EditRoundedIcon />,
          tooltip: 'Editar Representante',
          onClick: (event, rowData) => {
            // setTitleModalHeader('Editar Representante')
            // setSelectedRepresentative(rowData)
            // setEditRepresentative(true)
            // setOpenModal(true)
          }
        },{
          icon: () => <VisibilityRoundedIcon />,
          tooltip: 'Ver Detalles',
          onClick: (event, rowData) => {
            // setTitleModalHeader('Detalles del Representante ' + rowData.repFirstName + ' ' + rowData.repSurname)
            // setSelectedRepresentative(rowData)
            // setSeeRepresentativeDetails(true)
            // setOpenModal(true)
          }
        },
        {
            icon: () => <PersonAddAltRoundedIcon />,
            tooltip: 'Agregar Representante',
            isFreeAction: true,
            onClick: (event, rowData) => {
                // setTitleModalHeader('Nuevo Representante')
                // setSelectedRepresentative(rowData)
                // setOpenModal(true)
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
        //  filtering:filtering,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}

    /> 
    </>
  )
}

export default InscriptionList