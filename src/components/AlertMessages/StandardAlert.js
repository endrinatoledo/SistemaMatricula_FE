import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const StandardAlert = ({message, alertType}) => {
  return ( 
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={alertType}>{message}</Alert>
    </Stack>
  )
}

export default StandardAlert