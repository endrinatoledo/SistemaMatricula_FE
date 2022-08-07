import React from 'react'
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const AxiosInstance = require("../utils/request").default;
const UseStyles = makeStyles({
  typography: {
    marginLeft: '3%'
  },
  box: {
    marginTop: '2%'
  },
  TextField: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '3%'
  },
  TextField2: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '1%'
  }
});
const IdentificationType = [
  {
    value: "v",
    label: "Venezolano"
  },
  {
    value: "e",
    label: "Extranjero"
  },
  {
    value: "p",
    label: "Pasaporte"
  }
]

const SearchRepresentative = ({ representativeFound, setRepresentativeFound, identification, setIdentification, representativeData, setRepresentativeData }) => {
  const classes = UseStyles();

  const labelType = (value) => {
    if (value !== null) {
      const result = IdentificationType.filter(item => {
        return value === item.value
      })
      if (result.length > 0) {
        return result[0]
      } else {
        return null
      }
    } else {
      return null
    }
  }

  const searchIdentification = async () => {
    try {
      const data = (await AxiosInstance.post("/representatives/byIdentification", identification)).data

      if (data.data === 'registrado') {
        setRepresentativeFound(true)
        setRepresentativeData(data.result)
      }
    } catch {
      console.log('***no')
      // setConnErr(true)
    }

  }

  const cleanIdentification = async () => {

    setIdentification({ repIdType: null, repIdentificationNumber: '' })
    setRepresentativeFound(false)

  }

  return (
    <>
      <Box className={classes.box}>
        <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
          Representantes
        </Typography>
        <Divider variant="middle" />
        <Stack direction="row" spacing={2} justifyContent="flex-start" className={classes.TextField}>
          <Button variant="outlined" size="medium" disabled={representativeFound} onClick={() => searchIdentification()}>Buscar</Button>
          <Button variant="outlined" size="medium" disabled={!representativeFound} onClick={() => cleanIdentification()}>Limpiar</Button>

          <Autocomplete
            disabled={representativeFound}
            options={IdentificationType}
            renderInput={(params) => (
              <TextField {...params} label="Tipo Idenfiticación" variant="standard" />
            )}
            value={labelType(identification.repIdType)}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              setIdentification({ ...identification, repIdType: newValue.value ? newValue.value : null })
            }}
            required
            noOptionsText={'Sin Opciones'}
            sx={{ width: '20%' }}
            id="clear-on-escape"
          />

          <TextField
            disabled={representativeFound}
            sx={{ width: '20%' }}
            required
            value={identification.repIdentificationNumber}
            id="repIdentificationNumber"
            label="Identificación"
            variant="standard"
            onChange={e => {
              setIdentification({ ...identification, repIdentificationNumber: e.target.value ? e.target.value : '' })
            }

            }
          />
          {(representativeFound) ?
            <>
              <Typography className={classes.typography} color="text.secondary" gutterBottom variant="h6" component="div">
                {`${representativeData.repFirstName} ${representativeData.repSurname}`}
              </Typography>

            </>
            : null}

        </Stack>

      </Box>

    </>
  )
}

export default SearchRepresentative