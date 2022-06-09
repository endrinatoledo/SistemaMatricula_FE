import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
const AxiosInstance = require("../utils/request").default;
const DownloadExcel = require('../commonComponents/DownloadExcel').default 
const ModalStudent = require('./ModalStudent').default 

const StudentsList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [selectedStudent, setSelectedStudent] = React.useState()
    const [openModal, setOpenModal] = React.useState(false)
    const [titleModalHeader, setTitleModalHeader] = React.useState('')
    const [editStudent  , setEditStudent] = React.useState(false)
    const [seeStudentDetails  , setSeeStudentDetails] = React.useState(false)
    const excelStructure ={
      fileName : 'ReporteDeEstudiantes.xlsx',
      columns:[["Códigos", "Estudiantes", "Estatus"]],
      sheetName: "Estudiantes"
    }
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const defaultValue = React.useRef(null)
    const [clearField, setClearField] = React.useState({sex:0,country:100,federalEntity:200,family:300,status:400})
    const [valueForm, setValueForm] = React.useState({})
    const [statusCcircularProgress  , setStatusCcircularProgress] = React.useState(false)
    const [identificationValidation  , setIdentificationValidation] = React.useState(false)
    const [studentObject, setStudentObject] = React.useState({
        stuFirstName           : '', 
        stuSecondName          : '',
        stuSurname             : '' ,
        stuSecondSurname       : '',
        stuIdType              : 'v',
        stuIdentificationNumber: '',
        stuDateOfBirth         : '',
        stuSex                 : null,
        countries              : null,
        couId                  : null,
        federalEntity          : null,
        fedId                  : null,
        stuPhoto               : '',
        stuStatus              : null,
        families               : null,
        famId                  : null,
      });
  const columns = [
    { title: 'Primer Nombre', field: 'stuFirstName',filtering:true},
    { title: 'Segundo Nombre', field: 'stuSecondName',filtering:true},
    { title: 'Primer Apellido', field: 'stuSurname',filtering:true },
    { title: 'Segundo Apellido', field: 'stuSecondSurname',filtering:true },
    { title: 'Tipo', field: 'stuIdType',filtering:true, cellStyle:{paddingLeft:'2%'}},
    { title: 'Identificación', field: 'stuIdentificationNumber',filtering:true},
    { title: 'Sexo', field: 'stuSex',headerStyle:{paddingLeft:'1%'},lookup: {'f': 'Femenino', 'm':'Masculino'},filtering:true},
    { title: 'Fecha', field: 'stuDateOfBirth',type:'date', filtering:true},
    { title: 'Estatus', field: 'stuStatus',filtering:true, lookup: {1: 'Activo', 2:'Inactivo'}},
    
  ];

  const cleanStudentObject = () =>{
    setIdentificationValidation(false)
    setStatusCcircularProgress(false)
    setClearField(
      { sex:(clearField.sex + 1),
        country:(clearField.country + 1),
        federalEntity:(clearField.federalEntity + 1),
        family:(clearField.family + 1),
        status:(clearField.status + 1)
      })
    
    setStudentObject({
        stuFirstName           : '', 
        stuSecondName          : '',
        stuSurname             : '' ,
        stuSecondSurname       : '',
        stuIdType              : 'v',
        stuIdentificationNumber: '',
        stuDateOfBirth         : '',
        stuSex                 : '',
        couId                  : '',
        fedId                  : '',
        stuPhoto               : '',
        stuStatus              : '',
        famId                  : '',
      })

      if (identificationValidation && openModal){defaultValue.current.value = ""}

  }

  const fillTable = async () => {

    try{
      const resultStudents = (await AxiosInstance.get("/students/")).data
      if(resultStudents.ok === true){
        setDataSource(resultStudents.data)
      }
    }catch{
      setMessage('Error de Conexion')
      setAlertModal(true)
      
  }
}

React.useEffect(() => {  
    fillTable()    
    }, [Reload]);

  return (
    <>
    <MaterialTable title={'Estudiantes'}
    
     data={dataSource} 
     columns={columns}
     actions={[
      { icon: () => <FilterList />,
        tooltip: "Activar Filtros",
        onClick : ()=> setFiltering(!filtering),
        isFreeAction: true },

        {
          icon: () => <EditRoundedIcon />,
          tooltip: 'Editar Estudiante',
          onClick: (event, rowData) => {
            setTitleModalHeader('Editar Estudiante')
            setSelectedStudent(rowData)
            setEditStudent(true)
            setOpenModal(true)
          }
        },{
          icon: () => <VisibilityRoundedIcon />,
          tooltip: 'Ver Detalles',
          onClick: (event, rowData) => {
            console.log(rowData)
            setTitleModalHeader('Detalles del Estudiante ' + rowData.stuFirstName + ' ' + rowData.stuSurname)
            setSelectedStudent(rowData)
            setSeeStudentDetails(true)
            setOpenModal(true)
          }
        },
        {
            icon: () => <PersonAddAltRoundedIcon />,
            tooltip: 'Agregar Estudiante',
            isFreeAction: true,
            onClick: (event, rowData) => {
                setTitleModalHeader('Nuevo Estudiante')
                setSelectedStudent(rowData)
                setOpenModal(true)
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
          exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Reporte de Estudiantes')
        }, 
        {
          label: 'Export EXCEL',
          exportFunc: (cols, datas) => DownloadExcel(cols, datas,excelStructure)
        }
      ],
         filtering:filtering,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}

    />
    {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
    {(openModal) ?
      <ModalStudent setSeeStudentDetails={setSeeStudentDetails} seeStudentDetails={seeStudentDetails}  fillTable={fillTable} setSelectedStudent={setSelectedStudent}
        editStudent={editStudent} setEditStudent={setEditStudent}
        setAlertModal={setAlertModal} setMessage={setMessage} setAlertType={setAlertType}
        statusCcircularProgress={statusCcircularProgress}  setStatusCcircularProgress = {setStatusCcircularProgress}
        identificationValidation={identificationValidation} setIdentificationValidation={setIdentificationValidation}
        valueForm={valueForm} setValueForm={setValueForm}
        clearField={clearField} setClearField={setClearField}
        defaultValue={defaultValue}
        cleanStudentObject={cleanStudentObject}
        selectedStudent={selectedStudent} openModal={openModal} 
        setOpenModal={setOpenModal} titleModalHeader={titleModalHeader} 
        studentObject={studentObject} setStudentObject={setStudentObject}
      /> 
      : null}  
    </>

  )
}

export default StudentsList