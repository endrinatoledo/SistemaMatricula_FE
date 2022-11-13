import * as React from 'react';
import Box from '@mui/material/Box';
import SearchRepresentative from './SearchRepresentative'
import PaymentMethodTable from './PaymentMethodTable'
import TabsPayments from './TabsPayments'
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import ModalFamily from './ModalFamily';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import TablaMensualidades from './TablaMensualidades';
const { standardMessages } = require('../commonComponents/MessagesAndLabels')
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

    const [representativeData, setRepresentativeData] = React.useState([])
    const [identification, setIdentification] = React.useState({ repIdType: null, repIdentificationNumber: '' })
    const [representativeFound, setRepresentativeFound] = React.useState(false)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [families, setFamilies] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedFamily, setSelectedFamily] = React.useState(null)
    const [exchangeRate, setExchangeRate] = React.useState(null)
    const [mensualidades, setMensualidades] = React.useState([])
    const [dataDetalle, setDataDetalle] = React.useState([])
    const [listadoPeriodo, setListadoPeriodo] = React.useState([])
    const [periodoSeleccionado, setPeriodoSeleccionado] = React.useState(null)
    
    const classes = UseStyles();

    console.log('este es el periodoSeleccionadooooooooooooooooooooooooooooooooooooooo', periodoSeleccionado)

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

    const getPeriodos = async () => {

        try {
            const resultPeriods = (await AxiosInstance.get("/periods")).data

            console.log('todos los periodos', resultPeriods)

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

          console.log('----------------dataDetalle---------------',dataDetalle)
        
        try {
            const response = (await AxiosInstance.get(`/pagoMensualidades/familia/${selectedFamily.famId}`)).data
            if (response.ok === true && response.data.length > 0) {
                setMensualidades(response.data)
                setDataDetalle(response.dataDetalle)
            }else{
                setAlertType("error")
                setMessage('Sin mensualidades para mostrar')
                setAlertModal(true)
            }
        } catch (error) {
            setMessage('Error al consultar mensualidades por familia')
            setAlertType("error")
            setAlertModal(true)
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
        latestExchangeRate()
        getPeriodos()
    }, [0])

    

    return (
        <>
            <Box>
                <SearchRepresentative setPeriodoSeleccionado={setPeriodoSeleccionado} setSelectedFamily={setSelectedFamily} representativeFound={representativeFound}
                    setRepresentativeFound={setRepresentativeFound} identification={identification}
                    setIdentification={setIdentification} representativeData={representativeData}
                    setRepresentativeData={setRepresentativeData} setMensualidades={setMensualidades}/>

            </Box>
            {(alertModal) ?
                <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                : null}
            {(openModal) ?
                <ModalFamily periodoSeleccionado={periodoSeleccionado} setPeriodoSeleccionado={setPeriodoSeleccionado} listadoPeriodo={listadoPeriodo} selectedFamily={selectedFamily} setSelectedFamily={setSelectedFamily} openModal={openModal} setOpenModal={setOpenModal} families={families}> </ModalFamily>
                : null} 
            {
                (mensualidades.length > 0 && exchangeRate !== null && periodoSeleccionado !== null) 
                ? <>
                        <TablaMensualidades selectedFamily={selectedFamily} getMensualidadesFamily={getMensualidadesFamily} families={families} mensualidades={ mensualidades } dataDetalle={dataDetalle}/>
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