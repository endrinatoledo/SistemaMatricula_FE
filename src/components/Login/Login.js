import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import theme from '../../temaConfig'
import Footer from '../Layout/Footer.js'



const theme = createTheme();

const useStyles = makeStyles({
  root: {
    "&:hover":{
        backgroundColor : '#00897b'
    }
  }
});

function Login() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom:'40%'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00bfa5' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              className={classes.root}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#00bfa5', color:'black' }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
        
      </Container>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );

}

export default Login;
