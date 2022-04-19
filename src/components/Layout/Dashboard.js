import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {PeopleListItems, ConfigListItems,CollectionListItems, EnrollmentListItems}  from './listItems';
import Copyright from './Copyright';
import Logout from './Logout';
import UserList from '../Users/UserList';
import RepresentativeList from '../Representative/RepresentativeList';
import RolesList from '../Roles/RolesList';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const Dashboard= () => {
  const [open, setOpen] = React.useState(true);
 
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start" color="inherit"
                aria-label="open drawer" onClick={toggleDrawer}
                sx={{ marginRight: '36px', ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Sistema de Matrícula y Cobranza
              </Typography>
              <Logout/>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1],
                // overflowY : 'scroll'
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav" sx={{flexGrow: 1, height: '85vh', overflow: 'scroll', overflowX: 'hidden'}}>
                <CollectionListItems />
                <Divider sx={{ my: 1 }} />
                <EnrollmentListItems />
                <Divider sx={{ my: 1 }} />
                <PeopleListItems  />
                <Divider sx={{ my: 1 }} />
                <ConfigListItems />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {
                    <Routes>
                      <Route path="/"element={<UserList />} ></Route>
                      <Route path="/usuarios"element={<UserList />} ></Route>
                      <Route path="/estudiantes"element={<RepresentativeList />} ></Route>
                      <Route path="/familias"element={<RepresentativeList />} ></Route>
                      <Route path="/colegio"element={<RepresentativeList />} ></Route>
                      <Route path="/escolaridad"element={<RepresentativeList />} ></Route>
                      <Route path="/niveles"element={<RepresentativeList />} ></Route>
                      <Route path="/representantes"element={<RepresentativeList />} ></Route>
                      <Route path="/roles"element={<RolesList />} ></Route>
                      <Route path="/secciones"element={<RepresentativeList />} ></Route>
                      <Route path="/periodos"element={<RepresentativeList />} ></Route>
                      <Route path="/tasas"element={<RepresentativeList />} ></Route>
                    </Routes>
                  }
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
      
    </BrowserRouter>
    
  );
}
export default Dashboard
