import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButtons from '../commonComponents/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const ModalAlertCancel = require('../AlertMessages/ModalAlertCancel').default 

const AxiosInstance = require("../utils/request").default;

const style = {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const UseStyles = makeStyles({
    title: {
        marginBottom: 40
    },
    box:{
        marginTop:40,
        marginBottom:40,
    }
})

const ModalPayments = ({ pagoModal, setPagoModal, mensualidades,statusCcircularProgress }) => {
    const classes = UseStyles();
    const [tipoConcepto, setTipoConcepto] = React.useState(null)
    const [userResponse, setUserResponse] = React.useState('')
    const [modalCancel, setModalCancel] = React.useState(false)


    const handleClose = () => {

        if (userResponse === 'yes') {
            //   cleanStudentObject()
            setModalCancel(false)
            // setOpenModal(false);
            setPagoModal(false);
        } else
            if (userResponse === 'no') {
                setModalCancel(false)
            }

    };


    return (
        <>
            <Modal
                hideBackdrop open={pagoModal}
                onClose={handleClose}
                aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >
                <Box sx={{ ...style, width: '65%' }}>
                    <h4 className={classes.title}> Agregar Pago</h4>

                    <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="center">
                        <Autocomplete
                            options={['Mensualidad', 'Otro']}
                            renderInput={(params) => (
                                <TextField {...params}
                                    //   helperText={(studentObject.stuSex === null ||studentObject.stuSex === '')? requiredField : '' }
                                    //   error={orfStuSex} 
                                    label="Tipo de Concepto" variant="standard"
                                />
                            )}
                            // value={(editStudent) ? labelSex(selectedStudent.stuSex) : labelSex(studentObject.stuSex) }
                            getOptionLabel={(option) => option}
                            onChange={(event, newValue) => {
                                console.log('newValue-----------------------------------', newValue)
                                setTipoConcepto((newValue !== null) ? newValue.value : null)
                                //   setStudentObject({...studentObject, stuSex : (newValue !== null) ? newValue.value : null})          
                                //   setSelectedStudent({...selectedStudent, stuSex : (newValue !== null) ? newValue.value : selectedStudent.stuSex})
                            }}
                            required
                            // key={clearField.sex}
                            noOptionsText={'Sin Opciones'}
                            sx={{ width: '20%' }}
                            id="clear-on-escape"
                        />
                    </Stack>
                    <Stack spacing={2}  alignItems="flex-end" direction="row" justifyContent="center">
           {
             <>
                {
                 (statusCcircularProgress)?
                  <LoadingButtons message={'Guardando'} />
                  : 
                  <>
                <Button variant="outlined" 
                // onClick={confirmCancelNewStudent} 
                color="error">Cancelar</Button>
                    <Button variant="contained"
                    // onClick={saveStudent} 
                    color="success">Guardar</Button>
                  </>
                }
             </>
           }
           
          </Stack>
                </Box>
            </Modal>
            {(modalCancel) ?
                <ModalAlertCancel modalCancel={modalCancel} setModalCancel={setModalCancel} message={'¿ Desea cancelar el registro ?'} setUserResponse={setUserResponse} />
                : null}
        </>

    )
}

export default ModalPayments
