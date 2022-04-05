import React from 'react'
import Chip from '@mui/material/Chip';

const StatusInTable = ({status}) => {
  return (
      (status === 1)?
            <Chip label="Activo" color="success" />
        :
            <Chip label="Inactivo" color="error" />
  )
}

export default StatusInTable