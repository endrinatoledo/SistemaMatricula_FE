import React from 'react'
import IconButton from '@mui/material/IconButton';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

const action = () => {
    window.location.href="/"
    localStorage.removeItem("token")
    localStorage.removeItem("usuId")
    localStorage.removeItem("usuEmail")
    localStorage.removeItem("usuName")
    localStorage.removeItem("usuLastName")
    localStorage.removeItem("usuStatus")
    localStorage.removeItem("rolId")    
    }

const Logout = () => {
  return (
    <IconButton color="inherit" onClick={action}>
        <ExitToAppRoundedIcon />
    </IconButton>
  )
}

export default Logout