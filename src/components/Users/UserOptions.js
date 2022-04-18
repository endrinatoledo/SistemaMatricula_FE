import * as React from 'react';
import Stack from '@mui/material/Stack';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';

const UserOptions = ({userObject, setUserObject,editUser, setEditUser, value,openModal,setOpenModal}) => {

    const editUserProcess = (value) =>{

        setUserObject({...userObject,
            name:value.usuName,
            lastName:value.usuLastName,
            email:value.usuEmail,
            status: value.usuStatus,
            rol: value.rolId })
        setOpenModal(true)
    }


// console.log('value usuariooo: ',editUser)

  return (
        <Stack direction="row" spacing={2}>
        <IconButton color="primary" aria-label="Editar Usuario" component="span">
          <ModeEditRoundedIcon onClick={() => editUserProcess(value) }  ></ModeEditRoundedIcon>
        </IconButton>
        <IconButton color="primary" aria-label="Eliminar Usuario" component="span">
          <DeleteRoundedIcon  ></DeleteRoundedIcon>
        </IconButton>
        </Stack>
  )
}

export default UserOptions