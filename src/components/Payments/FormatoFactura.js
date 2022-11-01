import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const ItemIzquierda = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));
const ItemDerecha = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
}));

const FormatoFactura = ({ datosPago, tasaDelDia, datosCabecera, pagosRegistrados }) => {

    // console.log('datosPago', datosPago)
    // console.log('pagosRegistrados', pagosRegistrados)
    // console.log('tasaDelDia', tasaDelDia)
    const [montos, setMontos] = React.useState([])

    const ordenarMontos = () => {
        let montoBs = 0
        const montoFinal = pagosRegistrados.map(item => {
            
            if (item.moneda === 'Dólares'){
                montoBs = item.monto * tasaDelDia.excAmount
            }
            return {
                metodoPago: item.metodoPago.payName,
                monto: montoBs === 0 ? item.monto : montoBs
            }
        })
        setMontos(montoFinal)
    }

    React.useEffect(() => {
        ordenarMontos()
    }, [1])

  return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container >
              <Grid item xs={8}>
                  <ItemIzquierda>
                    <div> A.C.U.E Colegio Nuestra Señora de Lourdes </div>
                    <div> Inscrito en el M.P.P.E. Cod.S0207D0814 </div>
                    <div> Número de RIF: J-31730846-8 </div>
                    <div> AV(100) Bolivar Norte. Valencia-Carabobo</div>
                  </ItemIzquierda>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                    <br /> 
                    <br /> 
                    <div> Fecha </div>
                      <div> {datosCabecera.date !== undefined ? datosCabecera.date : ''} </div>
                  </Item>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                    <div> Nro. CONTROL </div>
                    <div> 00-00020792 </div>
                    <div> Factura </div>
                    <div> 00020760</div>
                  </Item>
              </Grid>
              <Grid item xs={8}>
                  <ItemIzquierda>
                    <br /> 
                      <div> Nombre o Razón Social: {datosCabecera.razonSocial !== undefined ? datosCabecera.razonSocial : ''} </div>
                      <div> Dirección: {datosCabecera.address !== undefined ? datosCabecera.address : ''} </div>
                  </ItemIzquierda>
              </Grid>
              <Grid item xs={4}>
                  <ItemIzquierda>
                    <br /> 
                      <div> CI/RIF : {datosCabecera.identificacion !== undefined ? datosCabecera.identificacion : ''}  </div>
                      <div> Teléfono: {datosCabecera.phones !== undefined ? datosCabecera.phones : ''}  </div>
                  </ItemIzquierda>
              </Grid>
              <Grid item xs={10}>
                  <Item>
                    <br />
                    <div> CONCEPTO </div>
                    <br />
                  </Item>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                    <br />
                    <div> MONTO EN BOLIVARES </div>
                    <br />
                  </Item>
              </Grid>
              {
                  datosPago.length > 0  
                    ? datosPago.map(item => <> 
                      <Grid item xs={10}>
                          <ItemIzquierda>
                            <br />
                                <div> {item.descripcion} {item.student} </div>
                            <br />
                          </ItemIzquierda>
                      </Grid>
                      <Grid item xs={2}>
                          <ItemDerecha>
                            <br />
                            <div> 10.256 </div>
                            <br />
                          </ItemDerecha>
                      </Grid>
                     </>)
                    : null
              }
              <Grid item xs={9}>
                  <ItemIzquierda>
                    <div> Formas de pago </div>
                    {
                          montos.length > 0
                          ? montos.map(item => <div> {item.metodoPago} </div>) 
                          : null
                    }
                    <div> NumDoc:  </div>
                    <div> Banco:  </div>
                  </ItemIzquierda>
              </Grid>
              <Grid item xs={3}>
                  <ItemDerecha>
                      <div> Total </div>
                    {
                          montos.length > 0
                              ? montos.map(item => <div> {item.monto} </div>)
                              : null
                    }
                    <br />
                    <br />                      
                  </ItemDerecha>
              </Grid>
              <Grid item xs={12}>
                  <br />   
                  <br />   
                  <div> Recibí conforme: ______________________________________________________________ </div>
              </Grid>
          </Grid>
      </Box>
  )
}

export default FormatoFactura