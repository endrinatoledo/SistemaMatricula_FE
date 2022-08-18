import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

const ModalSelectStudent = ({ selectStudentModal, setSelectStudentModal, selectStudentData }) => {

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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Estudiantes</InputLabel>
                            <Autocomplete
                                fullWidth
                                options={selectStudentData}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                                // value={(editRepresentative) ? labelBond(selectedRepresentative.repBond) : labelBond(representativeObject.repBond) }
                                getOptionLabel={(option) => `${option.stuFirstName} ${option.stuSecondName} ${option.stuSurname} ${option.stuSecondSurname}`}
                                onChange={(event, newValue) => {
                                    //   setRepresentativeObject({...representativeObject, repBond : newValue.value ? newValue.value : null})          
                                }}
                                required
                                noOptionsText={'Sin Opciones'}
                                sx={{ width: '20%' }}
                                id="clear-on-escape"
                            />


                        </FormControl>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalSelectStudent
