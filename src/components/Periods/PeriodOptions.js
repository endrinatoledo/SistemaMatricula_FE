import * as React from 'react';
import Stack from '@mui/material/Stack';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';

const PeriodOptions = ({periodObject, setPeriodObject, value,setOpenModal}) => {

    const editPeriodProcess = (value) =>{

        setPeriodObject({...periodObject,
            idPeriod:value.perId,
            startYear:value.perStartYear,
            endYear:value.perEndYear,
            status: value.perStatus,
            modalPeriodDelete:false,
            editPeriod:true,
            newPeriod:false })
        setOpenModal(true)
    }

    const deletePeriodProcess = (value) =>{

      setPeriodObject({...periodObject,
        idPeriod:value.perId,
        startYear:value.perStartYear,
        endYear:value.perEndYear,
        modalPeriodDelete:true,
        editPeriod:false,
        newPeriod:false })

    }

  return (
        <Stack direction="row" spacing={2}>
        <IconButton color="primary" aria-label="Editar Usuario" component="span"onClick={() => editPeriodProcess(value) }>
          <ModeEditRoundedIcon ></ModeEditRoundedIcon>
        </IconButton>
        <IconButton color="primary" aria-label="Eliminar Usuario" component="span" onClick={() => deletePeriodProcess(value) }>
          <DeleteRoundedIcon ></DeleteRoundedIcon>
        </IconButton>
        </Stack>
  )
}

export default PeriodOptions