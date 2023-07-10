import React from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import {NavLink} from 'react-router-dom'
import MaterialTable from '@material-table/core'; 
import { ExportPdf } from '@material-table/exporters';
import FilterList from '@material-ui/icons/FilterList';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Button from '@mui/material/Button';

const ModalAlertCancel = require('../AlertMessages/ModalAlertCancel').default 
const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
  stack: {
    marginTop: 40
  },
  TextField: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '3%'
  },
  box: {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '50%',
    background: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    paddingTop: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
    '& .MuiTextField-root': { m: 1, width: '25ch' }

  }
});

const InscriptionList = () => {
    const classes = UseStyles();
    const [periodSelected, setPeriodSelected] = React.useState(null)
    const [listPeriods, setListPeriods] = React.useState([])
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [Reload, SetReload] = React.useState(0);
    const [modalCancel  , setModalCancel] = React.useState(false)
    const [userResponse  , setUserResponse] = React.useState('')
    const [insData  , setInsData] = React.useState(null)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [searchButton, setSearchButton] = React.useState(true)


    const columns = [
        { title: 'Identificaciónn', aling: 'center', field: 'identification',filtering:true},
        { title: 'Nombres', field: 'names',filtering:true},
        { title: 'Apellidos', field: 'lastNames',filtering:true},
        { title: 'Periodo', field: 'period',filtering:true},
        { title: 'Nivel', field: 'level',filtering:true },
        { title: 'Sección', field: 'secction',filtering:true },
        { title: 'Estatus', field: 'status',aling: 'center',filtering:true }
      ];

  const getAllPeriod = async () => {

    try {
      const resultPeriods = (await AxiosInstance.get(`/periods/`)).data

      if (resultPeriods.ok === true && resultPeriods.data) {
        setListPeriods(resultPeriods.data)
            }
      else {
        setMessage('Error al consultar Periodos')
        setAlertType('error')
        setAlertModal(true)
      }
    } catch {
      setMessage('Error al consultar Periodos')
      setAlertType('error')
      setAlertModal(true)
    }
  }

      const fillTable = async () => {

        try{
          const resultInscripcion = (await AxiosInstance.post("/inscriptions/period", periodSelected)).data
          if(resultInscripcion.data.length > 0){
            const data = resultInscripcion.data
            let result = []

            data.forEach( item => {
                result.push({
                    id : item.insId,
                    identification : `${(item.student.stuIdType)?item.student.stuIdType:''}-${(item.student.stuIdentificationNumber)?item.student.stuIdentificationNumber:''}`,
                    names : `${item.student.stuFirstName} ${item.student.stuSecondName ? item.student.stuSecondName : ''}`,
                    lastNames : `${item.student.stuSurname} ${item.student.stuSecondSurname ? item.student.stuSecondSurname : ''}`,
                    period : `${item.period.perStartYear}-${item.period.perEndYear}`,
                    level : `${item.periodLevelSectionI.level.levName}`,
                    secction : `${item.periodLevelSectionI.section.secName}`,
                    status : `${(item.insStatus === 1) ? 'Activa' : 'Anulada'}`,
                    stuId : item.stuId,
                    perId : item.perId,
                })
            })
            setDataSource(result)
          }else{
            setDataSource([])
            setMessage('Este periodo aun no tiene alumnos inscritos')
            setAlertType('error')
            setAlertModal(true)
          }
        }catch{
          setAlertType('error')
          setMessage('Error al consultar inscripciones')
          setAlertModal(true)         
      }
    }

    const confirmarAnularInscripcion =() =>{
      setModalCancel(true)
    }

    const anularInscripcion = async () => {

      const data = {
        stuId : insData.stuId,
        perId : insData.perId,
        insId : insData.id,
        insStatus : insData.status
      }

      try{
        const resultInscription = (await AxiosInstance.put("/inscriptions/"+Number(insData.id),data)).data
        
        if(resultInscription.ok !== true){
          setModalCancel(false)
          setAlertType('error')
          setMessage('Error al anular la inscripción')
          setAlertModal(true)
        }else{
            setModalCancel(false)
            setAlertType('success')
            setMessage('Inscripción anulada satisfactoriamente')
            setAlertModal(true)
            fillTable()
        }
      }catch{
        setAlertType('error')
        setMessage('Error de Conexión al eliminar anular inscripción')
        setAlertModal(true)
    }
    }

    const handleClose = () => {
      if(userResponse === 'yes'){
        anularInscripcion()
      }else 
      if(userResponse === 'no'){
        setModalCancel(false)
      }
    };

  React.useEffect(() => {
    if (periodSelected !== null) {
      setSearchButton(false)
      fillTable()
    }else{
      setSearchButton(true)
    }
  }, [periodSelected]);

  React.useEffect(() => {
    getAllPeriod()
  }, [0]);

  React.useEffect(() => {
    if (listPeriods.length > 0) {
      setPeriodSelected(listPeriods[0])
    }
  }, [listPeriods]);

    React.useEffect(() => {  
      handleClose()
  }, [userResponse]);

    // React.useEffect(() => {  
    //     fillTable()    
    //     }, [Reload]);
  return (
    <>
      {(listPeriods)
      ?
      <>
          <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
            <Autocomplete
              disableClearable
              options={listPeriods}
              renderInput={(params) => (
                <TextField {...params} variant="standard" label="Periodo" />
              )}
              value={periodSelected}
              getOptionLabel={(option) => `${option.perStartYear} - ${option.perEndYear}`}
              onChange={(event, newValue) => {
                setPeriodSelected(newValue)
              }}
              required
              noOptionsText={'Sin Opciones'}
              sx={{ width: '20%' }}
              id="clear-on-escape"
            />

            {/* <Button variant="outlined" size="small"
              disabled={searchButton}
              onClick={() => fillTable()}
            >Buscar</Button> */}

            </Stack>

            {
            periodSelected 
            ?
            <>
                <MaterialTable title={'Listadado de Estudiantes Inscritos'}

                  data={dataSource}
                  columns={columns}
                  actions={[
                    {
                      icon: () => <FilterList />,
                      tooltip: "Activar Filtros",
                      onClick: () => setFiltering(!filtering),
                      isFreeAction: true
                    },

                    {
                      icon: () => <EditRoundedIcon />,
                      tooltip: 'Editar Inscripción',
                      onClick: (event, rowData) => {
                        window.location = `editarinscripcion/${rowData.id}`;
                      }
                    }, {
                      icon: () => <VisibilityRoundedIcon />,
                      tooltip: 'Ver Detalles',
                      onClick: (event, rowData) => {
                        window.location = `verinscripcion/${rowData.id}`;
                      }
                    }, {
                      icon: () => <AssignmentRoundedIcon />,
                      tooltip: 'Plan de pago',
                      onClick: (event, rowData) => {
                        window.location = `plandepago/${rowData.id}`;
                      }
                    },
                    , {
                      icon: () => <CancelIcon />,
                      tooltip: 'Anular Inscripción',
                      onClick: (event, rowData) => {
                        console.log('CancelIcon', rowData)
                        setInsData(rowData)
                        confirmarAnularInscripcion()
                      }
                    },
                    {

                      icon: () => <AddBoxRoundedIcon />,
                      tooltip: 'Nueva Inscripción',
                      isFreeAction: true,
                      onClick: (event, rowData) => {
                        window.location = `/addinscription/${periodSelected.perId}`;
                      }
                      // icon: () => <NavLink to={`/addinscription/${periodSelected.perId}`} ><AddBoxRoundedIcon /></NavLink>,
                      // tooltip: 'Nueva Inscripción',
                      // isFreeAction: true,
                      // onClick: (event, rowData) => {
                      // }
                    },

                  ]}
                  options={{
                    width: 300,
                    actionsCellStyle: { paddingLeft: 50, paddingRight: 50 },
                    headerStyle: {

                      backgroundColor: "#007bff",
                      color: "#FFF",
                      fontWeight: 'normal',
                      fontSize: 18,
                    },
                    exportMenu: [{
                      label: 'Export PDF',
                      exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Reporte de Inscripciones')
                    },
                    {
                      label: 'Export EXCEL',
                      // exportFunc: (cols, datas) => DownloadExcel(cols, datas,excelStructure)
                    }
                    ],
                    filtering: filtering,
                    actionsColumnIndex: -1,
                    addRowPosition: 'first'
                  }}

                />
                {(alertModal) ?
                  <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                  : null}

                {(modalCancel) ?
                  <ModalAlertCancel modalCancel={modalCancel} setModalCancel={setModalCancel} message={'¿ Desea anular inscripción ?'} setUserResponse={setUserResponse} />
                  : null}
            </>
            : null
            }
      </>
      : null}
    
    </>
  )
}

export default InscriptionList