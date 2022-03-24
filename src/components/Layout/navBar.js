import React from 'react';
import {AppBar,IconButton,Toolbar,Typography, Button} from '@mui/material'
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const useStyles = makeStyles(theme =>({
  offset : theme.mixins.toolbar,
  menuButton : {
    marginRight: theme.spacing(2)
  },
  leave:{ 
    flexGrow : 1
  }
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <div >
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton 
              color='inherit' 
              aria-label='menu' 
              >
              <MenuRoundedIcon className={classes.menuButton}> </MenuRoundedIcon>
            </IconButton>
            <Typography variant="h6" className={ classes.leave}>
                hola soy navbar
            </Typography>
            <IconButton 
              color='inherit' 
              aria-label='menu' 
              >
              <LogoutRoundedIcon className={ classes.menuButton}> </LogoutRoundedIcon>
              
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.offset}></div>
        {/* <Toolbar /> */}
        
    </div>
  )
}

export default NavBar