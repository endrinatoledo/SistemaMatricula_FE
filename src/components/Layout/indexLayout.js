import React, {Fragment} from 'react';
import { Button } from '@mui/material';
import NavBar from './navBar'
import Sidebar from './Sidebar';


const IndexLayout = () => {
  return (
    <Fragment>
        <NavBar />
        {/* <Button>hola soy boton</Button>    */}
        <Sidebar />     
    </Fragment>
  )
}

export default IndexLayout