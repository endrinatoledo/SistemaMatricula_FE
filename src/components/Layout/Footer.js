import React from 'react';
import { Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

const useStyles = makeStyles({
    root: {
      // height: '100%',
      overflow: 'hidden',
      width: '100%',
      backgroundColor:  '#00bfa5', //Color de Fondo
      marginTop:'',
      bottom: 0,
      position: 'absolute',
      paddingTop:'1%',
      paddingBottom:'1%',

    },
  });

function Footer() {
    const classes = useStyles();
    return (
        <Container maxWidth="false" className={classes.root}>
            <Typography align="center">
                {'Copyright © '}
                <Link color="inherit" href="">
                    agregar URL empresa
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>

        </Container>
        // <Typography variant="body2" color="text.secondary" align="center"></Typography>

      );
}


export default Footer;