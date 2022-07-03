import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MaterialTable from '@material-table/core'; 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalSections = ({levelsMap, setLevelsMap,allSections, openModalSections, setOpenModalSection}) => {
    
    const handleOpen = () => setOpenModalSection(true);
    const handleClose = () => setOpenModalSection(false);
    const columns = [
      { title: 'Secciones', field: 'secName'}   
    ];
  return (
    <div>
      <Modal
        open={openModalSections}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <MaterialTable title={'Seleccionar Secciones'}
        
        data={allSections} 
        columns={columns}
        actions={[
            // {
            //   icon: () => <GridOnRoundedIcon />,
            //   tooltip: 'Seleccionar Secciones',
            //   position: 'row',
            //   onClick: (event, rowData) => {
            //     setOpenModalSection(!openModalSections)
            //     console.log('rowData',rowData)
            //     console.log('event',event)
            //     }
            // }
        ]}    
        options={{
            // width:300,
            paging: false,
            actionsCellStyle:{paddingLeft:50,paddingRight:50},
            headerStyle: {
              backgroundColor: "#007bff",
              color: "#FFF",
              fontWeight:'normal',
              fontSize:18,
            },
            selection: true,
            search:false, 
            actionsColumnIndex:-1,
            addRowPosition:'first'
        }}
        // onSelectionChange={rows => setPeriodObject({...periodObject, selectedPeriods:rows})}
        />
        </Box>
      </Modal>
    </div>
  )
}

export default ModalSections