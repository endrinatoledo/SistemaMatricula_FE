import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
const AxiosInstance = require("../utils/request").default;
const DownloadExcel = require('../commonComponents/DownloadExcel').default 
const ModalRepresentative = require('./ModalRepresentative').default 

const RepresentativeList = () => {
  
    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [selectedRepresentative, setSelectedRepresentative] = React.useState()
    const [openModal, setOpenModal] = React.useState(false)
    const [titleModalHeader, setTitleModalHeader] = React.useState('')

    const excelStructure ={
      fileName : 'ReporteDeRepresentantes.xlsx',
      columns:[["Códigos", "Representantes", "Estatus"]],
      sheetName: "Representantes"
    }
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const defaultValue = React.useRef(null)
    const [clearField, setClearField] = React.useState({sex:0,civil:100,profession:200,country:300,federalEntity:400,bond:500,family:600,status:700})
    const [valueForm, setValueForm] = React.useState({})
    const [statusCcircularProgress  , setStatusCcircularProgress] = React.useState(false)
    const [identificationValidation  , setIdentificationValidation] = React.useState(false)
    const [representativeObject, setRepresentativeObject] = React.useState({
        repFirstName           : '', 
        repSecondName          : '',
        repSurname             : '' ,
        repSecondSurname       : '',
        repIdType              : 'v',
        repIdentificationNumber: '',
        repDateOfBirth         : '',
        repSex                 : '',
        repAddress             : '',
        repCivilStatus         : '',
        proId                  : '',
        repPhones              : '',
        repEmail               : '',
        couId                  : '',
        fedId                  : '',
        repPhoto               : '',
        repStatus              : '',
        repBond                : '',
        famId                  : '',
      });
  const columns = [
    { title: 'Primer Nombre', field: 'repFirstName',filtering:true},
    { title: 'Segundo Nombre', field: 'repSecondName',filtering:true},
    { title: 'Primer Apellido', field: 'repSurname',filtering:true },
    { title: 'Segundo Apellido', field: 'repSecondSurname',filtering:true },
    { title: 'Tipo', field: 'repIdType',filtering:true, cellStyle:{paddingLeft:'2%'}},
    { title: 'Identificación', field: 'repIdentificationNumber',filtering:true},
    { title: 'Vínculo', field: 'repBond',filtering:true, cellStyle:{paddingLeft:'1%'}},
    { title: 'Sexo', field: 'repSex',headerStyle:{paddingLeft:'1%'},lookup: {'f': 'Femenino', 'm':'Masculino'},filtering:true},
    { title: 'Fecha', field: 'repDateOfBirth',type:'date', filtering:true},
    { title: 'Correo', field: 'repEmail',filtering:true,headerStyle:{paddingLeft:'3%'}},
    { title: 'Estatus', field: 'repStatus',filtering:true, lookup: {1: 'Activo', 2:'Inactivo'}},
    
  ];

    console.log('***representativeObject***',representativeObject)

  const cleanRepresentativeObject = () =>{
    setIdentificationValidation(false)
    setStatusCcircularProgress(false)
    setClearField(
      { sex:(clearField.sex + 1),
        civil:(clearField.civil + 1),
        profession:(clearField.profession + 1),
        country:(clearField.country + 1),
        federalEntity:(clearField.federalEntity + 1),
        bond:(clearField.bond + 1),
        family:(clearField.family + 1),
        status:(clearField.status + 1)
      })
    
    setRepresentativeObject({
        repFirstName           : '', 
        repSecondName          : '',
        repSurname             : '' ,
        repSecondSurname       : '',
        repIdType              : 'v',
        repIdentificationNumber: '',
        repDateOfBirth         : '',
        repSex                 : '',
        repAddress             : '',
        repCivilStatus         : '',
        proId                  : '',
        repPhones              : '',
        repEmail               : '',
        couId                  : '',
        fedId                  : '',
        repPhoto               : '',
        repStatus              : '',
        repBond                : '',
        famId                  : '',
      })

      if (identificationValidation && openModal){defaultValue.current.value = ""}

  }

  const fillTable = async () => {

    try{
      const resultRepresentatives = (await AxiosInstance.get("/representatives/")).data
      if(resultRepresentatives.ok === true){
        setDataSource(resultRepresentatives.data)
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
    <MaterialTable title={'Representantes'}
    
     data={dataSource} 
     columns={columns}
     actions={[
      { icon: () => <FilterList />,
        tooltip: "Activar Filtros",
        onClick : ()=> setFiltering(!filtering),
        isFreeAction: true },
        {
          icon: () => <MiscellaneousServicesRoundedIcon />,
          tooltip: 'Configurar Periodo',
          onClick: (event, rowData) => {
            setTitleModalHeader('Editar Representante')
            setSelectedRepresentative(rowData)
            setOpenModal(true)
          }
        },
        {
            icon: () => <PersonAddAltRoundedIcon />,
            tooltip: 'Agregar Representante',
            isFreeAction: true,
            onClick: (event, rowData) => {
                setTitleModalHeader('Nuevo Representante')
                setSelectedRepresentative(rowData)
                setOpenModal(true)
              }
        }
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
          exportFunc: (cols, datas) => DownloadExcel(cols, datas,excelStructure)
        }
      ],
         filtering:filtering,
         actionsColumnIndex:-1,
         addRowPosition:'first'
     }}

    //      onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{
    //       AxiosInstance.delete(`/representatives/${selectRow.repId}`)
    //       .then(resp=>{
    //         setTimeout(() => {
    //           if(resp.data.ok === true){
    //             setAlertType("success")
    //           }else{
    //             setAlertType("error")
    //           }
    //           setMessage(resp.data.message)
    //           setAlertModal(true)
    //           fillTable()
    //           resolve()
    //         }, 2000);
            
    //       }).catch((err) => {
    //         setTimeout(() => {
    //           setMessage(standardMessages.connectionError)
    //           setAlertType("error")
    //           setAlertModal(true)
    //           fillTable()
    //           reject()
    //         }, 2000);
    //       });

    //     })

    />
    {(alertModal) ? 
      <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType}/> 
      : null}
    {(openModal) ?
      <ModalRepresentative  fillTable={fillTable}
        setAlertModal={setAlertModal} setMessage={setMessage} setAlertType={setAlertType}
        statusCcircularProgress={statusCcircularProgress}  setStatusCcircularProgress = {setStatusCcircularProgress}
        identificationValidation={identificationValidation} setIdentificationValidation={setIdentificationValidation}
        valueForm={valueForm} setValueForm={setValueForm}
        clearField={clearField} setClearField={setClearField}
        defaultValue={defaultValue}
        cleanRepresentativeObject={cleanRepresentativeObject}
        selectedRepresentative={selectedRepresentative} openModal={openModal} 
        setOpenModal={setOpenModal} titleModalHeader={titleModalHeader} 
        representativeObject={representativeObject} setRepresentativeObject={setRepresentativeObject}
      /> 
      : null}  
    </>

  )
}

export default RepresentativeList