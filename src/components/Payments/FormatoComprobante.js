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


const FormatoComprobante = ({ conceptosAdicionalesArray, replicaDatosPago, numControl, numFact, datosPago, tasaDelDia, datosCabecera, pagosRegistrados }) => {

    const [montos, setMontos] = React.useState([])
    const [total, setTotal] = React.useState(null)
    const [destallesDePagos, setDestallesDePagos] = React.useState(null)

    const bancosYreferencias = () => {
        let descripcion =''

        pagosRegistrados.forEach(element => {
            // console.log('element', element)
            if(element.metodoPago.payName != 'EFECTIVO'){
                if (element.banco !== null) descripcion = `${descripcion} Banco: ${element.banco.banName} `
                if (element.referencia !== null) descripcion = `${descripcion} Referencia: ${element.referencia} `
                if (element.tarjeta !== null && element.tarjeta !== undefined) descripcion = `${descripcion} Tarjeta: ${element.tarjeta} `
                descripcion = `${descripcion} - `
            }
             
        });

        setDestallesDePagos(descripcion.substring(0, descripcion.length - 2))
    }

    const calcularMontoTotal = () => {
        const montoTotal = montos.reduce(function (sum, item) {
                return sum + Number(item.monto);
        }, 0)
        setTotal(montoTotal.toFixed(2))
    }
    function funcionSuma(element) {
        return pagosRegistrados.reduce(function (sum, item) {
            return (item.metodoPago.payName === element) 
                ? item.moneda === "Bolívares" ? sum + Number(item.monto) : sum + (tasaDelDia.excAmount * Number(item.monto))
                : sum;
        }, 0)
    }

    const ordenarMontos = () => {

        let hash = {};
        const eliminarMetodosPagoRepetidos = pagosRegistrados.filter(o => hash[o.metodoPago.payName] ? false : hash[o.metodoPago.payName] = true);

            

        const detallePagoMetodos = eliminarMetodosPagoRepetidos.map(item => {
            return {
                metodoPago: item.metodoPago.payName,
                monto:0
            }}
        )

        const detallePagoMonto = detallePagoMetodos.map(item => {
            return {
                metodoPago: item.metodoPago,
                monto: (funcionSuma(item.metodoPago)).toFixed(2)
            }
        }
        )
        setMontos(detallePagoMonto)
    }

    const armarDescripcionConceptoAdicional = (concepto) => {
        const descripcion = `${concepto.icoName ? concepto.icoName.toUpperCase() : ''} ${concepto.famName ? concepto.famName.toUpperCase() : ''} ${concepto.student ? concepto.student.toUpperCase() : ''} ${concepto.description ? concepto.description.toUpperCase() : ''}`
        return descripcion
    }

    React.useEffect(() => {
        ordenarMontos()
        if (replicaDatosPago.length > 0) { bancosYreferencias() }
        // if (datosPago.length > 0) { bancosYreferencias ()} //logica vieja
    }, [1])

    React.useEffect(() => {
        if (montos.length > 0) {calcularMontoTotal()}
        
    }, [montos])

  return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container >
              {/* <Grid item xs={8}>
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
                      <div><strong>Fecha</strong>  </div>
                      <div> {datosCabecera.date !== undefined ? datosCabecera.date : ''} </div>
                  </Item>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                      <div><strong>Nro. Control</strong>  </div>
                      <div> {numControl} </div>
                      <div> <strong>Factura</strong> </div>
                      <div> {numFact}</div>
                  </Item>
              </Grid> */}
              <Grid item xs={8}>
                  <ItemIzquierda>
                    <br /> 
                      <div> <strong>NOMBRE O RAZÓN SOCIAL:</strong> {datosCabecera.razonSocial !== undefined ? (datosCabecera.razonSocial).toUpperCase() : ''} </div>
                      <div> <strong>DIRECCIÓN:</strong> {datosCabecera.address !== undefined ? (datosCabecera.address).toUpperCase() : ''} </div>
                  </ItemIzquierda>
              </Grid>
              <Grid item xs={4}>
                  <ItemIzquierda>
                    <br /> 
                      <div><strong>CI/RIF :</strong> {datosCabecera.identificacion !== undefined ? datosCabecera.identificacion : ''}  </div>
                      <div><strong>Teléfono: </strong> {datosCabecera.phones !== undefined ? datosCabecera.phones : ''}  </div>
                  </ItemIzquierda>
              </Grid>
              <Grid item xs={10}>
                  <Item>
                    <br />
                      <div> <strong>CONCEPTO </strong></div>
                    <br />
                  </Item>
              </Grid>
              <Grid item xs={2}>
                  <Item>
                    <br />
                      <div><strong> MONTO EN BOLIVARES </strong></div>
                    <br />
                  </Item>
              </Grid>

              {
                  
                       <>
                          <Grid item xs={10}>
                              <ItemIzquierda>
                                  <br />
                                  {
                                  conceptosAdicionalesArray.length > 0 ?
                                      conceptosAdicionalesArray.map(item => <>
                                          <div> {armarDescripcionConceptoAdicional(item)} </div>
                                      </>)
                                      : null
                                  }
                              {
                                  replicaDatosPago.length > 0 ?
                                      replicaDatosPago.map(item => <>
                                          <div> {(item.descripcion).toUpperCase()} {(item.student).toUpperCase()} </div>
                                      </>)
                                      : null
                              }

                                  <br />
                              </ItemIzquierda>
                          </Grid>
                          <Grid item xs={2}>
                              <ItemDerecha>
                                  <br />
                                  {
                                  conceptosAdicionalesArray.length > 0 ?
                                  conceptosAdicionalesArray.map(item => <>
                                      <div> {item.montoApagarBol}  </div>
                                  </>)
                                      : null                                      
                                }
                                {
                                    replicaDatosPago.length > 0 ?
                                      
                                          replicaDatosPago.map(item => <>
                                              <div> {parseFloat(item.pagoAplicadoBol).toFixed(2)}  </div>
                                          </>)
                                      : null
                                }
                                

                                  <br />
                              </ItemDerecha>
                          </Grid>
                      </>
                      
              }

              {/* {
                  conceptosAdicionalesArray.length > 0
                      ? <>
                          <Grid item xs={10}>
                              <ItemIzquierda>
                                  <br />
                                  {
                                      conceptosAdicionalesArray.map(item => <>
                                          <div> {armarDescripcionConceptoAdicional(item)} </div>
                                      </>)
                                  }

                                  <br />
                              </ItemIzquierda>
                          </Grid>
                          <Grid item xs={2}>
                              <ItemDerecha>
                                  <br />
                                  {conceptosAdicionalesArray.map(item => <>
                                      <div> {item.montoApagarBol}  </div>
                                  </>)}

                                  <br />
                              </ItemDerecha>
                          </Grid>
                      </>
                      : null
              } */}

              {/* {
                  replicaDatosPago.length > 0  
                //   datosPago.length > 0  
                    ? <> 
                      <Grid item xs={10}>
                          <ItemIzquierda>
                            <br />
                            {
                                      replicaDatosPago.map(item => <>
                                        <div> {item.descripcion} {item.student} </div>
                                    </>)                                        
                            }
                                
                            <br />
                          </ItemIzquierda>
                      </Grid>
                      <Grid item xs={2}>
                          <ItemDerecha>
                            <br />
                                  {replicaDatosPago.map(item => <>
                                      <div> {parseFloat(item.pagoAplicadoBol).toFixed(2)}  </div>
                                  </>)}
                                
                            <br />
                          </ItemDerecha>
                      </Grid>
                     </>
                    : null
              } */}
              <Grid item xs={9}>
                  <ItemIzquierda>
                      <div><strong>Formas de pago</strong>  </div>
                    {
                          montos.length > 0
                          ? montos.map(item => <div> {item.metodoPago} </div>) 
                          : null
                    }
                      <div><strong>Detalle de pago: </strong>  {` ${destallesDePagos}`} </div>
                  </ItemIzquierda>
              </Grid>
              <Grid item xs={3}>
                  <ItemDerecha>
                      <br />
                    {
                          montos.length > 0
                              ? montos.map(item => <div> {item.monto} </div>)
                              : null
                    }                    
                      <div> <strong>{`Total  ${total}`}</strong> </div>                      
                  </ItemDerecha>
              </Grid>
              <Grid item xs={12}>
                  <br />   
                  <br />   
                  <div> RECIBÍ CONFORME: ______________________________________________________________ </div>
              </Grid>
          </Grid>
      </Box>
  )
}

export default FormatoComprobante