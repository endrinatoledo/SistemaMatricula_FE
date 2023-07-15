import * as React from 'react';
import Box from '@mui/material/Box';
import Search from './Search'
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import ModalFamily from './ModalFamily';
import ModalStudents from './ModalStudents';
import { makeStyles } from '@mui/styles';
import TablaMensualidades from './TablaMensualidades';
const AxiosInstance = require("../utils/request").default;
const UseStyles = makeStyles({
    typography: {
      marginLeft: '3%'
    },
    box: {
      marginTop: '2%'
    },
    TextField: {
      marginBottom: '3%',
      marginTop: '2%',
      marginLeft: '3%'
    },
    TextField2: {
      marginBottom: '3%',
      marginTop: '2%',
      marginLeft: '1%'
    }
  });
const AddPayment = () => {
    const [busquedaSeleccionada, setBusquedaSeleccionada] = React.useState(null)
    const [representativeData, setRepresentativeData] = React.useState([])
    const [studentData, setStudentData] = React.useState([])
    const [identification, setIdentification] = React.useState({ repIdType: null, repIdentificationNumber: '' })
    const [representativeFound, setRepresentativeFound] = React.useState(false)
    const [studentFound, setStudentFound] = React.useState(false)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [families, setFamilies] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [openModalEstudents, setOpenModalEstudents] = React.useState(false)
    const [selectedFamily, setSelectedFamily] = React.useState(null)
    const [exchangeRate, setExchangeRate] = React.useState(null)
    const [mensualidades, setMensualidades] = React.useState([])
    const [dataDetalle, setDataDetalle] = React.useState([])
    const [listadoPeriodo, setListadoPeriodo] = React.useState([])
    const [periodoSeleccionado, setPeriodoSeleccionado] = React.useState(null)
    const [filtroEstudiante, setFiltroEstudiante] = React.useState({ tIdentif: null, identif: '', pNombre: '', pApellido: '', sApellido: '' })
    const [estudianteSeleccionado, setEstudianteSeleccionado] = React.useState(null)
    const [estudianteFamilia, setEstudianteFamilia] = React.useState([])

    
    const classes = UseStyles();

    const mapEstudiantesFamilia = () => {

        const estudiantes = mensualidades.map((item) => {
            return {
                stuId: item.stuId,
                student: item.student,
            }
        })

        setEstudianteFamilia(estudiantes)
    }

    const getFamilyByRepId = async () => {
        try {
            const resultFamiles = (await AxiosInstance.get(`/representativeStudent/family/representativeId/${representativeData.repId}`)).data
                        
            if (resultFamiles.ok === true) {

                setFamilies(resultFamiles.data)
                setOpenModal(true)
            } else {
                setMessage(resultFamiles.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch {
            setMessage('Error**')
            setAlertType("error")
            setAlertModal(true)
        }
    }
    const getFamilyByStudentId = async () => {
        try {
            const resultFamiles = (await AxiosInstance.get(`/representativeStudent/family/studentId/${estudianteSeleccionado.idStuden}`)).data

            if (resultFamiles.ok === true) {
                setFamilies(resultFamiles.data)
                // setOpenModal(true)
                setOpenModalEstudents(false)
                getMensualidadesFamily(estudianteSeleccionado)
            } else {
                setMessage(resultFamiles.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch {
            setMessage('Error**')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    const getPeriodos = async () => {

        try {
            const resultPeriods = (await AxiosInstance.get("/periods")).data
            if (resultPeriods.ok === true) {
                setListadoPeriodo(resultPeriods.data)
            }
        } catch {
            setMessage('Error de Conexion')
            setAlertModal(true)
        }
    }

    const getStudentPaymentSchemaFamId = async () => {
        try {
            const stuPaySchRes = (await AxiosInstance.get(`/studentPaymentScheme/inscription/family/${selectedFamily.famId}`)).data
            
            if (stuPaySchRes.ok === true) {
                setFamilies(stuPaySchRes.data)
                setOpenModal(true)
            } else {
                setMessage(stuPaySchRes.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch {
            setMessage('Error**')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    const latestExchangeRate = async () => {
        try {
          const response = (await AxiosInstance.get("/exchangeRate/lastest/exchangeRates")).data
          if (response.ok === true && response.data !== null) {
            setExchangeRate(response.data)
          }else{
                setAlertType("error")
                setMessage('Sin tasa del día, por favor agregue una para continuar')
                setAlertModal(true)
          }
        } catch {
                setAlertType("error")
                setMessage('Error de Conexion al consultar tasa del día')
                setAlertModal(true)
        }
      }

      const getMensualidadesFamily = async(selectedFamily) =>{

          if (selectedFamily != null){
              try {
                  const response = (await AxiosInstance.get(`/pagoMensualidades/familia/${selectedFamily.famId}/periodo/${periodoSeleccionado.perId}`)).data
                  
                  console.log('mensualidadesssss', response.data)
                  console.log('studentDataaaaaaa',studentData)
                  
                  if (response.ok === true && response.data.length > 0) {
                      setMensualidades(response.data)
                      setDataDetalle(response.dataDetalle)
                  } else {
                      setAlertType("error")
                      setMessage('Sin mensualidades para mostrar')
                      setAlertModal(true)
                      setMensualidades([])
                      setDataDetalle([])
                  }
              } catch (error) {
                  setMessage('Error al consultar mensualidades por familia')
                  setAlertType("error")
                  setAlertModal(true)
              }
          }
        
      }

      React.useEffect(() => {
        if (selectedFamily !== null) {
            getMensualidadesFamily(selectedFamily)
        }
    }, [selectedFamily])  

    React.useEffect(() => {
        if (representativeData.repId !== undefined) {
            getFamilyByRepId()
        }
    }, [representativeData])
    React.useEffect(() => {
        if (studentData.length === 1) {
            getMensualidadesFamily(studentData[0])
            setEstudianteSeleccionado(studentData[0])
        } else if (studentData.length > 1) {
            setOpenModalEstudents(true)
        }
    }, [studentData])

    
    React.useEffect(() => {
        latestExchangeRate()
        getPeriodos()
    }, [0])
    console.log('entro a estudianteSeleccionado', estudianteSeleccionado)

    React.useEffect(() => {
        if (estudianteSeleccionado != null){
            getFamilyByStudentId()
        }
        
    }, [estudianteSeleccionado])    

    React.useEffect(() => {
        if (mensualidades.length) {
            mapEstudiantesFamilia()
        }
    }, [mensualidades]) 

    return (
        <>
            <Box>
                <Search busquedaSeleccionada={busquedaSeleccionada} setBusquedaSeleccionada={setBusquedaSeleccionada} studentData={studentData} setStudentData={setStudentData} filtroEstudiante={filtroEstudiante} studentFound={studentFound} setStudentFound={setStudentFound} setFiltroEstudiante={setFiltroEstudiante} setPeriodoSeleccionado={setPeriodoSeleccionado} setSelectedFamily={setSelectedFamily} representativeFound={representativeFound}
                    setRepresentativeFound={setRepresentativeFound} identification={identification}
                    setIdentification={setIdentification} representativeData={representativeData}
                    setRepresentativeData={setRepresentativeData} setMensualidades={setMensualidades} />

                {/* <SearchRepresentative setPeriodoSeleccionado={setPeriodoSeleccionado} setSelectedFamily={setSelectedFamily} representativeFound={representativeFound}
                    setRepresentativeFound={setRepresentativeFound} identification={identification}
                    setIdentification={setIdentification} representativeData={representativeData}
                    setRepresentativeData={setRepresentativeData} setMensualidades={setMensualidades}/> */}

            </Box>
            {(alertModal) ?
                <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                : null} 
            {(openModal) ?
                <ModalFamily periodoSeleccionado={periodoSeleccionado} setPeriodoSeleccionado={setPeriodoSeleccionado} listadoPeriodo={listadoPeriodo} selectedFamily={selectedFamily} setSelectedFamily={setSelectedFamily} openModal={openModal} setOpenModal={setOpenModal} families={families}> </ModalFamily>
                : null
                }
            {(openModalEstudents)
                ? <ModalStudents periodoSeleccionado={periodoSeleccionado} listadoPeriodo={listadoPeriodo} setPeriodoSeleccionado={setPeriodoSeleccionado} setEstudianteSeleccionado={setEstudianteSeleccionado} studentData={studentData} openModalEstudents={openModalEstudents} setOpenModalEstudents={setOpenModalEstudents}></ModalStudents>
            : null
            } 
            {
                (mensualidades.length > 0 && exchangeRate !== null && periodoSeleccionado !== null) 
                ? <>
                        <TablaMensualidades estudianteFamilia={estudianteFamilia} periodoSeleccionado={periodoSeleccionado} selectedFamily={selectedFamily} getMensualidadesFamily={getMensualidadesFamily} families={families} mensualidades={ mensualidades } dataDetalle={dataDetalle}/>
                  </>
                : null
            }
            {/* {(selectedFamily !== null && exchangeRate !== null) ?
                <>
                <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h7" component="div">
                    <div>Nombre: {`${representativeData.repFirstName} ${representativeData.repSurname}`}</div>
                    <div>Familia: {`${selectedFamily.families.famName}`}</div>
                    <div>Tasa US$: {`${exchangeRate.excDate} / Bs.${Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(exchangeRate.excAmount)}`}</div>
                </Typography>

                    <PaymentMethodTable exchangeRate={exchangeRate}/>
                    <TabsPayments representativeData={representativeData}/>
                </>
                : null} */}
        </>
    )
}

export default AddPayment