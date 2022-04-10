import * as React from 'react';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const AddButton = ({name, setOpenModal}) => {
  return (
      <Button size="small" 
              variant="contained"
              onClick={() => setOpenModal(true)}
              endIcon={<AddRoundedIcon />}>
        Agregar {name}
      </Button>
  )
}

export default AddButton