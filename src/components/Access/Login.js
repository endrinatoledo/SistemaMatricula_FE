import React,{useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StandardAlert from '../AlertMessages/StandardAlert';
import ValidateEmail from '../commonComponents/ValidateEmail';
const AxiosInstance = require("../utils/request").default;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageFlash, setMessageFlash] = useState(false)

  const MessageFlash  = () => {
    
    setMessageFlash(true)
    setTimeout(() => {
      setMessageFlash(false);
    }, 3000);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(email === '' || email === null || email === undefined ||  password === '' || password === null || password === undefined ){
      setMessage('Campos requeridos')  
      MessageFlash()

    }else{
      // const validatedEmail = await ValidateEmail({email})
      // if (!validatedEmail){

      //   setMessage('Formato de correo incorrecto') 
      //   MessageFlash()

      // }else{

        AxiosInstance.post('/access/', {email, password})
        .then( response  =>{
          if(response.data.ok === false){
            setMessage(response.data.message)
            MessageFlash()
          }
          else if(response.data.ok === true){
              localStorage.setItem("token", response.data.user.token);
              localStorage.setItem("usuId", response.data.user.usuId);
              localStorage.setItem("usuEmail", response.data.user.usuEmail);
              localStorage.setItem("usuName", response.data.user.usrName);
              localStorage.setItem("usuLastName", response.data.user.usuLastName);
              localStorage.setItem("usuStatus", response.data.user.usrStatus);  
              localStorage.setItem("rolId", response.data.user.rolId);
              window.location.reload();  
          }else{
            setMessage('Error de conexión')
            MessageFlash()
          }
        })
      // }
    }  
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
              onChange={e => setEmail(e.target.value ? e.target.value : '')}
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
              onChange={e => setPassword(e.target.value ? e.target.value : '')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            { (messageFlash) ? <StandardAlert message={message} alertType={"error"}/> : null}
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}