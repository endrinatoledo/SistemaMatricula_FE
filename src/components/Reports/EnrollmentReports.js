import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Button from '@mui/material/Button';
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



const EnrollmentReports = () => {

    const classes = UseStyles();
    const [listPeriods, setListPeriods] = React.useState([])
    const [listLevels, setListLevels] = React.useState([])
    const [listSections, setListSections] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [alertType, setAlertType] = React.useState('');
    const [alertModal, setAlertModal] = React.useState(false)
    const [periodSelected, setPeriodSelected] = React.useState(null)
    const [levelSelected, setLevelSelected] = React.useState(null)
    const [reportTypeSelected, setReportTypeSelected] = React.useState(null)

    const reportType = [
        { id: 1, title: 'Listado de Alumnos por Gradro y Sección' },
        { id: 2, title: 'Estadística' }, // grado, cantidad total de alumnos, cantidad de niñas, cant de niños
        { id: 3, title: 'Nómina de Familias' }, //Codigo de familia, noombre padres con cedulas, nombres de alumnos cedulas grado cursante
    ]
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

    const getPeriodLevelSectionByPerId = async () => {

        try {
            const resultPeriodLevelSection = (await AxiosInstance.get(`/periodLevelSection/period/${periodSelected.perId}`)).data
            
            if (resultPeriodLevelSection.ok === true ) {
                if(resultPeriodLevelSection.data !== undefined){
                    console.log('resultPeriodLevelSection.data.levels',resultPeriodLevelSection.data.levels)
                    setListLevels(resultPeriodLevelSection.data.levels)
                }else{
                    setMessage('No hay grados ni secciones asociados a un periodo')
                    setAlertType('error')
                    setAlertModal(true)
                }
            } else {
                setMessage('Error al consultar grados y secciones asociados a un periodo')
                setAlertType('error')
                setAlertModal(true)
            }
        } catch {
            setMessage('Error al consultar grados y secciones asociados a un periodo')
            setAlertType('error')
            setAlertModal(true)
        }
    }

    React.useEffect(() => {
        getAllPeriod()
    }, [0]);
    React.useEffect(() => {
        if(periodSelected !== null){
            getPeriodLevelSectionByPerId()
        }
    }, [periodSelected]);

    return (
        <>

            <Box >
                <h4 id="child-modal-title">Reportes de Matrícula </h4>
                {(listPeriods)
                    ? <>
                        <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

                            <Autocomplete
                                options={listPeriods}
                                renderInput={(params) => (
                                    <TextField {...params} variant="standard" label="Periodo"
                                    //   helperText={(representativeObject.repStatus === null ||representativeObject.repStatus === '')? requiredField : '' }
                                    //   error={orfStatus} 
                                    />
                                )}
                                value={periodSelected}
                                getOptionLabel={(option) => `${option.perStartYear} - ${option.perEndYear}`}
                                onChange={(event, newValue) => {
                                    setPeriodSelected(newValue)
                                }}
                                required
                                // key={clearField.status}
                                noOptionsText={'Sin Opciones'}
                                sx={{ width: '20%' }}
                                id="clear-on-escape"
                            />
                            <Autocomplete
                                options={reportType}
                                renderInput={(params) => (
                                    <TextField {...params} variant="standard" label="Tipo de Reporte"
                                    //   helperText={(representativeObject.repStatus === null ||representativeObject.repStatus === '')? requiredField : '' }
                                    //   error={orfStatus} 
                                    />
                                )}
                                value={reportTypeSelected}
                                getOptionLabel={(option) => `${option.title}`}
                                onChange={(event, newValue) => {
                                    setReportTypeSelected(newValue)
                                    }}
                                required
                                // key={clearField.status}
                                noOptionsText={'Sin Opciones'}
                                sx={{ width: '40%' }}
                                id="clear-on-escape"
                            />
                            <Button variant="outlined" size="small"
                            // onClick={() => searchIdentification()}
                            >Buscar</Button>
                        </Stack>

                        {(reportTypeSelected?.id === 1) 
                        ?<>
                            <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
                            <Autocomplete
                                    options={listLevels}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="standard" label="Grados"
                                        //   helperText={(representativeObject.repStatus === null ||representativeObject.repStatus === '')? requiredField : '' }
                                        //   error={orfStatus} 
                                        />
                                    )}
                                     value={levelSelected}
                                     getOptionLabel={(option) => `${option.level.levName}`}
                                    onChange={(event, newValue) => {
                                        console.log('grado seleccionado',newValue)
                                        setLevelSelected(newValue)
                                        setListSections(newValue.sections)
                                    }}
                                    required
                                    // key={clearField.status}
                                    noOptionsText={'Sin Opciones'}
                                    sx={{ width: '20%' }}
                                    id="clear-on-escape"
                                />
                                <Autocomplete
                                    options={listSections}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="standard" label="Secciones"
                                        //   helperText={(representativeObject.repStatus === null ||representativeObject.repStatus === '')? requiredField : '' }
                                        //   error={orfStatus} 
                                        />
                                    )}
                                    // value={sectti }
                                    // getOptionLabel={(option) => `${option.perStartYear} - ${option.perEndYear}`}
                                    getOptionLabel={(option) => `${option.section.secName}`}
                                    onChange={(event, newValue) => {
                                        // console.log('periodo seleccionado',newValue)
                                        // setPeriodSelected(newValue.perId)
                                    }}
                                    required
                                    // key={clearField.status}
                                    noOptionsText={'Sin Opciones'}
                                    sx={{ width: '20%' }}
                                    id="clear-on-escape"
                                />
                            </Stack>
                        </>
                        : null
                        }
                    </>
                    : <h5 id="child-modal-title">Sin periodo registrado </h5>
                }


            </Box>
            {(alertModal) ?
                <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                : null}
        </>
    )
}

export default EnrollmentReports
