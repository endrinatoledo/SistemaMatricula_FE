import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

const style = {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ModalSelectStudent = ({setIdentification, listStudent,setListStudent, selectStudentModal, setSelectStudentModal, selectStudentData }) => {

    const handleClose = () => setSelectStudentModal(false);

    return (
        <div>

            <Modal
                open={selectStudentModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Se encontraron {selectStudentData.length} resultados, por favor seleccione uno:
                    </Typography>
                    <div>
                    <Stack direction="row" spacing={2}  justifyContent="space-between">
                    <Autocomplete
                                fullWidth
                                options={selectStudentData}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                getOptionLabel={(option) => `Nombre Completo: ${option.stuFirstName} ${option.stuSecondName} ${option.stuSurname} ${option.stuSecondSurname}, Fecha Nacimiento: ${option.stuDateOfBirth}`}
                                onChange={(event, newValue) => {
                                    setListStudent(listStudent.concat([newValue]))
                                    setIdentification({stuIdType:null, stuIdentificationNumber: '', stuFirstName:'',stuSecondName:'',stuSurname:'',stuSecondSurname:''})
                                    setSelectStudentModal(false)
                                }}
                                required
                                noOptionsText={'Sin Opciones'}
                                id="clear-on-escape"
                            />
                    </Stack>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalSelectStudent
