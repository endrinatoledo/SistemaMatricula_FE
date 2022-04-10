// import * as React from 'react';
import React, {Fragment} from 'react';
import {List, ListItemButton,ListItemIcon,ListItemText, Collapse } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import StairsRoundedIcon from '@mui/icons-material/StairsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';

export const CollectionListItems = () => {

  return (     
    <Fragment>
      <List component="div" disablePadding>
        <ListSubheader  inset>
          Cobranza
        </ListSubheader>
      </List>

    </Fragment>
  )
}
export const EnrollmentListItems = () => {

  return (     
    <Fragment>
      <List component="div" disablePadding>
        <ListSubheader  inset>
          Matrícula
        </ListSubheader>
      </List>

    </Fragment>
  )
}



export const PeopleListItems = ({selected, setSelected}) => {

    return (     
      <Fragment>
        <List component="div" disablePadding>
          <ListSubheader  inset>
            Personas
          </ListSubheader>
        </List>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} onClick={() => setSelected('representative')}>
              <ListItemIcon>
                <EscalatorWarningRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Representantes" />
            </ListItemButton>
          </List>

        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} onClick={() => setSelected('students')}>
              <ListItemIcon>
                <LocalLibraryRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Alumnos" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} onClick={() => setSelected('families')}>
              <ListItemIcon>
                <FamilyRestroomRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Familias" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} onClick={() => setSelected('users')}>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </List>
      </Fragment>
    )
  }
  

  export const ConfigListItems = ({selected, setSelected}) => {

    return (     
      <Fragment>
        <List component="div" disablePadding>
          <ListSubheader  inset>
          Configuración
          </ListSubheader>
        </List> 
        <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 2 }} onClick={() => setSelected('valuation')} >
              <ListItemIcon >
                <AttachMoneyRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Tasas" />
            </ListItemButton>
          </List>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} onClick={() => setSelected('period')}>
              <ListItemIcon>
                <CalendarMonthRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Periodo A." />
            </ListItemButton>
          </List>

        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <GridOnRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Secciones" onClick={() => setSelected('sections')}/>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <PersonOutlineRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Roles" onClick={() => setSelected('roles')}/>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <StairsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Niveles" onClick={() => setSelected('levels')}/>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <SchoolRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Escolaridad" onClick={() => setSelected('scholarship')}/>
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} onClick={() => setSelected('school')}>
              <ListItemIcon>
                <AccountBalanceRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Colegio" />
            </ListItemButton>
          </List>
      </Fragment>
    )
  }



