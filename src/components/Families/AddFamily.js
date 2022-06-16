import * as React from 'react';
import Box from '@mui/material/Box';

import SearchRepresentative from './SearchRepresentative'
import TableRepresentative from './TableRepresentative';



const AddFamily = () => {
 
  const [listRepresentative, setListRepresentative] = React.useState([])
  const [dataRepresentatives, setDataRepresentatives] = React.useState([])
  // const [conteo, setconteo] = React.useState(0)

  React.useEffect(() => {  

    }, [])

  return (
    <>
    <Box >
      <h4 id="child-modal-title">Agregar Familia </h4>
        <SearchRepresentative listRepresentative={listRepresentative} setListRepresentative={setListRepresentative}/>
        <TableRepresentative  listRepresentative={listRepresentative} setListRepresentative={setListRepresentative}/>
    </Box>
              

        
         
    </>
  )
}

export default AddFamily