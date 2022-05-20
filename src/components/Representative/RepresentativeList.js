import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
const {StatusTag, standardMessages} = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;
const StatusInTable = require('../commonComponents/StatusInTable').default
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

    const [representativeObject, setRepresentativeObject] = React.useState({
        repFirstName           : null, 
        repSecondName          : null,
        repSurname             : null ,
        repSecondSurname       : null,
        repIdType              : 'v',
        repIdentificationNumber: null,
        repDateOfBirth         : '',
        repSex                 : null,
        repAddress             : null,
        repCivilStatus         : null,
        proId                  : null,
        repPhones              : null,
        repEmail               : null,
        couId                  : null,
        fedId                  : null,
        repPhoto               : null,
        repStatus              : 1,
        repBond                : null,
        famId                  : null,
      });
  const columns = [
    { title: 'Nombre', field: 'repFirstName',filtering:true},
    { title: 'Apellido', field: 'repSurname',filtering:true },
    { title: 'Tipo Id', field: 'repIdType',filtering:true,cellStyle:{paddingLeft:'4%'}},
    { title: 'Identificación', field: 'repIdentificationNumber',filtering:true},
    { title: 'Vínculo', field: 'repBond',filtering:true},
    
  ];

  console.log('******',representativeObject)

  const cleanRepresentativeObject = () =>{
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
    defaultValue.current.value = "";
    setRepresentativeObject({
        repFirstName           : '', 
        repSecondName          : '',
        repSurname             : '' ,
        repSecondSurname       : '',
        repIdType              : 'v',
        repIdentificationNumber: '',
        repDateOfBirth         : null,
        repSex                 : '',
        repAddress             : '',
        repCivilStatus         : '',
        proId                  : '',
        repPhones              : '',
        repEmail               : '',
        couId                  : '',
        fedId                  : '',
        repPhoto               : '',
        repStatus              : 1,
        repBond                : '',
        famId                  : '',
      })
  }

  const fillTable = async () => {

    try{
      const resultRepresentatives = (await AxiosInstance.get("/representatives/")).data
      if(resultRepresentatives.ok === true){
          console.log(resultRepresentatives.data)
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
      <ModalRepresentative 
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