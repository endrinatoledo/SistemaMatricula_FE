import React from 'react'
import {List, ListItemButton,ListItemIcon,ListItemText, Collapse } from '@mui/material';

//Iconos
import SettingsRoundedIcon    from '@mui/icons-material/SettingsRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import ExpandLess             from '@mui/icons-material/ExpandLess';
import ExpandMore             from '@mui/icons-material/ExpandMore';


const Sidebar = () => {
  const [openCollection, setOpenCollection] = React.useState(false);
  const [openConfig, setOpenConfig] = React.useState(false);
  const [openEnrollment, setOpenEnrollment] = React.useState(false);
  const [openFamily, setOpenFamily] = React.useState(false);

  return (
    <div>
      <List component='nav'>
        <ListItemButton onClick={ () => setOpenCollection(!openCollection)}>
          <ListItemText primary='Cobranza' />
          <ListItemIcon>
            {openCollection ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={ () => setOpenEnrollment(!openEnrollment)}>
          <ListItemText primary='Matrícula' />
          <ListItemIcon>
            {openEnrollment ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={ () => setOpenFamily(!openFamily)}>
          <ListItemText primary='Familias' />
          <ListItemIcon>
            {openFamily ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={openFamily} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Representantes" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Alumnos" />
            </ListItemButton>
          </List>
        </Collapse>
        
        <ListItemButton onClick={ () => setOpenConfig(!openConfig)}>
          <ListItemText primary='Configuración' />
          <ListItemIcon>
            {openConfig ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={openConfig} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Periodo" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Niveles" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Secciones" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Escolaridad" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Colegio" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Tasas" />
            </ListItemButton>
          </List>
        </Collapse>
        
        

      </List>
    </div>
  )
}

export default Sidebar