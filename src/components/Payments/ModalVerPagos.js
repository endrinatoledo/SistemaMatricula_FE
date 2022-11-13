import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LoadingButtons from '../commonComponents/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import nextId from "react-id-generator";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import MaterialTable from '@material-table/core';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

const AxiosInstance = require("../utils/request").default;

const style = {
    flexGrow: 1,
    overflow: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '70%',
    // height: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UseStyles = makeStyles({
    stack: {
        marginTop: 40
    },
    TextField: {
        marginBottom: '3%',
    },
    title: {
        marginBottom: 40
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
    distribPago: {
        marginLeft: '3%',
        marginBottom: '3%',
    }

    // box:{
    //     marginTop:40,
    //     marginBottom:40,
    // }
})

const ModalVerPagos = ({ periodoSeleccionado, selectedFamily, statusModalVerPagos, setStatusModalVerPagos }) => {

    const classes = UseStyles();
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');


    const consultarPagos = async () => {

        try {
            const monthlyPaymentFamily = (await AxiosInstance.get(`/invoiceHeader/invoice/family/${selectedFamily.famId}/periodo/${periodoSeleccionado.perId}`)).data
            console.log('monthlyPaymentFamilyyyyyyyyyyyyyyyyyyyyyy', monthlyPaymentFamily)
            
        } catch (error) {
            setMessage('Error al consultar Pagos')
            setAlertType("error")
            setAlertModal(true)
        }
    }

    React.useEffect(() => {
        consultarPagos()
    }, [0]);

  return (
    <>
          <Modal
              hideBackdrop open={statusModalVerPagos}
              onClose={() => setStatusModalVerPagos(false)}
              aria-labelledby="child-modal-title" aria-describedby="child-modal-description" >

              <Box sx={{ ...style, width: '95%', height: '87%' }}>

                  <div>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                          >
                              <Typography><b>Enero</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Febrero</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Marzo</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Abril</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Mayo</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Junio</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Julio</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Agosto</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Septiembre</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Octubre</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Noviembre</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                          >
                              <Typography><b>Dicembre</b></Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Typography><b>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                              </b></Typography>
                          </AccordionDetails>
                      </Accordion>
                      <Accordion disabled>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel3a-content"
                              id="panel3a-header"
                          >
                              <Typography><b>Disabled Accordion</b></Typography>
                          </AccordionSummary>
                      </Accordion>
                  </div>
                <Stack spacing={2} alignItems="flex-end" direction="row" justifyContent="flex-end" className={classes.stack}>
                    <Button variant="outlined" onClick={() => setStatusModalVerPagos(false)}
                        color="error">Cerrar</Button>
                </Stack>
              </Box>
          </Modal>
    
    </>
  )
}

export default ModalVerPagos