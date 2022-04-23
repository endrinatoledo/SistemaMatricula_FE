import * as React from 'react';
import Stack from '@mui/material/Stack';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';

const RolOptions = ({rolObject, setRolObject, value,setOpenModal}) => {

    const editRolProcess = (value) =>{


        setRolObject({...rolObject,
            idRol:value.rolId,
            name:value.rolName,
            status: value.rolStatus,
            modalRolDelete:false,
            editRol:true,
            newRol:false })
        setOpenModal(true)
    }

    const deleteRolProcess = (value) =>{

      setRolObject({...rolObject,
        idRol:value.rolId,
        name:value.rolName,
        modalRolDelete:true,
        editRol:false,
        newRol:false })

    }

  return (
        <Stack direction="row" spacing={2}>
        <IconButton color="primary" aria-label="Editar Usuario" component="span"onClick={() => editRolProcess(value) }>
          <ModeEditRoundedIcon ></ModeEditRoundedIcon>
        </IconButton>
        <IconButton color="primary" aria-label="Eliminar Usuario" component="span" onClick={() => deleteRolProcess(value) }>
          <DeleteRoundedIcon ></DeleteRoundedIcon>
        </IconButton>
        </Stack>
  )
}

export default RolOptions