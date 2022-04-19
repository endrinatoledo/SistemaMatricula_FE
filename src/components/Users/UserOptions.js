import * as React from 'react';
import Stack from '@mui/material/Stack';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';

const UserOptions = ({userObject, setUserObject, value,setOpenModal}) => {

    const editUserProcess = (value) =>{

        setUserObject({...userObject,
            idUser:value.usuId,
            name:value.usuName,
            lastName:value.usuLastName,
            email:value.usuEmail,
            status: value.usuStatus,
            rol: value.rolId,
            rolName:value.roles.rolName,
            deleteUser:false,
            editUser:true,
            newUser:false,
            seePassword:false })
        setOpenModal(true)
    }

    const deleteUserProcess = (value) =>{

      setUserObject({...userObject,
        idUser:value.usuId,
        name:value.usuName,
        modalUserDelete:true,
        editUser:false,
        newUser:false,
        seePassword:false })

    }
    


// console.log('value usuariooo: ',value)

  return (
        <Stack direction="row" spacing={2}>
        <IconButton color="primary" aria-label="Editar Usuario" component="span"onClick={() => editUserProcess(value) }>
          <ModeEditRoundedIcon ></ModeEditRoundedIcon>
        </IconButton>
        <IconButton color="primary" aria-label="Eliminar Usuario" component="span" onClick={() => deleteUserProcess(value) }>
          <DeleteRoundedIcon ></DeleteRoundedIcon>
        </IconButton>
        </Stack>
  )
}

export default UserOptions