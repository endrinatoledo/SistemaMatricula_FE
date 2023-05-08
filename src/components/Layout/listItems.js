import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom'
import {List, ListItemButton,ListItemIcon,ListItemText, Collapse } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import StairsRoundedIcon from '@mui/icons-material/StairsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RequestPageRoundedIcon from '@mui/icons-material/RequestPageRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';

export const CollectionListItems = () => {

  return (     
    <Fragment>
      <List component="div" disablePadding>
        <ListSubheader  inset>
          Cobranza
        </ListSubheader>
      </List>
      <NavLink to='/registrarpago'>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Pagos" />
            </ListItemButton>
          </List>
        </NavLink>
      <NavLink to='/facturas'>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2 }} >
            <ListItemIcon>
              <ReceiptLongRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Facturas" />
          </ListItemButton>
        </List>
      </NavLink>
      <NavLink to='/conceptosdefactura'>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <AssignmentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Conceptos de Fact" />
            </ListItemButton>
          </List>
        </NavLink>

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
      <NavLink to='/inscriptions'>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <ContentPasteRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Inscripciones" />
            </ListItemButton>
          </List>
        </NavLink>

    </Fragment>
  )
}



export const PeopleListItems = () => {

    return (     
      <Fragment>
        <List component="div" disablePadding>
          <ListSubheader  inset>
            Personas
          </ListSubheader>
        </List>
        <NavLink to='/representantes'>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <EscalatorWarningRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Representantes" />
            </ListItemButton>
          </List>
        </NavLink>
        <NavLink to='/estudiantes'>
          <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }} >
                <ListItemIcon>
                  <LocalLibraryRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Estudiantes" />
              </ListItemButton>
            </List>
        </NavLink>
        <NavLink to='/familias'>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <FamilyRestroomRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Familias" />
            </ListItemButton>
          </List>
        </NavLink>
        <NavLink to='/companias'>
          <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 2 }}  >
              <ListItemIcon >
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Compañías" />
            </ListItemButton>
          </List>
        </NavLink>
        <NavLink to='/usuarios'>
        <List component="div"  disablePadding>
            <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
          </List>
        </NavLink>
          
      </Fragment>
    )
  }
  
  export const ReportsListItems = () => {

    return (     
      <Fragment>
        <List component="div" disablePadding>
          <ListSubheader  inset>
            Reportes
          </ListSubheader>
        </List>
        <NavLink to='/reportesmatricula'>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} >
                <ListItemIcon>
                  <DescriptionRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Matricula" />
              </ListItemButton>
            </List>
          </NavLink>
        <NavLink to='/reportescobranza'>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} >
                <ListItemIcon>
                  <RequestPageRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Cobranza" />
              </ListItemButton>
            </List>
          </NavLink>
  
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
        <NavLink to='/tasas'>
        <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 2 }}  >
              <ListItemIcon >
                <AttachMoneyRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Tasas" />
            </ListItemButton>
          </List>
        </NavLink>
        {/* <NavLink to='/costomensualidades'>
          <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 2 }}  >
              <ListItemIcon >
                <AttachMoneyRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Costo Mens." />
            </ListItemButton>
          </List>
        </NavLink> */}
        <NavLink to='/periodos'>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <CalendarMonthRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Periodo A." />
            </ListItemButton>
          </List>
        </NavLink>
        {/* <NavLink to='/secciones'>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <GridOnRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Secciones" />
            </ListItemButton>
          </List>
        </NavLink> */}
        <NavLink to='/bancos'>
        <List component="div" disablePadding >
            <ListItemButton sx={{ pl: 2 }}  >
              <ListItemIcon >
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Bancos" />
            </ListItemButton>
          </List>
        </NavLink>
        {/* <NavLink to='/roles'>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <PersonOutlineRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>
          </List>
        </NavLink> */}
        {/* <NavLink to='/niveles'> 
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <StairsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Niveles" />
            </ListItemButton>
          </List>
        </NavLink> */}
        {/* <NavLink to='/conceptosdefactura'>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }}>
              <ListItemIcon>
                <ListRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Con. Factu" />
            </ListItemButton>
          </List>
           </NavLink> */}
           <NavLink to='/metodosdepago'>
           <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <PaymentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Metodos de Pago" />
            </ListItemButton>
          </List>
           </NavLink>
           {/* <NavLink to='/colegio'>
           <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 2 }} >
              <ListItemIcon>
                <AccountBalanceRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Colegio" />
            </ListItemButton>
          </List>
           </NavLink> */}
      </Fragment>
    )
  }



