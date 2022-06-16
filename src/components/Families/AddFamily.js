import * as React from 'react';
import Box from '@mui/material/Box';

import SearchRepresentative from './SearchRepresentative'
import TableRepresentative from './TableRepresentative';
import SearchStudent from './SearchStudent';
import TableStudent from './TableStudent';



const AddFamily = () => {
 
  const [listRepresentative, setListRepresentative] = React.useState([])
  const [listStudent, setListStudent] = React.useState([])

  React.useEffect(() => {  

    }, [])

  return (
    <>
    <Box >
      <h4 id="child-modal-title">Agregar Familia </h4>
        <SearchRepresentative listRepresentative={listRepresentative} setListRepresentative={setListRepresentative}/>
        <TableRepresentative  listRepresentative={listRepresentative} setListRepresentative={setListRepresentative}/>
        <SearchStudent listStudent={listStudent} setListStudent={setListStudent} ></SearchStudent>
        <TableStudent listStudent={listStudent} setListStudent={setListStudent}></TableStudent>
    </Box>
              

        
         
    </>
  )
}

export default AddFamily