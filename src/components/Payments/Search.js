import React from 'react'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import { NavLink } from 'react-router-dom'

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
    },
    typography:{
        marginLeft:'20px'
    }
});

const Search = ({ studentData, setStudentData, filtroEstudiante, studentFound, setStudentFound, setFiltroEstudiante, setPeriodoSeleccionado, setSelectedFamily, representativeFound, setRepresentativeFound, identification, setIdentification, representativeData, setRepresentativeData, setMensualidades }) => {
    const classes = UseStyles();
    const tipoBusqueda = [
        { id: 1, title: 'Por estudiante' },
        { id: 2, title: 'Por representante' }
    ]
    const [busquedaSeleccionada, setBusquedaSeleccionada] = React.useState(null)
    const [searchButton, setSearchButton] = React.useState(true)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');


    const IdentificationType = [
        {
            value: "v",
            label: "Venezolano"
        },
        {
            value: "e",
            label: "Extranjero"
        },
        {
            value: "p",
            label: "Pasaporte"
        }
    ]
    const labelType = (value) => {
        if (value !== null) {
            const result = IdentificationType.filter(item => {
                return value === item.value
            })
            if (result.length > 0) {
                return result[0]
            } else {
                return null
            }
        } else {
            return null
        }
    }
    const limpiarFiltros = async () => {
        setIdentification({ repIdType: null, repIdentificationNumber: '' })
        setMensualidades([])
        setRepresentativeFound(false)
        setStudentFound(false)
        setSelectedFamily(null)
        setPeriodoSeleccionado(null)
        setFiltroEstudiante({ tIdentif: null, identif: null, pNombre: '', sNombre: '', pApellido: '', sApellido: '' })
    }

    const searchIdentification = async () => {
        try {
            const data = (await AxiosInstance.post("/representatives/byIdentification", identification)).data
            if (data.data === 'registrado') {
                setRepresentativeFound(true)
                setRepresentativeData(data.result)
            }
        } catch {
            setAlertType("error")
            setMessage('Error al consultar el representante')
            setAlertModal(true)
        }
    }
    const searchStudent = async () => {
        try {
            if (filtroEstudiante.identif == '' && filtroEstudiante.pNombre == '' && filtroEstudiante.pApellido == '' && filtroEstudiante.sApellido == ''){
                setAlertType("error")
                setMessage('Debe agregar datos para consultar por estudiante')
                setAlertModal(true)
            }else{
                const response = (await AxiosInstance.post(`/pagoMensualidades/estudiante/datos`, filtroEstudiante)).data

                console.log('este response de estudiante'.response)
                if (response.data.length > 0){
                    setStudentData(response.data)
                }else{
                    setAlertType("error")
                    setMessage('No se encontraron resultados')
                    setAlertModal(true)
                }
                console.log('esto respondio busqueda por estudiante', response)

            }

            
            
        } catch {
            setAlertType("error")
            setMessage('Error al datos por estudiante')
            setAlertModal(true)
        }

    }

  return (
    <>
          <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

              <Autocomplete
                  options={tipoBusqueda}
                  renderInput={(params) => (
                      <TextField {...params} variant="standard" label="Tipo de Búsqueda" />
                  )}
                  value={busquedaSeleccionada}
                  getOptionLabel={(option) => option.title}
                  onChange={(event, newValue) => {
                      setBusquedaSeleccionada(newValue)
                  }}
                  required
                  noOptionsText={'Sin Opciones'}
                  sx={{ width: '40%' }}
                  id="clear-on-escape"
              />

          </Stack>
          {(busquedaSeleccionada?.id === 1)
              ? <>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" >
                      <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                          Estudiante
                      </Typography>
                      {/* <NavLink to='/pagos' ><Button variant="outlined" size="large" disabled={studentFound}>Cerrar</Button></NavLink> */}
                  </Stack>
                  <Divider variant="middle" />
                  <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
                      <Button variant="outlined" size="medium" disabled={studentFound} onClick={() => searchStudent()}>Buscar</Button>
                      <Button variant="outlined" size="medium" disabled={!studentFound} onClick={() => limpiarFiltros()}>Limpiar</Button>

                      <Autocomplete
                          disabled={studentFound}
                          options={IdentificationType}
                          renderInput={(params) => (
                              <TextField {...params} label="Tipo Idenfiticación" variant="standard" />
                          )}
                          value={labelType(filtroEstudiante.tIdentif)}
                          getOptionLabel={(option) => option.label}
                          onChange={(event, newValue) => {
                              setFiltroEstudiante({ ...filtroEstudiante, tIdentif: newValue.value ? newValue.value : null })
                          }}
                          noOptionsText={'Sin Opciones'}
                          sx={{ width: '20%' }}
                          id="clear-on-escapeE"
                      />
                      <TextField
                          required
                          sx={{ width: '20%' }}
                          value={filtroEstudiante.identif}
                          id="identif"
                          name='identif'
                          label="Identificación"
                          variant="standard"
                          onChange={e => {
                              setFiltroEstudiante({ ...filtroEstudiante, identif: e.target.value ? e.target.value : '' })
                          }
                          }
                      />
                  </Stack>
                  <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>

                      <TextField
                          disabled={studentFound}
                          sx={{ width: '25%' }}
                          required
                          value={filtroEstudiante.pNombre}
                          id="pNombre"
                          name="pNombre"
                          label="Primer Nombre"
                          variant="standard"
                            onChange={e => {
                                setFiltroEstudiante({ ...filtroEstudiante, pNombre: e.target.value ? e.target.value : '' })
                            }  }
                        />
                      <TextField
                          disabled={studentFound}
                          sx={{ width: '25%' }}
                          value={filtroEstudiante.pApellido}
                          id="pApellido"
                          name="pApellido"
                          label="Primer Apellido"
                          variant="standard"
                          onChange={e => {
                              setFiltroEstudiante({ ...filtroEstudiante, pApellido: e.target.value ? e.target.value : '' })
                          }
                          }
                      />
                      <TextField
                          disabled={studentFound}
                          sx={{ width: '25%' }}
                          value={filtroEstudiante.sApellido}
                          id="sApellido"
                          name="sApellido"
                          label="Segundo Apellido"
                          variant="standard"
                          onChange={e => {
                              setFiltroEstudiante({ ...filtroEstudiante, sApellido: e.target.value ? e.target.value : '' })
                          }
                          }
                      />
                  </Stack>
                  {(alertModal)
                      ? <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                      : null}
              </>
              : (busquedaSeleccionada?.id === 2)
                  ? <>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" >
                          <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                              Representante
                          </Typography>
                          {/* <NavLink to='/pagos' ><Button variant="outlined" size="large" disabled={representativeFound}>Cerrar</Button></NavLink> */}
                      </Stack>

                      <Divider variant="middle" />
                      <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
                          <Button variant="outlined" size="medium" disabled={representativeFound} onClick={() => searchIdentification()}>Buscar</Button>
                          <Button variant="outlined" size="medium" disabled={!representativeFound} onClick={() => limpiarFiltros()}>Limpiar</Button>

                          <Autocomplete
                              disabled={representativeFound}
                              options={IdentificationType}
                              renderInput={(params) => (
                                  <TextField {...params} label="Tipo Idenfiticación" variant="standard" />
                              )}
                              value={labelType(identification.repIdType)}
                              getOptionLabel={(option) => option.label}
                              onChange={(event, newValue) => {
                                  setIdentification({ ...identification, repIdType: newValue.value ? newValue.value : null })
                              }}
                              required
                              noOptionsText={'Sin Opciones'}
                              sx={{ width: '20%' }}
                              id="clear-on-escape"
                          />

                          <TextField
                              disabled={representativeFound}
                              sx={{ width: '20%' }}
                              required
                              value={identification.repIdentificationNumber}
                              id="repIdentificationNumber"
                              label="Identificación"
                              variant="standard"
                              onChange={e => {
                                  setIdentification({ ...identification, repIdentificationNumber: e.target.value ? e.target.value : '' })
                              }
                              }
                          />
                      </Stack>
                      {(alertModal)
                          ? <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                          : null}
                  </>
                : null
          }

    </>
  )
}

export default Search